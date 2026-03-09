import http.server
import socketserver
import os
import subprocess
import threading
import time
import json
from watchdog.observers import Observer
from watchdog.observers.polling import PollingObserver
from watchdog.events import FileSystemEventHandler

# Import the AI logic from our main scoring script
from calculate_ai_scores import extract_concerns_from_notes, generate_meeting_script

PORT = int(os.environ.get("PORT", 8000))

# 这是一个用来监听文件变化的类
class CSVHandler(FileSystemEventHandler):
    def on_modified(self, event):
        # 如果被修改的文件是 market_intelligence.csv，并且不是目录
        if not event.is_directory and event.src_path.endswith('market_intelligence.csv'):
            print(f"\n[👀 监控到 {event.src_path} 已修改]")
            print("[⚙️ 正在后台自动触发 AI 重新算分...]")
            try:
                # 运行计算脚本并等待完成
                subprocess.run(['python3', 'calculate_ai_scores.py'], check=True)
                print("[✅ 自动 Ranking 更新完成！新数据已写入 data.js]")
                print("[💡 您现在可以刷新网页查看最新结果了！]\n")
            except subprocess.CalledProcessError as e:
                print(f"[❌ 自动更新失败: {e}]\n")

def start_file_watcher():
    path = "."  # 监控当前目录
    event_handler = CSVHandler()
    # 使用 PollingObserver 避免 macOS 上 FSEvents 的 "Cannot start fsevents stream" 错误
    observer = PollingObserver()
    observer.schedule(event_handler, path, recursive=False)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

# 增强的 HTTP 服务器（处理静态文件和 API 请求）
class APIServerHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Prevent caching for data.js so refreshes always get the latest CRM notes
        if 'data.js' in self.path:
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        super().end_headers()

    def do_POST(self):
        if self.path == '/api/extract_objections':
            # 读取请求体
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            
            provider_id = data.get('provider_id')
            provider_name = data.get('provider_name')
            
            print(f"\n[🤖 收到 AI 提取请求] 正在提取 {provider_name} 的 Objections...")
            
            # Read raw CRM notes to extract from
            crm_notes_dict = {}
            if os.path.exists("CRM Notes.txt"):
                with open("CRM Notes.txt", "r") as f:
                    crm_text = f.read()
                    blocks = crm_text.split("\n\n")
                    for b in blocks:
                        if b.strip():
                            lines = b.strip().split("\n")
                            name_part = lines[0].split("–")[0].split(". ", 1)[-1].strip()
                            note_content = "\n".join(lines[1:])
                            crm_notes_dict[name_part] = note_content
            
            # Match the name
            c_note = crm_notes_dict.get(provider_name, "")
            if not c_note:
                short_name = provider_name.split("Dr. ")[-1].strip()
                c_note = crm_notes_dict.get(short_name, "")
            if not c_note:
                c_note = crm_notes_dict.get(provider_name.split(" ")[-1], "")
            
            # Read product KB
            kb_path = "Product Knowledge Base.md"
            product_kb = ""
            if os.path.exists(kb_path):
                with open(kb_path, "r") as f:
                    product_kb = f.read()

            # 调用 DeepSeek API 提取 concerns 和对应的 response
            extracted_concerns = extract_concerns_from_notes(c_note, product_kb)
            
            # 移除写入 data.js 的逻辑，以便页面刷新时重置为空
            # 返回提取到的数据给前端
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'concerns': extracted_concerns}).encode('utf-8'))
            return
            
        elif self.path == '/api/generate_script':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            
            provider_id = data.get('provider_id')
            provider_info = data.get('provider_info')
            custom_prompt = data.get('custom_prompt', '')
            
            print(f"\n[🤖 收到 AI 生成话术请求] 正在生成 {provider_info.get('provider_name')} 的话术...")
            
            # 1. Read CRM Notes
            crm_notes_dict = {}
            if os.path.exists("CRM Notes.txt"):
                with open("CRM Notes.txt", "r") as f:
                    crm_text = f.read()
                    blocks = crm_text.split("\n\n")
                    for b in blocks:
                        if b.strip():
                            lines = b.strip().split("\n")
                            name_part = lines[0].split("–")[0].split(". ", 1)[-1].strip()
                            note_content = "\n".join(lines[1:])
                            crm_notes_dict[name_part] = note_content
            
            c_note = crm_notes_dict.get(provider_info.get('provider_name'), "")
            if not c_note:
                short_name = provider_info.get('provider_name').split("Dr. ")[-1].strip()
                c_note = crm_notes_dict.get(short_name, "")
            if not c_note:
                c_note = crm_notes_dict.get(provider_info.get('provider_name').split(" ")[-1], "")
                
            # 2. Read KB
            kb_path = "Product Knowledge Base.md"
            product_kb = ""
            if os.path.exists(kb_path):
                with open(kb_path, "r") as f:
                    product_kb = f.read()
                    
            # 3. Call AI
            script_data = generate_meeting_script(provider_info, c_note, product_kb, custom_prompt)
            
            # 4. Do not save to data.js to ensure refresh resets state
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'script': script_data}).encode('utf-8'))
            return
            
        elif self.path == '/api/save_script':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            
            provider_id = data.get('provider_id')
            script_data = data.get('script')
            is_approved = data.get('is_approved', False)
            
            # Do not persist to data.js on save so that page refresh clears the state
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'ok'}).encode('utf-8'))
            return
            
        self.send_error(404, 'API not found')

if __name__ == "__main__":
    # 1. 启动文件监控后台线程
    watcher_thread = threading.Thread(target=start_file_watcher, daemon=True)
    watcher_thread.start()

    # 2. 启动网页服务器
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), APIServerHandler) as httpd:
        print(f"🚀 网页服务器已启动: http://localhost:{PORT}")
        print("🕵️‍♂️ 文件监控引擎已启动！只要您保存 market_intelligence.csv，后台就会立刻自动算分...")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n服务器已关闭。")

```mermaid
graph TD
    %% 样式定义
    classDef frontend fill:#E8F0FE,stroke:#3A7BD5,stroke-width:2px,color:#1A1A1A
    classDef backend fill:#E8F5E9,stroke:#34A853,stroke-width:2px,color:#1A1A1A
    classDef ai fill:#F3E5F5,stroke:#9C27B0,stroke-width:2px,color:#1A1A1A
    classDef database fill:#FFF3E0,stroke:#FF9800,stroke-width:2px,color:#1A1A1A
    classDef file fill:#FAFAFA,stroke:#9E9E9E,stroke-width:1px,stroke-dasharray: 5 5

    %% 前端层
    subgraph Frontend [1. Frontend Layer (React / app.jsx)]
        UI[User Interface]
        State[React State]
        UI <-->|User Clicks / Inputs| State
    end

    %% 本地数据库层
    subgraph Database [2. Local Storage Layer]
        DataJS[(data.js)]
        State <-->|Read / Hydrate on Load| DataJS
    end

    %% 后端 API 层
    subgraph Backend [3. Backend Server (server.py)]
        API_Extract[/api/extract_objections]
        API_GenScript[/api/generate_script]
        API_SaveScript[/api/save_script]
        Watchdog((File Watcher))
    end

    %% 数据源层
    subgraph RawData [4. Raw Data Sources]
        CSV(market_intelligence.csv):::file
        CRM(CRM Notes.txt):::file
        KB(Product Knowledge Base.md):::file
    end

    %% AI 计算层
    subgraph AICore [5. AI Processing Engine (calculate_ai_scores.py)]
        CalcRank[Ranking & Specialty Match]
        ExtractObj[Extract Objections & Draft Response]
        GenPitch[Generate Elevator Pitch]
    end

    %% AI 网关层
    subgraph CloudAI [6. Cloud AI Services]
        Gateway{Vercel AI Gateway}
        DeepSeek((DeepSeek v3.1 Model))
        Gateway <--> DeepSeek
    end

    %% ===== 连接线 & 数据流向 =====

    %% 前端触发 API
    UI -->|Click Objections Tab| API_Extract
    UI -->|Click Script Tab / Send Chat| API_GenScript
    UI -->|Click Save/Edit Script| API_SaveScript

    %% API 触发 AI 引擎
    API_Extract -->|Pass Provider Info| ExtractObj
    API_GenScript -->|Pass Provider & Context| GenPitch
    
    %% API 直接写库 (Save)
    API_SaveScript -->|Overwrite| DataJS

    %% AI 引擎读取本地文件
    CalcRank -->|Read| CSV
    CalcRank -->|Read| KB
    ExtractObj -->|Read| CRM
    ExtractObj -->|Read| KB
    GenPitch -->|Read| CRM
    GenPitch -->|Read| KB

    %% AI 引擎连接云端
    CalcRank <-->|Prompt & Return Score| Gateway
    ExtractObj <-->|Prompt & Return JSON| Gateway
    GenPitch <-->|Prompt & Return JSON| Gateway

    %% AI 引擎写回数据库
    CalcRank -->|Write Full Ranked List| DataJS
    ExtractObj -->|Write 'crm_notes' array| DataJS
    GenPitch -->|Write 'generated_script' object| DataJS

    %% 文件监控流
    Watchdog -.->|Monitors| CSV
    Watchdog -->|Triggers on Save| CalcRank

    %% 应用样式
    class UI,State frontend
    class API_Extract,API_GenScript,API_SaveScript,Watchdog backend
    class CalcRank,ExtractObj,GenPitch ai
    class DataJS database
    class Gateway,DeepSeek ai
```

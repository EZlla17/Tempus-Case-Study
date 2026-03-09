const { useState, useEffect, useMemo, useRef } = React;

// --- Icons (Inline SVGs) ---
const Icons = {
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  ChevronDown: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  FileText: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  Activity: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
  Copy: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Users: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  UserCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>,
  Edit2: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>,
  Loader: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="4.93" x2="19.07" y2="7.76"></line></svg>,
  MousePointerClick: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4.1 12 6"></path><path d="m5.1 8-2.9-.8"></path><path d="m6 12-1.9 2"></path><path d="M7.2 2.2 8 5.1"></path><path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"></path></svg>,
  Send: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
};

const ALL_PROVIDERS = window.PROVIDERS || [];
const PRODUCT_KB = window.PRODUCT_KB || "";

ALL_PROVIDERS.forEach(p => {
  // Reset script and objections to empty on every page refresh
  p.generated_script = null;
  p.crm_notes = [];
  
  if (!p.subScores) {
    p.subScores = {
      genomicEligibility: Math.floor(Math.random() * 40) + 60,
      productAlignment: Math.floor(Math.random() * 30) + 70,
      crmSentiment: p.crm_notes ? Math.floor(Math.random() * 20) + 40 : Math.floor(Math.random() * 30) + 70,
      competitivePresence: Math.floor(Math.random() * 100)
    };
  }
});

const Tooltip = ({ children, text, type = 'default' }) => {
  const [show, setShow] = useState(false);
  let bgClass = "bg-slate-800";
  return (
    <span 
      className="relative inline-block cursor-help border-b border-dashed border-slate-400 hover:border-slate-800 transition-colors"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white rounded shadow-lg ${bgClass} z-50 pointer-events-none font-sans`}>
          {text}
          <svg className={`absolute text-current w-2 h-2 left-1/2 -translate-x-1/2 top-full ${bgClass.replace('bg-', 'text-')}`} viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
        </span>
      )}
    </span>
  );
};

const App = () => {
  const [search, setSearch] = useState("");
  const [filterCancer, setFilterCancer] = useState("");
  const [filterHospital, setFilterHospital] = useState("");
  const [filterVolume, setFilterVolume] = useState("");
  const [filterScore, setFilterScore] = useState(0);
  const [filterSpecialtyScore, setFilterSpecialtyScore] = useState(0);
  const [showAllFilters, setShowAllFilters] = useState(false);

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [rightPanelState, setRightPanelState] = useState("script");

  const cancerTypes = useMemo(() => Array.from(new Set(ALL_PROVIDERS.map(p => p.tumor_focus).flatMap(c => c.split(';')))).sort(), []);
  const hospitals = useMemo(() => Array.from(new Set(ALL_PROVIDERS.map(p => p.hospital))).sort(), []);

  const filteredProviders = useMemo(() => {
    return ALL_PROVIDERS.filter(p => {
      const matchSearch = p.provider_name.toLowerCase().includes(search.toLowerCase()) || p.hospital.toLowerCase().includes(search.toLowerCase());
      const matchCancer = filterCancer ? p.tumor_focus.includes(filterCancer) : true;
      const matchHospital = filterHospital ? p.hospital === filterHospital : true;
      const matchVolume = filterVolume ? (
        filterVolume === 'under200' ? parseInt(p.patient_volume) < 200 :
        filterVolume === '300-400' ? (parseInt(p.patient_volume) >= 300 && parseInt(p.patient_volume) <= 400) :
        filterVolume === 'over400' ? parseInt(p.patient_volume) > 400 : true
      ) : true;
      const matchScore = p.impact_score >= filterScore;
      const matchSpecialtyScore = (p.metrics && p.metrics.specialty) ? p.metrics.specialty.score >= filterSpecialtyScore : 100 >= filterSpecialtyScore;
      return matchSearch && matchCancer && matchHospital && matchVolume && matchScore && matchSpecialtyScore;
    }).sort((a, b) => b.impact_score - a.impact_score);
  }, [search, filterCancer, filterHospital, filterVolume, filterScore, filterSpecialtyScore]);

  useEffect(() => {
    if (!selectedProvider || !filteredProviders.find(p => p.provider_id === selectedProvider.provider_id)) {
      if (filteredProviders.length > 0) {
        setSelectedProvider(filteredProviders[0]);
      } else {
        setSelectedProvider(null);
      }
      setRightPanelState("script");
    }
  }, [filteredProviders, selectedProvider]);

  return (
    <div className="flex flex-col h-screen bg-[#F9F9FB] font-sans text-[#242424]">
      {/* Top Header - Tempus Dark */}
      <header className="bg-[#121212] text-white px-6 flex flex-col shrink-0 z-20 h-14">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8 h-full">
            <div className="flex items-center font-bold text-lg tracking-wide">
              "TEMPUS <span className="text-slate-500 font-light mx-2">|</span> SALES COPILOT
            </div>
            <nav className="flex gap-6 h-full items-center text-[13px] font-semibold text-slate-300 uppercase tracking-wide">
              <a href="#" className="text-white h-full flex items-center relative">
                Providers
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#66B2FF]"></div>
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-6 text-[13px] font-medium">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Help</a>
            <div className="text-slate-300 hover:text-white transition-colors cursor-pointer">
               <Icons.UserCircle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-1 overflow-hidden">
        
        {/* Left Panel: Ranked Provider List */}
        <section className={`flex flex-col shrink-0 transition-all duration-300 overflow-hidden bg-white border-r border-[#F0F0F0] shadow-[4px_0_12px_rgba(0,0,0,0.03)] z-10 w-[500px]`}>
          <div className="p-8 border-b border-[#F0F0F0]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-[#1a1a1a]">Providers</h2>
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-2 gap-4 items-end">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-slate-800">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                    <Icons.Search />
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-9 pr-4 py-2 border border-[#F0F0F0] shadow-sm rounded-full text-[14px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-shadow placeholder:text-slate-400"
                    placeholder="By name or hospital..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-slate-800">Cancer Type</label>
                <div className="relative">
                  <select 
                    className="w-full border border-[#F0F0F0] shadow-sm bg-white rounded-full pl-4 pr-8 py-2 text-[14px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 appearance-none transition-shadow"
                    value={filterCancer}
                    onChange={e => setFilterCancer(e.target.value)}
                  >
                    <option value="">Select</option>
                    {cancerTypes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                    <Icons.ChevronDown />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-slate-800">Patient Volume</label>
                <div className="relative">
                  <select 
                    className="w-full border border-[#F0F0F0] shadow-sm bg-white rounded-full pl-4 pr-8 py-2 text-[14px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 appearance-none transition-shadow"
                    value={filterVolume}
                    onChange={e => setFilterVolume(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="under200">&lt; 200</option>
                    <option value="300-400">300 - 400</option>
                    <option value="over400">&gt; 400</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                    <Icons.ChevronDown />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 h-[38px] mt-auto w-full">
                 <button onClick={() => {setSearch(""); setFilterCancer(""); setFilterHospital(""); setFilterVolume(""); setFilterScore(0); setFilterSpecialtyScore(0);}} className="flex-1 justify-center rounded-full text-[14px] font-bold text-slate-300 border-[1.5px] border-[#F0F0F0] hover:text-slate-500 hover:border-slate-300 transition-colors bg-white whitespace-nowrap h-full flex items-center leading-none">Clear all</button>
                 <button onClick={() => setShowAllFilters(true)} className="flex-1 justify-center rounded-full text-[14px] font-bold text-white bg-[#262635] hover:bg-[#1a1a25] transition-colors whitespace-nowrap h-full flex items-center leading-none">All filters</button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 bg-[#F9F9FB] custom-scrollbar">
            {/* Table Header like format */}
            <div className="flex px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
               <div className="w-2/5">Provider / Volume</div>
               <div className="w-2/5">Hospital / Specialty</div>
               <div className="w-1/5 text-right">Score</div>
            </div>

            {filteredProviders.map(provider => (
              <div 
                key={provider.provider_id}
                className={`bg-white rounded-lg border transition-all cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${selectedProvider?.provider_id === provider.provider_id ? 'border-slate-800 ring-1 ring-slate-800' : 'border-[#EAEAEA] hover:border-slate-800'}`}
                onClick={(e) => {
                  if(e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
                    setSelectedProvider(provider);
                  }
                }}
              >
                <div className="p-4 flex items-center">
                   <div className="w-2/5 pr-4">
                     <div className="text-[14px] font-semibold text-[#1a1a1a]">{provider.provider_name}</div>
                     <div className="text-[12px] text-slate-500 mt-1">{provider.patient_volume} pts</div>
                   </div>
                   <div className="w-2/5 pr-4">
                     <div className="text-[13px] text-[#1a1a1a]">{provider.hospital}</div>
                     <div className="text-[12px] text-slate-500 mt-1">{provider.specialty}</div>
                   </div>
                   <div className="w-1/5 flex justify-end items-center">
                     <span className={`px-2 py-1 rounded text-[12px] font-medium ${provider.impact_score >= 80 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{provider.impact_score}</span>
                   </div>
                </div>
              </div>
            ))}
            
            {filteredProviders.length === 0 && (
              <div className="py-10 text-center text-slate-500">
                <p className="text-[14px]">No providers found.</p>
              </div>
            )}
          </div>
        </section>

        {/* Right Panel: Contextual Details */}
        <section className="flex-1 bg-white flex flex-col relative h-full">
          <div className="flex-1 flex flex-col min-h-0">
            {selectedProvider ? (
              <>
                {/* Header Info - Always visible when provider selected */}
                <div className="px-8 pt-8 bg-white shrink-0">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-2">{selectedProvider.provider_name}</h2>
                      <div className="flex gap-4 text-[14px] text-slate-600 items-center">
                        <span className="font-medium text-slate-800">{selectedProvider.hospital}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span>{selectedProvider.specialty}</span>
                      </div>
                      <div className="flex gap-4 text-[14px] text-slate-600 items-center mt-2">
                        <span>Tumor Focus: <span className="font-medium text-slate-800">{selectedProvider.tumor_focus}</span></span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span>Patient Volume: <span className="font-medium text-slate-800">{selectedProvider.patient_volume} pts</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Score Breakdown Area */}
                  <div className="flex bg-[#F9F9FB] border border-[#EAEAEA] rounded-xl p-6 gap-8 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)]">
                    {/* Big Score */}
                    <div className="flex flex-col items-center justify-center shrink-0 w-32 border-r border-[#F0F0F0] pr-8">
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Impact Score</div>
                      <div className="text-5xl font-bold text-[#1a1a1a]">{selectedProvider.impact_score}</div>
                    </div>
                    
                    {/* Score Bars */}
                    <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-5">
                      {selectedProvider.metrics && [
                        selectedProvider.metrics.volume,
                        selectedProvider.metrics.growth,
                        selectedProvider.metrics.specialty
                      ].filter(Boolean).map((metric, i) => (
                        <div key={i} className="flex flex-col">
                          <div className="flex justify-between items-end mb-1.5">
                            <div className="flex items-center gap-2">
                              <div className="text-[12px] font-semibold text-slate-700">{metric.label}</div>
                            </div>
                            <div className="text-[12px] font-bold text-slate-800">{metric.value}</div>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#3a7bd5] h-full rounded-full transition-all" style={{width: `${metric.score}%`}}></div>
                          </div>
                        </div>
                      ))}
                      
                      {!selectedProvider.metrics && [
                        { label: "Patient Volume (Mock)", val: 80, weight: "50%", display: "80%" },
                        { label: "Practice Growth (Mock)", val: 60, weight: "30%", display: "+7%" },
                        { label: "AI Specialty Match (Mock)", val: 100, weight: "20%", display: "100%" },
                        { label: "Market Presence", val: 75, weight: "N/A", display: "75%" }
                      ].map((score, i) => (
                        <div key={i} className="flex flex-col">
                          <div className="flex justify-between items-end mb-1.5">
                            <div className="flex items-center gap-2">
                            <div className="text-[12px] font-semibold text-slate-700">{score.label}</div>
                            </div>
                            <div className="text-[12px] font-bold text-slate-800">{score.display}</div>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#3a7bd5] h-full rounded-full transition-all" style={{width: `${score.val}%`}}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tabs Divider */}
                  <div className="flex gap-8 mt-8 border-b border-[#EAEAEA]">
                    <button 
                      onClick={() => setRightPanelState("script")}
                      className={`pb-3 text-[14px] font-bold transition-colors relative ${rightPanelState === 'script' ? 'text-[#1a1a1a]' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Script
                      {rightPanelState === 'script' && (
                        <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#222431] rounded-t-sm"></div>
                      )}
                    </button>
                    <button 
                      onClick={() => setRightPanelState("objection")}
                      className={`pb-3 text-[14px] font-bold transition-colors relative ${rightPanelState === 'objection' ? 'text-[#1a1a1a]' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Objections
                      {rightPanelState === 'objection' && (
                        <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#222431] rounded-t-sm"></div>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col min-h-0">
                  {rightPanelState === "script" && <MeetingScriptView key={selectedProvider.provider_id} provider={selectedProvider} />}
                  {rightPanelState === "objection" && <ObjectionHandlerView key={selectedProvider.provider_id} provider={selectedProvider} />}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-[#F0F0F0]">
                  <Icons.Users />
                </div>
                <p className="text-[15px] font-medium text-slate-500">Select a provider to view intelligence insights.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* All Filters Modal */}
      {showAllFilters && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-[500px] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-[#F0F0F0] flex justify-between items-center">
              <h3 className="text-xl font-semibold text-[#1a1a1a]">All Filters</h3>
              <button onClick={() => setShowAllFilters(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <Icons.X />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 max-h-[70vh]">
              <div className="space-y-2">
                <label className="text-[14px] font-semibold text-slate-800">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                    <Icons.Search />
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-9 pr-4 py-2.5 border border-[#F0F0F0] shadow-sm rounded-full text-[14px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-shadow placeholder:text-slate-400"
                    placeholder="By name or hospital..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[14px] font-semibold text-slate-800">Cancer Type</label>
                  <div className="relative">
                    <select 
                      className="w-full border border-[#F0F0F0] shadow-sm bg-white rounded-full px-4 py-2.5 text-[14px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 appearance-none transition-shadow"
                      value={filterCancer}
                      onChange={e => setFilterCancer(e.target.value)}
                    >
                      <option value="">All Types</option>
                      {cancerTypes.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                      <Icons.ChevronDown />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[14px] font-semibold text-slate-800">Patient Volume</label>
                  <div className="relative">
                    <select 
                      className="w-full border border-[#F0F0F0] shadow-sm bg-white rounded-full px-4 py-2.5 text-[14px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 appearance-none transition-shadow"
                      value={filterVolume}
                      onChange={e => setFilterVolume(e.target.value)}
                    >
                      <option value="">All Volumes</option>
                      <option value="under200">&lt; 200</option>
                      <option value="300-400">300 - 400</option>
                      <option value="over400">&gt; 400</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                      <Icons.ChevronDown />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[14px] font-semibold text-slate-800">Hospital</label>
                <div className="relative">
                  <select 
                    className="w-full border border-[#F0F0F0] shadow-sm bg-white rounded-full px-4 py-2.5 text-[14px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 appearance-none transition-shadow"
                    value={filterHospital}
                    onChange={e => setFilterHospital(e.target.value)}
                  >
                    <option value="">All Hospitals</option>
                    {hospitals.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                    <Icons.ChevronDown />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#F0F0F0]">
                <label className="text-[14px] font-semibold text-slate-800 flex justify-between mt-4">
                  <span>Minimum Impact Score</span>
                  <span className="text-blue-600 font-bold">{filterScore}</span>
                </label>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={filterScore}
                  onChange={e => setFilterScore(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-semibold text-slate-800 flex justify-between">
                  <span>Minimum Specialty Alignment Score</span>
                  <span className="text-blue-600 font-bold">{filterSpecialtyScore}</span>
                </label>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={filterSpecialtyScore}
                  onChange={e => setFilterSpecialtyScore(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            <div className="p-6 border-t border-[#F0F0F0] flex justify-end gap-3 bg-gray-50">
              <button 
                onClick={() => {
                  setSearch(""); setFilterCancer(""); setFilterHospital(""); setFilterVolume(""); setFilterScore(0); setFilterSpecialtyScore(0);
                }} 
                className="px-6 py-2.5 rounded-full text-[14px] font-bold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Clear All
              </button>
              <button 
                onClick={() => setShowAllFilters(false)} 
                className="px-6 py-2.5 rounded-full text-[14px] font-bold text-white bg-[#262635] hover:bg-[#1a1a25] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const MeetingScriptView = ({ provider }) => {
  const [mode, setMode] = useState("narrative");
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [editingMsgId, setEditingMsgId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isGenerating]);

  // Initialize Chat History
  useEffect(() => {
    setChatInput("");
    setEditingMsgId(null);
    setCopiedId(null);
    
    const existing = provider.generated_script;
    const isApproved = provider.is_script_approved;
    
    if (existing) {
      setChatHistory([{
        id: 'initial_saved',
        role: 'ai',
        content: existing,
        isSaved: !!isApproved // Only show checkmark if it was explicitly approved
      }]);
    } else {
      setChatHistory([]);
      triggerGenerate("", true);
    }
  }, [provider]);

  const triggerGenerate = (promptText, isInitial = false) => {
    setIsGenerating(true);
    fetch('/api/generate_script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider_id: provider.provider_id,
        provider_info: {
          provider_name: provider.provider_name,
          hospital: provider.hospital,
          specialty: provider.specialty,
          tumor_focus: provider.tumor_focus,
          patient_volume: provider.patient_volume
        },
        custom_prompt: isInitial ? "" : promptText // Don't pass the auto-prompt text to the AI as a custom instruction
      })
    })
    .then(res => res.json())
    .then(data => {
      const newScript = data.script || { narrative: "Failed to generate script.", bullet: "- Failed to generate script." };
      
      const newMsgId = Date.now().toString();
      
      setChatHistory(prev => [...prev, {
        id: newMsgId,
        role: 'ai',
        content: newScript,
        isSaved: false // User must explicitly check it
      }]);
      setIsGenerating(false);
      
      // Auto-save logic
      provider.generated_script = newScript;
      fetch('/api/save_script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider_id: provider.provider_id,
          script: newScript
        })
      });
    })
    .catch(err => {
      console.error("Failed to generate script:", err);
      setIsGenerating(false);
    });
  };

  const handleSend = () => {
    if (!chatInput.trim() || isGenerating) return;
    const prompt = chatInput.trim();
    setChatHistory(prev => [...prev, { id: Date.now().toString(), role: 'user', content: prompt }]);
    setChatInput("");
    triggerGenerate(prompt);
  };

  const handleSave = (msgId, scriptContent) => {
    // Find if it's already saved
    const isCurrentlySaved = chatHistory.find(msg => msg.id === msgId)?.isSaved;

    // Toggle visually
    setChatHistory(prev => prev.map(msg => 
      msg.role === 'ai' ? { ...msg, isSaved: msg.id === msgId ? !isCurrentlySaved : false } : msg
    ));
    
    // Toggle backend logic
    const newApprovalState = !isCurrentlySaved;
    provider.is_script_approved = newApprovalState;
    provider.generated_script = scriptContent;
    
    fetch('/api/save_script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider_id: provider.provider_id,
        script: scriptContent,
        is_approved: newApprovalState
      })
    });
  };

  const handleCopy = (msgId, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in bg-[#F9F9FB] border border-[#EAEAEA] rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] p-6">
      {/* Chat Interface Container */}
      <div className="flex-1 flex flex-col min-h-0">
        
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto pb-4 flex flex-col gap-6 pr-2 custom-scrollbar">
          {chatHistory.map(msg => (
            <div key={msg.id} className="flex flex-col gap-1 w-full">
              {msg.role === 'user' ? (
                <div className="bg-[#F2F6FE] text-[#242424] px-5 py-4 rounded-lg max-w-[85%] self-end text-[15px] leading-relaxed">
                  {msg.content}
                </div>
              ) : (
                <div className="flex flex-col gap-1 w-full self-start">
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-500 mb-1 ml-1 tracking-wide">
                    <div className="bg-[#EAEAEA] text-black text-[10px] px-1.5 py-0.5 rounded font-bold">AI</div>
                    Tempus AI assistant
                  </div>
                  <div className="bg-[#F3F3F3] text-[#333] px-6 py-5 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative group w-full">
                    {/* Top Right Actions */}
                    <div className="absolute top-5 right-6 flex items-center gap-0.5">
                      {/* Mode Toggle inside the top right */}
                      <div className="bg-[#E5E5EA] p-[3px] rounded-full flex text-[12px] font-medium mr-2">
                        <button 
                          className={`px-3.5 py-1 rounded-full transition-all duration-200 ${mode === 'narrative' ? 'bg-white text-[#242424] shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-[#8C8C8C] hover:text-[#242424]'}`}
                          onClick={() => setMode('narrative')}
                        >Narrative</button>
                        <button 
                          className={`px-3.5 py-1 rounded-full transition-all duration-200 ${mode === 'bullet' ? 'bg-white text-[#242424] shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-[#8C8C8C] hover:text-[#242424]'}`}
                          onClick={() => setMode('bullet')}
                        >Bullet</button>
                      </div>

                      <button 
                        onClick={() => {
                          setEditingMsgId(msg.id === editingMsgId ? null : msg.id);
                          if (msg.isSaved) {
                            setChatHistory(prev => prev.map(m => m.id === msg.id ? { ...m, isSaved: false } : m));
                            provider.is_script_approved = false;
                            fetch('/api/save_script', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                provider_id: provider.provider_id,
                                script: msg.content,
                                is_approved: false
                              })
                            });
                          }
                        }}
                        className={`w-8 h-8 flex items-center justify-center transition-colors rounded-full ${editingMsgId === msg.id ? 'bg-[#EAEAEA] text-slate-800' : 'text-slate-500 hover:text-slate-800 bg-transparent hover:bg-[#EAEAEA]'}`}
                        title={editingMsgId === msg.id ? "Stop Editing" : "Edit"}
                      >
                        <Icons.Edit2 />
                      </button>
                      <button 
                        onClick={() => handleCopy(msg.id, msg.content[mode])}
                        className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors bg-transparent hover:bg-[#EAEAEA] rounded-full"
                        title="Copy"
                      >
                        {copiedId === msg.id ? <Icons.Check /> : <Icons.Copy />}
                      </button>
                      <button 
                        onClick={() => handleSave(msg.id, msg.content)}
                        className={`flex items-center justify-center transition-all duration-300 rounded-full overflow-hidden ml-1 ${
                          msg.isSaved 
                            ? 'bg-black text-white h-[28px] px-3 gap-1.5' 
                            : 'w-8 h-8 bg-transparent text-slate-500 hover:text-slate-800 hover:bg-[#EAEAEA]'
                        }`}
                        title={msg.isSaved ? "Saved Active Script" : "Save as Final Script"}
                      >
                        {msg.isSaved && <span className="text-[13px] font-medium pl-0.5">Done</span>}
                        <Icons.Check className={msg.isSaved ? "w-3.5 h-3.5" : ""} />
                      </button>
                    </div>

                    {editingMsgId === msg.id ? (
                      <div className="text-[15px] leading-relaxed mt-12 mb-2">
                        <textarea 
                          className="w-full min-h-[150px] p-4 bg-white border border-blue-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none text-[#242424]"
                          value={msg.content[mode]}
                          onChange={(e) => {
                            const newContent = {...msg.content, [mode]: e.target.value};
                            setChatHistory(prev => prev.map(m => m.id === msg.id ? {...m, content: newContent} : m));
                          }}
                          autoFocus
                        />
                        <div className="flex justify-end mt-2">
                          <button 
                            onClick={() => {
                              setEditingMsgId(null);
                              // Auto save on done editing
                              provider.generated_script = msg.content;
                              fetch('/api/save_script', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  provider_id: provider.provider_id,
                                  script: msg.content
                                })
                              });
                            }} 
                            className="px-4 py-1.5 bg-[#1c1e22] text-white rounded-full hover:bg-black text-[12px] font-medium"
                          >
                            Done editing
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-[15px] leading-relaxed mt-12 mb-2">
                        {mode === 'narrative' ? (
                          <div className="whitespace-pre-wrap">{msg.content.narrative}</div>
                        ) : (
                          <ul className="space-y-3">
                            {msg.content.bullet && msg.content.bullet.split('\n').filter(l => l.trim()).map((line, i) => (
                              <li key={i} className="flex gap-3 items-start">
                                <span className="text-slate-400 mt-1"><Icons.Check /></span>
                                <span>{line.replace(/^-\s*/, '')}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isGenerating && (
            <div className="flex flex-col gap-1 w-full self-start">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-500 mb-1 ml-1 tracking-wide">
                <div className="bg-[#EAEAEA] text-black text-[10px] px-1.5 py-0.5 rounded font-bold">AI</div>
                Tempus AI assistant
              </div>
              <div className="bg-[#F3F3F3] px-5 py-3.5 rounded-lg flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] w-fit mt-1 h-[42px]">
                <div className="w-1.5 h-1.5 bg-[#8C8C8C] rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-[#8C8C8C] rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                <div className="w-1.5 h-1.5 bg-[#8C8C8C] rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        
        {/* Chat Input Box (Tempus One Style) */}
        <div className="pt-2 bg-transparent shrink-0">
          <div className="relative flex items-center">
            <input 
              type="text"
              placeholder="Ask Tempus..."
              className="w-full pl-6 pr-14 py-3.5 bg-transparent border-[1.5px] border-[#D1D1D6] rounded-full text-[15px] text-[#242424] focus:outline-none focus:border-[#8C8C8C] transition-colors placeholder:text-[#8C8C8C]"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              disabled={isGenerating}
            />
            <button 
              onClick={handleSend}
              className={`absolute right-2.5 w-[34px] h-[34px] rounded-full flex items-center justify-center transition-all ${
                isGenerating 
                  ? 'bg-transparent text-[#8C8C8C]' 
                  : chatInput.trim() 
                    ? 'bg-[#EAEAEA] text-[#242424] hover:bg-[#D1D1D6]' 
                    : 'bg-[#F2F2F7] text-[#D1D1D6] cursor-not-allowed'
              }`}
              disabled={!chatInput.trim() || isGenerating}
            >
              {isGenerating ? (
                <Icons.Loader className="animate-spin text-[#8C8C8C] w-5 h-5" />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ObjectionHandlerView = ({ provider }) => {
  const [activeConcernIndex, setActiveConcernIndex] = useState(0);
  const [isExtracting, setIsExtracting] = useState(false);
  const [localConcerns, setLocalConcerns] = useState(Array.isArray(provider.crm_notes) ? provider.crm_notes : []);

  useEffect(() => {
    // Reset state when provider changes
    const existing = Array.isArray(provider.crm_notes) ? provider.crm_notes : [];
    setLocalConcerns(existing);
    setActiveConcernIndex(0);
    
    // If concerns are missing/empty, trigger extraction via backend API
    if (existing.length === 0) {
      setIsExtracting(true);
      fetch('/api/extract_objections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider_id: provider.provider_id,
          provider_name: provider.provider_name
        })
      })
      .then(res => res.json())
      .then(data => {
        const newConcerns = data.concerns || [];
        setLocalConcerns(newConcerns);
        provider.crm_notes = newConcerns; // Update in-memory object
        setIsExtracting(false);
      })
      .catch(err => {
        console.error("Failed to extract concerns:", err);
        setLocalConcerns([]);
        setIsExtracting(false);
      });
    }
  }, [provider]);

  // Use the AI extracted concerns, fallback to standard if empty after fetch
  const concerns = localConcerns || [];
  const displayConcerns = concerns.length > 0 ? concerns.map(c => typeof c === 'string' ? {
    concern: c,
    summary: "Legacy Data",
    response: "This is a legacy concern format without AI strategy.",
    metrics: []
  } : c) : [{
    concern: "No explicit objections recorded in CRM.",
    summary: "N/A",
    response: "No specific AI strategy needed.",
    metrics: []
  }];

  const activeResponse = displayConcerns[activeConcernIndex] || displayConcerns[0];

  return (
    <div className="flex flex-col animate-fade-in bg-[#F9F9FB] border border-[#EAEAEA] rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] p-6">
      <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-500 mb-5 ml-1 tracking-wide shrink-0">
        <div className="bg-[#EAEAEA] text-black text-[10px] px-1.5 py-0.5 rounded font-bold">AI</div>
        Tempus AI assistant
      </div>

      {isExtracting ? (
        <div className="bg-[#F3F3F3] px-5 py-3.5 rounded-lg flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] w-fit h-[42px]">
          <div className="w-1.5 h-1.5 bg-[#8C8C8C] rounded-full animate-bounce"></div>
          <div className="w-1.5 h-1.5 bg-[#8C8C8C] rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
          <div className="w-1.5 h-1.5 bg-[#8C8C8C] rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
        </div>
      ) : (
        <div className="flex gap-6">
          {/* Left: AI Extracted CRM Concerns */}
          <div className="w-[40%] flex flex-col">
            <div className="flex flex-col px-1 py-1 pr-2 space-y-3 -ml-1">
              {displayConcerns.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveConcernIndex(idx)}
                  className={`p-4 bg-white rounded-lg cursor-pointer border text-[14px] leading-relaxed transition-all shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${activeConcernIndex === idx ? 'border-slate-800 ring-1 ring-slate-800 text-[#1a1a1a] font-medium' : 'border-[#EAEAEA] text-slate-700 hover:border-slate-800'}`}
                >
                  {item.concern}
                </div>
              ))}
            </div>
          </div>

          {/* Right: AI Response Strategy */}
          {displayConcerns.length > 0 && activeResponse.response !== "No specific AI strategy needed." && (
            <div className="flex-1 flex flex-col">
              <div className="bg-[#F3F3F3] text-[#333] px-8 py-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] w-full text-[15px] leading-relaxed">
                {activeResponse.response}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

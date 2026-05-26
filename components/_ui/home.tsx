'use client'
import React, { useState } from 'react';

// --- DATABASE SIMULATION CONSTANTS ---
const MOCK_AIRPORTS = [
  { id: 101, name: "Ninoy Aquino International Airport T3", terminal_code: "NAIA-T3", location: "Manila", default_refund_amount: 550 },
  { id: 102, name: "Ninoy Aquino International Airport T1", terminal_code: "NAIA-T1", location: "Manila", default_refund_amount: 550 },
  { id: 103, name: "Mactan-Cebu International Airport T2", terminal_code: "MCIA-T2", location: "Cebu", default_refund_amount: 850 },
  { id: 104, name: "Clark International Airport T1", terminal_code: "CRK-T1", location: "Pampanga", default_refund_amount: 600 }
];

const Icons = {
  ArrowRight: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  CheckCircle: ({ className = "w-6 h-6 text-emerald-500" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

interface HomepageProps {
  onOpenConsole?: () => void;
  onBookDemo?: () => void;
  showToast?: (message: string, type?: string) => void;
}

export default function HomePage({ onOpenConsole, onBookDemo, showToast }: HomepageProps) {
  const [passengerVolume, setPassengerVolume] = useState(15000); // monthly passengers
  const potentialLeakagePrevented = passengerVolume * 550 * 0.04; // estimating 4% fraud/double claims

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white py-24 md:py-36 px-6 border-b border-slate-900">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-400/30 px-4 py-2 rounded-full text-blue-400 text-[11px] font-bold tracking-widest uppercase">
              🇵🇭 Filipino-Built For Migrant Worker Operations
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none tracking-tight text-white">
              Stop Manual IPSC Paperwork. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">Prevent Double-Claim Leakages.</span>
            </h1>
            
            <p className="text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
              <strong>AeroRefund Pro</strong> is a modern compliance and reimbursement platform designed to help airport operators and airline service teams automate physical ₱550 - ₱950 terminal fee reimbursements into a secure, paperless, and audit-ready workflow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onBookDemo}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl shadow-lg shadow-amber-500/10 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Book a Technical Demo
              </button>
              <button
                onClick={onOpenConsole}
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Launch Agent Console</span>
                <Icons.ArrowRight />
              </button>
            </div>
            
            <div className="flex items-center gap-6 pt-6 text-xs text-slate-400 border-t border-slate-800">
              <div>
                <span className="block text-xl font-bold text-slate-200">99.98%</span>
                <span>Active DMW Sync</span>
              </div>
              <div className="border-l border-slate-800 h-8"></div>
              <div>
                <span className="block text-xl font-bold text-slate-200">&lt; 30 Seconds</span>
                <span>Claim Cycle Speed</span>
              </div>
              <div className="border-l border-slate-800 h-8"></div>
              <div>
                <span className="block text-xl font-bold text-slate-200">100% Data Privacy</span>
                <span>R.A. 10173 Compliant</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            {/* Visual Preview Container */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase">POSTGRES CORE DATABASE PREVIEW</span>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-950/50 border border-blue-900/40 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-amber-400 font-mono">Table: oecs ⇄ passengers</span>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-500/20">VALID</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">Maria Leonora Santos Cruz</h4>
                  <p className="text-xs text-slate-400 font-mono">P8872162B • Singapore Job Site</p>
                </div>
                
                <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">Table: refund_transactions</span>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-mono">TXN_NO:</span>
                    <span className="text-white font-mono font-bold">TXN-2026-8912</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-mono">REFUND_AMOUNT:</span>
                    <span className="text-amber-400 font-mono font-black">₱550.00 PHP</span>
                  </div>
                </div>

                <div className="flex justify-center pt-2">
                  <button 
                    onClick={onOpenConsole}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Launch Sandbox Environment</span>
                    <Icons.ArrowRight />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-blue-500/10 rounded-2xl filter blur-2xl transform translate-y-3 -z-10"></div>
          </div>
        </div>
      </section>

      {/* DYNAMIC CALCULATOR & IMPACT SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-blue-900 font-extrabold tracking-widest uppercase text-xs">Leakage Mitigation Calculator</span>
            <h2 className="text-3xl font-black text-slate-900">Quantify Your Operational Integrity Savings</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              With thousands of Overseas Filipino Workers exiting per week, manual refund processes generate up to <strong>4% leakage</strong> from double claims, undocumented manual cash releases, or fraudulent certificates. Adjust the slider to measure your compliance savings:
            </p>
            
            {/* Range Slider */}
            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Estimated Monthly Exiting Passengers</span>
                <span className="text-blue-900 font-mono text-sm bg-blue-50 px-2 py-0.5 rounded">{(passengerVolume).toLocaleString()} OFWs</span>
              </div>
              <input 
                type="range" 
                min="2000" 
                max="80000" 
                step="1000"
                value={passengerVolume}
                onChange={(e) => setPassengerVolume(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>2,000</span>
                <span>40,000</span>
                <span>80,000</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
            <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase block font-bold">Estimated Monthly Prevention Saving</span>
            <div className="text-4xl font-black text-amber-400 font-mono">₱{(potentialLeakagePrevented).toLocaleString()} PHP</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Calculated on 4% error protection at NAIA base ₱550 rate.
            </p>
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={onBookDemo}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors"
              >
                Claim Audit Integration Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM VS SOLUTION SECTION */}
      <section className="py-12 bg-slate-100/60 border-y border-slate-200 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-900 font-extrabold tracking-widest uppercase text-xs">Workflow Evolution</span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">Ditching Paper For Live Digital Audits</h2>
            <p className="text-slate-600 text-xs mt-3">Contrast the slow manual airport queues with the instant, integrated digital verification framework of AeroRefund Pro.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Legacy Way */}
            <div className="bg-white border border-rose-100 rounded-2xl p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <h3 className="font-extrabold text-base text-slate-800">The Legacy Hand-Signed Workflow</h3>
              </div>
              <ul className="space-y-3.5 text-xs text-slate-600">
                <li className="flex gap-2.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Handwritten paper slips filled out by agents; frequent spelling and passport number mismatches.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>No live DMW validation; agents must rely on visual verification of paper OEC certificates.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Risk of double claims with the same OEC across different airline ticket offices.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Physical paper archives must be consolidated for monthly COA audit reconciliation.</span>
                </li>
              </ul>
            </div>

            {/* The Pro Way */}
            <div className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <h3 className="font-extrabold text-base text-slate-800">The AeroRefund Pro Database Method</h3>
              </div>
              <ul className="space-y-3.5 text-xs text-slate-600">
                <li className="flex gap-2.5">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>1-Click OEC Scan immediately loads passenger profiles from central records.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Integrated OCR camera decodes boarding pass specifications instantly.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Transactions write strictly back to `refund_transactions` to lock duplicate reference numbers.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Secure digital signature ledger exports as audit-ready logs for the government.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PRODUCT FEATURES */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-amber-400 font-extrabold tracking-widest uppercase text-xs">High-Speed Terminal Suite</span>
            <h2 className="text-3xl font-black">Modern Infrastructure Built for Compliance</h2>
            <p className="text-slate-400 text-xs">Built to run cleanly at critical ticket checkpoints, passport controls, and customer-service desks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
              <h4 className="font-bold text-sm text-slate-200">DMW API Integration</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Direct queries to active OEC directories to verify contracts, employer matches, and validate expiry dates.</p>
            </div>
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
              <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h4 className="font-bold text-sm text-slate-200">Anti-Leak Security</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Locks unique OEC numbers inside the relational database the moment a cash payout is approved.</p>
            </div>
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h4 className="font-bold text-sm text-slate-200">Paperless Signature pad</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Integrated vector signature canvas eliminates paper slip printers, archiving directly to cloud document paths.</p>
            </div>
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
              <Icons.CheckCircle className="w-5 h-5 text-amber-500" />
              <h4 className="font-bold text-sm text-slate-200">Automated Audit Exports</h4>
              <p className="text-xs text-slate-400 leading-relaxed">One-click data downloads matching Philippine COA guidelines and structural spreadsheet records.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-500 py-12 px-6 border-t border-slate-900 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-white font-black tracking-widest text-sm block">AEROREFUND PRO</span>
            <span>A Product of Bagong Pilipinas Modernization Initiative.</span>
          </div>

          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
            <span className="text-xl">🇵🇭</span>
            <div className="text-left font-mono">
              <span className="text-[10px] text-white block uppercase font-bold">Built for Filipinos</span>
              <span className="text-[8px] text-slate-400">Supporting Overseas Workers Daily</span>
            </div>
          </div>

          <p>© 2026 AeroRefund Technologies. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

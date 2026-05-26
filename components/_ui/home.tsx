'use client'
import React, { useState } from 'react';
import { HeroSection } from '../shared/HeroSection';
import { HomeHero } from '../shared/HomeHero';
import Smartivrsection from '../shared/Smartivrsection';
import Workflowcomparisonsection from '../shared/Workflowcomparisonsection';
import Streamlinedworkflowsection from '../shared/Streamlinedworkflowsection';
import FeaturesSection from '../FeaturesSection';

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

      {/* <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white py-24 md:py-36 px-6 border-b border-slate-900">
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
      </section> */}
      <HomeHero/>
      <FeaturesSection />
<Smartivrsection />
<Workflowcomparisonsection  />
<Streamlinedworkflowsection  />
       
    </div>
  );
}

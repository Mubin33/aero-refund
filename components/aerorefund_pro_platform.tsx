// 'use client';

// import React, { useState } from 'react';
// import RefundClaimForm from './RefundClaimForm';

// // --- STREAMING_CHUNK: Defining Mock Databases ---
// // --- DATABASE SIMULATION CONSTANTS (Directly derived from the DBML) ---
// const MOCK_AIRPORTS = [
//   { id: 101, name: "Ninoy Aquino International Airport T3", terminal_code: "NAIA-T3", location: "Manila", default_refund_amount: 550 },
//   { id: 102, name: "Ninoy Aquino International Airport T1", terminal_code: "NAIA-T1", location: "Manila", default_refund_amount: 550 },
//   { id: 103, name: "Mactan-Cebu International Airport T2", terminal_code: "MCIA-T2", location: "Cebu", default_refund_amount: 850 },
//   { id: 104, name: "Clark International Airport T1", terminal_code: "CRK-T1", location: "Pampanga", default_refund_amount: 600 }
// ];

// // --- STREAMING_CHUNK: Bundling Custom Vector Icons ---
// const Icons = {
//   Scan: () => (
//     <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 20h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2m-8 0H4a2 2 0 00-2 2v2a2 2 0 002 2h2m10-16h2a2 2 0 012 2v2m-16 0V4a2 2 0 012-2h2" />
//     </svg>
//   ),
//   Search: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//     </svg>
//   ),
//   Camera: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//     </svg>
//   ),
//   ArrowRight: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//     </svg>
//   ),
//   Alert: () => (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//     </svg>
//   ),
//   Signature: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//     </svg>
//   ),
//   ShieldCheck: () => (
//     <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//     </svg>
//   ),
//   CheckCircle: ({ className = "w-6 h-6 text-emerald-500" }) => (
//     <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//     </svg>
//   ),
//   Database: () => (
//     <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
//     </svg>
//   ),
//   Wallet: () => (
//     <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//     </svg>
//   ),
//   Upload: () => (
//     <svg className="w-10 h-10 text-[#111111] animate-bounce mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//     </svg>
//   ),
//   FileText: () => (
//     <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//     </svg>
//   )
// };

// export default function App() {
//   const [currentView, setCurrentView] = useState<'landing' | 'portal'>('landing');
//   const [showDemoModal, setShowDemoModal] = useState(false);
//   const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

//   // App context models (Terminal select and default pricing configurations)
//   const [currentAirport, setCurrentAirport] = useState(MOCK_AIRPORTS[0]);

//   // Inject animations dynamically
//   React.useEffect(() => {
//     const styleTagContent = `
// @keyframes scan {
//   0% { top: 0%; opacity: 1; }
//   50% { top: 100%; opacity: 1; }
//   100% { top: 0%; opacity: 1; }
// }
// .animate-scanner {
//   animation: scan 2s linear infinite;
// }
// `;
//     const style = document.createElement("style");
//     style.innerHTML = styleTagContent;
//     document.head.appendChild(style);
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   const showToast = (message: string, type: 'success' | 'error' = 'success') => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 4000);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white transition-all duration-300">
      
//       {/* GLOBAL TOAST BANNER */}
//       {toast && (
//         <div className="fixed top-20 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-4 rounded-xl shadow-2xl border border-slate-800 animate-slide-in max-w-sm">
//           <div className={`p-1.5 rounded-full ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
//             <Icons.CheckCircle className="w-4 h-4 text-white" />
//           </div>
//           <p className="text-xs font-semibold">{toast.message}</p>
//         </div>
//       )}

//       {/* HEADER CONTROL BAR */}
//       <div className="sticky top-0 z-40 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white border-b border-[#111111]/40 px-4 py-3 shadow-md flex flex-wrap items-center justify-between gap-4">
//         <div className="flex items-center gap-3">
//           <span className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md">
//             🇵🇭 OFW SELF-SERVICE
//           </span>
//           <span className="text-xs text-slate-300 hidden xl:inline">
//             Direct refund processing, automated terminal compliance and instant secure bank payouts
//           </span>
//         </div>
        
//         {/* Toggle Mode Control */}
//         <div className="flex items-center gap-3">
//           {currentView === 'portal' && (
//             <div className="flex items-center gap-2 mr-4 text-xs bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
//               <span className="text-slate-400">Departure Airport:</span>
//               <select
//                 value={currentAirport.id}
//                 onChange={(e) => {
//                   const targetAp = MOCK_AIRPORTS.find(a => a.id === parseInt(e.target.value));
//                   if (targetAp) {
//                     setCurrentAirport(targetAp);
//                     showToast(`Assigned refund rates updated to ${targetAp.terminal_code}`, "success");
//                   }
//                 }}
//                 className="bg-transparent text-amber-400 font-bold outline-none border-none cursor-pointer"
//               >
//                 {MOCK_AIRPORTS.map(ap => (
//                   <option key={ap.id} value={ap.id} className="text-slate-900">{ap.terminal_code} ({ap.default_refund_amount} PHP)</option>
//                 ))}
//               </select>
//             </div>
//           )}

//           <div className="flex gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
//             <button
//               onClick={() => setCurrentView('landing')}
//               className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
//                 currentView === 'landing'
//                   ? 'bg-amber-500 text-slate-950 shadow'
//                   : 'hover:bg-white/5 text-slate-300'
//               }`}
//             >
//               Product Landing Page
//             </button>
//             <button
//               onClick={() => setCurrentView('portal')}
//               className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
//                 currentView === 'portal'
//                   ? 'bg-amber-500 text-slate-950 shadow'
//                   : 'hover:bg-white/5 text-slate-300'
//               }`}
//             >
//               Apply for Refund
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* RENDER ACTIVE VIEW */}
//       {currentView === 'landing' ? (
//         <LandingPageView 
//           onOpenConsole={() => setCurrentView('portal')} 
//           onBookDemo={() => setShowDemoModal(true)} 
//         />
//       ) : (
//         <RefundClaimForm 
//           showToast={showToast} 
//           currentAirport={currentAirport}
//         />
//       )}

//       {/* DEMO BOOKING MODAL */}
//       {showDemoModal && (
//         <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-100 p-8 transform transition-all animate-scale-up relative">
//             <button 
//               onClick={() => setShowDemoModal(false)}
//               className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>
            
//             <div className="text-center mb-6">
//               <span className="text-amber-600 font-extrabold tracking-widest uppercase text-[10px] bg-amber-50 px-2 py-1 rounded">Request System Integration Demo</span>
//               <h3 className="text-2xl font-black text-slate-900 mt-2">Book a Calibration Call</h3>
//               <p className="text-slate-500 text-xs mt-1">Schedule a live compliance and DB synchronization audit with our technical engineers.</p>
//             </div>

//             <form onSubmit={(e) => {
//               e.preventDefault();
//               setShowDemoModal(false);
//               showToast("Success! Our implementation engineer will contact you shortly.", "success");
//             }} className="space-y-4">
//               <div>
//                 <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">Full Name</label>
//                 <input required type="text" placeholder="e.g. Atty. Manuel S. Carpio" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-xs" />
//               </div>
//               <div>
//                 <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">Airport Branch / Agency Name</label>
//                 <input required type="text" placeholder="e.g. Mactan-Cebu International Authority" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-xs" />
//               </div>
//               <div>
//                 <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">Government/Corporate Email</label>
//                 <input required type="email" placeholder="e.g. m.carpio@mactancebu.gov.ph" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-xs" />
//               </div>

//               <button type="submit" className="w-full bg-[#111111] hover:bg-blue-950 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 mt-2">
//                 <span>Book Calibration Session</span>
//                 <Icons.ArrowRight />
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ============================================================================
// // VIEW 1: PRODUCT LANDING PAGE (AeroRefund Pro)
// // ============================================================================
// function LandingPageView({ onOpenConsole, onBookDemo }: { onOpenConsole: () => void; onBookDemo: () => void }) {
//   const [passengerVolume, setPassengerVolume] = useState(15000); // monthly passengers
//   const potentialLeakagePrevented = passengerVolume * 550 * 0.04; // estimating 4% fraud/double claims

//   return (
//     <div className="bg-slate-50 min-h-screen">
//       {}
//       <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white py-24 md:py-36 px-6 border-b border-slate-900">
//         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
//         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
//         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
//           <div className="lg:col-span-7 space-y-6">
//             <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-400/30 px-4 py-2 rounded-full text-blue-400 text-[11px] font-bold tracking-widest uppercase">
//               🇵🇭 Self-Service Terminal Fee Claims for OFWs
//             </div>
            
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none tracking-tight text-white">
//               Instant OFW Refunds. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">Zero Paper Counters.</span>
//             </h1>
            
//             <p className="text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
//               <strong>AeroRefund Pro</strong> offers a complete digital solution. OFW passengers bypass physical claims lines by filing, uploading documents, and receiving their terminal fee refunds via GCash, Maya, or Bank Transfer in under 60 seconds.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <button
//                 onClick={onOpenConsole}
//                 className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl shadow-lg shadow-amber-500/10 transform hover:-translate-y-0.5 transition-all duration-200 text-center"
//               >
//                 Claim Your Refund Now
//               </button>
//               <button
//                 onClick={onBookDemo}
//                 className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
//               >
//                 <span>Partner Portal & Demo</span>
//                 <Icons.ArrowRight />
//               </button>
//             </div>
//           </div>
          
//           <div className="lg:col-span-5 relative">
//             <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
//               <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
//                 <div className="flex items-center gap-1.5">
//                   <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
//                   <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
//                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
//                 </div>
//                 <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase">Self-Service Process</span>
//               </div>
              
//               <div className="space-y-4">
//                 <div className="p-4 bg-blue-950/50 border border-[#111111]/40 rounded-xl space-y-2">
//                   <span className="text-[10px] text-amber-400 font-mono block">1. OEC Lookup</span>
//                   <p className="text-xs text-white font-semibold">Enter Passport & OEC reference code</p>
//                 </div>
                
//                 <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl space-y-1">
//                   <span className="text-[10px] text-slate-400 font-mono block">2. Fast Document Upload</span>
//                   <p className="text-xs text-slate-300">Drag & drop or snap a photo of your boarding pass</p>
//                 </div>

//                 <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl space-y-1">
//                   <span className="text-[10px] text-slate-400 font-mono block">3. Immediate E-Wallet Payout</span>
//                   <p className="text-xs text-emerald-400 font-bold">Funds disbursed straight to your GCash, Maya, or bank</p>
//                 </div>

//                 <div className="flex justify-center pt-2">
//                   <button 
//                     onClick={onOpenConsole}
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-lg transition-all flex items-center justify-center gap-2"
//                   >
//                     <span>Launch Interactive Claims App</span>
//                     <Icons.ArrowRight />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {}
//       <section className="py-20 px-6 max-w-6xl mx-auto">
//         <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
//           <div className="lg:col-span-7 space-y-4">
//             <span className="text-[#111111] font-extrabold tracking-widest uppercase text-xs">Airport Terminal Fee Rebate</span>
//             <h2 className="text-3xl font-black text-slate-900">Why are OFW passenger refunds automated?</h2>
//             <p className="text-slate-600 text-sm leading-relaxed">
//               Under Philippine guidelines, Overseas Filipino Workers are exempt from paying the International Passenger Service Charge (IPSC). If the fee was pre-included in your flight ticket, you are fully entitled to a <strong>₱550 to ₱850 rebate</strong>. Adjust the slider to check potential community claims saved per terminal:
//             </p>
            
//             <div className="pt-4 space-y-2">
//               <div className="flex justify-between text-xs font-bold text-slate-700">
//                 <span>Estimated Monthly Exiting Passengers</span>
//                 <span className="text-[#111111] font-mono text-sm bg-blue-50 px-2 py-0.5 rounded">{(passengerVolume).toLocaleString()} OFWs</span>
//               </div>
//               <input 
//                 type="range" 
//                 min="2000" 
//                 max="80000" 
//                 step="1000"
//                 value={passengerVolume}
//                 onChange={(e) => setPassengerVolume(parseInt(e.target.value))}
//                 className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#111111]"
//               />
//             </div>
//           </div>

//           <div className="lg:col-span-5 bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
//             <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase block font-bold">OFW Community Cash Saved Back</span>
//             <div className="text-4xl font-black text-amber-400 font-mono">₱{(potentialLeakagePrevented).toLocaleString()} PHP</div>
//             <p className="text-[11px] text-slate-400 leading-relaxed">
//               Calculated on active DMW parameters with average terminal values.
//             </p>
//             <div className="pt-2 border-t border-slate-800">
//               <button
//                 onClick={onOpenConsole}
//                 className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors"
//               >
//                 File Your OFW Refund Online
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-slate-950 text-slate-500 py-12 px-6 border-t border-slate-900 text-xs">
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
//           <div className="space-y-1 text-center md:text-left">
//             <span className="text-white font-black tracking-widest text-sm block">AEROREFUND PRO</span>
//             <span>A Product of Bagong Pilipinas Modernization Initiative.</span>
//           </div>
//           <p>© 2026 AeroRefund Technologies. All Rights Reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }


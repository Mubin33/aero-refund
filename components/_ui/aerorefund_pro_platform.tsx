// import React, { useState } from 'react';
// import HomePage from './home';
// import FormPage from './form';

// const MOCK_AIRPORTS = [
//   { id: 101, name: "Ninoy Aquino International Airport T3", terminal_code: "NAIA-T3", location: "Manila", default_refund_amount: 550 },
//   { id: 102, name: "Ninoy Aquino International Airport T1", terminal_code: "NAIA-T1", location: "Manila", default_refund_amount: 550 },
//   { id: 103, name: "Mactan-Cebu International Airport T2", terminal_code: "MCIA-T2", location: "Cebu", default_refund_amount: 850 },
//   { id: 104, name: "Clark International Airport T1", terminal_code: "CRK-T1", location: "Pampanga", default_refund_amount: 600 }
// ];

// const MOCK_USERS = [
//   { id: 501, username: "jsantos", full_name: "Agent Jaime Santos", role_id: 1, role_name: "Agent", airport_id: 101 },
//   { id: 502, username: "mcolina", full_name: "Supervisor Maria Colina", role_id: 2, role_name: "Supervisor", airport_id: 101 },
//   { id: 503, username: "admin_pavia", full_name: "Director Roberto Pavia", role_id: 3, role_name: "Admin", airport_id: 102 }
// ];

// const CheckCircleIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 20 20">
//     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//   </svg>
// );

// export default function App() {
//   const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
//   const [showDemoModal, setShowDemoModal] = useState(false);
//   const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

//   // Active Context Parameters (DB Config mappings)
//   const [currentAirport, setCurrentAirport] = useState(MOCK_AIRPORTS[0]);
//   const [currentUser, setCurrentUser] = useState(MOCK_USERS[0]);

//   const showToast = (message: string, type = 'success') => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 4000);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white transition-all duration-300">
      
//       {/* GLOBAL TOAST BANNER */}
//       {toast && (
//         <div className="fixed top-20 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-4 rounded-xl shadow-2xl border border-slate-800 animate-slide-in max-w-sm">
//           <div className={`p-1.5 rounded-full ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
//             <CheckCircleIcon className="w-4 h-4 text-white" />
//           </div>
//           <p className="text-xs font-semibold">{toast.message}</p>
//         </div>
//       )}

//       {/* HEADER CONTROL BAR */}
//       <div className="sticky top-0 z-40 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white border-b border-blue-900/40 px-4 py-3 shadow-md flex flex-wrap items-center justify-between gap-4">
//         <div className="flex items-center gap-3">
//           <span className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md animate-pulse">
//             🇵🇭 DBML COMPLIANT
//           </span>
//           <span className="text-xs text-slate-300 hidden xl:inline">
//             Centralized terminal fee database connected via direct PostgreSQL schema mapping
//           </span>
//         </div>
        
//         {/* Toggle Mode Control */}
//         <div className="flex items-center gap-3">
//           {currentView === 'dashboard' && (
//             <div className="flex items-center gap-2 mr-4 text-xs bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
//               <span className="text-slate-400">Context Airport:</span>
//               <select
//                 value={currentAirport.id}
//                 onChange={(e) => {
//                   const targetAp = MOCK_AIRPORTS.find(a => a.id === parseInt(e.target.value));
//                   setCurrentAirport(targetAp);
//                   showToast(`Switched active processing gate to ${targetAp.terminal_code}`, "success");
//                 }}
//                 className="bg-transparent text-amber-400 font-bold outline-none border-none cursor-pointer select-none"
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
//               onClick={() => setCurrentView('dashboard')}
//               className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
//                 currentView === 'dashboard'
//                   ? 'bg-amber-500 text-slate-950 shadow'
//                   : 'hover:bg-white/5 text-slate-300'
//               }`}
//             >
//               Agent Console (Dashboard)
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* RENDER ACTIVE VIEW */}
//       {currentView === 'landing' ? (
//         <HomePage 
//           onOpenConsole={() => setCurrentView('dashboard')} 
//           onBookDemo={() => setShowDemoModal(true)} 
//           showToast={showToast}
//         />
//       ) : (
//         <FormPage 
//           showToast={showToast} 
//           currentAirport={currentAirport}
//           currentUser={currentUser}
//           setCurrentUser={setCurrentUser}
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
//               <span className="text-amber-600 font-extrabold tracking-widest uppercase text-[10px] bg-amber-50 px-2 py-1 rounded">Interactive Prototype Demo</span>
//               <h3 className="text-2xl font-black text-slate-900 mt-2">Book a Calibration Call</h3>
//               <p className="text-slate-500 text-xs mt-1">Schedule a live compliance and PostgreSQL synchronization audit with our technical engineers.</p>
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

//               <button type="submit" className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 mt-2">
//                 <span>Book Calibration Session</span>
//               </button>
//             </form>
//           </div>
//         </div>
//   );
// }

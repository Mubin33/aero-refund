'use client'
import React, { useState, useRef } from 'react';
import { Navbar } from "@/components/shared/Navbar";

// --- DATABASE SIMULATION CONSTANTS ---
const MOCK_AIRPORTS = [
  { id: 101, name: "Ninoy Aquino International Airport T3", terminal_code: "NAIA-T3", location: "Manila", default_refund_amount: 550 },
  { id: 102, name: "Ninoy Aquino International Airport T1", terminal_code: "NAIA-T1", location: "Manila", default_refund_amount: 550 },
  { id: 103, name: "Mactan-Cebu International Airport T2", terminal_code: "MCIA-T2", location: "Cebu", default_refund_amount: 850 },
  { id: 104, name: "Clark International Airport T1", terminal_code: "CRK-T1", location: "Pampanga", default_refund_amount: 600 }
];

const MOCK_AIRLINES = [
  { code: "PR", name: "Philippine Airlines" },
  { code: "5J", name: "Cebu Pacific" },
  { code: "CX", name: "Cathay Pacific" },
  { code: "EK", name: "Emirates" },
  { code: "SQ", name: "Singapore Airlines" },
  { code: "QR", name: "Qatar Airways" }
];

const MOCK_USERS = [
  { id: 501, username: "jsantos", full_name: "Agent Jaime Santos", role_id: 1, role_name: "Agent", airport_id: 101 },
  { id: 502, username: "mcolina", full_name: "Supervisor Maria Colina", role_id: 2, role_name: "Supervisor", airport_id: 101 },
  { id: 503, username: "admin_pavia", full_name: "Director Roberto Pavia", role_id: 3, role_name: "Admin", airport_id: 102 }
];

const MOCK_OECS = {
  "OEC-2026-9912": {
    id: 3001,
    oec_number: "OEC-2026-9912",
    issue_date: "2026-01-15T08:00:00Z",
    expiry_date: "2026-07-15T08:00:00Z",
    status: "active",
    job_position: "Senior Registered Nurse (ICU)",
    employer_name: "Mount Elizabeth Hospital Group",
    job_site: "Singapore",
    passenger: {
      id: 2001,
      passport_number: "P8872162B",
      first_name: "Maria Leonora",
      last_name: "Santos Cruz",
      birth_date: "1988-04-12",
      gender: "Female"
    }
  },
  "OEC-2026-4432": {
    id: 3002,
    oec_number: "OEC-2026-4432",
    issue_date: "2026-03-01T09:30:00Z",
    expiry_date: "2026-09-01T09:30:00Z",
    status: "active",
    job_position: "Lead Civil Infrastructure Engineer",
    employer_name: "Al-Adel Construction Group Ltd.",
    job_site: "Riyadh, Saudi Arabia",
    passenger: {
      id: 2002,
      passport_number: "P1122941A",
      first_name: "Juanito",
      last_name: "Del Prado Dimagiba",
      birth_date: "1992-11-23",
      gender: "Male"
    }
  },
  "OEC-2026-0777": {
    id: 3003,
    oec_number: "OEC-2026-0777",
    issue_date: "2025-11-10T14:15:00Z",
    expiry_date: "2026-05-10T14:15:00Z",
    status: "expired",
    job_position: "First Deck Officer / Seafarer",
    employer_name: "Maersk Shipping Lines",
    job_site: "Rotterdam, Netherlands",
    passenger: {
      id: 2003,
      passport_number: "P1896123Z",
      first_name: "Jose Rizal",
      last_name: "Mercado",
      birth_date: "1975-06-19",
      gender: "Male"
    }
  },
  "OEC-2026-1188": {
    id: 3004,
    oec_number: "OEC-2026-1188",
    issue_date: "2026-02-18T10:00:00Z",
    expiry_date: "2026-08-18T10:00:00Z",
    status: "used",
    job_position: "Hospitality Services Executive",
    employer_name: "Hyatt Regency Dubai",
    job_site: "Dubai, United Arab Emirates",
    passenger: {
      id: 2004,
      passport_number: "P1986022Y",
      first_name: "Corazon Aquino",
      last_name: "Cojuangco",
      birth_date: "1994-01-25",
      gender: "Female"
    }
  }
};

const INITIAL_TRANSACTIONS = [
  {
    id: 8001,
    transaction_no: "TXN-2026-8172",
    oec_no: "OEC-2026-9011",
    passenger_name: "Ramon S. Aquino",
    airport_code: "NAIA-T3",
    airline_code: "PR",
    flight_number: "PR 102",
    departure_date: "2026-05-26",
    refund_amount: 550,
    processed_at: "09:02 AM",
    status: "completed"
  },
  {
    id: 8002,
    transaction_no: "TXN-2026-1102",
    oec_no: "OEC-2026-3022",
    passenger_name: "Aileen G. Bautista",
    airport_code: "NAIA-T3",
    airline_code: "5J",
    flight_number: "5J 803",
    departure_date: "2026-05-26",
    refund_amount: 550,
    processed_at: "08:45 AM",
    status: "completed"
  },
  {
    id: 8003,
    transaction_no: "TXN-2026-3398",
    oec_no: "OEC-2026-7744",
    passenger_name: "Christopher M. Mendoza",
    airport_code: "NAIA-T1",
    airline_code: "CX",
    flight_number: "CX 906",
    departure_date: "2026-05-26",
    refund_amount: 550,
    processed_at: "08:30 AM",
    status: "completed"
  },
  {
    id: 8004,
    transaction_no: "TXN-2026-7711",
    oec_no: "OEC-2026-1209",
    passenger_name: "Grace Anne L. Cruz",
    airport_code: "MCIA-T2",
    airline_code: "EK",
    flight_number: "EK 333",
    departure_date: "2026-05-26",
    refund_amount: 850,
    processed_at: "08:12 AM",
    status: "flagged_for_review"
  },
  {
    id: 8005,
    transaction_no: "TXN-2026-0921",
    oec_no: "OEC-2026-1100",
    passenger_name: "Manuel P. Roxas",
    airport_code: "CRK-T1",
    airline_code: "SQ",
    flight_number: "SQ 915",
    departure_date: "2026-05-26",
    refund_amount: 600,
    processed_at: "07:55 AM",
    status: "completed"
  }
];

const Icons = {
  Scan: () => (
    <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 20h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2m-8 0H4a2 2 0 00-2 2v2a2 2 0 002 2h2m10-16h2a2 2 0 012 2v2m-16 0V4a2 2 0 012-2h2" />
    </svg>
  ),
  Camera: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  Alert: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  Signature: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  CheckCircle: ({ className = "w-6 h-6 text-emerald-500" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Database: () => (
    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
};

interface Transaction {
  id: number;
  transaction_no: string;
  oec_no: string;
  passenger_name: string;
  airport_code: string;
  airline_code: string;
  flight_number: string;
  departure_date: string;
  refund_amount: number;
  processed_at: string;
  status: string;
}

interface CurrentAirport {
  id: number;
  name: string;
  terminal_code: string;
  location: string;
  default_refund_amount: number;
}

interface CurrentUser {
  id: number;
  username: string;
  full_name: string;
  role_id: number;
  role_name: string;
  airport_id: number;
}

interface FormProps {
  showToast?: (message: string, type?: string) => void;
  currentAirport?: CurrentAirport;
  currentUser?: CurrentUser;
  setCurrentUser?: (user: CurrentUser) => void;
}

export default function FormPage({ showToast = () => {}, currentAirport = MOCK_AIRPORTS[0], currentUser = MOCK_USERS[0], setCurrentUser = () => {} }: FormProps) {
  const [step, setStep] = useState(1);
  const [oecInput, setOecInput] = useState("");
  const [currentOecRecord, setCurrentOecRecord] = useState<typeof MOCK_OECS["OEC-2026-9912"] | null>(null);
  const [validationError, setValidationError] = useState("");

  const [showDbmlInspector, setShowDbmlInspector] = useState(false);

  const [airlineCode, setAirlineCode] = useState("");
  const [flightNo, setFlightNo] = useState("");
  const [departureDate, setDepartureDate] = useState("2026-05-26");
  const [boardingTime, setBoardingTime] = useState("10:30 AM");
  const [isSimulatingOCR, setIsSimulatingOCR] = useState(false);
  const [ocrSuccess, setOcrSuccess] = useState(false);

  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  const [recentRefundList, setRecentRefundList] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  const resetForm = () => {
    setStep(1);
    setOecInput("");
    setCurrentOecRecord(null);
    setValidationError("");
    setAirlineCode("");
    setFlightNo("");
    setOcrSuccess(false);
    setHasSigned(false);
    clearSignature();
  };

  const handleOecLookup = (id: string) => {
    const trimmedId = id.trim().toUpperCase();
    if (!trimmedId) {
      setValidationError("Please input or scan an OEC serial number.");
      return;
    }

    const record = MOCK_OECS[trimmedId as keyof typeof MOCK_OECS];
    if (record) {
      setValidationError("");
      setCurrentOecRecord(record);
      
      if (record.status === 'expired') {
        showToast("OEC Status: EXPIRED. Payout denied.", "error");
      } else if (record.status === 'used') {
        showToast("OEC Status: ALREADY USED. Potential double claim block triggered.", "error");
      } else if (record.status === 'cancelled') {
        showToast("OEC Status: CANCELLED. Void passport match.", "error");
      } else {
        showToast(`OEC match: ${record.passenger.first_name} ${record.passenger.last_name} (VALID)`, "success");
      }
    } else {
      setCurrentOecRecord(null);
      setValidationError(`OEC serial '${trimmedId}' was not found in the DMW database. Double check or scan original.`);
      showToast("Unregistered OEC Document.", "error");
    }
  };

  const triggerBoardingPassOCR = () => {
    setIsSimulatingOCR(true);
    setOcrSuccess(false);

    setTimeout(() => {
      setAirlineCode("PR");
      setFlightNo("PR 102");
      setDepartureDate("2026-05-26");
      setBoardingTime("10:30 AM");
      setOcrSuccess(true);
      setIsSimulatingOCR(false);
      showToast("OCR read complete: Philippine Airlines PR 102 matched.", "success");
    }, 2000);
  };

  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent<HTMLCanvasElement>).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent<HTMLCanvasElement>).clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const handleDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent<HTMLCanvasElement>).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent<HTMLCanvasElement>).clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.stroke();
    setHasSigned(true);
  };

  const handleStopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const triggerCashDisbursal = () => {
    if (!hasSigned) {
      showToast("Signature authentication is mandatory prior to cash release.", "error");
      return;
    }

    const randomTxId = `TXN-2026-${Math.floor(Math.random() * 9000) + 1000}`;
    const newTransaction = {
      id: Date.now(),
      transaction_no: randomTxId,
      oec_no: currentOecRecord?.oec_number || "",
      passenger_name: `${currentOecRecord?.passenger.first_name} ${currentOecRecord?.passenger.last_name}`,
      airport_code: currentAirport.terminal_code,
      airline_code: airlineCode,
      flight_number: flightNo,
      departure_date: departureDate,
      refund_amount: currentAirport.default_refund_amount,
      processed_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "completed"
    };

    setRecentRefundList([newTransaction, ...recentRefundList.slice(0, 4)]);
    showToast(`₱${currentAirport.default_refund_amount} PHP disbursed securely. Transaction closed.`, "success");
    setStep(4);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
      

<Navbar />
      {/* DBML SCHEMA INSPECTOR TOGGLE ROW */}
      <div className="bg-white text-gray-900 px-5 py-3 rounded-lg border border-gray-300 flex justify-between items-center text-xs select-none">
        <span className="flex items-center gap-2">
          <Icons.Database />
          <span>Active relational DB mapping: Postgres DBML Schema</span>
        </span>
        <button
          onClick={() => setShowDbmlInspector(!showDbmlInspector)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-3 py-1.5 rounded transition-all"
        >
          {showDbmlInspector ? "✕ Hide DBML Inspector" : "⚡ Show DBML Inspector"}
        </button>
      </div>
      {/* LIVE DBML SCHEMATICS PANEL */}
      {showDbmlInspector && (
        <div className="bg-white border border-gray-300 text-gray-900 p-6 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[11px] animate-scale-up select-none">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
            <span className="text-[#F2B124] font-bold block">Table: passengers ⇄ oecs</span>
            <p className="text-gray-600">One passenger has one or more Overseas Employment Certificates.</p>
            <div className="text-[10px] space-y-1 text-gray-700">
              <div className="flex justify-between"><span>passport_number</span> <span className="text-[#F2B124]">VARCHAR [Unique]</span></div>
              <div className="flex justify-between"><span>status</span> <span className="text-[#F2B124]">active | used | expired</span></div>
              <div className="flex justify-between"><span>job_site</span> <span className="text-[#F2B124]">VARCHAR</span></div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
            <span className="text-[#F2B124] font-bold block">Table: refund_transactions</span>
            <p className="text-gray-600">Maps flight and disbursement financials exactly to active terminals.</p>
            <div className="text-[10px] space-y-1 text-gray-700">
              <div className="flex justify-between"><span>transaction_no</span> <span className="text-[#F2B124]">VARCHAR [Unique]</span></div>
              <div className="flex justify-between"><span>refund_amount</span> <span className="text-[#F2B124]">DECIMAL (e.g. {currentAirport.default_refund_amount})</span></div>
              <div className="flex justify-between"><span>processed_by</span> <span className="text-[#F2B124]">USER_ID: {currentUser.id}</span></div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
            <span className="text-[#F2B124] font-bold block">Current Session Meta Context</span>
            <div className="space-y-1.5 text-xs text-gray-700">
              <div>Airport: <strong className="text-gray-900">{currentAirport.name} ({currentAirport.terminal_code})</strong></div>
              <div>Default Rate: <strong className="text-[#F2B124]">{currentAirport.default_refund_amount} PHP</strong></div>
              <div>Active Operator: <strong className="text-gray-900">{currentUser.full_name}</strong></div>
              
              <div className="pt-1 flex gap-2">
                <span className="text-gray-600">Change Agent:</span>
                <select
                  value={currentUser.id}
                  onChange={(e) => {
                    const u = MOCK_USERS.find(user => user.id === parseInt(e.target.value));
                    if (u) {
                      setCurrentUser(u);
                      showToast(`Logged in as operator: ${u.full_name}`, "success");
                    }
                  }}
                  className="bg-gray-100 text-[10px] font-bold text-gray-900 outline-none rounded border border-gray-300 px-1 select-none cursor-pointer"
                >
                  {MOCK_USERS.map(u => (
                    <option key={u.id} value={u.id}>{u.full_name} ({u.role_name})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CORE WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT WORKSPACE CARD */}
        <div className="lg:col-span-8 space-y-6 bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
          
          {/* STAGE HEADER BAR */}
          <div className="bg-gray-50 border-b border-gray-300 px-6 py-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest block">Active Terminal Refund Wizard</span>
              <span className="text-xs text-gray-700">Ensure passport credentials map strictly.</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider">
              <span className={`px-2.5 py-1 rounded transition-all ${step >= 1 ? 'bg-[#F2B124] text-[#191919]' : 'bg-gray-200 text-gray-600'}`}>1. Validate OEC</span>
              <span className="text-gray-400">/</span>
              <span className={`px-2.5 py-1 rounded transition-all ${step >= 2 ? 'bg-[#F2B124] text-[#191919]' : 'bg-gray-200 text-gray-600'}`}>2. Flight Info</span>
              <span className="text-gray-400">/</span>
              <span className={`px-2.5 py-1 rounded transition-all ${step >= 3 ? 'bg-[#F2B124] text-[#191919]' : 'bg-gray-200 text-gray-600'}`}>3. Signature</span>
            </div>
          </div>

          {/* STEP 1: VALIDATE OEC SCREEN */}
          {step === 1 && (
            <div className="p-6 md:p-8 space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-900">Authenticate Overseas Employment Certificate (OEC)</h3>
                <p className="text-xs text-gray-600">Query status records dynamically across central Philippine databases. Valid active OECs bypass standard terminal checks.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-gray-50 p-6 rounded-lg border border-gray-300">
                
                <div className="text-center md:border-r border-gray-300 md:pr-6 py-2">
                  <button
                    onClick={() => {
                      handleOecLookup("OEC-2026-9912");
                    }}
                    className="inline-flex flex-col items-center justify-center bg-[#F2B124] hover:bg-[#E0A020] text-[#191919] w-full max-w-xs py-7 px-4 rounded-lg shadow transition-transform transform hover:-translate-y-0.5 font-bold"
                  >
                    <Icons.Scan />
                    <span className="text-xs font-black tracking-widest uppercase mt-3">Scan OEC QR Code</span>
                    <span className="text-[9px] text-[#191919]/70 mt-1">Direct Scanner Integration</span>
                  </button>
                  <p className="text-[10px] text-gray-600 mt-2 italic">Tip: Click scanner trigger to load active mock OEC</p>
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-700">Manual Entry Reference</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. OEC-2026-4432"
                      value={oecInput}
                      onChange={(e) => setOecInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleOecLookup(oecInput)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-[#F2B124] outline-none uppercase font-mono tracking-widest text-xs placeholder-gray-400"
                    />
                    <button
                      onClick={() => handleOecLookup(oecInput)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-5 rounded-lg text-xs font-bold uppercase tracking-wider border border-gray-300"
                    >
                      Verify
                    </button>
                  </div>

                  <div className="text-[10px] text-gray-600 flex flex-wrap gap-2 pt-1 items-center">
                    <span>Database Status Mappings:</span>
                    <button onClick={() => { setOecInput("OEC-2026-9912"); handleOecLookup("OEC-2026-9912"); }} className="underline hover:text-[#F2B124] font-mono text-[9px]">Active Nurse</button>
                    <span>•</span>
                    <button onClick={() => { setOecInput("OEC-2026-4432"); handleOecLookup("OEC-2026-4432"); }} className="underline hover:text-[#F2B124] font-mono text-[9px]">Active Engineer</button>
                    <span>•</span>
                    <button onClick={() => { setOecInput("OEC-2026-1188"); handleOecLookup("OEC-2026-1188"); }} className="underline hover:text-rose-400 font-mono text-[9px]">Duplicate (Used)</button>
                    <span>•</span>
                    <button onClick={() => { setOecInput("OEC-2026-0777"); handleOecLookup("OEC-2026-0777"); }} className="underline hover:text-rose-400 font-mono text-[9px]">Expired</button>
                  </div>
                </div>

              </div>

              {validationError && (
                <div className="bg-rose-50 border border-rose-300 text-rose-800 p-4 rounded-lg flex items-start gap-3 animate-fade-in">
                  <span className="p-1 bg-rose-200 rounded-full text-rose-700">
                    <Icons.Alert />
                  </span>
                  <div className="text-xs">
                    <strong className="block font-bold">OEC Verification Denied</strong>
                    <span className="text-rose-800">{validationError}</span>
                  </div>
                </div>
              )}

              {currentOecRecord && (
                <div className={`border rounded-lg p-6 space-y-4 animate-scale-up ${
                  currentOecRecord.status === 'active'
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-rose-50 border-rose-300'
                }`}>
                  
                  <div className="flex flex-wrap justify-between items-start gap-4 pb-3 border-b border-dashed border-gray-300">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-gray-600 block">DMW PASSPORT MASTER ID: {currentOecRecord.passenger.id}</span>
                      <h4 className="text-xl font-black text-gray-900 mt-0.5">
                        {currentOecRecord.passenger.last_name}, {currentOecRecord.passenger.first_name}
                      </h4>
                      <p className="text-xs text-gray-700 font-mono mt-0.5">
                        Passport: <strong className="text-gray-900">{currentOecRecord.passenger.passport_number}</strong> • Sex: {currentOecRecord.passenger.gender} • Birth: {currentOecRecord.passenger.birth_date}
                      </p>
                    </div>
                    
                    <span className={`px-3 py-1.5 rounded text-[10px] font-black tracking-widest uppercase border ${
                      currentOecRecord.status === 'active'
                        ? 'bg-emerald-200 text-emerald-900 border-emerald-400'
                        : 'bg-rose-200 text-rose-900 border-rose-400'
                    }`}>
                      OEC STATUS: {currentOecRecord.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-600 block font-medium">Position & Employer</span>
                      <strong className="text-gray-900 block">{currentOecRecord.job_position}</strong>
                      <span className="text-gray-700 text-[11px]">{currentOecRecord.employer_name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block font-medium">Deployed Job Site</span>
                      <strong className="text-gray-900 block">{currentOecRecord.job_site}</strong>
                      <span className="text-gray-700 text-[11px]">Contract Expiry: {currentOecRecord.expiry_date.split('T')[0]}</span>
                    </div>
                  </div>

                  {currentOecRecord.status === 'active' && (
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => setStep(2)}
                        className="bg-[#F2B124] hover:bg-[#E0A020] text-[#191919] font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg shadow-md flex items-center gap-1.5 transition-colors"
                      >
                        <span>Capture Boarding Pass</span>
                        <Icons.ArrowRight />
                      </button>
                    </div>
                  )}

                  {currentOecRecord.status !== 'active' && (
                    <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded text-xs flex items-center gap-2">
                      <span className="text-rose-700 font-bold font-mono">⚠️ [REJECTED]</span>
                      <span>Relational constraints prevent refunding this OEC due to non-active database status parameters.</span>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* STEP 2: CAPTURE BOARDING PASS SCREEN */}
          {step === 2 && (
            <div className="p-6 md:p-8 space-y-6 animate-fade-in">
              <div className="flex justify-between items-center gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-900">Collect Flight Details (Boarding Pass)</h3>
                  <p className="text-xs text-gray-600">Record boarding logs to tie the payout instance with physical flight logs on departure files.</p>
                </div>
                <button onClick={() => setStep(1)} className="text-gray-600 hover:text-gray-900 text-xs font-bold">
                  ← Back to OEC
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-white text-gray-900 rounded-lg p-5 border border-gray-300 flex flex-col justify-between min-h-[280px] relative overflow-hidden">
                  <div className="absolute inset-4 border border-dashed border-gray-300 rounded-lg pointer-events-none flex items-center justify-center">
                    {!ocrSuccess && !isSimulatingOCR && (
                      <span className="text-gray-400 text-[10px] font-mono tracking-widest">POSITION BOARDING CARD</span>
                    )}

                    {isSimulatingOCR && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-[#F2B124] animate-scanner"></div>
                    )}
                  </div>

                  <div className="flex justify-between items-center relative z-10">
                    <span className="text-[9px] font-mono tracking-widest text-gray-600 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                      BOARDING SCANNER MODULE
                    </span>
                    <span className="text-[9px] font-mono text-gray-600">NAIA-T1 HW v2</span>
                  </div>

                  <div className="text-center space-y-2 relative z-10">
                    {isSimulatingOCR ? (
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-[#F2B124] animate-pulse">Running High-Accuracy OCR Model...</p>
                        <p className="text-[9px] font-mono text-gray-600">Extracting Carrier, Seat No, Flight Date stamps</p>
                      </div>
                    ) : ocrSuccess ? (
                      <div className="space-y-1">
                        <Icons.CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                        <p className="text-xs font-extrabold text-emerald-600">Boarding Pass Read Successfully</p>
                        <p className="text-[9px] text-gray-600 font-mono">Carrier PR matched to Philippines records.</p>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-600 max-w-xs mx-auto">Click simulation below to auto-complete form variables from mock document.</p>
                    )}
                  </div>

                  <div className="relative z-10">
                    <button
                      onClick={triggerBoardingPassOCR}
                      disabled={isSimulatingOCR}
                      className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 py-3 rounded-lg text-xs font-extrabold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-gray-900"
                    >
                      <Icons.Camera />
                      <span>{isSimulatingOCR ? "Extracting..." : "Scan Boarding Card OCR"}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-700 mb-1">Airline Carrier Code</label>
                    <select
                      value={airlineCode}
                      onChange={(e) => setAirlineCode(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#F2B124] outline-none text-xs text-gray-900 font-mono select-none cursor-pointer"
                    >
                      <option value="">-- Choose Airline code --</option>
                      {MOCK_AIRLINES.map(line => (
                        <option key={line.code} value={line.code}>{line.code} - {line.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-700 mb-1">Flight Number</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. PR-102"
                        value={flightNo}
                        onChange={(e) => setFlightNo(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-[#F2B124] outline-none text-xs font-mono uppercase tracking-widest"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-700 mb-1">Departure Date</label>
                      <input
                        required
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-[#F2B124] outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-700 mb-1">Assigned Airport Gate Desk</label>
                    <div className="bg-white px-4 py-3 rounded-lg text-xs font-mono text-gray-800 border border-gray-300">
                      Terminal Assigned: <strong>{currentAirport.name} ({currentAirport.terminal_code})</strong>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        if (!airlineCode || !flightNo) {
                          showToast("Airline Carrier and Flight parameters are mandatory.", "error");
                          return;
                        }
                        setStep(3);
                      }}
                      className="w-full bg-[#F2B124] hover:bg-[#E0A020] text-[#191919] font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Proceed to Refund Settlement</span>
                      <Icons.ArrowRight />
                    </button>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* STEP 3: REFUND CONFIRMATION & SIGNATURE SCREEN */}
          {step === 3 && (
            <div className="p-6 md:p-8 space-y-6 animate-fade-in">
              <div className="flex justify-between items-center gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-900">Authorize Refund & Collect Signature</h3>
                  <p className="text-xs text-gray-600">Provide direct cash disbursement authorization. The digital signature is locked securely into relational audit trails.</p>
                </div>
                <button onClick={() => setStep(2)} className="text-gray-600 hover:text-gray-900 text-xs font-bold">
                  ← Back to Flight
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                <div className="bg-gray-100 rounded-lg border border-gray-300 p-5 space-y-4">
                  <span className="text-[9px] font-extrabold text-gray-600 uppercase tracking-widest block">Audit Invoice Slip</span>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-gray-300 pb-1">
                      <span className="text-gray-700">Beneficiary Worker:</span>
                      <strong className="text-gray-900">{currentOecRecord?.passenger.first_name} {currentOecRecord?.passenger.last_name}</strong>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-1">
                      <span className="text-gray-700">OEC ID Reference:</span>
                      <strong className="text-gray-900 font-mono text-[11px]">{currentOecRecord?.oec_number}</strong>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-1">
                      <span className="text-gray-700">Carrier Departure:</span>
                      <strong className="text-gray-900 font-mono text-[11px]">{airlineCode} - {flightNo} ({departureDate})</strong>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-1">
                      <span className="text-gray-700">Processing Gate:</span>
                      <strong className="text-gray-900 font-mono text-[11px]">{currentAirport.terminal_code}</strong>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-yellow-800 font-black uppercase tracking-wider block">IPSC CASH COMPENSATED</span>
                      <span className="text-2xl font-black text-gray-900 font-mono">₱{currentAirport.default_refund_amount}.00 PHP</span>
                    </div>
                    <span className="text-[10px] font-bold bg-yellow-200 text-yellow-900 px-2 py-1 rounded">No Coins</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold uppercase text-gray-700 flex items-center gap-1.5">
                      <Icons.Signature />
                      <span>OFW Digital Sign Ledger</span>
                    </span>
                    <button onClick={clearSignature} className="text-[10px] text-rose-600 hover:text-rose-700 font-bold uppercase">
                      Reset Pad
                    </button>
                  </div>

                  <div className="border border-gray-300 bg-white rounded-lg h-[170px] overflow-hidden relative shadow-inner">
                    {!hasSigned && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 text-center pointer-events-none p-4">
                        <span className="text-xs font-bold">DRAW OFFICIAL SIGNATURE</span>
                        <span className="text-[9px] mt-0.5">Left-click and drag or draw with touchscreen fingers</span>
                      </div>
                    )}

                    <canvas
                      ref={signatureCanvasRef}
                      width={400}
                      height={170}
                      onMouseDown={handleStartDraw}
                      onMouseMove={handleDrawing}
                      onMouseUp={handleStopDrawing}
                      onMouseLeave={handleStopDrawing}
                      onTouchStart={handleStartDraw}
                      onTouchMove={handleDrawing}
                      onTouchEnd={handleStopDrawing}
                      className="w-full h-full cursor-crosshair block bg-transparent"
                    />
                  </div>
                </div>

              </div>

              <div className="flex justify-end pt-2 border-t border-gray-300">
                <button
                  onClick={triggerCashDisbursal}
                  disabled={!hasSigned}
                  className={`font-black text-xs uppercase tracking-widest px-8 py-4 rounded-lg shadow transition-all ${
                    hasSigned
                      ? 'bg-[#F2B124] hover:bg-[#E0A020] text-[#191919] transform hover:-translate-y-0.5'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                >
                  ✓ Disburse Cash (₱{currentAirport.default_refund_amount} PHP)
                </button>
              </div>

            </div>
          )}

          {/* STEP 4: RECEIPT COMPLETED SCREEN */}
          {step === 4 && (
            <div className="p-8 text-center space-y-6 max-w-lg mx-auto animate-scale-up">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                <Icons.CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-black text-gray-900">Transaction Settled Successfully</h3>
                <p className="text-xs text-gray-600 font-mono">Logged by: Agent {currentUser.username} ({currentAirport.terminal_code})</p>
                <p className="text-xs text-gray-700 leading-relaxed max-w-sm mx-auto pt-2">
                  The terminal fee has been physically refunded to the OFW traveler. Signed ledger logs has been synced cleanly to central audit offices.
                </p>
              </div>

              <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-[11px] font-mono space-y-1.5 text-left max-w-sm mx-auto">
                <div className="flex justify-between"><span>Worker Name:</span> <strong className="text-gray-900">{currentOecRecord?.passenger.first_name} {currentOecRecord?.passenger.last_name}</strong></div>
                <div className="flex justify-between"><span>Verified Passport:</span> <strong className="text-gray-900">{currentOecRecord?.passenger.passport_number}</strong></div>
                <div className="flex justify-between"><span>OEC Serial:</span> <strong className="text-gray-900">{currentOecRecord?.oec_number}</strong></div>
                <div className="flex justify-between"><span>Assigned Gate:</span> <strong className="text-gray-900">{currentAirport.terminal_code}</strong></div>
                <div className="flex justify-between border-t border-gray-300 pt-1.5 mt-1.5 text-xs"><span className="font-extrabold text-gray-600">Refund Amount (PHP):</span> <strong className="text-[#F2B124] font-bold">₱{currentAirport.default_refund_amount}.00</strong></div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={resetForm}
                  className="bg-[#F2B124] hover:bg-[#E0A020] text-[#191919] font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg shadow-md transition-colors"
                >
                  Process Next OFW Passenger
                </button>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT SIDEBAR: RECENT ACTIVITY STREAM */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-300 px-5 py-4 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Live Refund Ledger</h4>
                <p className="text-[10px] text-gray-600 mt-0.5">Real-time transacted audit log files</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
              {recentRefundList.map((tx) => (
                <div key={tx.id} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-start gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-gray-900">{tx.passenger_name}</span>
                    </div>
                    
                    <div className="text-[10px] text-gray-700">
                      OEC: <span className="font-mono text-gray-800">{tx.oec_no}</span> • Flight: <span className="font-mono text-gray-800 font-bold">{tx.flight_number}</span>
                    </div>

                    <div className="flex gap-2 text-[9px] text-gray-600 font-mono">
                      <span>{tx.processed_at}</span>
                      <span>•</span>
                      <span>{tx.airport_code}</span>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <strong className="text-xs text-[#F2B124] block">₱{tx.refund_amount}</strong>
                    <span className={`text-[8px] border px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${
                      tx.status === 'completed'
                        ? 'bg-emerald-200 text-emerald-900 border-emerald-400'
                        : 'bg-amber-200 text-amber-900 border-amber-400'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 border-t border-gray-300 p-4 text-center">
              <span className="text-[10px] text-gray-600 italic block font-sans">Postgres Database logs auto-synced with Bagong Pilipinas digital ledger</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

'use client'
import React, { useState, useRef, useEffect } from 'react';

// --- Mock Databases ---
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
    transaction_no: "TXN-2026-9041",
    passenger_name: "Maria Leonora Santos Cruz",
    airport_code: "NAIA-T3",
    refund_amount: 550,
    payout_method: "GCash",
    processed_at: "04:12 PM",
    status: "completed"
  },
  {
    id: 8002,
    transaction_no: "TXN-2026-3102",
    passenger_name: "Alexander G. Bautista",
    airport_code: "NAIA-T3",
    refund_amount: 550,
    payout_method: "Maya",
    processed_at: "03:45 PM",
    status: "completed"
  },
  {
    id: 8003,
    transaction_no: "TXN-2026-3398",
    passenger_name: "Christopher M. Mendoza",
    airport_code: "NAIA-T1",
    refund_amount: 550,
    payout_method: "BDO Unibank",
    processed_at: "03:10 PM",
    status: "completed"
  },
  {
    id: 8004,
    transaction_no: "TXN-2026-7711",
    passenger_name: "Grace Anne L. Cruz",
    airport_code: "MCIA-T2",
    refund_amount: 850,
    payout_method: "GCash",
    processed_at: "02:30 PM",
    status: "completed"
  },
  {
    id: 8005,
    transaction_no: "TXN-2026-0921",
    passenger_name: "Danilo P. Roxas",
    airport_code: "CRK-T1",
    refund_amount: 600,
    payout_method: "Airport Cash Voucher",
    processed_at: "01:55 PM",
    status: "completed"
  }
];

// --- Icons Component ---
interface IconProps {
  className?: string;
}

const Icons = {
  Scan: () => (
    <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 20h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2m-8 0H4a2 2 0 00-2 2v2a2 2 0 002 2h2m10-16h2a2 2 0 012 2v2m-16 0V4a2 2 0 012-2h2" />
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
  CheckCircle: ({ className = "w-6 h-6 text-emerald-500" }: IconProps) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Database: () => (
    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  Wallet: () => (
    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  Upload: () => (
    <svg className="w-10 h-10 text-[#111111] animate-bounce mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  ),
  FileText: () => (
    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
};

interface RefundClaimFormProps {
  showToast: (message: string, type?: 'success' | 'error') => void;
  currentAirport: typeof MOCK_AIRPORTS[0];
}

export default function RefundClaimForm({ showToast, currentAirport }: RefundClaimFormProps) {
  const [step, setStep] = useState(1);
  const [oecInput, setOecInput] = useState("");
  const [passportInput, setPassportInput] = useState("");
  const [currentOecRecord, setCurrentOecRecord] = useState<typeof MOCK_OECS['OEC-2026-9912'] | null>(null);
  const [validationError, setValidationError] = useState("");

  const [oecUploadedFile, setOecUploadedFile] = useState<File | null>(null);
  const [isOecUploading, setIsOecUploading] = useState(false);
  const [oecUploadProgress, setOecUploadProgress] = useState(0);
  const oecFileInputRef = useRef<HTMLInputElement>(null);

  // Step 2 Fields
  const [airlineCode, setAirlineCode] = useState("");
  const [flightNo, setFlightNo] = useState("");
  const [departureDate, setDepartureDate] = useState("2026-05-31");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [ocrSuccess, setOcrSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 3 Fields
  const [payoutMethod, setPayoutMethod] = useState("");
  const [payoutDetails, setPayoutDetails] = useState("");
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  // Live transaction database simulation
  const [recentRefundList, setRecentRefundList] = useState(INITIAL_TRANSACTIONS);

  // Initialize canvas with proper dimensions and context
  useEffect(() => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    // Set canvas dimensions to match container
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Initialize drawing context with white background
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#1e3a8a';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e as React.MouseEvent).clientX !== undefined 
      ? (e as React.MouseEvent).clientX - rect.left 
      : (e as React.TouchEvent).touches[0].clientX - rect.left;
    const y = (e as React.MouseEvent).clientY !== undefined 
      ? (e as React.MouseEvent).clientY - rect.top 
      : (e as React.TouchEvent).touches[0].clientY - rect.top;

    // Scale coordinates to canvas resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    ctx.beginPath();
    ctx.moveTo(x * scaleX, y * scaleY);
    setIsDrawing(true);
  };

  const handleDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e as React.MouseEvent).clientX !== undefined 
      ? (e as React.MouseEvent).clientX - rect.left 
      : (e as React.TouchEvent).touches[0].clientX - rect.left;
    const y = (e as React.MouseEvent).clientY !== undefined 
      ? (e as React.MouseEvent).clientY - rect.top 
      : (e as React.TouchEvent).touches[0].clientY - rect.top;

    // Scale coordinates to canvas resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    ctx.lineTo(x * scaleX, y * scaleY);
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
    
    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const handleOecFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processOecFile(file);
    }
  };

  const processOecFile = (file: File, presetOecCode?: string) => {
    setOecUploadedFile(file);
    setIsOecUploading(true);
    setOecUploadProgress(0);
    setCurrentOecRecord(null);
    setValidationError("");

    const interval = setInterval(() => {
      setOecUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          finishOecProcessing(presetOecCode);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const finishOecProcessing = (presetOecCode?: string) => {
    setIsOecUploading(false);
    
    const targetOecCode = presetOecCode || "OEC-2026-9912";
    const record = MOCK_OECS[targetOecCode as keyof typeof MOCK_OECS];
    
    if (record) {
      setOecInput(record.oec_number);
      setPassportInput(record.passenger.passport_number);
      setCurrentOecRecord(record);
      showToast(`OEC Upload Verified: Registered to ${record.passenger.first_name}`, "success");
    } else {
      setValidationError("Failed to read OEC details. Verify document format.");
      showToast("Verification failed", "error");
    }
  };

  const triggerMockOecUpload = (presetName: string, oecCode: string) => {
    const dummyFile = new File([], `${presetName}_dmw_certificate.png`, { type: "image/png" });
    Object.defineProperty(dummyFile, 'size', { value: 245010 });
    processOecFile(dummyFile, oecCode);
  };

  const handleOecLookup = () => {
    const trimmedOec = oecInput.trim().toUpperCase();
    const trimmedPassport = passportInput.trim().toUpperCase();

    if (!trimmedOec || !trimmedPassport) {
      setValidationError("OEC Number and Passport Number are mandatory fields.");
      return;
    }

    const record = MOCK_OECS[trimmedOec as keyof typeof MOCK_OECS];
    if (record) {
      if (record.passenger.passport_number.toUpperCase() !== trimmedPassport) {
        setValidationError("The Passport Number entered does not match the OEC registration records.");
        setCurrentOecRecord(null);
        showToast("Credential verification mismatch.", "error");
        return;
      }

      setValidationError("");
      setCurrentOecRecord(record);
      
      if (record.status === 'expired') {
        showToast("Claim Denied: This OEC certificate has expired.", "error");
      } else if (record.status === 'used') {
        showToast("Duplicate Block: This OEC rebate has already been processed.", "error");
      } else {
        showToast(`Welcome back, ${record.passenger.first_name}! OEC profile validated.`, "success");
      }
    } else {
      setCurrentOecRecord(null);
      setValidationError(`OEC serial '${trimmedOec}' not found. Please double check values.`);
      showToast("Verification failed.", "error");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);
    setOcrSuccess(false);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          finishFileOCR();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const finishFileOCR = () => {
    setIsUploading(false);
    setOcrSuccess(true);
    setAirlineCode("PR");
    setFlightNo("PR 102");
    setDepartureDate("2026-05-31");
    showToast("OCR analysis complete! Captured Flight PR 102.", "success");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const triggerMockFileUpload = (presetName: string) => {
    const dummyFile = new File([], `${presetName}_boarding_pass.png`, { type: "image/png" });
    Object.defineProperty(dummyFile, 'size', { value: 124010 });
    processSelectedFile(dummyFile);
  };

  const handleFinalClaimSubmit = () => {
    if (!hasSigned) {
      showToast("Please draw your signature to authorize this digital transaction.", "error");
      return;
    }

    if (!payoutMethod || (!payoutDetails && payoutMethod !== 'voucher')) {
      showToast("Please complete your payout information.", "error");
      return;
    }

    const randomTxId = `TXN-2026-${Math.floor(Math.random() * 9000) + 1000}`;
    const newTransaction = {
      id: Date.now(),
      transaction_no: randomTxId,
      passenger_name: `${currentOecRecord!.passenger.first_name} ${currentOecRecord!.passenger.last_name}`,
      airport_code: currentAirport.terminal_code,
      refund_amount: currentAirport.default_refund_amount,
      payout_method: payoutMethod === 'gcash' ? 'GCash' : payoutMethod === 'maya' ? 'Maya' : payoutMethod === 'bank' ? 'Bank Transfer' : 'Airport Cash Voucher',
      processed_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "completed"
    };

    setRecentRefundList([newTransaction, ...recentRefundList.slice(0, 4)]);
    showToast(`Claim processed! ₱${currentAirport.default_refund_amount} PHP transfer initiated.`, "success");
    setStep(4);
  };

  const resetForm = () => {
    setStep(1);
    setOecInput("");
    setPassportInput("");
    setCurrentOecRecord(null);
    setValidationError("");
    setAirlineCode("");
    setFlightNo("");
    setPayoutMethod("");
    setPayoutDetails("");
    setUploadedFile(null);
    setOcrSuccess(false);
    setUploadProgress(0);
    setHasSigned(false);
    setOecUploadedFile(null);
    setOecUploadProgress(0);
    clearSignature();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
      
      {/* QUICK SYSTEM COMPLIANCE SUMMARY */}
      <div className="bg-slate-900 text-slate-300 px-5 py-3 mt-3 rounded-xl border border-[#111111] flex justify-between items-center text-xs select-none">
        <span className="flex items-center gap-2">
          <Icons.Database />
          <span>DB Active Connection: Verified DMW Schema Syncing</span>
        </span>
        <span className="text-amber-400 font-mono text-[10px] hidden md:inline">
          Secure JWT Token Session Active
        </span>
      </div>

      {/* PORTAL INTERACTIVE SEGMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT WORKSPACE: INTERACTIVE TRAVELER WIZARD (8 COLS) */}
        <div className="lg:col-span-8 space-y-6 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* STEP HEADER PROGRESS STAGES */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-extrabold text-[#111111] uppercase tracking-widest block">AeroRefund Self-Service Claim Application</span>
              <span className="text-xs text-slate-500">Filipino Migrant Terminal Fee Reimbursements (R.A. 10173 Protected)</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider">
              <span className={`px-2.5 py-1 rounded transition-all ${step >= 1 ? 'bg-[#111111] text-white' : 'bg-slate-100 text-slate-400'}`}>1. OEC Verify</span>
              <span className="text-slate-300">/</span>
              <span className={`px-2.5 py-1 rounded transition-all ${step >= 2 ? 'bg-[#111111] text-white' : 'bg-slate-100 text-slate-400'}`}>2. File Upload</span>
              <span className="text-slate-300">/</span>
              <span className={`px-2.5 py-1 rounded transition-all ${step >= 3 ? 'bg-[#111111] text-white' : 'bg-slate-100 text-slate-400'}`}>3. Payout & Sign</span>
            </div>
          </div>

          {/* STEP 1: VERIFY TRAVELER Profile */}
          {step === 1 && (
            <div className="p-6 md:p-8 space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Step 1: Authenticate Overseas Employment Certificate</h3>
                <p className="text-xs text-slate-500">To authorize your tax waiver, upload an image or scan of your DMW-issued OEC certificate or enter your details manually.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                
                {/* Simulated OEC Document Upload Zone */}
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file) processOecFile(file);
                  }}
                  onClick={() => oecFileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col justify-between items-center text-center bg-white hover:bg-slate-100 transition-colors cursor-pointer min-h-[260px]"
                >
                  <input 
                    type="file" 
                    ref={oecFileInputRef} 
                    onChange={handleOecFileChange} 
                    accept="image/*,application/pdf"
                    className="hidden" 
                  />

                  <div className="my-auto space-y-2">
                    <div className="flex justify-center">
                      <Icons.Upload />
                    </div>
                    <div className="text-xs font-bold text-blue-950">Upload OEC Image / PDF</div>
                    <div className="text-[11px] text-slate-500">Drag & drop your certificate copy here</div>
                    <div className="text-[10px] text-slate-400">Supports PNG, JPG, or PDF (Max 10MB)</div>
                  </div>

                  {/* PRESETS FOR EASY DEMO TESTING */}
                  <div className="w-full space-y-1 pt-4 border-t border-slate-200" onClick={(e) => e.stopPropagation()}>
                    <span className="text-[9px] text-slate-400 block font-semibold uppercase">Or upload a mock test OEC file:</span>
                    <div className="flex gap-2 justify-center">
                      <button 
                        type="button"
                        onClick={() => triggerMockOecUpload("Santos_Nurse", "OEC-2026-9912")}
                        className="bg-slate-50 border border-slate-200 hover:bg-blue-50 hover:border-blue-300 text-[10px] px-2.5 py-1 rounded text-slate-700 font-mono transition-colors"
                      >
                        Nurse_OEC.png
                      </button>
                      <button 
                        type="button"
                        onClick={() => triggerMockOecUpload("Dimagiba_Engineer", "OEC-2026-4432")}
                        className="bg-slate-50 border border-slate-200 hover:bg-blue-50 hover:border-blue-300 text-[10px] px-2.5 py-1 rounded text-slate-700 font-mono transition-colors"
                      >
                        Engineer_OEC.png
                      </button>
                      <button 
                        type="button"
                        onClick={() => triggerMockOecUpload("Co_Used", "OEC-2026-1188")}
                        className="bg-slate-50 border border-slate-200 hover:bg-red-50 hover:border-red-300 text-[10px] px-2.5 py-1 rounded text-rose-700 font-mono transition-colors"
                      >
                        Used_OEC.png
                      </button>
                    </div>
                  </div>
                </div>

                {/* Manual Credentials form & upload state progress */}
                <div className="space-y-3 flex flex-col justify-between">
                  {/* Upload State UI */}
                  {oecUploadedFile && (
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 space-y-2 animate-scale-up">
                      <div className="flex items-center gap-2">
                        <Icons.FileText />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold text-slate-900 truncate">{oecUploadedFile.name}</p>
                          <p className="text-[9px] text-slate-500 font-mono">
                            {(oecUploadedFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        {!isOecUploading && <Icons.CheckCircle className="w-4 h-4 text-emerald-500" />}
                      </div>

                      {isOecUploading && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] text-[#111111] font-bold">
                            <span>Uploading and Processing OEC OCR...</span>
                            <span>{oecUploadProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                            <div className="bg-[#111111] h-full transition-all duration-200" style={{ width: `${oecUploadProgress}%` }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">OEC Serial Number</label>
                      <input
                        type="text"
                        placeholder="e.g. OEC-2026-9912"
                        value={oecInput}
                        onChange={(e) => setOecInput(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none uppercase font-mono tracking-wider text-xs"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">Passport Number</label>
                      <input
                        type="text"
                        placeholder="e.g. P8872162B"
                        value={passportInput}
                        onChange={(e) => setPassportInput(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none uppercase font-mono tracking-wider text-xs"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleOecLookup}
                    className="w-full bg-[#111111] hover:bg-slate-950 text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors mt-2"
                  >
                    Authenticate Credentials
                  </button>
                </div>

              </div>

              {/* Error messages */}
              {validationError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex items-start gap-3 animate-fade-in">
                  <span className="p-1 bg-rose-100 rounded-full text-rose-600">
                    <Icons.Alert />
                  </span>
                  <div className="text-xs">
                    <strong className="block font-bold">Verification Issue</strong>
                    <span>{validationError}</span>
                  </div>
                </div>
              )}

              {/* Retrieved Traveler Details */}
              {currentOecRecord && (
                <div className={`border rounded-xl p-6 space-y-4 animate-scale-up ${
                  currentOecRecord.status === 'active'
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-rose-50/40 border-rose-200'
                }`}>
                  <div className="flex flex-wrap justify-between items-start gap-4 pb-3 border-b border-dashed border-slate-200">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-slate-400 block">DMW ID REFERENCE: {currentOecRecord.passenger.id}</span>
                      <h4 className="text-lg font-black text-slate-950">
                        {currentOecRecord.passenger.last_name}, {currentOecRecord.passenger.first_name}
                      </h4>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        Passport: {currentOecRecord.passenger.passport_number} • Birth Date: {currentOecRecord.passenger.birth_date}
                      </p>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      currentOecRecord.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : 'bg-rose-100 text-rose-800 border-rose-200'
                    }`}>
                      OEC Status: {currentOecRecord.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Position & Employer</span>
                      <strong className="text-[#111111]">{currentOecRecord.job_position}</strong>
                      <span className="text-slate-500 text-[10px] block">{currentOecRecord.employer_name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Site Location</span>
                      <strong className="text-[#111111] block">{currentOecRecord.job_site}</strong>
                      <span className="text-slate-500 text-[10px]">Contract Ends: {currentOecRecord.expiry_date.split('T')[0]}</span>
                    </div>
                  </div>

                  {currentOecRecord.status === 'active' ? (
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => setStep(2)}
                        className="bg-[#111111] hover:bg-blue-950 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg shadow-md flex items-center gap-1.5 transition-colors"
                      >
                        <span>Continue to File Upload</span>
                        <Icons.ArrowRight />
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 bg-rose-50 border border-rose-100 text-rose-800 rounded-lg text-xs">
                      <span>⚠️ <strong>Refund Restriction:</strong> Your OEC profile status prevents online claims. Contact central DMW desks for physical terminal adjustment.</span>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* STEP 2: BOARDING PASS UPLOAD & CAPTURE */}
          {step === 2 && (
            <div className="p-6 md:p-8 space-y-6 animate-fade-in">
              <div className="flex justify-between items-center gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">Step 2: Upload Your Boarding Pass Document</h3>
                  <p className="text-xs text-slate-500">Provide departure details to tie your refund claim to a verified exit boarding card log.</p>
                </div>
                <button onClick={() => setStep(1)} className="text-slate-500 hover:text-[#111111] text-xs font-bold">
                  ← Back
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Upload Zone */}
                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col justify-between items-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer min-h-[300px]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*,application/pdf"
                    className="hidden" 
                  />

                  <div className="my-auto space-y-2">
                    <div className="flex justify-center">
                      <Icons.Upload />
                    </div>
                    <div className="text-xs font-bold text-blue-950">Drag & drop your boarding pass here</div>
                    <div className="text-[11px] text-slate-500">Supports PDF, JPG, PNG or camera photos</div>
                    <div className="text-[10px] text-slate-400">File size maximum: 10MB</div>
                  </div>

                  {/* PRESETS FOR EASY DEMO TESTING */}
                  <div className="w-full space-y-1 pt-4 border-t border-slate-200">
                    <span className="text-[9px] text-slate-400 block font-semibold uppercase">Or select a mock file template:</span>
                    <div className="flex gap-2 justify-center">
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); triggerMockFileUpload("PAL_PR102"); }}
                        className="bg-white border border-slate-200 hover:bg-blue-50 text-[10px] px-2 py-1 rounded text-slate-700 font-mono"
                      >
                        PR-102.png
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); triggerMockFileUpload("CebuPacific_5J803"); }}
                        className="bg-white border border-slate-200 hover:bg-blue-50 text-[10px] px-2 py-1 rounded text-slate-700 font-mono"
                      >
                        5J-803.pdf
                      </button>
                    </div>
                  </div>
                </div>

                {/* Upload Status & OCR Output Form */}
                <div className="space-y-4">
                  {uploadedFile && (
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 space-y-3">
                      <div className="flex items-center gap-3">
                        <Icons.FileText />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">{uploadedFile.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">
                            {(uploadedFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        {ocrSuccess && <Icons.CheckCircle className="w-5 h-5 text-emerald-500" />}
                      </div>

                      {/* Interactive Progress Indicators */}
                      {isUploading && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-[#111111] font-bold">
                            <span>Uploading and Processing AI OCR...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#111111] h-full transition-all duration-200" style={{ width: `${uploadProgress}%` }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">Airline Carrier</label>
                    <select
                      value={airlineCode}
                      onChange={(e) => setAirlineCode(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-xs text-[#111111] font-mono"
                    >
                      <option value="">-- Choose Airline --</option>
                      {MOCK_AIRLINES.map(line => (
                        <option key={line.code} value={line.code}>{line.name} ({line.code})</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">Flight Number</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. PR-102"
                        value={flightNo}
                        onChange={(e) => setFlightNo(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-xs font-mono uppercase tracking-widest"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">Departure Date</label>
                      <input
                        required
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">Assigned Exit Terminal</label>
                    <div className="bg-slate-100 px-4 py-3 rounded-lg text-xs text-slate-700 border border-slate-200">
                      Refund Context Airport: <strong>{currentAirport.name} ({currentAirport.terminal_code})</strong>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        if (!airlineCode || !flightNo) {
                          showToast("Airline code and Flight specifications are mandatory fields.", "error");
                          return;
                        }
                        setStep(3);
                      }}
                      className="w-full bg-[#111111] hover:bg-blue-950 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Proceed to Payment Setup</span>
                      <Icons.ArrowRight />
                    </button>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* STEP 3: PAYOUT SELECTION & SIGNATURE */}
          {step === 3 && (
            <div className="p-6 md:p-8 space-y-6 animate-fade-in">
              <div className="flex justify-between items-center gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">Step 3: Setup Refund Payout & Authorize</h3>
                  <p className="text-xs text-slate-500">Choose your electronic disbursement details. Sign below to securely submit your terminal fee waiver.</p>
                </div>
                <button onClick={() => setStep(2)} className="text-slate-500 hover:text-[#111111] text-xs font-bold">
                  ← Back
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* Payment Configuration */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Choose Payout Method <span className="text-rose-600">*</span></span>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <button
                      onClick={() => { setPayoutMethod("gcash"); setPayoutDetails(""); }}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${payoutMethod === 'gcash' ? 'border-[#111111] bg-blue-50 text-blue-950' : 'bg-white border-slate-200 hover:bg-slate-100'}`}
                    >
                      <Icons.Wallet />
                      <span>GCash Wallet</span>
                    </button>
                    <button
                      onClick={() => { setPayoutMethod("maya"); setPayoutDetails(""); }}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${payoutMethod === 'maya' ? 'border-[#111111] bg-blue-50 text-blue-950' : 'bg-white border-slate-200 hover:bg-slate-100'}`}
                    >
                      <Icons.Wallet />
                      <span>Maya Wallet</span>
                    </button>
                    <button
                      onClick={() => { setPayoutMethod("bank"); setPayoutDetails(""); }}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${payoutMethod === 'bank' ? 'border-[#111111] bg-blue-50 text-blue-950' : 'bg-white border-slate-200 hover:bg-slate-100'}`}
                    >
                      <Icons.Database />
                      <span>Bank Transfer</span>
                    </button>
                    <button
                      onClick={() => { setPayoutMethod("voucher"); setPayoutDetails("Claim at Gate"); }}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${payoutMethod === 'voucher' ? 'border-[#111111] bg-blue-50 text-blue-950' : 'bg-white border-slate-200 hover:bg-slate-100'}`}
                    >
                      <Icons.Scan />
                      <span>Cash Voucher</span>
                    </button>
                  </div>

                  {/* Input Payout parameters */}
                  {payoutMethod && payoutMethod !== 'voucher' && (
                    <div className="space-y-2 animate-scale-up">
                      <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600">
                        {payoutMethod === 'bank' ? "Bank Name & Account Number" : "Mobile Wallet Number"} <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder={payoutMethod === 'bank' ? "e.g. BDO Unibank - 1029412948" : "e.g. 0917 123 4567"}
                        value={payoutDetails}
                        onChange={(e) => setPayoutDetails(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                      />
                    </div>
                  )}

                  <div className="p-4 bg-amber-500/10 border border-amber-300 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-amber-800 font-black block uppercase">Refund Waiver Credit</span>
                      <strong className="text-2xl font-black text-slate-950 font-mono">₱{currentAirport.default_refund_amount}.00 PHP</strong>
                    </div>
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-2.5 py-1.5 rounded uppercase font-bold tracking-wider">No Fees</span>
                  </div>
                </div>

                {/* Draw Signature block */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-slate-600 flex items-center gap-1.5">
                      <Icons.Signature />
                      <span>Traveler Signature Verification <span className="text-rose-600">*</span></span>
                    </span>
                    <button type="button" onClick={clearSignature} className="text-[10px] text-rose-600 hover:text-rose-800 font-bold uppercase">
                      Clear
                    </button>
                  </div>

                  <div className="border-2 border-slate-300 bg-white rounded-xl h-[170px] w-full overflow-hidden relative shadow-inner">
                    {!hasSigned && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-center pointer-events-none p-4 bg-slate-50 z-10">
                        <span className="text-xs font-bold">DRAW YOUR SIGNATURE</span>
                        <span className="text-[9px] mt-0.5">Left-click and drag or draw with touchscreen fingers</span>
                      </div>
                    )}

                    <canvas
                      ref={signatureCanvasRef}
                      onMouseDown={handleStartDraw}
                      onMouseMove={handleDrawing}
                      onMouseUp={handleStopDrawing}
                      onMouseLeave={handleStopDrawing}
                      onTouchStart={handleStartDraw}
                      onTouchMove={handleDrawing}
                      onTouchEnd={handleStopDrawing}
                      className="absolute inset-0 w-full h-full cursor-crosshair block"
                    />
                  </div>

                  {!hasSigned && (
                    <p className="text-[10px] text-rose-600 font-semibold">Required: Please sign to authorize this claim</p>
                  )}
                </div>

              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button
                  onClick={handleFinalClaimSubmit}
                  disabled={!hasSigned || !payoutMethod}
                  className={`font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow transition-all ${
                    hasSigned && payoutMethod
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white transform hover:-translate-y-0.5'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  ✓ Submit Refund Claim (₱{currentAirport.default_refund_amount} PHP)
                </button>
              </div>

            </div>
          )}

          {/* STEP 4: RECEIPT COMPLETED SCREEN */}
          {step === 4 && (
            <div className="p-8 text-center space-y-6 max-w-lg mx-auto animate-scale-up">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                <Icons.CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-black text-slate-900">Refund Claim Processing</h3>
                <p className="text-xs text-slate-500 font-mono">Terminal Exit Gateway: {currentAirport.terminal_code}</p>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto pt-2">
                  Your claim has been authenticated and successfully transmitted back to DB ledgers. Digital payouts disburse securely within standard service SLA frameworks.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-[11px] font-mono space-y-1.5 text-left max-w-sm mx-auto">
                <div className="flex justify-between"><span>Passenger:</span> <strong className="text-[#111111]">{currentOecRecord?.passenger.first_name} {currentOecRecord?.passenger.last_name}</strong></div>
                <div className="flex justify-between"><span>Passport Number:</span> <strong className="text-[#111111]">{currentOecRecord?.passenger.passport_number}</strong></div>
                <div className="flex justify-between"><span>Payout Destination:</span> <strong className="text-[#111111]">{payoutMethod.toUpperCase()}</strong></div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5 mt-1.5 text-xs"><span className="font-extrabold text-slate-700">Disbursement Amount:</span> <strong className="text-emerald-600 font-bold">₱{currentAirport.default_refund_amount}.00</strong></div>
              </div>

              {payoutMethod === 'voucher' && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-left text-xs text-yellow-800 max-w-sm mx-auto">
                  <strong className="block mb-1">🎫 Present at Counter</strong>
                  Present this self-service confirmation screen or your passport details to any airport passenger counter to collect your ₱{currentAirport.default_refund_amount} PHP physical cash payout instantly.
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={resetForm}
                  className="bg-[#111111] hover:bg-blue-950 text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg shadow-md transition-colors"
                >
                  File Another OFW Refund
                </button>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT SIDEBAR: RECENT DISBURSEMENT STREAM (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">Live Claims Feed</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Real-time successful traveler disbursements</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
              {recentRefundList.map((tx) => (
                <div key={tx.id} className="p-4 hover:bg-slate-50 transition-colors flex justify-between items-start gap-3">
                  <div className="space-y-1 animate-scale-up">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-[#111111]">{tx.passenger_name}</span>
                    </div>
                    
                    <div className="text-[10px] text-slate-500">
                      Receipt Code: <span className="font-mono text-slate-700">{tx.transaction_no}</span>
                    </div>

                    <div className="flex gap-2 text-[9px] text-slate-400 font-mono">
                      <span>{tx.processed_at}</span>
                      <span>•</span>
                      <span>{tx.airport_code}</span>
                      <span>•</span>
                      <span className="text-blue-600 font-semibold">{tx.payout_method}</span>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <strong className="text-xs text-emerald-600 block">₱{tx.refund_amount}</strong>
                    <span className="text-[8px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 border-t border-slate-200 p-4 text-center">
              <span className="text-[10px] text-slate-500 italic block font-sans">Encryption protected under R.A. 10173 Data Privacy Act guidelines</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

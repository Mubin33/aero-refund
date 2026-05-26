'use client';

import Image from 'next/image';

const legacyPoints = [
  'Handwritten Paper filled out by agents, frequent spelling and passport number mismatches.',
  'No live DMW validation; agents must rely on visual verification of paper OEC certificates.',
  'Risk of double claims with the same OEC across different airline ticket offices.',
  'Physical paper archives must be consolidated for monthly COA audit reconciliation.',
];

const digitalPoints = [
  '1-Click OEC Scan immediately loads passenger profiles from central records.',
  'Integrated OCR camera decodes boarding pass specifications instantly.',
  'Transactions are strictly back to refund, transactions to lock duplicate reference numbers.',
  'Secure digital signature ledger exports as audit-ready logs for the government.',
];

export default function WorkflowComparisonSection() {
  return (
    <section className="bg-[#FDF8EE] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <header className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            From Paper-Based Claims to Real-Time Digital Validation
          </h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            Transform outdated paper-based reimbursement processes into a secure,
            audit-ready digital workflow powered by real-time passenger verification.
          </p>
        </header>

        {/* Row 1 — Legacy workflow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-16">

          {/* Text left */}
          <article>
            <h3 className="text-[17px] font-bold text-gray-900 mb-5">
              The Legacy Hand-Signed Workflow
            </h3>
            <ul className="space-y-3.5">
              {legacyPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-[13.5px] text-gray-600 leading-relaxed"
                >
                  {/* Red bullet dot */}
                  <span className="mt-[6px] w-[7px] h-[7px] rounded-full bg-red-400 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </article>

          {/* Image right */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/1.jpg"
              alt="Close-up of handwritten paper forms being hand-signed by an agent"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Row 2 — Digital method (reversed on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Image left (visually first on desktop, stacked second on mobile) */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md order-2 md:order-1">
            <Image
              src="/2.png"
              alt="Smartphone interacting with a digital airport terminal validator"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text right */}
          <article className="order-1 md:order-2">
            <h3 className="text-[17px] font-bold text-gray-900 mb-5">
              The AeroRefund Pro Database Method
            </h3>
            <ul className="space-y-3.5">
              {digitalPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-[13.5px] text-gray-600 leading-relaxed"
                >
                  {/* Green bullet dot */}
                  <span className="mt-[6px] w-[7px] h-[7px] rounded-full bg-green-500 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </div>

      </div>
    </section>
  );
}
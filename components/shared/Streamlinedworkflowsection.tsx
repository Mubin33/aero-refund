'use client';

import Image from 'next/image';
import Link from 'next/link';
import { UserCheck, ShieldAlert, CheckCircle, FileText, Send } from 'lucide-react';

const steps = [
  {
    icon: UserCheck,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
    labelColor: 'text-blue-500',
    label: 'Passenger Claim',
    desc: 'Passenger submits terminal fee reimbursement request.',
  },
  {
    icon: FileText,
    iconColor: 'text-gray-600',
    iconBg: 'bg-gray-100',
    labelColor: 'text-gray-700',
    label: 'Verification',
    desc: 'System validates passenger data in real-time with DMW.',
  },
  {
    icon: ShieldAlert,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50',
    labelColor: 'text-amber-500',
    label: 'Duplicate Check',
    desc: 'AI scans for duplicates and suspicious activity.',
  },
  {
    icon: CheckCircle,
    iconColor: 'text-violet-500',
    iconBg: 'bg-violet-50',
    labelColor: 'text-violet-500',
    label: 'Approval',
    desc: 'Authorized personnel reviews and approves the claim.',
  },
  {
    icon: Send,
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-50',
    labelColor: 'text-gray-900',
    label: 'Refund Released',
    desc: 'Approved refund is processed and recorded in the system.',
  },
] as const;

export default function StreamlinedWorkflowSection() {
  return (
    <>
      {/* ── Workflow Steps ── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-3">
              Streamlined Workflow
            </h2>
            <p className="text-gray-400 text-[15px]">
              From passenger claim to reimbursement — automated, secure, and audit-ready
            </p>
          </div>

          {/* 5-step process grid */}
          <ol className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-12 text-center">
            {steps.map(({ icon: Icon, iconColor, iconBg, labelColor, label, desc }) => (
              <li key={label} className="flex flex-col items-center gap-3">
                {/* Icon capsule */}
                <span
                  className={`flex items-center justify-center w-14 h-14 rounded-full ${iconBg}`}
                >
                  <Icon size={26} className={iconColor} />
                </span>
                {/* Label */}
                <p className={`text-[13px] font-bold ${labelColor} leading-tight`}>
                  {label}
                </p>
                {/* Desc */}
                <p className="text-[11.5px] text-gray-400 leading-snug max-w-[130px] mx-auto">
                  {desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-white pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ backgroundColor: '#F9C043' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[280px]">

              {/* Left: text + CTA */}
              <div className="relative z-10 flex flex-col justify-center px-8 py-10 md:px-12">
                <h3 className="text-[28px] sm:text-[32px] font-extrabold text-gray-900 leading-tight mb-3 max-w-xs">
                  Ready to Modernize Airport Refund Operations?
                </h3>
                <p className="text-gray-800/70 text-sm leading-relaxed mb-7 max-w-[320px]">
                  Book a live technical walkthrough with our compliance team and see
                  AeroRefund Pro in action.
                </p>
                <div>
                  <Link
                    href="/contact"
                    className="inline-block bg-gray-900 text-white text-sm font-semibold px-7 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Schedule Demo
                  </Link>
                </div>
              </div>

              {/* Right: image */}
              <div className="relative hidden md:block">
                <div className="absolute inset-4 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/cta.png"
                    alt="Modern glass airport terminal hallway with passengers"
                    fill
                    className="object-cover object-center"
                    sizes="50vw"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
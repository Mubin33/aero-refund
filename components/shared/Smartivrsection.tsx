'use client';

import Image from 'next/image';
import { Phone, Globe, RefreshCw, ShieldCheck, Clock } from 'lucide-react';

const features = [
  {
    icon: Globe,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
    label: 'Multi Language Support',
    desc: 'Filipino, English, & More',
  },
  {
    icon: RefreshCw,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-50',
    label: 'Smart Call Routing',
    desc: 'Directs calls to the right department',
  },
  {
    icon: ShieldCheck,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-50',
    label: 'Secure Verification',
    desc: 'Validation identity via OTP & DMW sync',
  },
  {
    icon: Clock,
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-50',
    label: 'Real-time Updates',
    desc: 'Instant status and claim information',
  },
] as const;

export default function SmartIVRSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left column */}
          <article>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug mb-3">
              Smart IVR for 24/7
              <br />
              Passenger Support
            </h2>

            <p className="text-gray-400 text-[15px] leading-relaxed mb-8">
              Passenger can check eligibility, claim status, and get assistance
              anytime through our intelligent IVR system.
            </p>

            {/* Hotline block */}
            <div className="bg-[#051329] rounded-xl px-5 py-4 flex items-center gap-4 mb-9">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-yellow-400/15 shrink-0">
                <Phone size={18} className="text-yellow-400" />
              </span>
              <div>
                <p className="text-gray-400 text-[11px] tracking-widest uppercase mb-0.5">
                  Call AeroRefund IVR
                </p>
                <p className="text-yellow-400 font-bold text-[22px] tracking-wide leading-none">
                  (02) 8845 – REFUND
                </p>
              </div>
            </div>

            {/* 2x2 feature grid */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map(({ icon: Icon, iconColor, iconBg, label, desc }) => (
                <li key={label} className="flex items-start gap-3">
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${iconBg} shrink-0`}
                  >
                    <Icon size={19} className={iconColor} />
                  </span>
                  <div>
                    <p className="text-[13.5px] font-semibold text-gray-800 leading-tight">
                      {label}
                    </p>
                    <p className="text-[12px] text-gray-400 mt-0.5 leading-snug">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          {/* Right column: image panel */}
          <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg">
            <Image
              src="/ivr-bg.png"
              alt="Futuristic AI robot agent with headset operating a white desktop computer"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
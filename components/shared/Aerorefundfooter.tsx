'use client';

import { useState } from 'react';
import Link from 'next/link'; 

const productLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Live Verification', href: '/live-verification' },
  { label: 'Fraud Detection', href: '/fraud-detection' },
  { label: 'IVR Integration', href: '/ivr-integration' },
  { label: 'Agent Dashboard', href: '/agent-dashboard' },
];

const developerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact Sales', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

const socialLinks = [
  { icon: "Facebook", label: 'Facebook', href: 'https://facebook.com' },
  { icon: "Twitter", label: 'X / Twitter', href: 'https://twitter.com' },
  { icon: "Instagram", label: 'Instagram', href: 'https://instagram.com' },
];

export default function AeroRefundFooter() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-[#111111]">
      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto pt-16 pb-12 px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
           <img src="/logo.png" alt="AeroRefund Logo" className="h-12 w-auto" />
          </Link>

            <p className="text-white font-bold text-[18px] leading-snug mb-3">
              Secure. Compliant. Built for
              <br />
              Modern Airport Operations.
            </p>

            <p className="text-white/40 text-[13px] leading-relaxed max-w-xs">
              AeroRefund Pro provides airports, airlines, and government-linked
              service operators with a secure digital infrastructure for
              reimbursement validation, fraud prevention, IVR support, and
              audit-ready compliance workflows.
            </p>
          </div>

          {/* Col 2 — Product */}
          <div>
            <h4 className="text-white text-[14px] font-bold mb-5 tracking-wide">
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/50 text-[13.5px] hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Developers */}
          <div>
            <h4 className="text-white text-[14px] font-bold mb-5 tracking-wide">
              Developers
            </h4>
            <ul className="space-y-3">
              {developerLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/50 text-[13.5px] hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Subscribe */}
          <div>
            <h4 className="text-white text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
              Subscribe
            </h4>

            {/* Email input row */}
            <div className="flex items-center rounded-xl overflow-hidden bg-white/10 p-1 mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 bg-transparent text-white placeholder-white/30 text-[13px] px-3 py-2 outline-none min-w-0"
              />
              <button
                type="button"
                onClick={() => setEmail('')}
                className="bg-[#F9C043] text-gray-900 text-[11.5px] font-bold tracking-widest uppercase px-4 py-2.5 rounded-lg hover:bg-yellow-400 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </div>

            <p className="text-white/35 text-[12px]">
              Subscribe to get all the updates.
            </p>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-center gap-7">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/40 hover:text-white transition-colors"
            >
              {/* <Icon size={20} /> */}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
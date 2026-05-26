import React from 'react';
import { UserCheck, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

interface FeatureCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconBg: string;
  iconColor: string;
}

const features: FeatureCard[] = [
  {
    id: 1,
    title: "Duplicate Claim Prevention",
    description: "AI-powered duplicate detection prevents overpayments and fraudulent reimbursements",
    icon: <ShieldAlert className="w-5 h-5" />,
    bgColor: "bg-[#FFFBF0]", // soft warm/yellow tint
    iconBg: "bg-[#FFF2CD]",
    iconColor: "text-[#D99A26]"
  },
  {
    id: 2,
    title: "Real-time Passenger Verification",
    description: "Integrated with DMW database for instant passenger validation and eligibility checks.",
    icon: <UserCheck className="w-5 h-5" />,
    bgColor: "bg-[#F8F6FC]", // soft purple tint
    iconBg: "bg-[#EDE7F6]",
    iconColor: "text-[#673AB7]"
  },
  {
    id: 3,
    title: "Paperless Signature Pad",
    description: "Integrated vector signature canvas eliminates paper slip prints, archiving directly to cloud document paths.",
    icon: <FileText className="w-5 h-5" />,
    bgColor: "bg-[#F4F9FF]", // soft blue tint
    iconBg: "bg-[#E1F0FF]",
    iconColor: "text-[#1877F2]"
  },
  {
    id: 4,
    title: "Automated Audit Exports",
    description: "One Click data downloads matching Philippine COA guidelines and structural spreadsheet records.",
    icon: <CheckCircle2 className="w-5 h-5" />,
    bgColor: "bg-[#F3FAF7]", // soft green tint
    iconBg: "bg-[#E1F5FE]", // Note: Adjusted to match a soft mint/green tint
    iconColor: "text-[#00B67A]"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto font-sans">
      {/* Header Grid Section */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl md:text-[40px] font-bold text-[#111827] tracking-tight leading-tight mb-4">
          Powerful Features for Modern Airport Operations
        </h2>
        <p className="text-sm md:text-base text-gray-500 font-medium tracking-wide">
          Built to run cleanly at critical ticket checkpoints, passport controls, and customer-service desks.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`${feature.bgColor} rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:shadow-sm`}
          >
            <div>
              {/* Icon Container */}
              <div className={`${feature.iconBg} ${feature.iconColor} w-10 h-10 rounded-lg flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold text-[#111827] mb-3">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-500 font-normal leading-relaxed max-w-[90%]">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
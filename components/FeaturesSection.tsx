

 const features = [
  {
    title: "Duplicate Claim Prevention",
    description: "AI-powered duplicate detection prevents overpayments and fraudulent reimbursements",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 21C18 18.8783 17.1571 16.8434 15.6569 15.3431C14.1566 13.8429 12.1217 13 10 13C7.87827 13 5.84344 13.8429 4.34315 15.3431C2.84285 16.8434 2 18.8783 2 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 13C12.7614 13 15 10.7614 15 8C15 5.23858 12.7614 3 10 3C7.23858 3 5 5.23858 5 8C5 10.7614 7.23858 13 10 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 20C22 16.63 20 13.5 18 12C18.6574 11.5068 19.1831 10.8591 19.5306 10.1143C19.878 9.36946 20.0365 8.55048 19.992 7.72981C19.9475 6.90914 19.7014 6.1121 19.2755 5.40921C18.8495 4.70633 18.2569 4.11927 17.55 3.70001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bg: "bg-[#FEFBF4]",
    iconBg: "bg-[#F2B1241A]",
    iconColor: "text-[#D9A11A]",
  },
  {
    title: "Real-time Passenger Verification",
    description: "Integrated with DMV database for instant passenger validation and eligibility checks.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V7C2 5.89543 2.89543 5 4 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 14h2M16 10h2M6 14c0-1.1.9-2 2-2s2 .9 2 2M8 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bg: "bg-[#F3EEF9]",
    iconBg: "bg-[#E3D7F8]",
    iconColor: "text-[#6D4AE5]",
  },
  {
    title: "Paperless Signature Pad",
    description: "Integrated vector signature canvas eliminates paper slip prints, archiving directly to cloud document paths.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 9H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bg: "bg-[#EAF2FD]",
    iconBg: "bg-[#D7E7FD]",
    iconColor: "text-[#2D7EF7]",
  },
  {
    title: "Automated Audit Exports",
    description: "One Click data downloads matching Philippine COA guidelines and structural spreadsheet records.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bg: "bg-[#EDF8F2]",
    iconBg: "bg-[#D8F3E3]",
    iconColor: "text-[#22B573]",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-[#FAFAFA] py-10 md:py-20">
      <div className="mx-auto px-4 max-w-[1400px]">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-[28px] md:text-5xl font-bold tracking-tight ">
            Powerful Features for Modern Airport Operations
          </h2>

          <p className="mt-4 text-sm md:text-base text-[#19191999]">
            Built to run cleanly at critical ticket checkpoints,
            passport controls, and customer-service desks.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature, index) => {
           

            return (
              <div
                key={index}
                className={`${feature.bg} rounded-[24px] p-6 md:p-8 min-h-[220px] transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Icon */}
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.iconBg}`}
                >
                {feature.icon}
                </div>

                {/* Content */}
                <div className="mt-14">
                  <h3 className="text-xl font-bold text-[#222222]">
                    {feature.title}
                  </h3>

                  <p className="mt-4 max-w-[500px] text-sm leading-7 text-[#7B7B7B]">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
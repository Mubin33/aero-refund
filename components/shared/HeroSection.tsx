import { Car, Bot } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; 
import FloatingChatWidget from "./FloatingChatWidget";

export function HeroSection() {
  return (
    <section className="relative z-10 flex flex-1 items-center py-10 lg:py-16">
      <div className="mx-auto grid max-w-[1400px] w-[90%] items-center gap-12 lg:grid-cols-12">
        {/* Left Column - Hero Content */}
        <div className="space-y-6 lg:col-span-7 text-left">
          <h1 className="text-3xl md:text-4xl xl:text-[56px] font-bold tracking-tight text-white leading-[1.15] ">
           Eliminate Manual <br /> Terminal Fee Claims.  <br />
           <span className="text-[#F2B124]">

Detect Duplicate Refunds Instantly.
           </span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-white/80 font-medium ">
            Replace spreadsheets, paper forms, and slow manual verification with a secure digital reimbursement platform designed for Philippine airport operations.
          </p>

        
            <button  
              className="h-12 rounded-lg px-5 bg-[#F2B124] hover:bg-[#b37700] font-bold hover:scale-105 transition-colors text-[#191919]! gap-2"
            >
              <Link href="/form">
                Refund
              </Link>
            </button>
           
      
        </div>

       
      </div>

  {/* <FloatingChatWidget/> */}
    </section>
  );
}

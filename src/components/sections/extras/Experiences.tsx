"use client";

import React, { useState, useMemo } from "react";
import {
  EXPERIENCE_DATA,
  EXPERIENCE_CATEGORIES,
  type ExperienceCategory,
} from "@/data/experienceData";

export default function ExperiencesSection() {
  const [activeTab, setActiveTab] = useState<ExperienceCategory>("Work");

  const filteredData = useMemo(() => {
    return EXPERIENCE_DATA.filter((item) => item.category === activeTab);
  }, [activeTab]);

  return (
    <section
      id="experiences"
      className="relative isolate z-0 py-16 md:py-20"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        
        {/* HEADER */}
        <header className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#e6dccb] pb-6">
          <div>
            <h2 className="font-serif text-[clamp(24px,4vw,32px)] text-black">
              My Journey
            </h2>
            <p className="mt-2 text-[clamp(13px,2.6vw,15px)] text-black/70 max-w-xl">
              Professional roles, teaching engagements, organizational leadership, and research projects.
            </p>
          </div>
        </header>

        {/* TAB SWITCHER */}
        <div
          className="
            mb-8 flex gap-2 overflow-x-auto
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
          "
          role="tablist"
          aria-label="Experience categories"
        >
          {EXPERIENCE_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                aria-pressed={isActive}
                className={[
                  "text-[clamp(12px,2.6vw,14px)]",
                  "px-[clamp(12px,2.4vw,16px)]",
                  "py-[clamp(6px,1.6vw,8px)]",
                  "rounded-full border transition whitespace-nowrap",
                  isActive
                    ? "border-[#5f3d24] bg-[#5f3d24] text-[#f8e6c9] shadow"
                    : "border-[#e6dccb] bg-white text-[#5f3d24] hover:bg-[#f4efe6]",
                ].join(" ")}
              >
                {cat} Experience
              </button>
            );
          })}
        </div>

        {/* GRID */}
        {filteredData.length === 0 ? (
          <p className="rounded-md border border-dashed border-[#decfb6] bg-[#fffdf8] p-6 text-sm text-[#6b6256] text-center">
            Belum ada data untuk kategori ini.
          </p>
        ) : (
          <div
            className="
              grid grid-cols-1 gap-4         
              sm:grid-cols-2 lg:grid-cols-3 sm:gap-6          
            "
          >
            {filteredData.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e6dccb] bg-[#faf8f3] p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <header className="mb-4">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-[#5f3d24] leading-tight">
                      {item.title}
                    </h3>
                    <span className="shrink-0 rounded-full bg-[#f4efe6] px-2.5 py-1 text-[10px] font-medium text-[#7a6f62] border border-[#e6dccb]">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#7a6f62]">
                    {item.subtitle}
                  </p>
                </header>

                <div className="flex-grow space-y-4">
                  {item.description && (
                    <p className="text-sm text-[#4a4238] leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {item.responsibilities && item.responsibilities.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#9a8f7e] mb-1.5">
                        Responsibilities
                      </h4>
                      <ul className="list-disc pl-4 text-sm text-[#4a4238] space-y-1">
                        {item.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.achievements && item.achievements.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#9a8f7e] mb-1.5">
                        Key Achievements
                      </h4>
                      <ul className="list-disc pl-4 text-sm text-[#4a4238] space-y-1">
                        {item.achievements.map((ach, i) => (
                          <li key={i}>{ach}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.requirements && item.requirements.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#9a8f7e] mb-1.5">
                        Requirements
                      </h4>
                      <ul className="list-disc pl-4 text-sm text-[#4a4238] space-y-1">
                        {item.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {item.skills && item.skills.length > 0 && (
                  <footer className="mt-5 pt-4 border-t border-[#e6dccb]/50">
                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((skill, i) => (
                         <span 
                           key={i}
                           className="inline-flex rounded-md bg-[#4c3e1f]/10 px-2 py-1 text-[11px] font-medium text-[#4c3e1f]"
                         >
                           {skill}
                         </span>
                      ))}
                    </div>
                  </footer>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

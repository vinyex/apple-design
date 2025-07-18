"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, GitBranch, Code, Package } from "lucide-react"
import { slsaData } from "@/data/slsa-data"
import InteractiveSLSADiagram from "./interactive-slsa-diagram"

export default function SLSAThreatsEnhanced() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<"source" | "build" | "dependencies">("source")

  const handleCategoryClick = (id: string) => {
    setSelectedCategory(selectedCategory === id ? null : id)
  }

  return (
    <div className="space-y-8">
      {/* Interactive SLSA Diagram */}
      <InteractiveSLSADiagram
        activeCategory={activeSection}
        selectedThreat={selectedCategory}
        onCategoryChange={setActiveSection}
        onThreatSelect={handleCategoryClick}
      />

      {/* Section description */}
      <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-3">
          {activeSection === "source" ? (
            <Code className="h-5 w-5 text-[#8220FF]" />
          ) : activeSection === "build" ? (
            <GitBranch className="h-5 w-5 text-[#8220FF]" />
          ) : (
            <Package className="h-5 w-5 text-[#8220FF]" />
          )}
          <h3 className="text-lg font-medium text-[#1d1d1f] dark:text-white">
            {activeSection === "source"
              ? "Source Threats"
              : activeSection === "build"
                ? "Build Threats"
                : "Dependencies Threats"}
          </h3>
        </div>
        <p className="text-sm text-[#86868b] dark:text-[#a1a1a6]">
          {activeSection === "source"
            ? "Threats that occur at the source code level, including unauthorized changes and compromised repositories."
            : activeSection === "build"
              ? "Threats that occur during the build process, including compromised build systems and package registries."
              : "Threats that occur through dependencies, including compromised packages and libraries."}
        </p>
      </div>

      {/* Threat cards */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {slsaData
          .filter((threat) => threat.category === activeSection)
          .map((threat) => (
            <div key={threat.id} className="flex flex-col">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategoryClick(threat.id)}
                className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedCategory === threat.id
                    ? "bg-[#8220FF]/10 border-2 border-[#8220FF]"
                    : "bg-white dark:bg-[#151516] border-2 border-transparent hover:border-[#8220FF]/30"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col items-center mb-4 w-full">
                    <div
                      className={`p-3 rounded-xl mb-3 ${
                        selectedCategory === threat.id ? "bg-[#8220FF] text-white" : "bg-[#4CD964]/10 text-[#4CD964]"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                        <line x1="16" y1="8" x2="2" y2="22"></line>
                        <line x1="17.5" y1="15" x2="9" y2="15"></line>
                      </svg>
                    </div>
                    <h3 className="text-center text-[#1d1d1f] dark:text-white font-medium">{threat.title}</h3>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 absolute top-4 right-4 transition-transform ${
                      selectedCategory === threat.id ? "rotate-90 text-[#8220FF]" : "text-[#86868b] dark:text-[#a1a1a6]"
                    }`}
                  />
                </div>
              </motion.div>

              <AnimatePresence>
                {selectedCategory === threat.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 p-6 rounded-2xl bg-[#f5f5f7] dark:bg-[#2c2c2e]">
                      <h4 className="font-medium text-[#1d1d1f] dark:text-white mb-3">Description</h4>
                      <p className="text-sm text-[#86868b] dark:text-[#a1a1a6] mb-4">{threat.description}</p>

                      <h4 className="font-medium text-[#1d1d1f] dark:text-white mb-2">Attack Vectors</h4>
                      <ul className="list-disc pl-5 mb-4">
                        {threat.attackVectors.map((vector, index) => (
                          <li key={index} className="text-sm text-[#86868b] dark:text-[#a1a1a6] mb-1">
                            {vector}
                          </li>
                        ))}
                      </ul>

                      <h4 className="font-medium text-[#1d1d1f] dark:text-white mb-2">Mitigation</h4>
                      <ul className="list-disc pl-5">
                        {threat.mitigation.map((item, index) => (
                          <li key={index} className="text-sm text-[#86868b] dark:text-[#a1a1a6] mb-1">
                            {item}
                          </li>
                        ))}
                      </ul>

                      {threat.slsaLevel && (
                        <div className="mt-4 pt-4 border-t border-[#e5e5ea] dark:border-[#3a3a3c]">
                          <h4 className="font-medium text-[#1d1d1f] dark:text-white mb-2">SLSA Requirements</h4>
                          <div className="flex gap-2 mb-2">
                            {[1, 2, 3, 4].map((level) => (
                              <div
                                key={level}
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                  level <= threat.slsaLevel
                                    ? "bg-[#8220FF] text-white"
                                    : "bg-[#e5e5ea] dark:bg-[#3a3a3c] text-[#86868b] dark:text-[#a1a1a6]"
                                }`}
                              >
                                {level}
                              </div>
                            ))}
                          </div>
                          <p className="text-sm text-[#86868b] dark:text-[#a1a1a6]">
                            This threat is addressed at SLSA Level {threat.slsaLevel} and above.
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
      </motion.div>
    </div>
  )
}

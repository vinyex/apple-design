"use client"
import { motion } from "framer-motion"

type ThreatCategory = "source" | "build" | "dependencies"
type ThreatId = string

interface DiagramProps {
  activeCategory: ThreatCategory
  selectedThreat: ThreatId | null
  onCategoryChange: (category: ThreatCategory) => void
  onThreatSelect: (id: ThreatId) => void
}

export default function InteractiveSLSADiagram({
  activeCategory,
  selectedThreat,
  onCategoryChange,
  onThreatSelect,
}: DiagramProps) {
  // Define the threats for each category
  const sourceThreats = [
    { id: "source-1", title: "Submit unauthorized change" },
    { id: "source-2", title: "Compromise source repo" },
    { id: "source-3", title: "Build from modified source" },
  ]

  const buildThreats = [
    { id: "build-1", title: "Compromise build process" },
    { id: "build-2", title: "Upload modified package" },
    { id: "build-3", title: "Compromise package registry" },
    { id: "build-4", title: "Use compromised package" },
  ]

  const dependenciesThreats = [{ id: "dependencies-1", title: "Use compromised dependency" }]

  return (
    <div className="bg-white dark:bg-[#151516] rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-medium text-[#1d1d1f] dark:text-white mb-6">SLSA Threat Model</h3>

      <div className="flex flex-col space-y-8">
        {/* Supply Chain Diagram */}
        <div className="relative h-24 flex items-center justify-center">
          {/* Source Stage */}
          <div
            onClick={() => onCategoryChange("source")}
            className={`absolute left-0 w-1/3 h-20 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
              activeCategory === "source"
                ? "bg-[#8220FF]/20 border-2 border-[#8220FF]"
                : "bg-[#f5f5f7] dark:bg-[#2c2c2e] hover:bg-[#8220FF]/10"
            }`}
          >
            <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">Source</span>
            <span className="text-xs text-[#86868b] dark:text-[#a1a1a6]">Code Repository</span>
          </div>

          {/* Arrow 1 */}
          <div className="absolute left-[calc(1/3*100%-10px)] w-[calc(1/3*100%+20px)] h-0.5 bg-[#8220FF]/50"></div>

          {/* Build Stage */}
          <div
            onClick={() => onCategoryChange("build")}
            className={`absolute left-1/3 w-1/3 h-20 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
              activeCategory === "build"
                ? "bg-[#8220FF]/20 border-2 border-[#8220FF]"
                : "bg-[#f5f5f7] dark:bg-[#2c2c2e] hover:bg-[#8220FF]/10"
            }`}
          >
            <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">Build</span>
            <span className="text-xs text-[#86868b] dark:text-[#a1a1a6]">CI/CD Pipeline</span>
          </div>

          {/* Arrow 2 */}
          <div className="absolute left-[calc(2/3*100%-10px)] w-[calc(1/3*100%+20px)] h-0.5 bg-[#8220FF]/50"></div>

          {/* Dependencies Stage */}
          <div
            onClick={() => onCategoryChange("dependencies")}
            className={`absolute right-0 w-1/3 h-20 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
              activeCategory === "dependencies"
                ? "bg-[#8220FF]/20 border-2 border-[#8220FF]"
                : "bg-[#f5f5f7] dark:bg-[#2c2c2e] hover:bg-[#8220FF]/10"
            }`}
          >
            <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">Dependencies</span>
            <span className="text-xs text-[#86868b] dark:text-[#a1a1a6]">External Packages</span>
          </div>
        </div>

        {/* Threats for the selected category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {activeCategory === "source" &&
            sourceThreats.map((threat) => (
              <motion.div
                key={threat.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onThreatSelect(threat.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedThreat === threat.id
                    ? "bg-[#8220FF]/20 border-2 border-[#8220FF]"
                    : "bg-[#f5f5f7] dark:bg-[#2c2c2e] hover:bg-[#8220FF]/10"
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <div
                    className={`p-2 rounded-full ${
                      selectedThreat === threat.id ? "bg-[#8220FF] text-white" : "bg-[#4CD964]/10 text-[#4CD964]"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
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
                </div>
                <p className="text-sm text-center text-[#1d1d1f] dark:text-white">{threat.title}</p>
              </motion.div>
            ))}

          {activeCategory === "build" &&
            buildThreats.map((threat) => (
              <motion.div
                key={threat.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onThreatSelect(threat.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedThreat === threat.id
                    ? "bg-[#8220FF]/20 border-2 border-[#8220FF]"
                    : "bg-[#f5f5f7] dark:bg-[#2c2c2e] hover:bg-[#8220FF]/10"
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <div
                    className={`p-2 rounded-full ${
                      selectedThreat === threat.id ? "bg-[#8220FF] text-white" : "bg-[#4CD964]/10 text-[#4CD964]"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
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
                </div>
                <p className="text-sm text-center text-[#1d1d1f] dark:text-white">{threat.title}</p>
              </motion.div>
            ))}

          {activeCategory === "dependencies" &&
            dependenciesThreats.map((threat) => (
              <motion.div
                key={threat.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onThreatSelect(threat.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedThreat === threat.id
                    ? "bg-[#8220FF]/20 border-2 border-[#8220FF]"
                    : "bg-[#f5f5f7] dark:bg-[#2c2c2e] hover:bg-[#8220FF]/10"
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <div
                    className={`p-2 rounded-full ${
                      selectedThreat === threat.id ? "bg-[#8220FF] text-white" : "bg-[#4CD964]/10 text-[#4CD964]"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
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
                </div>
                <p className="text-sm text-center text-[#1d1d1f] dark:text-white">{threat.title}</p>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  )
}

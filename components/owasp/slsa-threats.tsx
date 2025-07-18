"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, GitBranch, Package, Shield, AlertTriangle, Lock, Server } from "lucide-react"
import { slsaData } from "@/data/slsa-data"

export default function SLSAThreats() {
  const [activeSection, setActiveSection] = useState<"source" | "build" | "dependencies">("source")

  // Get the appropriate icon for each threat
  const getThreatIcon = (id: string) => {
    if (id.startsWith("source")) {
      return <Code className="h-5 w-5 text-white" />
    } else if (id.startsWith("build")) {
      return <GitBranch className="h-5 w-5 text-white" />
    } else {
      return <Package className="h-5 w-5 text-white" />
    }
  }

  // Get a secondary icon for visual variety
  const getSecondaryIcon = (index: number) => {
    const icons = [
      <Shield key="shield" className="h-5 w-5 text-[#8220FF]" />,
      <AlertTriangle key="alert" className="h-5 w-5 text-[#8220FF]" />,
      <Lock key="lock" className="h-5 w-5 text-[#8220FF]" />,
      <Server key="server" className="h-5 w-5 text-[#8220FF]" />,
    ]
    return icons[index % icons.length]
  }

  return (
    <div className="space-y-8">
      {/* SLSA Introduction */}
      <div className="bg-white dark:bg-[#151516] rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-medium text-[#1d1d1f] dark:text-white mb-3">
          SLSA Framework (Supply-chain Levels for Software Artifacts)
        </h3>
        <p className="text-sm text-[#86868b] dark:text-[#a1a1a6] mb-4">
          SLSA is a security framework, a check-list of standards and controls to prevent tampering, improve integrity,
          and secure packages and infrastructure in your projects, businesses or enterprises. It's how you get from
          "safe enough" to being as resilient as possible, at any link in the chain.
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          <div className="flex items-center gap-1 bg-[#f5f5f7] dark:bg-[#2c2c2e] px-3 py-1.5 rounded-full">
            <div className="w-4 h-4 rounded-full bg-[#8220FF] text-white flex items-center justify-center text-[10px] font-bold">
              1
            </div>
            <span className="text-xs text-[#1d1d1f] dark:text-white">Build as Code</span>
          </div>
          <div className="flex items-center gap-1 bg-[#f5f5f7] dark:bg-[#2c2c2e] px-3 py-1.5 rounded-full">
            <div className="w-4 h-4 rounded-full bg-[#8220FF] text-white flex items-center justify-center text-[10px] font-bold">
              2
            </div>
            <span className="text-xs text-[#1d1d1f] dark:text-white">Verified History</span>
          </div>
          <div className="flex items-center gap-1 bg-[#f5f5f7] dark:bg-[#2c2c2e] px-3 py-1.5 rounded-full">
            <div className="w-4 h-4 rounded-full bg-[#8220FF] text-white flex items-center justify-center text-[10px] font-bold">
              3
            </div>
            <span className="text-xs text-[#1d1d1f] dark:text-white">Security Controls</span>
          </div>
          <div className="flex items-center gap-1 bg-[#f5f5f7] dark:bg-[#2c2c2e] px-3 py-1.5 rounded-full">
            <div className="w-4 h-4 rounded-full bg-[#8220FF] text-white flex items-center justify-center text-[10px] font-bold">
              4
            </div>
            <span className="text-xs text-[#1d1d1f] dark:text-white">Hermetic Builds</span>
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div className="sticky top-0 z-10 bg-[#f5f5f7] dark:bg-[#1d1d1f] pt-4 pb-2 -mx-6 px-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSection("source")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeSection === "source"
                ? "bg-[#8220FF] text-white"
                : "bg-[#f5f5f7] dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-white hover:bg-[#8220FF]/10"
            }`}
          >
            Source Threats
          </button>
          <button
            onClick={() => setActiveSection("build")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeSection === "build"
                ? "bg-[#8220FF] text-white"
                : "bg-[#f5f5f7] dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-white hover:bg-[#8220FF]/10"
            }`}
          >
            Build Threats
          </button>
          <button
            onClick={() => setActiveSection("dependencies")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeSection === "dependencies"
                ? "bg-[#8220FF] text-white"
                : "bg-[#f5f5f7] dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-white hover:bg-[#8220FF]/10"
            }`}
          >
            Dependencies Threats
          </button>
        </div>
      </div>

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

      {/* Supply Chain Diagram */}
      <div className="relative h-24 flex items-center justify-center bg-white dark:bg-[#151516] rounded-2xl p-4">
        {/* Source Stage */}
        <div
          className={`absolute left-0 w-1/3 h-16 rounded-xl flex flex-col items-center justify-center transition-all ${
            activeSection === "source" ? "bg-[#8220FF]/20 border-2 border-[#8220FF]" : "bg-[#f5f5f7] dark:bg-[#2c2c2e]"
          }`}
        >
          <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">Source</span>
          <span className="text-xs text-[#86868b] dark:text-[#a1a1a6]">Code Repository</span>
        </div>

        {/* Arrow 1 */}
        <div className="absolute left-[calc(1/3*100%-10px)] w-[calc(1/3*100%+20px)] h-0.5 bg-[#8220FF]/50"></div>

        {/* Build Stage */}
        <div
          className={`absolute left-1/3 w-1/3 h-16 rounded-xl flex flex-col items-center justify-center transition-all ${
            activeSection === "build" ? "bg-[#8220FF]/20 border-2 border-[#8220FF]" : "bg-[#f5f5f7] dark:bg-[#2c2c2e]"
          }`}
        >
          <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">Build</span>
          <span className="text-xs text-[#86868b] dark:text-[#a1a1a6]">CI/CD Pipeline</span>
        </div>

        {/* Arrow 2 */}
        <div className="absolute left-[calc(2/3*100%-10px)] w-[calc(1/3*100%+20px)] h-0.5 bg-[#8220FF]/50"></div>

        {/* Dependencies Stage */}
        <div
          className={`absolute right-0 w-1/3 h-16 rounded-xl flex flex-col items-center justify-center transition-all ${
            activeSection === "dependencies"
              ? "bg-[#8220FF]/20 border-2 border-[#8220FF]"
              : "bg-[#f5f5f7] dark:bg-[#2c2c2e]"
          }`}
        >
          <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">Dependencies</span>
          <span className="text-xs text-[#86868b] dark:text-[#a1a1a6]">External Packages</span>
        </div>
      </div>

      {/* Threat details - all expanded by default */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {slsaData
          .filter((threat) => threat.category === activeSection)
          .map((threat, index) => (
            <div key={threat.id} className="bg-white dark:bg-[#151516] rounded-2xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-[#e5e5ea] dark:border-[#3a3a3c]">
                <div className="flex items-center gap-4">
                  <div className="bg-[#8220FF] p-3 rounded-xl">{getThreatIcon(threat.id)}</div>
                  <div>
                    <h3 className="text-xl font-medium text-[#1d1d1f] dark:text-white">{threat.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              level <= threat.slsaLevel ? "bg-[#8220FF] text-white" : "bg-[#e5e5ea] dark:bg-[#3a3a3c]"
                            }`}
                          >
                            {level}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-[#86868b] dark:text-[#a1a1a6]">SLSA Level {threat.slsaLevel}+</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="flex items-center gap-2 text-[#1d1d1f] dark:text-white font-medium mb-2">
                    {getSecondaryIcon(index)} Description
                  </h4>
                  <p className="text-sm text-[#86868b] dark:text-[#a1a1a6]">{threat.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="flex items-center gap-2 text-[#1d1d1f] dark:text-white font-medium mb-3">
                      <AlertTriangle className="h-5 w-5 text-[#FF9F0A]" /> Attack Vectors
                    </h4>
                    <ul className="space-y-2">
                      {threat.attackVectors.map((vector, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="min-w-[6px] h-[6px] rounded-full bg-[#FF9F0A] mt-[0.4rem]"></div>
                          <span className="text-sm text-[#86868b] dark:text-[#a1a1a6]">{vector}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-[#1d1d1f] dark:text-white font-medium mb-3">
                      <Shield className="h-5 w-5 text-[#4CD964]" /> Mitigation
                    </h4>
                    <ul className="space-y-2">
                      {threat.mitigation.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="min-w-[6px] h-[6px] rounded-full bg-[#4CD964] mt-[0.4rem]"></div>
                          <span className="text-sm text-[#86868b] dark:text-[#a1a1a6]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </motion.div>
    </div>
  )
}

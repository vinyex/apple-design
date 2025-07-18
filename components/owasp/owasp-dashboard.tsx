"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import OWASPTop10 from "./owasp-top10"
import OWASPCiCd from "./owasp-cicd"
import SLSAThreats from "./slsa-threats"

export default function OWASPDashboard() {
  const [activeTab, setActiveTab] = useState<"top10" | "cicd" | "slsa">("top10")

  return (
    <div className="space-y-8">
      {/* Header with tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#8220FF]/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-[#8220FF]" />
          </div>
          <div>
            <h2 className="text-xl font-medium text-[#1d1d1f] dark:text-white">Security Standards</h2>
            <p className="text-sm text-[#86868b] dark:text-[#a1a1a6]">
              Explore the latest security standards and best practices
            </p>
          </div>
        </div>

        <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] p-1 rounded-xl flex flex-wrap">
          <button
            onClick={() => setActiveTab("top10")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "top10"
                ? "bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-white shadow-sm"
                : "text-[#86868b] dark:text-[#a1a1a6] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
          >
            OWASP Top 10
          </button>
          <button
            onClick={() => setActiveTab("cicd")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "cicd"
                ? "bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-white shadow-sm"
                : "text-[#86868b] dark:text-[#a1a1a6] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
          >
            CI/CD Risks
          </button>
          <button
            onClick={() => setActiveTab("slsa")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "slsa"
                ? "bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-white shadow-sm"
                : "text-[#86868b] dark:text-[#a1a1a6] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
          >
            SLSA Framework
          </button>
        </div>
      </div>

      {/* Content area with animation */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "top10" ? <OWASPTop10 /> : activeTab === "cicd" ? <OWASPCiCd /> : <SLSAThreats />}
      </motion.div>
    </div>
  )
}

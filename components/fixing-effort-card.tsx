"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import FixingEffortModal from "./fixing-effort-modal"
import { getFixingEffortSummary, type OWASPCategory } from "@/utils/fixing-effort-helper"

interface FixingEffortCardProps {
  effortScore: number
  owaspCategory?: OWASPCategory
  className?: string
}

export default function FixingEffortCard({ effortScore, owaspCategory, className = "" }: FixingEffortCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const summary = getFixingEffortSummary(effortScore)

  return (
    <>
      <div
        className={`bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-[1.02] ${className}`}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-[#86868b] text-sm font-medium mb-2">Fixing Effort</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[#8220FF] hover:text-[#6a1acc] transition-colors duration-200 flex items-center text-xs font-medium"
            aria-label="View fixing effort details"
          >
            Details <ChevronRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>
        <div className="space-y-2">
          <p className="text-[#1d1d1f] dark:text-white text-xl font-semibold">{summary.level}</p>
          <div className="w-full bg-[#e5e5ea] dark:bg-[#3a3a3c] rounded-full h-1.5">
            <div className="bg-[#8220FF] h-1.5 rounded-full" style={{ width: `${effortScore}%` }}></div>
          </div>
          <div className="text-xs text-[#86868b] dark:text-[#a1a1a6] mt-1">
            <span className="inline-block">Estimated time: {summary.timeEstimate}</span>
            <span className="inline-block mx-2">•</span>
            <span className="inline-block">{summary.expertiseLevel}</span>
          </div>
        </div>
      </div>

      <FixingEffortModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        effortScore={effortScore}
        owaspCategory={owaspCategory}
      />
    </>
  )
}

"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import * as Icons from "lucide-react"
import {
  generateFixingEffortDetails,
  type FixingEffortDetails,
  type OWASPCategory,
  OWASP_CATEGORIES,
} from "@/utils/fixing-effort-helper"

interface FixingEffortModalProps {
  isOpen: boolean
  onClose: () => void
  effortScore: number
  owaspCategory?: OWASPCategory
}

export default function FixingEffortModal({ isOpen, onClose, effortScore, owaspCategory }: FixingEffortModalProps) {
  const [effortDetails, setEffortDetails] = useState<FixingEffortDetails | null>(null)

  // Generate effort details when the modal opens or score changes
  useEffect(() => {
    if (isOpen) {
      const details = generateFixingEffortDetails(effortScore, owaspCategory)
      setEffortDetails(details)
    }
  }, [isOpen, effortScore, owaspCategory])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen || !effortDetails) return null

  // Dynamic icon rendering based on component icon name
  const renderIcon = (iconName: string) => {
    // @ts-ignore - Dynamic icon access
    const IconComponent = Icons[iconName]
    return IconComponent ? <IconComponent className="h-5 w-5 text-[#8220FF]" /> : null
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="bg-white dark:bg-[#1d1d1f] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#e5e5ea] dark:border-[#3a3a3c]">
          <div>
            <h2 className="text-2xl font-semibold text-[#1d1d1f] dark:text-white">Fixing Effort Analysis</h2>
            {owaspCategory && (
              <div className="mt-1 text-sm text-[#86868b] dark:text-[#a1a1a6] flex items-center">
                <span className="font-medium">{owaspCategory}:</span>
                <span className="ml-1">{OWASP_CATEGORIES[owaspCategory]}</span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-[#f5f5f7] dark:hover:bg-[#2c2c2e] transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-[#86868b] dark:text-[#a1a1a6]" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Overall Score */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <h3 className="text-lg font-medium text-[#1d1d1f] dark:text-white">Overall Score</h3>
              <span className="text-2xl font-semibold text-[#8220FF]">{effortDetails.overallScore}/100</span>
            </div>
            <div className="w-full bg-[#e5e5ea] dark:bg-[#3a3a3c] rounded-full h-2">
              <div className="bg-[#8220FF] h-2 rounded-full" style={{ width: `${effortDetails.overallScore}%` }}></div>
            </div>
            <p className="mt-2 text-sm text-[#86868b] dark:text-[#a1a1a6]">{effortDetails.overallDescription}</p>
          </div>

          {/* Effort Breakdown */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-[#1d1d1f] dark:text-white mb-4">Effort Breakdown</h3>

            <div className="space-y-6">
              {effortDetails.components.map((component, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-full bg-[#f5f5f7] dark:bg-[#2c2c2e]">
                    {renderIcon(component.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium text-[#1d1d1f] dark:text-white">{component.name}</h4>
                      <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">
                        {component.level} ({component.score}/100)
                      </span>
                    </div>
                    <div className="w-full bg-[#e5e5ea] dark:bg-[#3a3a3c] rounded-full h-1.5 mb-2">
                      <div className="bg-[#8220FF] h-1.5 rounded-full" style={{ width: `${component.score}%` }}></div>
                    </div>
                    <p className="text-sm text-[#86868b] dark:text-[#a1a1a6]">{component.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-[#1d1d1f] dark:text-white mb-3">Recommendations</h3>
            <ul className="space-y-2 text-sm text-[#1d1d1f] dark:text-white">
              {effortDetails.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="min-w-[6px] h-[6px] rounded-full bg-[#8220FF] mt-[0.4rem]"></div>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resource Allocation */}
          <div>
            <h3 className="text-lg font-medium text-[#1d1d1f] dark:text-white mb-3">Resource Allocation</h3>
            <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-xl p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-[#86868b] dark:text-[#a1a1a6] mb-1">Developer Resources</h4>
                  <p className="text-[#1d1d1f] dark:text-white font-medium">
                    {effortDetails.resourceAllocation.developers}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm text-[#86868b] dark:text-[#a1a1a6] mb-1">QA Resources</h4>
                  <p className="text-[#1d1d1f] dark:text-white font-medium">{effortDetails.resourceAllocation.qa}</p>
                </div>
                <div>
                  <h4 className="text-sm text-[#86868b] dark:text-[#a1a1a6] mb-1">Security Review</h4>
                  <p className="text-[#1d1d1f] dark:text-white font-medium">
                    {effortDetails.resourceAllocation.securityReview}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm text-[#86868b] dark:text-[#a1a1a6] mb-1">Total Effort</h4>
                  <p className="text-[#1d1d1f] dark:text-white font-medium">
                    {effortDetails.resourceAllocation.totalEffort}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#e5e5ea] dark:border-[#3a3a3c] p-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-[#8220FF] text-white font-medium transition-all duration-300 hover:bg-[#6a1acc]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

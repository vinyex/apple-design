"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight,
  GitBranch,
  Users,
  Package,
  AlertTriangle,
  Shield,
  Key,
  Settings,
  ExternalLink,
  FileCheck,
  BarChart,
} from "lucide-react"
import { owaspCiCdData } from "@/data/owasp-data"

export default function OWASPCiCd() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (id: string) => {
    setSelectedCategory(selectedCategory === id ? null : id)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {owaspCiCdData.map((category) => {
          // Determine which icon to use
          let Icon
          switch (category.id) {
            case "CICD-SEC-1":
              Icon = GitBranch
              break
            case "CICD-SEC-2":
              Icon = Users
              break
            case "CICD-SEC-3":
              Icon = Package
              break
            case "CICD-SEC-4":
              Icon = AlertTriangle
              break
            case "CICD-SEC-5":
              Icon = Shield
              break
            case "CICD-SEC-6":
              Icon = Key
              break
            case "CICD-SEC-7":
              Icon = Settings
              break
            case "CICD-SEC-8":
              Icon = ExternalLink
              break
            case "CICD-SEC-9":
              Icon = FileCheck
              break
            case "CICD-SEC-10":
              Icon = BarChart
              break
            default:
              Icon = AlertTriangle
          }

          return (
            <div key={category.id} className="flex flex-col">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategoryClick(category.id)}
                className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-[#8220FF]/10 border-2 border-[#8220FF]"
                    : "bg-white dark:bg-[#151516] border-2 border-transparent hover:border-[#8220FF]/30"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`p-2 rounded-full ${
                        selectedCategory === category.id ? "bg-[#8220FF] text-white" : "bg-[#f5f5f7] dark:bg-[#2c2c2e]"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${selectedCategory === category.id ? "text-white" : "text-[#8220FF]"}`}
                      />
                    </div>
                    <h3 className="text-lg font-medium text-[#1d1d1f] dark:text-white">{category.id}</h3>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 transition-transform ${
                      selectedCategory === category.id
                        ? "rotate-90 text-[#8220FF]"
                        : "text-[#86868b] dark:text-[#a1a1a6]"
                    }`}
                  />
                </div>
                <p className="text-sm text-[#1d1d1f] dark:text-white">{category.title}</p>
              </motion.div>

              <AnimatePresence>
                {selectedCategory === category.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 p-6 rounded-2xl bg-[#f5f5f7] dark:bg-[#2c2c2e]">
                      <h4 className="font-medium text-[#1d1d1f] dark:text-white mb-3">Description</h4>
                      <p className="text-sm text-[#86868b] dark:text-[#a1a1a6] mb-4">{category.description}</p>

                      <h4 className="font-medium text-[#1d1d1f] dark:text-white mb-2">Common Examples</h4>
                      <ul className="list-disc pl-5 mb-4">
                        {category.examples.map((example, index) => (
                          <li key={index} className="text-sm text-[#86868b] dark:text-[#a1a1a6] mb-1">
                            {example}
                          </li>
                        ))}
                      </ul>

                      <h4 className="font-medium text-[#1d1d1f] dark:text-white mb-2">Prevention</h4>
                      <ul className="list-disc pl-5">
                        {category.prevention.map((item, index) => (
                          <li key={index} className="text-sm text-[#86868b] dark:text-[#a1a1a6] mb-1">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

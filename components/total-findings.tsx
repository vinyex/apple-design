"use client"

import { useEffect, useRef, useState } from "react"
import { BarChart3 } from "lucide-react"

interface FindingsData {
  totalFindings: number
  aggregatedVulnerabilities: number
  prioritizedVulnerabilities: number
  highSeverity: number
  mediumSeverity: number
  lowSeverity: number
}

interface TotalFindingsProps {
  data?: FindingsData
}

const defaultData: FindingsData = {
  totalFindings: 12,
  aggregatedVulnerabilities: 8,
  prioritizedVulnerabilities: 5,
  highSeverity: 2,
  mediumSeverity: 2,
  lowSeverity: 1,
}

export default function TotalFindings({ data = defaultData }: TotalFindingsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  // Calculate percentages for the funnel chart
  const totalToAggregated = data.totalFindings > 0 ? (data.aggregatedVulnerabilities / data.totalFindings) * 100 : 0
  const aggregatedToPrioritized =
    data.aggregatedVulnerabilities > 0 ? (data.prioritizedVulnerabilities / data.aggregatedVulnerabilities) * 100 : 0

  // Calculate percentages for the donut chart
  const total = data.highSeverity + data.mediumSeverity + data.lowSeverity
  const highPercentage = total > 0 ? (data.highSeverity / total) * 100 : 0
  const mediumPercentage = total > 0 ? (data.mediumSeverity / total) * 100 : 0
  const lowPercentage = total > 0 ? (data.lowSeverity / total) * 100 : 0

  // Set up the stroke-dasharray values for the donut chart
  const circumference = 2 * Math.PI * 40 // 40 is the radius of the circle
  const highStrokeDasharray = `${(highPercentage / 100) * circumference} ${circumference}`
  const mediumStrokeDasharray = `${(mediumPercentage / 100) * circumference} ${circumference}`
  const lowStrokeDasharray = `${(lowPercentage / 100) * circumference} ${circumference}`

  // Calculate the stroke-dashoffset values for the donut chart
  const highStrokeDashoffset = 0
  const mediumStrokeDashoffset = -((highPercentage / 100) * circumference)
  const lowStrokeDashoffset = -((highPercentage + mediumPercentage) / 100) * circumference

  useEffect(() => {
    setIsClient(true)

    if (!containerRef.current) return

    // Create intersection observer for the main container
    const containerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
            // Once animation is triggered, disconnect this observer
            containerObserver.disconnect()
          }
        })
      },
      { threshold: 0.1 }, // Trigger when 10% of the element is visible
    )

    // Create intersection observer for header elements
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Stagger the animations
            setTimeout(() => {
              entry.target.classList.add("animate-slide-up")
            }, index * 100)
          }
        })
      },
      { threshold: 0.1 },
    )

    // Create intersection observer for grid items
    const gridItemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Stagger the animations
            setTimeout(() => {
              entry.target.classList.add("animate-slide-up")
            }, index * 50)
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observe the container
    containerObserver.observe(containerRef.current)

    // Observe all header elements
    const headerElements = document.querySelectorAll(".findings-header")
    headerElements.forEach((el) => headerObserver.observe(el))

    // Observe all grid items
    const gridItems = document.querySelectorAll(".findings-item")
    gridItems.forEach((el) => gridItemObserver.observe(el))

    // Clean up observers on component unmount
    return () => {
      containerObserver.disconnect()
      headerObserver.disconnect()
      gridItemObserver.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className="opacity-0">
      <div className="relative rounded-3xl bg-white dark:bg-[#151516] shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md mt-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8220FF] to-[#a265ff]"></div>

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 findings-header opacity-0">
            <div className="w-12 h-12 rounded-xl bg-[#8220FF]/10 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-[#8220FF]" />
            </div>
            <h2 className="font-sans text-[#1d1d1f] dark:text-white font-semibold text-2xl md:text-3xl tracking-tight">
              Total Findings
            </h2>
          </div>

          {/* Metrics and Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Metrics */}
            <div className="findings-item opacity-0 flex flex-col md:flex-row lg:flex-col justify-between gap-6">
              <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF9F0A]"></div>
                  <h3 className="text-[#86868b] dark:text-[#a1a1a6] text-sm font-medium">Total Findings</h3>
                </div>
                <p className="text-[#1d1d1f] dark:text-white text-3xl font-semibold">{data.totalFindings}</p>
              </div>

              <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-[#32D74B]"></div>
                  <h3 className="text-[#86868b] dark:text-[#a1a1a6] text-sm font-medium">Vulnerabilities Aggregated</h3>
                </div>
                <p className="text-[#1d1d1f] dark:text-white text-3xl font-semibold">
                  {data.aggregatedVulnerabilities}
                </p>
              </div>

              <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-[#8220FF]"></div>
                  <h3 className="text-[#86868b] dark:text-[#a1a1a6] text-sm font-medium">
                    Vulnerabilities Prioritized
                  </h3>
                </div>
                <p className="text-[#1d1d1f] dark:text-white text-3xl font-semibold">
                  {data.prioritizedVulnerabilities}
                </p>
              </div>
            </div>

            {/* Funnel Chart */}
            <div className="findings-item opacity-0 lg:col-span-2">
              <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-2xl p-6 h-full">
                <h3 className="text-[#1d1d1f] dark:text-white font-medium mb-6">Vulnerability Flow</h3>

                <div className="flex h-[300px] items-center justify-center">
                  {isClient && (
                    <div className="relative w-full h-full">
                      {/* Funnel Chart */}
                      <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
                        {/* Total Findings to Aggregated */}
                        <path
                          d="M50,50 C250,50 250,50 350,150 C250,250 250,250 50,250 Z"
                          fill="url(#totalGradient)"
                          className="transition-all duration-1000 ease-out"
                        />

                        {/* Aggregated to Prioritized */}
                        <path
                          d="M350,150 C450,150 450,150 500,150 C450,150 450,150 350,150 Z"
                          fill="url(#aggregatedGradient)"
                          className="transition-all duration-1000 ease-out"
                          transform={`scale(1, ${totalToAggregated / 100})`}
                        />

                        {/* Prioritized */}
                        <path
                          d="M500,150 C600,100 600,200 700,150 C600,200 600,100 500,150 Z"
                          fill="url(#prioritizedGradient)"
                          className="transition-all duration-1000 ease-out"
                          transform={`scale(${aggregatedToPrioritized / 100}, 1)`}
                        />

                        {/* Percentages */}
                        <text
                          x="200"
                          y="150"
                          textAnchor="middle"
                          fill="#1d1d1f"
                          className="dark:fill-white text-xs font-medium"
                        >
                          {Math.round(totalToAggregated)}%
                        </text>
                        <text
                          x="425"
                          y="130"
                          textAnchor="middle"
                          fill="#1d1d1f"
                          className="dark:fill-white text-xs font-medium"
                        >
                          {Math.round(aggregatedToPrioritized)}%
                        </text>
                        <text
                          x="600"
                          y="150"
                          textAnchor="middle"
                          fill="#1d1d1f"
                          className="dark:fill-white text-xs font-medium"
                        >
                          {Math.round(aggregatedToPrioritized)}%
                        </text>

                        {/* Gradients */}
                        <defs>
                          <linearGradient id="totalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FF9F0A" />
                            <stop offset="100%" stopColor="#32D74B" />
                          </linearGradient>
                          <linearGradient id="aggregatedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#32D74B" />
                            <stop offset="100%" stopColor="#5E5CE6" />
                          </linearGradient>
                          <linearGradient id="prioritizedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#5E5CE6" />
                            <stop offset="100%" stopColor="#8220FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="findings-item opacity-0 lg:col-span-3">
              <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-2xl p-6">
                <h3 className="text-[#1d1d1f] dark:text-white font-medium mb-6">Severity Distribution</h3>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  {/* Donut Chart */}
                  <div className="relative w-[200px] h-[200px]">
                    <svg width="200" height="200" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#e5e5ea"
                        strokeWidth="12"
                        className="dark:stroke-[#3a3a3c]"
                      />

                      {/* High severity */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#8220FF"
                        strokeWidth="12"
                        strokeDasharray={highStrokeDasharray}
                        strokeDashoffset={highStrokeDashoffset}
                        transform="rotate(-90 50 50)"
                        className="transition-all duration-1000 ease-out"
                      />

                      {/* Medium severity */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#a265ff"
                        strokeWidth="12"
                        strokeDasharray={mediumStrokeDasharray}
                        strokeDashoffset={mediumStrokeDashoffset}
                        transform="rotate(-90 50 50)"
                        className="transition-all duration-1000 ease-out"
                      />

                      {/* Low severity */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#d4c4ff"
                        strokeWidth="12"
                        strokeDasharray={lowStrokeDasharray}
                        strokeDashoffset={lowStrokeDashoffset}
                        transform="rotate(-90 50 50)"
                        className="transition-all duration-1000 ease-out"
                      />

                      {/* Center text */}
                      <g>
                        <text
                          x="50"
                          y="45"
                          textAnchor="middle"
                          fill="#86868b"
                          fontSize="6"
                          className="dark:fill-[#a1a1a6]"
                        >
                          Total
                        </text>
                        <text
                          x="50"
                          y="58"
                          textAnchor="middle"
                          fill="#1d1d1f"
                          fontSize="14"
                          fontWeight="bold"
                          className="dark:fill-white"
                        >
                          {total}
                        </text>
                      </g>
                    </svg>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#8220FF]"></div>
                      <div>
                        <p className="text-[#1d1d1f] dark:text-white font-medium">High</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[#86868b] dark:text-[#a1a1a6] text-sm">
                            {data.highSeverity} findings
                          </span>
                          <span className="text-[#86868b] dark:text-[#a1a1a6] text-sm">•</span>
                          <span className="text-[#86868b] dark:text-[#a1a1a6] text-sm">
                            {Math.round(highPercentage)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#a265ff]"></div>
                      <div>
                        <p className="text-[#1d1d1f] dark:text-white font-medium">Medium</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[#86868b] dark:text-[#a1a1a6] text-sm">
                            {data.mediumSeverity} findings
                          </span>
                          <span className="text-[#86868b] dark:text-[#a1a1a6] text-sm">•</span>
                          <span className="text-[#86868b] dark:text-[#a1a1a6] text-sm">
                            {Math.round(mediumPercentage)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#d4c4ff]"></div>
                      <div>
                        <p className="text-[#1d1d1f] dark:text-white font-medium">Low</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[#86868b] dark:text-[#a1a1a6] text-sm">
                            {data.lowSeverity} findings
                          </span>
                          <span className="text-[#86868b] dark:text-[#a1a1a6] text-sm">•</span>
                          <span className="text-[#86868b] dark:text-[#a1a1a6] text-sm">
                            {Math.round(lowPercentage)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

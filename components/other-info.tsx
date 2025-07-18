"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Tag, Info, FileType, ExternalLink, FileWarning, Shield, AlertTriangle, BarChart3, Zap } from "lucide-react"

interface TagProps {
  label: string
}

function VulnerabilityTag({ label }: TagProps) {
  return <span className="bg-[#8220FF]/10 text-[#8220FF] font-medium text-xs px-3 py-1.5 rounded-full">{label}</span>
}

interface InfoItemProps {
  label: string
  value: string | React.ReactNode
  icon: React.ReactNode
}

function InfoItem({ label, value, icon }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 p-2 rounded-full bg-[#f5f5f7] dark:bg-[#2c2c2e] flex-shrink-0">{icon}</div>
      <div>
        <h4 className="text-[#86868b] dark:text-[#a1a1a6] text-sm font-medium mb-1">{label}</h4>
        <div className="text-[#1d1d1f] dark:text-white font-medium">{value}</div>
      </div>
    </div>
  )
}

export default function OtherInfo() {
  const containerRef = useRef<HTMLDivElement>(null)

  // We'll use simple CSS animations instead of GSAP to avoid dependency issues
  useEffect(() => {
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
    const headerElements = document.querySelectorAll(".other-info-header")
    headerElements.forEach((el) => headerObserver.observe(el))

    // Observe all grid items
    const gridItems = document.querySelectorAll(".other-info-item")
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
          <div className="flex items-center gap-4 mb-8 other-info-header opacity-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 50 40"
              fill="none"
              className="flex-shrink-0"
            >
              <path
                d="M0.513651 32.5921C1.94298 31.6732 3.06603 30.346 3.88279 29.0187C4.08698 28.7124 4.08698 28.4062 3.88279 28.202C2.86184 26.2622 2.24927 24.2203 2.04508 21.9742C1.02413 11.1521 10.9273 1.35098 24.1997 0.125835C37.4721 -1.09931 49.0088 6.76201 49.9277 17.5841C50.9486 28.4062 41.0454 38.2073 27.773 39.4324C21.0348 40.045 14.7049 38.3094 10.0085 35.0423C9.8043 34.9402 9.60011 34.8381 9.29382 34.9402C5.51631 35.8591 2.24927 34.9402 0.513651 34.1235C-0.098919 33.8172 -0.201014 33.0004 0.411556 32.5921H0.513651Z"
                fill="#8220FF"
              ></path>
              <path
                d="M26.3426 14.2145C27.9778 14.2145 29.3033 12.8889 29.3033 11.2537C29.3033 9.61855 27.9778 8.29297 26.3426 8.29297C24.7074 8.29297 23.3818 9.61855 23.3818 11.2537C23.3818 12.8889 24.7074 14.2145 26.3426 14.2145Z"
                fill="white"
              ></path>
              <path
                d="M31.039 25.7511C31.4473 25.9552 31.5494 26.0573 31.5494 26.2615C31.5494 26.6699 30.9369 27.3846 29.7117 28.4055C28.0782 29.8349 26.5468 30.6516 25.2195 30.6516C23.8923 30.6516 23.6881 30.1411 23.6881 29.1202C23.6881 28.0992 23.8923 27.3846 24.3007 25.2406L25.1174 21.0547L25.3216 20.0337L25.5258 19.217C25.5258 18.8086 25.6279 18.6044 25.6279 18.2981C25.6279 17.7876 25.4237 17.4814 25.0154 17.4814C23.8923 17.4814 22.7693 18.4002 21.5441 20.1358C21.2378 19.9316 21.1357 19.8295 21.1357 19.6254C21.1357 19.0128 21.9525 18.196 23.4839 17.073C25.0154 16.052 26.2405 15.4395 27.2614 15.4395C28.2824 15.4395 28.7929 15.9499 28.7929 17.073C28.7929 18.196 28.7929 17.6855 28.5887 18.2981L28.3845 19.3191C28.3845 19.3191 28.3845 19.8295 28.1803 20.5442L27.3635 24.9343L27.1593 25.9552C26.9552 26.9762 26.8531 27.5888 26.8531 27.895C26.8531 28.2013 27.0573 28.5076 27.3635 28.5076C28.4866 28.5076 29.7117 27.5888 30.9369 25.649L31.039 25.7511Z"
                fill="white"
              ></path>
            </svg>
            <h2 className="font-sans text-[#1d1d1f] dark:text-white font-semibold text-2xl md:text-3xl tracking-tight">
              Other Info
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="other-info-item opacity-0">
                <InfoItem label="Provider" value="Not specified" icon={<Info className="h-5 w-5 text-[#8220FF]" />} />
              </div>

              <div className="other-info-item opacity-0">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 rounded-full bg-[#f5f5f7] dark:bg-[#2c2c2e] flex-shrink-0">
                    <Tag className="h-5 w-5 text-[#8220FF]" />
                  </div>
                  <div>
                    <h4 className="text-[#86868b] dark:text-[#a1a1a6] text-sm font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      <VulnerabilityTag label="SSRF" />
                      <VulnerabilityTag label="Input Validation" />
                      <VulnerabilityTag label="External Requests" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="other-info-item opacity-0">
                <InfoItem
                  label="Excluded File Types"
                  value="Not specified"
                  icon={<FileWarning className="h-5 w-5 text-[#8220FF]" />}
                />
              </div>

              <div className="other-info-item opacity-0">
                <InfoItem
                  label="Target File Types"
                  value="Not specified"
                  icon={<FileType className="h-5 w-5 text-[#8220FF]" />}
                />
              </div>

              <div className="other-info-item opacity-0">
                <InfoItem
                  label="Mitigated Externally"
                  value="No"
                  icon={<Shield className="h-5 w-5 text-[#8220FF]" />}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="other-info-item opacity-0">
                <InfoItem
                  label="Impact"
                  value={
                    <div className="flex items-center gap-2">
                      <span>63</span>
                      <div className="w-24 bg-[#e5e5ea] dark:bg-[#3a3a3c] rounded-full h-1.5">
                        <div className="bg-[#8220FF] h-1.5 rounded-full" style={{ width: "63%" }}></div>
                      </div>
                    </div>
                  }
                  icon={<AlertTriangle className="h-5 w-5 text-[#8220FF]" />}
                />
              </div>

              <div className="other-info-item opacity-0">
                <InfoItem
                  label="Exploitability"
                  value={
                    <div className="flex items-center gap-2">
                      <span>75</span>
                      <div className="w-24 bg-[#e5e5ea] dark:bg-[#3a3a3c] rounded-full h-1.5">
                        <div className="bg-[#8220FF] h-1.5 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                  }
                  icon={<Zap className="h-5 w-5 text-[#8220FF]" />}
                />
              </div>

              <div className="other-info-item opacity-0">
                <InfoItem
                  label="Numerical Severity"
                  value={
                    <div className="flex items-center gap-2">
                      <span>36</span>
                      <div className="w-24 bg-[#e5e5ea] dark:bg-[#3a3a3c] rounded-full h-1.5">
                        <div className="bg-[#8220FF] h-1.5 rounded-full" style={{ width: "36%" }}></div>
                      </div>
                    </div>
                  }
                  icon={<BarChart3 className="h-5 w-5 text-[#8220FF]" />}
                />
              </div>

              <div className="other-info-item opacity-0">
                <InfoItem
                  label="Likelihood"
                  value="Not specified"
                  icon={<BarChart3 className="h-5 w-5 text-[#8220FF]" />}
                />
              </div>

              <div className="other-info-item opacity-0">
                <InfoItem
                  label="Resource Entity"
                  value="Not specified"
                  icon={<ExternalLink className="h-5 w-5 text-[#8220FF]" />}
                />
              </div>
            </div>

            {/* Full Width - References and Notes */}
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="other-info-item opacity-0">
                <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-2xl p-6">
                  <h4 className="text-[#1d1d1f] dark:text-white font-medium mb-2">References</h4>
                  <p className="text-[#86868b] dark:text-[#a1a1a6] text-sm">No references provided.</p>
                </div>
              </div>

              <div className="other-info-item opacity-0">
                <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-2xl p-6">
                  <h4 className="text-[#1d1d1f] dark:text-white font-medium mb-2">Notes</h4>
                  <p className="text-[#86868b] dark:text-[#a1a1a6] text-sm">No additional notes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Code, FileCode, Hash, Github } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import SyntaxHighlighter with no SSR
const SyntaxHighlighter = dynamic(() => import("react-syntax-highlighter").then((mod) => mod.Prism), {
  ssr: false,
  loading: () => (
    <div className="bg-[#282c34] rounded-xl p-4 animate-pulse">
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    </div>
  ),
})

// Dynamically import the style
const CodeStyle = dynamic(() => import("react-syntax-highlighter/dist/esm/styles/prism").then((mod) => mod.oneDark), {
  ssr: false,
})

interface InfoItemProps {
  label: string
  value: string | React.ReactNode
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      <span className="text-[#8220FF] font-medium text-sm">{label}:</span>
      <span
        className="text-[#1d1d1f] dark:text-white text-sm font-normal truncate"
        title={typeof value === "string" ? value : undefined}
      >
        {value}
      </span>
    </div>
  )
}

// Custom code block component that doesn't rely on the external library
function CodeBlock({ code, highlightLine }: { code: string; highlightLine: number }) {
  const lines = code.split("\n")

  return (
    <pre className="bg-[#282c34] rounded-xl p-4 overflow-x-auto text-sm font-mono text-white">
      {lines.map((line, i) => (
        <div
          key={i}
          className={`${i + 1 === highlightLine ? "bg-red-900/30 border-l-2 border-red-500 pl-2 -ml-2" : ""}`}
        >
          {line || " "}
        </div>
      ))}
    </pre>
  )
}

export default function CodeInfo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isCopied, setIsCopied] = useState(false)
  const [useSimpleRenderer, setUseSimpleRenderer] = useState(false)

  // Sample code with the vulnerable line highlighted
  const code = `  if (fixData.fixes.length === 0) {
    res.status(404).json({
      error: 'No fixes found for the snippet!'
    })
  } else {
    let explanation
    if (fs.existsSync('./data/static/codefixes/' + key + '.info.yml')) {
      const codingChallengeInfos = yaml.load(fs.readFileSync('./data/static/codefixes/' + key + '.info.yml', 'utf8'))
      const selectedFixInfo = codingChallengeInfos?.fixes.find(({ id }: { id: number }) => id === selectedFix + 1)
      if (selectedFixInfo?.explanation) explanation = res.__(selectedFixInfo.explanation)
    }`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // Handle errors with the syntax highlighter
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes("react-syntax-highlighter")) {
        setUseSimpleRenderer(true)
      }
    }

    window.addEventListener("error", handleError)

    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [])

  // Animation with intersection observer
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

    // Create intersection observer for content items
    const contentObserver = new IntersectionObserver(
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
    const headerElements = document.querySelectorAll(".code-info-header")
    headerElements.forEach((el) => headerObserver.observe(el))

    // Observe all content items
    const contentItems = document.querySelectorAll(".code-info-item")
    contentItems.forEach((el) => contentObserver.observe(el))

    // Clean up observers on component unmount
    return () => {
      containerObserver.disconnect()
      headerObserver.disconnect()
      contentObserver.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className="opacity-0">
      <div className="relative rounded-3xl bg-white dark:bg-[#151516] shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md mt-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8220FF] to-[#a265ff]"></div>

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 code-info-header opacity-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              className="flex-shrink-0"
            >
              <path
                d="M27.7787 0C28.3648 0 28.9361 0.236415 29.3499 0.65014C29.7636 1.06387 30 1.6352 30 2.22131V27.7787C30 28.3648 29.7636 28.9361 29.3499 29.3499C28.9361 29.7636 28.3648 30 27.7787 30H2.22131C1.6352 30 1.06386 29.7636 0.650137 29.3499C0.236412 28.9361 0 28.3648 0 27.7787V2.22131C0 1.6352 0.236412 1.06387 0.650137 0.65014C1.06386 0.236415 1.6352 0 2.22131 0H27.7787ZM21.893 3.00936C21.0606 3.00936 20.3858 3.68412 20.3858 4.5165C20.3858 5.34888 21.0606 6.02364 21.893 6.02364C22.7253 6.02364 23.4001 5.34888 23.4001 4.5165C23.4001 3.68412 22.7253 3.00936 21.893 3.00936ZM26.4932 3.00936C25.6608 3.00936 24.986 3.68412 24.986 4.5165C24.986 5.34888 25.6608 6.02364 26.4932 6.02364C27.3256 6.02364 28.0003 5.34888 28.0003 4.5165C28.0003 3.68412 27.3256 3.00936 26.4932 3.00936ZM1.97012 26.9759H28.0003V8.16615H1.97012V26.9759Z"
                fill="#8220FF"
              ></path>
              <path d="M28.001 26.976H1.97076V8.16626H28.001V26.976Z" fill="white"></path>
              <path
                d="M23.4004 4.51666C23.4004 5.34904 22.7256 6.02381 21.8932 6.02381C21.0609 6.02381 20.3861 5.34904 20.3861 4.51666C20.3861 3.68429 21.0609 3.00952 21.8932 3.00952C22.7256 3.00952 23.4004 3.68429 23.4004 4.51666Z"
                fill="white"
              ></path>
              <path
                d="M28.001 4.51666C28.001 5.34904 27.3262 6.02381 26.4938 6.02381C25.6615 6.02381 24.9867 5.34904 24.9867 4.51666C24.9867 3.68429 25.6615 3.00952 26.4938 3.00952C27.3262 3.00952 28.001 3.68429 28.001 4.51666Z"
                fill="white"
              ></path>
              <path
                d="M25.8965 17.8048L18.7745 14.1355V15.1944L24.7784 18.2038V18.2333L18.7745 21.2427V22.3016L25.8965 18.6323V17.8048Z"
                fill="#8220FF"
              ></path>
              <path d="M17.7753 22.9173L13.4953 11.791H12.4511L16.7509 22.9173H17.7803H17.7753Z" fill="#8220FF"></path>
              <path
                d="M4.36337 18.6471L11.4854 22.3016V21.2427L5.43708 18.2333V18.2038L11.4854 15.1944V14.1355L4.36337 17.7901V18.652V18.6471Z"
                fill="#8220FF"
              ></path>
            </svg>
            <h2 className="font-sans text-[#1d1d1f] dark:text-white font-semibold text-2xl md:text-3xl tracking-tight">
              Code Info
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Left Column - Metadata */}
            <div className="code-info-item opacity-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-full bg-[#f5f5f7] dark:bg-[#2c2c2e]">
                    <FileCode className="h-5 w-5 text-[#8220FF]" />
                  </div>
                  <h3 className="text-[#1d1d1f] dark:text-white font-medium">File Details</h3>
                </div>

                <InfoItem label="File" value="routes/vulnCodeFixes.ts" />
                <InfoItem label="Issue Owner" value="Björn" />
                <InfoItem label="Language" value="typescript" />
                <InfoItem label="Actual Line" value="80" />
                <InfoItem label="Start Column" value="36" />
                <InfoItem label="End Column" value="118" />

                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-full bg-[#f5f5f7] dark:bg-[#2c2c2e]">
                      <Hash className="h-5 w-5 text-[#8220FF]" />
                    </div>
                    <h3 className="text-[#1d1d1f] dark:text-white font-medium">SAST Info</h3>
                  </div>

                  <InfoItem label="SAST Source File" value="Not specified" />
                  <InfoItem label="SAST Source Line" value="Not specified" />
                  <InfoItem label="SAST Source Object" value="Not specified" />
                  <InfoItem label="SAST Sink Object" value="Not specified" />
                </div>
              </div>
            </div>

            {/* Right Column - Code */}
            <div className="col-span-1 md:col-span-3 code-info-item opacity-0">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-[#f5f5f7] dark:bg-[#2c2c2e]">
                    <Code className="h-5 w-5 text-[#8220FF]" />
                  </div>
                  <h3 className="text-[#1d1d1f] dark:text-white font-medium">Vulnerable Code</h3>
                </div>

                <a
                  href="https://github.com/plexicus/juice-shop/blob/master/routes/vulnCodeFixes.ts#L80"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#8220FF] hover:text-[#6a1acc] transition-colors"
                >
                  <span className="text-sm font-medium">View on GitHub</span>
                  <Github className="h-4 w-4" />
                </a>
              </div>

              <div className="relative rounded-xl overflow-hidden">
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={copyToClipboard}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors rounded-md px-3 py-1.5 text-xs text-white font-medium flex items-center gap-1.5"
                  >
                    {isCopied ? "Copied!" : "Copy code"}
                  </button>
                </div>

                {useSimpleRenderer ? (
                  <CodeBlock code={code} highlightLine={7} />
                ) : (
                  <div className="syntax-highlighter-wrapper">
                    {SyntaxHighlighter && CodeStyle && (
                      <SyntaxHighlighter
                        language="typescript"
                        style={CodeStyle}
                        customStyle={{
                          margin: 0,
                          borderRadius: "0.75rem",
                          fontSize: "14px",
                        }}
                        wrapLines={true}
                        lineProps={(lineNumber) => {
                          const style: React.CSSProperties = { display: "block" }
                          if (lineNumber === 7) {
                            style.backgroundColor = "rgba(255, 0, 0, 0.2)"
                            style.borderLeft = "3px solid #ff5555"
                          }
                          return { style }
                        }}
                      >
                        {code}
                      </SyntaxHighlighter>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-xl p-5">
                <h4 className="text-[#1d1d1f] dark:text-white font-medium mb-2 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
                      fill="#FF453A"
                    />
                    <path
                      d="M8 4C8.55228 4 9 4.44772 9 5V8C9 8.55228 8.55228 9 8 9C7.44772 9 7 8.55228 7 8V5C7 4.44772 7.44772 4 8 4Z"
                      fill="white"
                    />
                    <path
                      d="M9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z"
                      fill="white"
                    />
                  </svg>
                  Vulnerability Details
                </h4>
                <p className="text-[#86868b] dark:text-[#a1a1a6] text-sm">
                  This code contains a path traversal vulnerability. The application directly uses the user-provided{" "}
                  <code className="bg-[#e5e5ea] dark:bg-[#3a3a3c] px-1.5 py-0.5 rounded text-xs font-mono">key</code>{" "}
                  variable in a file path without proper validation. An attacker could potentially use directory
                  traversal sequences (like{" "}
                  <code className="bg-[#e5e5ea] dark:bg-[#3a3a3c] px-1.5 py-0.5 rounded text-xs font-mono">../</code>)
                  to access files outside the intended directory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

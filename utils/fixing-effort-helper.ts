// Types for fixing effort data
export type EffortLevel = "Very Low" | "Low" | "Moderate" | "High" | "Very High"
export type TimeEstimate = "Hours" | "1 Day" | "2-3 Days" | "1 Week" | "2+ Weeks"
export type ExpertiseLevel = "Junior" | "Mid-level" | "Senior" | "Specialist" | "Expert Team"
export type OWASPCategory = "A01" | "A02" | "A03" | "A04" | "A05" | "A06" | "A07" | "A08" | "A09" | "A10" | undefined

export interface EffortComponent {
  name: string
  score: number
  level: EffortLevel
  description: string
  icon: string // Lucide icon name
}

export interface ResourceAllocation {
  developers: string
  qa: string
  securityReview: string
  totalEffort: string
}

export interface FixingEffortDetails {
  overallScore: number
  overallLevel: EffortLevel
  overallDescription: string
  timeEstimate: TimeEstimate
  expertiseRequired: ExpertiseLevel
  components: EffortComponent[]
  recommendations: string[]
  resourceAllocation: ResourceAllocation
  owaspCategory?: OWASPCategory
}

// Constants for effort levels
export const EFFORT_LEVELS = {
  VERY_LOW: "Very Low",
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  VERY_HIGH: "Very High",
} as const

// Constants for time estimates
export const TIME_ESTIMATES = {
  HOURS: "Hours",
  ONE_DAY: "1 Day",
  FEW_DAYS: "2-3 Days",
  ONE_WEEK: "1 Week",
  MULTIPLE_WEEKS: "2+ Weeks",
} as const

// Constants for expertise levels
export const EXPERTISE_LEVELS = {
  JUNIOR: "Junior",
  MID_LEVEL: "Mid-level",
  SENIOR: "Senior",
  SPECIALIST: "Specialist",
  EXPERT_TEAM: "Expert Team",
} as const

// Component names
export const EFFORT_COMPONENTS = {
  TECHNICAL_COMPLEXITY: "Technical Complexity",
  TESTING_REQUIREMENTS: "Testing Requirements",
  DEPLOYMENT_COMPLEXITY: "Deployment Complexity",
  REQUIRED_EXPERTISE: "Required Expertise",
  TIME_ESTIMATION: "Time Estimation",
} as const

// Icon names (from Lucide)
export const COMPONENT_ICONS = {
  TECHNICAL_COMPLEXITY: "Code",
  TESTING_REQUIREMENTS: "FileCode",
  DEPLOYMENT_COMPLEXITY: "Server",
  REQUIRED_EXPERTISE: "Users",
  TIME_ESTIMATION: "Clock",
} as const

// OWASP Categories with descriptions
export const OWASP_CATEGORIES = {
  A01: "Broken Access Control",
  A02: "Cryptographic Failures",
  A03: "Injection",
  A04: "Insecure Design",
  A05: "Security Misconfiguration",
  A06: "Vulnerable and Outdated Components",
  A07: "Identification and Authentication Failures",
  A08: "Software and Data Integrity Failures",
  A09: "Security Logging and Monitoring Failures",
  A10: "Server-Side Request Forgery (SSRF)",
} as const

/**
 * Maps a numeric score to an effort level
 */
export function getEffortLevel(score: number): EffortLevel {
  if (score < 20) return EFFORT_LEVELS.VERY_LOW
  if (score < 40) return EFFORT_LEVELS.LOW
  if (score < 60) return EFFORT_LEVELS.MODERATE
  if (score < 80) return EFFORT_LEVELS.HIGH
  return EFFORT_LEVELS.VERY_HIGH
}

/**
 * Maps a numeric score to a time estimate
 */
export function getTimeEstimate(score: number): TimeEstimate {
  if (score < 20) return TIME_ESTIMATES.HOURS
  if (score < 40) return TIME_ESTIMATES.ONE_DAY
  if (score < 60) return TIME_ESTIMATES.FEW_DAYS
  if (score < 80) return TIME_ESTIMATES.ONE_WEEK
  return TIME_ESTIMATES.MULTIPLE_WEEKS
}

/**
 * Maps a numeric score to an expertise level
 */
export function getExpertiseLevel(score: number): ExpertiseLevel {
  if (score < 20) return EXPERTISE_LEVELS.JUNIOR
  if (score < 40) return EXPERTISE_LEVELS.MID_LEVEL
  if (score < 60) return EXPERTISE_LEVELS.SENIOR
  if (score < 80) return EXPERTISE_LEVELS.SPECIALIST
  return EXPERTISE_LEVELS.EXPERT_TEAM
}

/**
 * Gets a description for technical complexity based on score
 */
export function getTechnicalComplexityDescription(score: number): string {
  if (score < 20) return "Simple code changes with minimal impact."
  if (score < 40) return "Requires changes to input validation logic and query construction."
  if (score < 60) return "Significant refactoring of existing code and architecture changes."
  if (score < 80) return "Complex changes across multiple components and services."
  return "Fundamental architectural changes requiring deep system knowledge."
}

/**
 * Gets a description for testing requirements based on score
 */
export function getTestingRequirementsDescription(score: number): string {
  if (score < 20) return "Basic unit tests sufficient to verify fix."
  if (score < 40) return "Needs unit tests and integration tests to verify fix effectiveness."
  if (score < 60) return "Comprehensive testing including regression, integration, and security tests."
  if (score < 80) return "Extensive testing across multiple environments with performance validation."
  return "Complete test suite overhaul with specialized security penetration testing."
}

/**
 * Gets a description for deployment complexity based on score
 */
export function getDeploymentComplexityDescription(score: number): string {
  if (score < 20) return "Standard deployment process with minimal risk of service disruption."
  if (score < 40) return "Requires careful deployment planning and potential service window."
  if (score < 60) return "Coordinated deployment across multiple services with rollback plan."
  if (score < 80) return "Complex deployment requiring database migrations and downtime."
  return "Major system overhaul requiring phased deployment and extensive monitoring."
}

/**
 * Gets a description for required expertise based on score
 */
export function getRequiredExpertiseDescription(score: number): string {
  if (score < 20) return "Junior developer with basic security awareness."
  if (score < 40) return "Mid-level developer with SQL injection prevention knowledge."
  if (score < 60) return "Senior developer with security specialization."
  if (score < 80) return "Security specialist with domain-specific expertise."
  return "Cross-functional team of security experts and senior developers."
}

/**
 * Gets a description for time estimation based on score
 */
export function getTimeEstimationDescription(score: number): string {
  if (score < 20) return "Estimated few hours for implementation and testing."
  if (score < 40) return "Estimated 2-3 days for implementation, testing, and deployment."
  if (score < 60) return "Estimated 1 week for complete implementation and verification."
  if (score < 80) return "Estimated 2 weeks including planning, implementation, and testing."
  return "Estimated 3+ weeks for comprehensive solution development and deployment."
}

/**
 * Gets overall description based on score
 */
export function getOverallDescription(score: number): string {
  if (score < 20) {
    return "This vulnerability requires minimal effort to fix, with a straightforward solution that can be implemented quickly."
  }
  if (score < 40) {
    return "This vulnerability requires a moderate level of effort to fix, with an estimated 2-3 days of development time."
  }
  if (score < 60) {
    return "This vulnerability requires significant effort to address properly, involving multiple components and careful testing."
  }
  if (score < 80) {
    return "This vulnerability requires substantial effort to fix, with complex changes across the system and extensive testing requirements."
  }
  return "This vulnerability requires a major effort to address, involving architectural changes, specialized expertise, and extensive testing."
}

/**
 * Gets OWASP-specific recommendations
 */
export function getOWASPRecommendations(category: OWASPCategory): string[] {
  switch (category) {
    case "A01": // Broken Access Control
      return [
        "Implement proper access control checks at all entry points",
        "Use role-based access control (RBAC) consistently",
        "Deny access by default, then explicitly allow for specific roles",
        "Implement server-side validation of access rights",
        "Rate limit API and controller access to minimize harm from automated attacks",
        "Invalidate JWT tokens on server after logout",
        "Implement proper session management with timeouts and rotation",
      ]
    case "A02": // Cryptographic Failures
      return [
        "Classify data processed, stored, or transmitted by the application",
        "Use strong, up-to-date encryption algorithms and protocols (TLS 1.3, AES-256)",
        "Store passwords using strong adaptive and salted hashing functions (Argon2, PBKDF2, bcrypt)",
        "Disable caching for responses containing sensitive data",
        "Enforce encryption using directives like HTTP Strict Transport Security (HSTS)",
        "Use a vetted cryptographic library or API, not custom implementations",
        "Verify independently the effectiveness of configuration and settings",
      ]
    case "A03": // Injection
      return [
        "Use parameterized queries or prepared statements for database access",
        "Use positive server-side input validation with appropriate encoding",
        "Escape special characters using the specific syntax for the target interpreter",
        "Use LIMIT and other SQL controls within queries to prevent mass disclosure",
        "Implement proper input sanitization for all user-supplied data",
        "Consider using an ORM framework to create SQL queries with parameterization",
        "Use Content Security Policy (CSP) to prevent XSS attacks",
      ]
    case "A04": // Insecure Design
      return [
        "Establish and use a secure development lifecycle with security professionals",
        "Use threat modeling for critical authentication, access control, business logic, and key flows",
        "Integrate security language and controls into user stories",
        "Write unit and integration tests to validate security controls",
        "Segment application architecture by trust boundaries",
        "Limit resource consumption by user or service",
        "Implement domain-driven design principles to model security controls",
      ]
    case "A05": // Security Misconfiguration
      return [
        "Implement a repeatable hardening process with fast and easy deployment",
        "Review and update configurations across the entire application stack",
        "Remove or disable unnecessary features, components, and documentation",
        "Automate verification of configurations in all environments",
        "Implement segmented application architecture with separation of components",
        "Send security directives to clients (e.g., Security Headers)",
        "Verify effectiveness of configurations in each environment",
      ]
    case "A06": // Vulnerable and Outdated Components
      return [
        "Remove unused dependencies, unnecessary features, and documentation",
        "Continuously inventory versions of client-side and server-side components",
        "Monitor for vulnerabilities in components via automated tools",
        "Only obtain components from official sources over secure links",
        "Monitor for unmaintained libraries and components without security patches",
        "Establish a patch management process to remove unused components",
        "Ensure compatibility of updated, upgraded, or patched libraries",
      ]
    case "A07": // Identification and Authentication Failures
      return [
        "Implement multi-factor authentication to prevent automated credential stuffing",
        "Do not ship or deploy with default credentials",
        "Implement weak-password checks against a list of known weak passwords",
        "Align password length, complexity, and rotation policies with NIST 800-63b",
        "Ensure registration, credential recovery, and API pathways are hardened against account enumeration",
        "Limit or increasingly delay failed login attempts",
        "Use a server-side, secure, built-in session manager that generates a new random session ID",
      ]
    case "A08": // Software and Data Integrity Failures
      return [
        "Use digital signatures to verify software or data authenticity",
        "Ensure libraries and dependencies are from trusted repositories",
        "Use a software supply chain security tool to verify components",
        "Implement a review process for code and configuration changes",
        "Ensure CI/CD pipeline has proper segregation and configuration",
        "Ensure unsigned or unencrypted serialized data is not sent to untrusted clients",
        "Verify data integrity with digital signatures or similar mechanisms",
      ]
    case "A09": // Security Logging and Monitoring Failures
      return [
        "Ensure all login, access control, and server-side input validation failures are logged",
        "Ensure logs are generated in a format easily consumed by log management solutions",
        "Ensure log data is encoded correctly to prevent injections or attacks",
        "Ensure high-value transactions have an audit trail with integrity controls",
        "Establish effective monitoring and alerting to detect suspicious activities",
        "Establish or adopt an incident response and recovery plan",
        "Use a SIEM system for real-time security event monitoring",
      ]
    case "A10": // Server-Side Request Forgery (SSRF)
      return [
        "Sanitize and validate all client-supplied input data",
        "Enforce URL schema, port, and destination with a positive allow list",
        "Do not send raw responses to clients",
        "Disable HTTP redirections",
        "Be aware of URL consistency to prevent attacks using URL parsing confusion",
        "Segregate remote resource access functionality in separate networks",
        "Implement firewall policies or network access control rules to block all but essential traffic",
      ]
    default:
      return []
  }
}

/**
 * Gets recommendations based on score and OWASP category
 */
export function getRecommendations(score: number, owaspCategory?: OWASPCategory): string[] {
  // Base recommendations that apply to most vulnerabilities
  const baseRecommendations = [
    "Use parameterized queries instead of string concatenation",
    "Implement input validation for all user-supplied data",
    "Apply principle of least privilege for database access",
  ]

  // Get OWASP-specific recommendations if category is provided
  const categoryRecommendations = owaspCategory ? getOWASPRecommendations(owaspCategory) : []

  // Add more specific recommendations based on complexity
  let complexityRecommendations: string[] = []

  if (score < 40) {
    complexityRecommendations = [
      "Add comprehensive logging for security monitoring",
      "Consider using an ORM framework for safer database interactions",
    ]
  } else if (score < 60) {
    complexityRecommendations = [
      "Add comprehensive logging for security monitoring",
      "Consider using an ORM framework for safer database interactions",
      "Implement content security policy headers",
      "Add automated security scanning to CI/CD pipeline",
    ]
  } else if (score < 80) {
    complexityRecommendations = [
      "Add comprehensive logging for security monitoring",
      "Consider using an ORM framework for safer database interactions",
      "Implement content security policy headers",
      "Add automated security scanning to CI/CD pipeline",
      "Conduct a broader security review of similar components",
      "Consider implementing a web application firewall",
    ]
  } else {
    complexityRecommendations = [
      "Add comprehensive logging for security monitoring",
      "Consider using an ORM framework for safer database interactions",
      "Implement content security policy headers",
      "Add automated security scanning to CI/CD pipeline",
      "Conduct a broader security review of similar components",
      "Consider implementing a web application firewall",
      "Engage external security specialists for review",
      "Redesign affected components with security-first approach",
    ]
  }

  // Combine all recommendations and remove duplicates
  const allRecommendations = [...baseRecommendations, ...categoryRecommendations, ...complexityRecommendations]
  const uniqueRecommendations = Array.from(new Set(allRecommendations))

  // Limit to a reasonable number of recommendations (max 10)
  return uniqueRecommendations.slice(0, 10)
}

/**
 * Gets resource allocation based on score
 */
export function getResourceAllocation(score: number): ResourceAllocation {
  if (score < 20) {
    return {
      developers: "1 Junior Developer",
      qa: "1-2 Hours",
      securityReview: "1 Hour",
      totalEffort: "Few Hours",
    }
  } else if (score < 40) {
    return {
      developers: "1 Mid-level Developer",
      qa: "4-6 Hours",
      securityReview: "2 Hours",
      totalEffort: "2-3 Days",
    }
  } else if (score < 60) {
    return {
      developers: "1 Senior Developer",
      qa: "1-2 Days",
      securityReview: "4 Hours",
      totalEffort: "1 Week",
    }
  } else if (score < 80) {
    return {
      developers: "1-2 Senior Developers",
      qa: "2-3 Days",
      securityReview: "1 Day",
      totalEffort: "2 Weeks",
    }
  } else {
    return {
      developers: "Team of 2-3 Specialists",
      qa: "3-5 Days",
      securityReview: "2 Days",
      totalEffort: "3+ Weeks",
    }
  }
}

/**
 * Calculates component scores based on overall score
 * This adds some variation to make the breakdown more realistic
 */
export function calculateComponentScores(overallScore: number): Record<string, number> {
  // Add some variation to component scores while keeping the average close to the overall score
  const variation = 15 // Maximum variation from the overall score

  // Generate random variations within the specified range
  const technicalVariation = Math.floor(Math.random() * variation * 2) - variation
  const testingVariation = Math.floor(Math.random() * variation * 2) - variation
  const deploymentVariation = Math.floor(Math.random() * variation * 2) - variation
  const expertiseVariation = Math.floor(Math.random() * variation * 2) - variation
  const timeVariation = Math.floor(Math.random() * variation * 2) - variation

  // Calculate component scores with variations, ensuring they stay within 0-100 range
  const technicalScore = Math.max(0, Math.min(100, overallScore + technicalVariation))
  const testingScore = Math.max(0, Math.min(100, overallScore + testingVariation))
  const deploymentScore = Math.max(0, Math.min(100, overallScore + deploymentVariation))
  const expertiseScore = Math.max(0, Math.min(100, overallScore + expertiseVariation))
  const timeScore = Math.max(0, Math.min(100, overallScore + timeVariation))

  return {
    [EFFORT_COMPONENTS.TECHNICAL_COMPLEXITY]: technicalScore,
    [EFFORT_COMPONENTS.TESTING_REQUIREMENTS]: testingScore,
    [EFFORT_COMPONENTS.DEPLOYMENT_COMPLEXITY]: deploymentScore,
    [EFFORT_COMPONENTS.REQUIRED_EXPERTISE]: expertiseScore,
    [EFFORT_COMPONENTS.TIME_ESTIMATION]: timeScore,
  }
}

/**
 * Main function to generate complete fixing effort details based on a score
 */
export function generateFixingEffortDetails(score: number, owaspCategory?: OWASPCategory): FixingEffortDetails {
  // Ensure score is within valid range
  const validScore = Math.max(0, Math.min(100, score))

  // Get overall information
  const overallLevel = getEffortLevel(validScore)
  const overallDescription = getOverallDescription(validScore)
  const timeEstimate = getTimeEstimate(validScore)
  const expertiseRequired = getExpertiseLevel(validScore)

  // Calculate component scores
  const componentScores = calculateComponentScores(validScore)

  // Generate components
  const components: EffortComponent[] = [
    {
      name: EFFORT_COMPONENTS.TECHNICAL_COMPLEXITY,
      score: componentScores[EFFORT_COMPONENTS.TECHNICAL_COMPLEXITY],
      level: getEffortLevel(componentScores[EFFORT_COMPONENTS.TECHNICAL_COMPLEXITY]),
      description: getTechnicalComplexityDescription(componentScores[EFFORT_COMPONENTS.TECHNICAL_COMPLEXITY]),
      icon: COMPONENT_ICONS.TECHNICAL_COMPLEXITY,
    },
    {
      name: EFFORT_COMPONENTS.TESTING_REQUIREMENTS,
      score: componentScores[EFFORT_COMPONENTS.TESTING_REQUIREMENTS],
      level: getEffortLevel(componentScores[EFFORT_COMPONENTS.TESTING_REQUIREMENTS]),
      description: getTestingRequirementsDescription(componentScores[EFFORT_COMPONENTS.TESTING_REQUIREMENTS]),
      icon: COMPONENT_ICONS.TESTING_REQUIREMENTS,
    },
    {
      name: EFFORT_COMPONENTS.DEPLOYMENT_COMPLEXITY,
      score: componentScores[EFFORT_COMPONENTS.DEPLOYMENT_COMPLEXITY],
      level: getEffortLevel(componentScores[EFFORT_COMPONENTS.DEPLOYMENT_COMPLEXITY]),
      description: getDeploymentComplexityDescription(componentScores[EFFORT_COMPONENTS.DEPLOYMENT_COMPLEXITY]),
      icon: COMPONENT_ICONS.DEPLOYMENT_COMPLEXITY,
    },
    {
      name: EFFORT_COMPONENTS.REQUIRED_EXPERTISE,
      score: componentScores[EFFORT_COMPONENTS.REQUIRED_EXPERTISE],
      level: getEffortLevel(componentScores[EFFORT_COMPONENTS.REQUIRED_EXPERTISE]),
      description: getRequiredExpertiseDescription(componentScores[EFFORT_COMPONENTS.REQUIRED_EXPERTISE]),
      icon: COMPONENT_ICONS.REQUIRED_EXPERTISE,
    },
    {
      name: EFFORT_COMPONENTS.TIME_ESTIMATION,
      score: componentScores[EFFORT_COMPONENTS.TIME_ESTIMATION],
      level: getEffortLevel(componentScores[EFFORT_COMPONENTS.TIME_ESTIMATION]),
      description: getTimeEstimationDescription(componentScores[EFFORT_COMPONENTS.TIME_ESTIMATION]),
      icon: COMPONENT_ICONS.TIME_ESTIMATION,
    },
  ]

  // Get recommendations and resource allocation
  const recommendations = getRecommendations(validScore, owaspCategory)
  const resourceAllocation = getResourceAllocation(validScore)

  return {
    overallScore: validScore,
    overallLevel,
    overallDescription,
    timeEstimate,
    expertiseRequired,
    components,
    recommendations,
    resourceAllocation,
    owaspCategory,
  }
}

/**
 * Helper function to get a short summary of fixing effort
 * This is useful for displaying in cards or summaries
 */
export function getFixingEffortSummary(score: number): {
  level: EffortLevel
  timeEstimate: string
  expertiseLevel: string
} {
  const level = getEffortLevel(score)

  let timeEstimate = ""
  if (score < 20) timeEstimate = "Few hours"
  else if (score < 40) timeEstimate = "2-3 days"
  else if (score < 60) timeEstimate = "1 week"
  else if (score < 80) timeEstimate = "2 weeks"
  else timeEstimate = "3+ weeks"

  let expertiseLevel = ""
  if (score < 20) expertiseLevel = "Junior-level expertise"
  else if (score < 40) expertiseLevel = "Mid-level expertise"
  else if (score < 60) expertiseLevel = "Senior-level expertise"
  else if (score < 80) expertiseLevel = "Specialist expertise"
  else expertiseLevel = "Expert team required"

  return {
    level,
    timeEstimate,
    expertiseLevel,
  }
}

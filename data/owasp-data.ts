// OWASP Top 10 2021 Data
export const owaspTop10Data = [
  {
    id: "A01",
    title: "Broken Access Control",
    description:
      "Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of all data or performing a business function outside the user's limits.",
    examples: [
      "Violation of the principle of least privilege or deny by default",
      "Bypassing access control checks by modifying the URL",
      "Permitting viewing or editing someone else's account by providing its unique identifier",
      "Accessing API with missing access controls for POST, PUT and DELETE",
      "Elevation of privilege. Acting as a user without being logged in, or acting as an admin when logged in as a user",
    ],
    prevention: [
      "Implement access control mechanisms once and reuse them throughout the application",
      "Use the principle of deny by default, where access is only granted to specific users and roles",
      "Enforce record ownership rather than accepting that the user can create, read, update, or delete any record",
      "Disable web server directory listing and ensure file metadata and backup files are not present within web roots",
      "Log access control failures, alert admins when appropriate, and rate limit API and controller access",
    ],
  },
  {
    id: "A02",
    title: "Cryptographic Failures",
    description:
      "Cryptographic failures refer to weaknesses in cryptography, or the absence of cryptography altogether. These failures often lead to sensitive data exposure or system compromise.",
    examples: [
      "Passwords stored using reversible encryption or in plain text",
      "Old or weak cryptographic algorithms used by default or in older code",
      "Weak default crypto keys, weak random number generation, or proper key management/rotation",
      "Lack of encryption for sensitive data in transit or at rest",
      "Missing validation of server certificates and the certificate chain",
    ],
    prevention: [
      "Classify data processed, stored, or transmitted by an application",
      "Identify which data is sensitive according to privacy laws, regulatory requirements, or business needs",
      "Apply controls as per the classification",
      "Don't store sensitive data unnecessarily. Discard it as soon as possible",
      "Ensure up-to-date and strong standard algorithms, protocols, and keys are in place",
      "Encrypt all sensitive data at rest",
      "Encrypt all data in transit with secure protocols such as TLS with forward secrecy ciphers",
    ],
  },
  {
    id: "A03",
    title: "Injection",
    description:
      "Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query. The attacker's hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.",
    examples: [
      "SQL injection: User-supplied data is not validated and directly included in SQL queries",
      "Cross-site scripting (XSS): Application includes unvalidated and unescaped user input as part of HTML output",
      "LDAP injection: User input is directly used to construct LDAP statements",
      "Command injection: User-provided data is passed to system commands without proper sanitization",
      "ORM injection: Using ORM libraries that don't adequately escape parameters",
    ],
    prevention: [
      "Use a safe API, which avoids using the interpreter entirely or provides a parameterized interface",
      "Use positive server-side input validation",
      "For any residual dynamic queries, escape special characters using the specific escape syntax for that interpreter",
      "Use LIMIT and other SQL controls within queries to prevent mass disclosure of records in case of SQL injection",
      "Use automated testing tools to verify the effectiveness of your defenses",
    ],
  },
  {
    id: "A04",
    title: "Insecure Design",
    description:
      "Insecure design refers to risks related to design and architectural flaws, with a call for more use of threat modeling, secure design patterns, and reference architectures. It's about building security in from the beginning rather than trying to patch it in later.",
    examples: [
      "A banking application that doesn't include defense in depth against financial fraud",
      "A healthcare application that doesn't protect against insider threats",
      "An e-commerce site that doesn't have protection against automated threats or bad bots",
      "Applications built without considering the user's security context",
      "Systems designed without proper data validation or business logic validation",
    ],
    prevention: [
      "Establish and use a secure development lifecycle with AppSec professionals to help evaluate and design security and privacy-related controls",
      "Establish and use a library of secure design patterns or paved road components",
      "Use threat modeling for critical authentication, access control, business logic, and key flows",
      "Integrate security language and controls into user stories",
      "Write unit and integration tests to validate that all critical flows are resistant to the threat model",
      "Segregate tier layers on the system and network layers depending on the exposure and protection needs",
    ],
  },
  {
    id: "A05",
    title: "Security Misconfiguration",
    description:
      "Security misconfiguration is the most commonly seen issue, often resulting from insecure default configurations, incomplete or ad hoc configurations, open cloud storage, misconfigured HTTP headers, and verbose error messages containing sensitive information.",
    examples: [
      "Missing appropriate security hardening across any part of the application stack",
      "Improperly configured permissions on cloud services",
      "Unnecessary features enabled or installed (e.g., unnecessary ports, services, pages, accounts, or privileges)",
      "Default accounts and their passwords still enabled and unchanged",
      "Error handling revealing stack traces or other overly informative error messages to users",
    ],
    prevention: [
      "A repeatable hardening process makes it fast and easy to deploy another environment that is properly locked down",
      "A minimal platform without any unnecessary features, components, documentation, and samples",
      "A task to review and update the configurations appropriate to all security notes, updates, and patches",
      "A segmented application architecture providing effective and secure separation between components",
      "Sending security directives to clients, e.g., Security Headers",
      "An automated process to verify the effectiveness of the configurations and settings in all environments",
    ],
  },
  {
    id: "A06",
    title: "Vulnerable and Outdated Components",
    description:
      "Components, such as libraries, frameworks, and other software modules, run with the same privileges as the application. If a vulnerable component is exploited, such an attack can facilitate serious data loss or server takeover.",
    examples: [
      "Not knowing the versions of all components you use (both client-side and server-side)",
      "Software being vulnerable, unsupported, or out of date",
      "Not scanning for vulnerabilities regularly and subscribing to security bulletins",
      "Not fixing or upgrading the underlying platform, frameworks, and dependencies in a risk-based, timely fashion",
      "Not securing the components' configurations",
    ],
    prevention: [
      "Remove unused dependencies, unnecessary features, components, files, and documentation",
      "Continuously inventory the versions of both client-side and server-side components and their dependencies",
      "Only obtain components from official sources over secure links",
      "Monitor for libraries and components that are unmaintained or do not create security patches for older versions",
      "Set up a patch management process to remove unused components, upgrade vulnerable components, and apply security patches",
    ],
  },
  {
    id: "A07",
    title: "Identification and Authentication Failures",
    description:
      "Confirmation of the user's identity, authentication, and session management is critical to protect against authentication-related attacks. Authentication failures can allow attackers to compromise passwords, keys, or session tokens, or exploit implementation flaws to assume other users' identities temporarily or permanently.",
    examples: [
      "Permitting automated attacks such as credential stuffing",
      "Permitting brute force or other automated attacks",
      "Permitting default, weak, or well-known passwords",
      "Using weak or ineffective credential recovery and forgot-password processes",
      "Using plain text, encrypted, or weakly hashed passwords",
    ],
    prevention: [
      "Where possible, implement multi-factor authentication to prevent automated credential stuffing, brute force, and stolen credential reuse attacks",
      "Do not ship or deploy with any default credentials, particularly for admin users",
      "Implement weak password checks, such as testing new or changed passwords against the top 10,000 worst passwords list",
      "Align password length, complexity, and rotation policies with NIST 800-63b's guidelines in section 5.1.1 for Memorized Secrets",
      "Ensure registration, credential recovery, and API pathways are hardened against account enumeration attacks",
    ],
  },
  {
    id: "A08",
    title: "Software and Data Integrity Failures",
    description:
      "Software and data integrity failures relate to code and infrastructure that does not protect against integrity violations. This can happen when an application relies on plugins, libraries, or modules from untrusted sources, repositories, and content delivery networks (CDNs).",
    examples: [
      "Using untrusted CDNs or repositories for critical components",
      "An insecure CI/CD pipeline introducing the potential for unauthorized access",
      "Auto-update functionality without sufficient integrity verification",
      "Applications relying on plugins from untrusted sources",
      "Unsigned or unencrypted serialized data being sent to untrusted clients without verification or integrity checks",
    ],
    prevention: [
      "Use digital signatures or similar mechanisms to verify the software or data is from the expected source and has not been altered",
      "Ensure libraries and dependencies are consuming trusted repositories. If you have a higher risk profile, consider hosting an internal known-good repository",
      "Ensure that a software supply chain security tool, such as OWASP Dependency Check or OWASP CycloneDX, is used to verify that components do not contain known vulnerabilities",
      "Ensure that there is a review process for code and configuration changes to minimize the chance that malicious code or configuration could be introduced into your software pipeline",
    ],
  },
  {
    id: "A09",
    title: "Security Logging and Monitoring Failures",
    description:
      "This category helps detect, escalate, and respond to active breaches. Without logging and monitoring, breaches cannot be detected. Insufficient logging, detection, monitoring, and active response occurs any time security-relevant events are not logged, monitored, or acted upon.",
    examples: [
      "Auditable events, such as logins, failed logins, and high-value transactions, are not logged",
      "Warnings and errors generate no, inadequate, or unclear log messages",
      "Logs of applications and APIs are not monitored for suspicious activity",
      "Logs are only stored locally",
      "Appropriate alerting thresholds and response escalation processes are not in place",
    ],
    prevention: [
      "Ensure all login, access control, and server-side input validation failures can be logged with sufficient user context to identify suspicious or malicious accounts",
      "Ensure that logs are generated in a format that log management solutions can easily consume",
      "Ensure log data is encoded correctly to prevent injections or attacks on the logging or monitoring systems",
      "Ensure high-value transactions have an audit trail with integrity controls to prevent tampering or deletion",
      "Establish or adopt an incident response and recovery plan",
    ],
  },
  {
    id: "A10",
    title: "Server-Side Request Forgery (SSRF)",
    description:
      "SSRF flaws occur whenever a web application is fetching a remote resource without validating the user-supplied URL. It allows an attacker to coerce the application to send a crafted request to an unexpected destination, even when protected by a firewall, VPN, or another type of network access control list (ACL).",
    examples: [
      "An application that allows users to input URLs that are then fetched by the server",
      "Webhooks that fetch user-specified URLs",
      "Applications that convert user-supplied URLs to PDF or image files",
      "Applications that embed user-supplied URLs in API requests",
      "Internal services exposed through SSRF vulnerabilities",
    ],
    prevention: [
      "Sanitize and validate all client-supplied input data",
      "Enforce the URL schema, port, and destination with a positive allow list",
      "Do not send raw responses to clients",
      "Disable HTTP redirections",
      "Be aware of URL consistency to avoid attacks such as DNS rebinding and 'time of check, time of use' (TOCTOU) race conditions",
      "Segregate remote resource access functionality in separate networks to reduce the impact of SSRF",
    ],
  },
]

// OWASP CI/CD Security Risks Data
export const owaspCiCdData = [
  {
    id: "CICD-SEC-1",
    title: "Insufficient Flow Control Mechanisms",
    description:
      "Insufficient flow control mechanisms in CI/CD pipelines can allow attackers to manipulate the build and deployment process, potentially leading to unauthorized code execution or deployment of malicious artifacts.",
    examples: [
      "Lack of proper branch protection rules allowing direct commits to production branches",
      "Missing approval processes for critical pipeline stages",
      "Insufficient separation between development, testing, and production environments",
      "Allowing the same person to write code, review it, and deploy it",
      "Missing controls for emergency changes or hotfixes",
    ],
    prevention: [
      "Implement branch protection rules requiring code reviews before merging",
      "Enforce separation of duties for code writing, reviewing, and deployment",
      "Require multiple approvals for production deployments",
      "Implement automated quality gates that must pass before proceeding to the next pipeline stage",
      "Log and monitor all pipeline activities, especially those that bypass normal flow controls",
    ],
  },
  {
    id: "CICD-SEC-2",
    title: "Inadequate Identity and Access Management",
    description:
      "Inadequate identity and access management in CI/CD pipelines can lead to unauthorized access to build systems, deployment environments, and sensitive credentials, potentially resulting in code tampering or unauthorized deployments.",
    examples: [
      "Using shared accounts for CI/CD systems instead of individual identities",
      "Overly permissive access to pipeline configurations and secrets",
      "Lack of regular access reviews for CI/CD systems",
      "Missing or weak authentication for pipeline triggers",
      "Insufficient credential rotation policies",
    ],
    prevention: [
      "Implement the principle of least privilege for all CI/CD access",
      "Use individual named accounts with strong authentication for all CI/CD activities",
      "Regularly audit and rotate access credentials",
      "Implement just-in-time access for privileged operations",
      "Use federated identity management with strong authentication requirements",
    ],
  },
  {
    id: "CICD-SEC-3",
    title: "Dependency Chain Abuse",
    description:
      "Dependency chain abuse occurs when attackers compromise the software supply chain by injecting malicious code into dependencies that are automatically incorporated into the build process.",
    examples: [
      "Using dependencies from untrusted sources",
      "Not verifying the integrity of downloaded packages",
      "Missing vulnerability scanning for dependencies",
      "Using dependencies with known vulnerabilities",
      "Not pinning dependency versions, allowing for potential future compromises",
    ],
    prevention: [
      "Use a private artifact repository with vetted dependencies",
      "Implement software composition analysis (SCA) in the pipeline",
      "Verify integrity of dependencies using checksums or signatures",
      "Pin dependency versions to prevent unexpected updates",
      "Regularly scan for and remediate vulnerabilities in dependencies",
    ],
  },
  {
    id: "CICD-SEC-4",
    title: "Poisoned Pipeline Execution",
    description:
      "Poisoned pipeline execution occurs when an attacker is able to manipulate the CI/CD pipeline configuration or execution environment to run malicious commands during the build or deployment process.",
    examples: [
      "Injecting malicious commands into build scripts",
      "Modifying pipeline configuration files to execute unauthorized code",
      "Exploiting pipeline plugins with security vulnerabilities",
      "Tampering with build environments to introduce backdoors",
      "Manipulating environment variables used during builds",
    ],
    prevention: [
      "Validate and lock pipeline configurations with integrity checks",
      "Use trusted and minimal build environments, preferably ephemeral containers",
      "Implement controls to prevent modification of pipeline definitions without approval",
      "Scan pipeline configurations for security issues",
      "Monitor and alert on unexpected pipeline behavior or configuration changes",
    ],
  },
  {
    id: "CICD-SEC-5",
    title: "Insufficient RBAC",
    description:
      "Insufficient Role-Based Access Control (RBAC) in CI/CD systems can allow unauthorized users to access, modify, or execute pipelines, potentially leading to unauthorized code deployment or credential exposure.",
    examples: [
      "Granting administrative access to all pipeline users",
      "Missing role separation between development and operations teams",
      "Insufficient granularity in permission models",
      "Not restricting access to sensitive pipeline components",
      "Allowing all users to modify pipeline configurations",
    ],
    prevention: [
      "Implement fine-grained RBAC for all CI/CD systems",
      "Define clear roles with minimum necessary permissions",
      "Regularly audit role assignments and permissions",
      "Implement approval workflows for sensitive operations",
      "Use separate roles for pipeline execution versus pipeline configuration",
    ],
  },
  {
    id: "CICD-SEC-6",
    title: "Insufficient Credential Hygiene",
    description:
      "Insufficient credential hygiene refers to poor practices in managing secrets, tokens, and credentials used within CI/CD pipelines, potentially leading to credential leakage and unauthorized access.",
    examples: [
      "Hardcoding secrets in pipeline configurations or scripts",
      "Storing unencrypted credentials in repositories",
      "Using long-lived credentials instead of temporary ones",
      "Exposing secrets in build logs or environment variables",
      "Sharing credentials across different environments or projects",
    ],
    prevention: [
      "Use a secure secrets management solution integrated with the CI/CD platform",
      "Implement just-in-time credential issuance with short expiration times",
      "Scan for leaked credentials in code and configurations",
      "Rotate credentials regularly and after suspected compromises",
      "Use different credentials for different environments and limit their scope",
    ],
  },
  {
    id: "CICD-SEC-7",
    title: "Insecure System Configuration",
    description:
      "Insecure system configuration in CI/CD infrastructure can create vulnerabilities that allow attackers to compromise build systems, manipulate artifacts, or gain unauthorized access to deployment environments.",
    examples: [
      "Running CI/CD systems with unnecessary elevated privileges",
      "Missing security patches on build servers",
      "Inadequate network segmentation for build infrastructure",
      "Insecure default configurations in CI/CD tools",
      "Lack of monitoring and logging for system changes",
    ],
    prevention: [
      "Harden all CI/CD infrastructure following security best practices",
      "Regularly patch and update all CI/CD components",
      "Use infrastructure as code with security validations",
      "Implement network segmentation to isolate build environments",
      "Regularly scan for misconfigurations and vulnerabilities in CI/CD infrastructure",
    ],
  },
  {
    id: "CICD-SEC-8",
    title: "Ungoverned Usage of 3rd Party Services",
    description:
      "Ungoverned usage of third-party services in CI/CD pipelines can introduce security risks through unvetted integrations, potentially exposing sensitive code or credentials to unauthorized parties.",
    examples: [
      "Using third-party CI/CD plugins without security review",
      "Integrating external services that have access to source code",
      "Missing data protection agreements with third-party providers",
      "Allowing third-party services to access production environments",
      "Insufficient monitoring of third-party service activities",
    ],
    prevention: [
      "Implement a vetting process for all third-party CI/CD integrations",
      "Limit the permissions granted to external services",
      "Regularly audit and review third-party access",
      "Use data protection agreements with all service providers",
      "Monitor and log all activities performed by third-party integrations",
    ],
  },
  {
    id: "CICD-SEC-9",
    title: "Improper Artifact Integrity Validation",
    description:
      "Improper artifact integrity validation can allow attackers to tamper with build outputs or substitute malicious artifacts during the deployment process, potentially leading to the deployment of unauthorized or malicious code.",
    examples: [
      "Missing digital signatures for build artifacts",
      "Not verifying checksums during artifact transfers",
      "Lack of traceability between source code and deployed artifacts",
      "Insufficient protection of artifact repositories",
      "Missing validation of artifacts before deployment",
    ],
    prevention: [
      "Digitally sign all build artifacts",
      "Implement checksums and verify them at each transfer point",
      "Use tamper-evident logs for build processes",
      "Secure artifact repositories with strong access controls",
      "Implement a chain of custody for artifacts from build to deployment",
    ],
  },
  {
    id: "CICD-SEC-10",
    title: "Insufficient Logging and Visibility",
    description:
      "Insufficient logging and visibility in CI/CD pipelines can prevent the detection of security incidents, unauthorized changes, or malicious activities, making it difficult to respond to or investigate security breaches.",
    examples: [
      "Missing logs for pipeline executions and configuration changes",
      "Insufficient detail in build and deployment logs",
      "Lack of centralized logging for CI/CD activities",
      "No monitoring for suspicious pipeline behaviors",
      "Inadequate retention of security-relevant logs",
    ],
    prevention: [
      "Implement comprehensive logging for all CI/CD activities",
      "Centralize logs in a secure, tamper-resistant system",
      "Set up alerts for suspicious or unauthorized activities",
      "Maintain audit logs for all configuration changes",
      "Establish appropriate log retention policies based on compliance requirements",
    ],
  },
]

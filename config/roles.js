/*
 * Interview Prep Builder — team-editable config.
 *
 * This is the file your team should edit as you learn more from account
 * managers, debriefs and candidate feedback. No build step: change it, commit,
 * and GitHub Pages picks it up.
 *
 *   client    → company name, values (used for behavioral prompts), general notes
 *   rounds    → what each interview round usually looks like
 *   roles     → one entry per job family that shows up in the dropdown
 *   skills    → keywords detected in JDs/resumes, each with questions + prep tips
 *
 * Anything marked "reported" is what candidates and recruiters commonly
 * describe; confirm with the AM when you can and update it here.
 */
window.PREP_CONFIG = {
  client: {
    name: "Walmart",
    values: [
      {
        name: "Serve our customers and members",
        prompts: [
          "Tell me about a time you changed your plan because of what a customer or end user actually needed.",
          "Describe a feature or fix you shipped that measurably improved the customer experience.",
        ],
      },
      {
        name: "Respect the individual",
        prompts: [
          "Tell me about a disagreement with a teammate. How did you handle it and what was the outcome?",
          "Describe a time you helped a newer team member get up to speed.",
        ],
      },
      {
        name: "Act with integrity",
        prompts: [
          "Tell me about a mistake you made in production or on a project. What did you do next?",
          "Describe a time you pushed back on a deadline or request because it wasn't the right call.",
        ],
      },
      {
        name: "Strive for excellence",
        prompts: [
          "Tell me about something you improved that nobody asked you to improve.",
          "Describe the hardest technical or business problem you've solved in the last two years.",
        ],
      },
    ],
    generalNotes: [
      "Scale is the theme: be ready to talk about traffic, data volume, peak events (holiday, Black Friday) and reliability.",
      "Expect behavioral questions in nearly every round, including technical ones. Have 5–6 STAR stories ready.",
      "Teams are frequently hybrid with India/Global Tech counterparts — collaboration across time zones is a fair topic.",
      "Know the business context of the team if the AM shares it (e.g., supply chain, e-commerce, stores, Sam's Club, fintech, ads).",
    ],
  },

  rounds: {
    recruiter: {
      label: "Recruiter / AM screen",
      expect: "15–30 min. Background walkthrough, rate/location/availability, visa, why this role. Low technical depth.",
      focus: ["Crisp 2-minute intro", "Availability and logistics", "Top 3 skills that match the JD"],
    },
    screen: {
      label: "Hiring manager screen",
      expect: "30–45 min with the hiring manager. Resume deep-dive, project ownership, a few technical and behavioral questions.",
      focus: ["Ownership of past projects", "Why you fit this team", "Clear technical explanations without jargon overload"],
    },
    technical: {
      label: "Technical round",
      expect: "45–60 min. Live coding and/or deep technical Q&A on the JD stack. Camera on; screen share or shared editor is common.",
      focus: ["Think out loud", "Clarify before coding", "Test your code with examples", "Know your resume tech cold"],
    },
    design: {
      label: "System design round",
      expect: "45–60 min. Design a large-scale system end to end; trade-offs matter more than a 'right' answer.",
      focus: ["Requirements and scale first", "High-level diagram, then deep-dive", "Data model, caching, failure modes"],
    },
    panel: {
      label: "Panel / loop",
      expect: "Multiple interviewers back to back or together. Mix of technical, behavioral and team-fit.",
      focus: ["Consistent stories across interviewers", "Energy over a long block", "Address every panelist"],
    },
    final: {
      label: "Final / leadership round",
      expect: "30–45 min with a director or senior leader. Impact, judgment, culture fit, how you work.",
      focus: ["Business impact with numbers", "Values-based stories", "Thoughtful questions about the org"],
    },
  },

  roles: {
    "swe-backend": {
      label: "Software Engineer — Backend (Java / Spring)",
      family: "engineering",
      summary: "Builds services and APIs behind Walmart's e-commerce, stores and supply-chain platforms. Java/Spring Boot, microservices, messaging and cloud-native deployment are typical.",
      loop: "Reported: coding round (DSA, often in Java), backend deep-dive (Spring, REST, DBs, Kafka), system design for Senior+, behavioral throughout.",
      coding: {
        expected: true,
        style: "Live coding in a shared editor or online assessment (HackerRank/CodeSignal style). Usually LeetCode easy–medium; Senior may get medium–hard.",
        languages: ["Java (preferred)", "Python or Kotlin sometimes accepted — confirm with AM"],
        topics: ["Arrays & strings", "HashMaps", "Two pointers / sliding window", "Trees & graphs (BFS/DFS)", "Heaps / top-K", "Java streams & collections", "Concurrency basics (threads, ExecutorService, CompletableFuture)"],
      },
      systemDesign: true,
      prepTopics: ["Spring Boot internals (DI, auto-config, profiles)", "REST API design & versioning", "Microservice patterns (circuit breaker, retries, idempotency)", "Kafka producers/consumers, partitions, ordering", "SQL vs NoSQL (Cassandra, Cosmos DB) trade-offs", "Caching (Redis/Memcached)", "Observability (logging, metrics, tracing)", "JVM memory and GC basics"],
      coreQuestions: [
        "Walk me through a service you built end to end. How was it deployed and monitored?",
        "How do you make an API idempotent? Where has that mattered for you?",
        "Explain how Spring dependency injection works and the difference between bean scopes.",
        "How would you troubleshoot a service whose p99 latency doubled overnight?",
        "What's the difference between HashMap and ConcurrentHashMap? When does it matter?",
      ],
      seniorQuestions: [
        "Design an inventory availability service for thousands of stores updating in near real time.",
        "How would you migrate a monolith endpoint to a microservice with zero downtime?",
        "How do you handle exactly-once processing (or approximate it) with Kafka?",
      ],
      questionsToAsk: [
        "What does the service ownership model look like — does the team own on-call?",
        "What does a typical peak-season readiness process look like for this team?",
      ],
    },

    "swe-frontend": {
      label: "Software Engineer — Frontend (React)",
      family: "engineering",
      summary: "Builds customer-facing and associate-facing web experiences. React, TypeScript, performance and accessibility at very large traffic.",
      loop: "Reported: JavaScript/React coding (build a component or solve a JS problem), frontend fundamentals Q&A, UI system design for Senior+, behavioral.",
      coding: {
        expected: true,
        style: "Live coding: either a DSA problem in JavaScript or building a small React component (search box, paginated list, form with validation).",
        languages: ["JavaScript / TypeScript"],
        topics: ["Closures, promises, async/await, event loop", "Debounce/throttle implementation", "Array/object manipulation", "React hooks & state management", "Fetching data with loading/error states"],
      },
      systemDesign: true,
      prepTopics: ["React rendering & reconciliation", "Hooks (useEffect pitfalls, useMemo/useCallback)", "State management (Redux, Context, React Query)", "Next.js / SSR vs CSR", "Web performance (Core Web Vitals, lazy loading, bundle size)", "Accessibility (WCAG, ARIA, keyboard nav)", "Testing (Jest, React Testing Library, Cypress)", "CSS layout (flexbox/grid), responsive design"],
      coreQuestions: [
        "What causes a React component to re-render, and how do you prevent unnecessary renders?",
        "Explain the JavaScript event loop. What runs first: a resolved promise or a setTimeout(0)?",
        "How would you improve the Largest Contentful Paint of a product page?",
        "How do you make a custom dropdown accessible?",
        "Implement debounce from scratch.",
      ],
      seniorQuestions: [
        "Design the frontend architecture for a product search page with filters, infinite scroll and personalization.",
        "How would you split a large frontend into micro-frontends? When would you not?",
        "How do you run A/B tests on the frontend without hurting performance?",
      ],
      questionsToAsk: [
        "Is there a shared component library / design system the team contributes to?",
        "How does the team measure frontend performance in production?",
      ],
    },

    "swe-fullstack": {
      label: "Software Engineer — Full Stack",
      family: "engineering",
      summary: "Owns features across UI, APIs and data. Usually React + Java or Node, with cloud deployment.",
      loop: "Reported: one coding round (DSA), a practical round touching both frontend and backend, design for Senior+, behavioral.",
      coding: {
        expected: true,
        style: "Live DSA coding plus possibly a practical exercise (build a small API + UI, or debug existing code).",
        languages: ["Java or JavaScript/TypeScript — confirm which with AM"],
        topics: ["Arrays, strings, hashmaps", "Trees/graphs basics", "REST endpoint design", "React state & data fetching"],
      },
      systemDesign: true,
      prepTopics: ["End-to-end request flow (browser → CDN → API → DB)", "REST/GraphQL", "Auth (OAuth2, JWT, sessions)", "SQL schema design", "React fundamentals", "CI/CD pipelines", "Containers & Kubernetes basics"],
      coreQuestions: [
        "Walk me through what happens from the time a user clicks 'Add to cart' to the item being saved.",
        "How do you secure an API that a React app calls?",
        "Tell me about a bug that spanned frontend and backend. How did you find it?",
        "How do you decide whether logic belongs in the client or the server?",
      ],
      seniorQuestions: [
        "Design a store pickup scheduling feature, UI through data model.",
        "How would you roll out a breaking API change while old app versions are still in use?",
      ],
      questionsToAsk: [
        "What's the split of frontend vs backend work on this team today?",
        "How are features released — feature flags, canaries, scheduled releases?",
      ],
    },

    mobile: {
      label: "Mobile Engineer (iOS / Android)",
      family: "engineering",
      summary: "Builds the Walmart and Sam's Club apps or associate-facing apps. Swift/SwiftUI or Kotlin/Jetpack Compose; some React Native.",
      loop: "Reported: coding round (DSA in Swift/Kotlin), platform deep-dive, mobile architecture design for Senior+, behavioral.",
      coding: {
        expected: true,
        style: "Live coding in the platform language; sometimes build a small screen (list + detail) or reason about existing code.",
        languages: ["Swift (iOS)", "Kotlin (Android)", "JavaScript if React Native"],
        topics: ["Arrays/strings/hashmaps", "Concurrency (GCD/async-await, coroutines)", "Lists & pagination", "Memory management"],
      },
      systemDesign: true,
      prepTopics: ["App architecture (MVVM, MVI, Clean)", "SwiftUI / Jetpack Compose", "Offline support & caching", "App performance and startup time", "Push notifications", "App release process, feature flags, crash monitoring", "Accessibility on mobile"],
      coreQuestions: [
        "Explain the architecture of an app you've worked on. Why that pattern?",
        "How do you avoid memory leaks / retain cycles?",
        "How would you build an image-heavy product list that scrolls smoothly?",
        "How do you handle the app going offline mid-checkout?",
      ],
      seniorQuestions: [
        "Design the mobile client for in-store item lookup that works with poor connectivity.",
        "How would you modularize a very large app so many teams can ship independently?",
      ],
      questionsToAsk: [
        "How often does the app release and how is the release train managed?",
        "How much of the UI is server-driven?",
      ],
    },

    "data-eng": {
      label: "Data Engineer",
      family: "data",
      summary: "Builds batch and streaming pipelines for analytics, ML and operations. Spark, SQL, Kafka, Airflow and cloud data platforms (GCP/Azure) are typical.",
      loop: "Reported: SQL round (heavy), Python/Scala coding, Spark/pipeline deep-dive, data modeling or pipeline design, behavioral.",
      coding: {
        expected: true,
        style: "SQL live problems (joins, window functions, aggregations) plus Python or Scala coding; sometimes a PySpark transformation.",
        languages: ["SQL", "Python", "Scala (some teams)"],
        topics: ["Window functions (ROW_NUMBER, LAG, running totals)", "Joins & dedup", "Python dicts/lists, file parsing", "PySpark DataFrame transforms"],
      },
      systemDesign: true,
      prepTopics: ["Spark internals (partitions, shuffles, skew, broadcast joins)", "Batch vs streaming (Kafka, Spark Streaming)", "Airflow DAG design", "Data modeling (star schema, SCD Type 2)", "Data quality & validation", "BigQuery / Hive / Delta / Iceberg", "Partitioning & file formats (Parquet, ORC)", "Cost optimization in cloud warehouses"],
      coreQuestions: [
        "Write a query to find the top 3 selling items per store per week.",
        "How do you handle data skew in a Spark join?",
        "Explain SCD Type 2 and when you'd use it.",
        "How do you make a pipeline idempotent and re-runnable?",
        "How do you detect and alert on bad data before it reaches dashboards?",
      ],
      seniorQuestions: [
        "Design a pipeline that ingests point-of-sale events from every store and serves near-real-time sales dashboards.",
        "How would you migrate an on-prem Hadoop pipeline to the cloud?",
      ],
      questionsToAsk: [
        "What are the main data platforms the team uses today, and what's being migrated?",
        "Who consumes this team's data, and how are SLAs defined?",
      ],
    },

    "data-sci": {
      label: "Data Scientist / ML Engineer",
      family: "data",
      summary: "Builds models for forecasting, pricing, search/recommendations, fraud and supply chain. Python, SQL, ML fundamentals and production ML.",
      loop: "Reported: SQL + Python coding, ML fundamentals and stats, case study on a business problem, project deep-dive, behavioral.",
      coding: {
        expected: true,
        style: "Python (pandas/numpy) and SQL problems; ML engineers may also get DSA.",
        languages: ["Python", "SQL"],
        topics: ["pandas groupby/merge", "SQL aggregations & windows", "Implementing a metric or simple model from scratch", "Basic DSA for MLE roles"],
      },
      systemDesign: true,
      prepTopics: ["Bias/variance, regularization", "Evaluation metrics (precision/recall, AUC, MAPE for forecasting)", "Time-series forecasting", "A/B testing & statistical significance", "Feature engineering", "Model deployment & monitoring (drift)", "Recommendation/ranking basics", "LLM/GenAI usage if in JD"],
      coreQuestions: [
        "How would you forecast weekly demand for an item at a specific store?",
        "Explain precision vs recall and which you'd optimize for fraud detection.",
        "How do you know if an A/B test result is real?",
        "Walk me through a model you put in production. How did you monitor it?",
        "How do you handle class imbalance?",
      ],
      seniorQuestions: [
        "Design a recommendation system for 'frequently bought together'.",
        "How would you detect and respond to model drift during holiday season?",
      ],
      questionsToAsk: [
        "How are models deployed and who owns them after launch?",
        "How does the team measure business impact of a model?",
      ],
    },

    "devops-sre": {
      label: "DevOps / SRE / Platform Engineer",
      family: "engineering",
      summary: "Runs and automates the platforms services deploy to: Kubernetes, CI/CD, cloud infrastructure, observability and incident response.",
      loop: "Reported: Linux/networking fundamentals, Kubernetes and cloud deep-dive, scripting (Python/Bash), troubleshooting scenario, behavioral around incidents.",
      coding: {
        expected: true,
        style: "Scripting rather than heavy DSA: parse logs, automate a task, or write a small tool. Some SRE loops include a DSA easy/medium.",
        languages: ["Python", "Bash", "Go (some teams)"],
        topics: ["Log parsing & counting", "Calling APIs and handling errors", "File/text processing", "Simple concurrency"],
      },
      systemDesign: true,
      prepTopics: ["Kubernetes (pods, deployments, services, ingress, HPA)", "Helm / GitOps (Argo CD, Flux)", "Terraform & IaC", "CI/CD (Jenkins, GitHub Actions, Looper-style pipelines)", "Azure / GCP fundamentals", "Observability (Prometheus, Grafana, Splunk, Dynatrace)", "SLIs/SLOs/error budgets", "Incident management & postmortems", "Linux & networking (DNS, TCP, load balancing)"],
      coreQuestions: [
        "A pod is stuck in CrashLoopBackOff. Walk me through how you debug it.",
        "What happens when you type a URL in the browser, down to DNS and TCP?",
        "How do you define an SLO for a checkout API?",
        "Tell me about an incident you led. What was the root cause and what changed afterward?",
        "How do you manage secrets in a CI/CD pipeline?",
      ],
      seniorQuestions: [
        "Design a multi-region deployment for a critical service with automated failover.",
        "How would you cut deployment time for 200 microservices in half?",
      ],
      questionsToAsk: [
        "What does on-call look like and how are incidents reviewed?",
        "How much of the platform is internal tooling vs off-the-shelf?",
      ],
    },

    "qa-sdet": {
      label: "QA / SDET (Test Automation)",
      family: "engineering",
      summary: "Builds automated test frameworks and quality gates for web, mobile and APIs.",
      loop: "Reported: coding (Java or Python, easy–medium), automation framework deep-dive (Selenium/Appium/REST Assured), test strategy scenario, behavioral.",
      coding: {
        expected: true,
        style: "Live coding easy–medium (strings, arrays, hashmaps) plus writing a test or locator strategy.",
        languages: ["Java", "Python", "JavaScript (Cypress/Playwright)"],
        topics: ["String manipulation", "Collections", "OOP design of a framework", "Writing assertions and data-driven tests"],
      },
      systemDesign: false,
      prepTopics: ["Selenium / Playwright / Cypress", "Appium for mobile", "API testing (REST Assured, Postman)", "Page Object Model & framework design", "TestNG/JUnit, BDD (Cucumber)", "CI integration & flaky test handling", "Performance testing (JMeter, Gatling)", "Test strategy & risk-based testing"],
      coreQuestions: [
        "Describe the automation framework you built or maintained. Why was it designed that way?",
        "How do you deal with flaky tests?",
        "How would you test the checkout flow end to end?",
        "What's the difference between implicit, explicit and fluent waits?",
        "How do you decide what NOT to automate?",
      ],
      seniorQuestions: [
        "How would you set up a quality strategy for a team shipping daily with no dedicated QA phase?",
      ],
      questionsToAsk: [
        "What's the current automation coverage and what's the biggest gap?",
        "Do developers write tests too, or is QA the main owner?",
      ],
    },

    "product-manager": {
      label: "Product Manager / Product Owner",
      family: "delivery",
      summary: "Owns problem definition, roadmap and outcomes for a product area. Works with engineering, design, business and operations.",
      loop: "Reported: product sense case, execution/metrics questions, stakeholder scenarios, past product deep-dive, behavioral. No coding.",
      coding: { expected: false },
      systemDesign: false,
      prepTopics: ["Product sense (users, problems, prioritization)", "Metrics (north star, guardrails, funnel)", "Prioritization frameworks (RICE, MoSCoW)", "Writing PRDs and user stories", "Agile ceremonies & backlog management", "Stakeholder management", "Retail / e-commerce domain basics", "Experimentation"],
      coreQuestions: [
        "How would you improve the online grocery pickup experience?",
        "Usage of a feature dropped 15% week over week. How do you investigate?",
        "Tell me about a time you said no to a senior stakeholder.",
        "How do you prioritize a backlog when everything is 'high priority'?",
        "What metric would you use to measure success of a new returns flow?",
      ],
      seniorQuestions: [
        "How would you build a 12-month roadmap for a new associate-facing tool?",
        "Tell me about a product bet that failed. What did you learn?",
      ],
      questionsToAsk: [
        "How are product goals set and how is success measured for this team?",
        "How much autonomy does the PM have over the roadmap?",
      ],
    },

    "program-manager": {
      label: "Project / Technical Program Manager",
      family: "delivery",
      summary: "Drives cross-team delivery: plans, dependencies, risks, status and launches for large technical programs.",
      loop: "Reported: program deep-dive, scenario questions (slipping timelines, conflicting priorities), technical fluency check for TPM, behavioral.",
      coding: { expected: false },
      systemDesign: false,
      prepTopics: ["Program planning & dependency mapping", "Risk / issue management (RAID)", "Agile at scale (SAFe, PI planning)", "Status reporting to executives", "Jira / Confluence / Smartsheet", "Technical fluency: APIs, microservices, cloud, CI/CD", "Budget and resource management", "Launch / cutover planning"],
      coreQuestions: [
        "Tell me about the largest program you've run. How many teams and what was the outcome?",
        "Your launch date is fixed and a key dependency team slips two weeks. What do you do?",
        "How do you report a red status to leadership?",
        "How do you build trust with engineering teams you don't manage?",
        "Explain a technical architecture from one of your programs at a whiteboard level.",
      ],
      seniorQuestions: [
        "How would you run a multi-quarter migration across 30 teams?",
      ],
      questionsToAsk: [
        "What does success look like for this program in the first 6 months?",
        "Where are the biggest cross-team friction points today?",
      ],
    },

    "business-analyst": {
      label: "Business / Systems Analyst",
      family: "delivery",
      summary: "Translates business needs into requirements, analyzes data and processes, and supports delivery and UAT.",
      loop: "Reported: requirements and process questions, SQL/Excel check, stakeholder scenarios, behavioral.",
      coding: {
        expected: true,
        style: "Light: SQL queries or Excel scenarios rather than programming. Confirm with AM.",
        languages: ["SQL", "Excel"],
        topics: ["SELECT / JOIN / GROUP BY", "Pivot tables & lookups", "Basic data cleanup"],
      },
      systemDesign: false,
      prepTopics: ["Requirements elicitation", "User stories & acceptance criteria", "Process mapping (BPMN, swimlanes)", "Gap analysis", "UAT planning", "SQL fundamentals", "Dashboards (Tableau, Power BI)", "Retail / supply chain domain"],
      coreQuestions: [
        "How do you gather requirements from stakeholders who disagree?",
        "Write acceptance criteria for a 'reorder last purchase' feature.",
        "Walk me through a process you mapped and improved.",
        "Write a SQL query to find customers who ordered in January but not in February.",
      ],
      seniorQuestions: [
        "How have you influenced a decision using data when the business wanted something else?",
      ],
      questionsToAsk: [
        "Who are the main stakeholders and how are requirements prioritized?",
        "What tools does the team use for requirements and tracking?",
      ],
    },

    "scrum-master": {
      label: "Scrum Master / Agile Coach",
      family: "delivery",
      summary: "Facilitates agile delivery, removes blockers and coaches teams on continuous improvement.",
      loop: "Reported: agile fundamentals, facilitation scenarios, metrics, coaching stories, behavioral.",
      coding: { expected: false },
      systemDesign: false,
      prepTopics: ["Scrum events & artifacts", "Kanban & flow metrics", "SAFe / scaled agile", "Velocity, burndown, cycle time", "Facilitation of retros", "Conflict resolution", "Jira reporting"],
      coreQuestions: [
        "The team keeps missing sprint commitments. What do you do?",
        "How do you run a retrospective that leads to actual change?",
        "A product owner keeps adding work mid-sprint. How do you handle it?",
        "Which agile metrics do you trust and which do you avoid?",
      ],
      seniorQuestions: [
        "How would you coach five teams through moving to a scaled framework?",
      ],
      questionsToAsk: [
        "How mature is the team's agile practice today?",
        "How many teams would I support?",
      ],
    },
  },

  /*
   * Skill dictionary. `match` is a list of case-insensitive keywords/phrases
   * looked for in the JD and resume. Add new tech here as it shows up in JDs.
   */
  skills: [
    { name: "Java", match: ["java", "j2ee", "jdk"], q: ["What changed in Java 17/21 that you actually use?", "Explain checked vs unchecked exceptions and when you'd create your own."], tip: "Review collections, streams, Optional, records, and concurrency utilities." },
    { name: "Spring Boot", match: ["spring boot", "springboot", "spring framework", "spring mvc", "spring cloud"], q: ["How does Spring Boot auto-configuration work?", "How do you handle transactions with @Transactional and what are its pitfalls?"], tip: "Know DI, profiles, actuator, exception handling, and testing with @SpringBootTest." },
    { name: "Microservices", match: ["microservice", "micro-service", "service-oriented", "distributed systems"], q: ["How do services in your system talk to each other and handle failures?", "When would you NOT split something into a microservice?"], tip: "Prepare circuit breakers, retries with backoff, idempotency, and service discovery." },
    { name: "REST APIs", match: ["rest", "restful", "api design", "openapi", "swagger"], q: ["How do you version an API?", "Which status codes would you return for validation errors vs conflicts?"], tip: "Review HTTP verbs, status codes, pagination and error contracts." },
    { name: "GraphQL", match: ["graphql"], q: ["What problems does GraphQL solve over REST, and what new problems does it create?"], tip: "Know resolvers, N+1 problem and DataLoader." },
    { name: "Kafka", match: ["kafka", "event streaming", "event-driven"], q: ["How does Kafka guarantee ordering and what breaks it?", "How do you handle a poison message in a consumer?"], tip: "Partitions, consumer groups, offsets, retries/DLQ, exactly-once semantics." },
    { name: "Python", match: ["python", "django", "flask", "fastapi"], q: ["What's the difference between a list and a generator, and when does it matter?", "How do you structure and test a Python project?"], tip: "Review comprehensions, generators, typing, virtual envs and pytest." },
    { name: "Go", match: ["golang"], q: ["How do goroutines and channels compare to threads?"], tip: "Know goroutines, channels, context cancellation, error handling idioms." },
    { name: "Node.js", match: ["node.js", "nodejs", "express.js", "nestjs"], q: ["How does Node handle concurrency with a single thread?", "How do you avoid blocking the event loop?"], tip: "Event loop, streams, error handling in async code." },
    { name: "JavaScript / TypeScript", match: ["javascript", "typescript", "es6"], q: ["Explain closures with a practical example.", "What does TypeScript's type system catch that tests might not?"], tip: "Promises, async/await, prototypes, generics in TS." },
    { name: "React", match: ["react", "redux", "next.js", "nextjs"], q: ["When would you reach for Redux vs Context vs a server-state library?", "What's a common useEffect bug and how do you avoid it?"], tip: "Hooks, rendering, memoization, data fetching patterns, testing with RTL." },
    { name: "Angular", match: ["angular"], q: ["How does change detection work in Angular?"], tip: "Components, services, RxJS observables, change detection strategies." },
    { name: "SQL", match: ["sql", "postgres", "mysql", "oracle", "sql server", "t-sql", "pl/sql"], q: ["Explain indexes — when do they hurt performance?", "Write a query using a window function from one of your past projects."], tip: "Joins, window functions, indexes, query plans, transactions & isolation levels." },
    { name: "NoSQL", match: ["nosql", "cassandra", "mongodb", "cosmos", "dynamodb", "couchbase"], q: ["How do you choose a partition key in Cassandra/Cosmos?", "When would you pick NoSQL over a relational DB?"], tip: "Data modeling by query pattern, consistency levels, hot partitions." },
    { name: "Redis / Caching", match: ["redis", "memcached", "caching", "cache"], q: ["How do you handle cache invalidation for product prices?", "What's a cache stampede and how do you prevent it?"], tip: "Cache-aside vs write-through, TTLs, eviction, stampede protection." },
    { name: "Elasticsearch / Search", match: ["elasticsearch", "solr", "opensearch", "search relevance"], q: ["How does an inverted index work?"], tip: "Analyzers, relevance scoring, sharding." },
    { name: "Kubernetes", match: ["kubernetes", "k8s", "openshift", "aks", "gke", "wcnp"], q: ["Explain the difference between a Deployment, StatefulSet and DaemonSet.", "How do readiness and liveness probes differ?"], tip: "Pods, services, ingress, HPA, config maps/secrets, debugging with kubectl." },
    { name: "Docker", match: ["docker", "container"], q: ["How do you keep container images small and secure?"], tip: "Multi-stage builds, layers, image scanning." },
    { name: "Azure", match: ["azure"], q: ["Which Azure services have you used in production and why?"], tip: "Compute (AKS, App Service, Functions), storage, Cosmos DB, networking basics." },
    { name: "GCP", match: ["gcp", "google cloud", "bigquery", "dataproc", "pub/sub", "pubsub"], q: ["How have you used BigQuery or other GCP services, and how did you control cost?"], tip: "BigQuery partitioning/clustering, GKE, Pub/Sub, Dataflow/Dataproc." },
    { name: "AWS", match: ["aws", "amazon web services", "ec2", "s3", "lambda"], q: ["Which AWS services have you used and how would they map to Azure/GCP?"], tip: "Walmart leans Azure/GCP — be ready to map your AWS experience across." },
    { name: "Terraform / IaC", match: ["terraform", "infrastructure as code", "iac", "ansible", "arm template", "bicep"], q: ["How do you manage Terraform state across teams?"], tip: "Modules, remote state, drift, plan/apply in CI." },
    { name: "CI/CD", match: ["ci/cd", "cicd", "jenkins", "github actions", "gitlab ci", "azure devops", "continuous integration", "looper", "concord"], q: ["Walk me through your CI/CD pipeline from commit to production.", "How do you roll back a bad deploy?"], tip: "Stages, quality gates, canary/blue-green, rollback." },
    { name: "Observability", match: ["splunk", "grafana", "prometheus", "dynatrace", "new relic", "datadog", "observability", "monitoring", "opentelemetry"], q: ["What would you put on a dashboard for a checkout service?", "How do you avoid alert fatigue?"], tip: "Golden signals, SLOs, structured logging, tracing." },
    { name: "Spark", match: ["spark", "pyspark", "databricks", "scala"], q: ["What causes a shuffle and how do you reduce it?", "How do you tune a slow Spark job?"], tip: "Partitions, skew, broadcast joins, caching, reading the Spark UI." },
    { name: "Airflow / Orchestration", match: ["airflow", "oozie", "composer", "orchestration", "dag"], q: ["How do you design DAGs that are safe to backfill?"], tip: "Idempotent tasks, retries, sensors, SLAs." },
    { name: "Hadoop / Hive", match: ["hadoop", "hive", "hdfs", "mapreduce"], q: ["How would you migrate a Hive workload to a cloud warehouse?"], tip: "Partitioning, file formats, migration strategy." },
    { name: "Data Modeling", match: ["data model", "star schema", "dimensional", "data warehouse", "snowflake schema", "scd"], q: ["How would you model sales data for reporting by store, item and day?"], tip: "Facts vs dimensions, grain, SCDs, normalization trade-offs." },
    { name: "Machine Learning", match: ["machine learning", "ml", "scikit", "xgboost", "tensorflow", "pytorch", "deep learning", "model training"], q: ["How do you choose an evaluation metric for a model?", "How do you prevent data leakage?"], tip: "Model selection, metrics, validation strategy, feature engineering." },
    { name: "GenAI / LLMs", match: ["llm", "genai", "generative ai", "gpt", "rag", "langchain", "prompt engineering", "vector database"], q: ["How would you evaluate an LLM-based feature before launch?", "Explain retrieval-augmented generation and its failure modes."], tip: "RAG, evaluation, hallucination mitigation, cost/latency trade-offs." },
    { name: "Forecasting", match: ["forecast", "time series", "time-series", "demand planning"], q: ["How would you handle seasonality and promotions in a demand forecast?"], tip: "ARIMA/Prophet/gradient boosting, backtesting, MAPE/WAPE." },
    { name: "A/B Testing", match: ["a/b test", "ab test", "experimentation", "hypothesis testing", "statistical significance"], q: ["How do you decide sample size for an experiment?"], tip: "Power, p-values, guardrail metrics, novelty effects." },
    { name: "Tableau / Power BI", match: ["tableau", "power bi", "powerbi", "looker", "dashboard"], q: ["Tell me about a dashboard that changed a decision."], tip: "Show business impact, not just charts." },
    { name: "Selenium / UI Automation", match: ["selenium", "cypress", "playwright", "webdriver", "appium"], q: ["How do you choose locators that don't break?", "How do you run UI tests in parallel?"], tip: "Page objects, waits, grid/parallelism, flaky test handling." },
    { name: "API Testing", match: ["rest assured", "postman", "karate", "api testing"], q: ["How do you test an API contract between two teams?"], tip: "Contract testing, schema validation, negative cases." },
    { name: "Performance Testing", match: ["jmeter", "gatling", "load test", "performance test", "locust"], q: ["How would you load test for Black Friday traffic?"], tip: "Workload modeling, ramp-up, identifying bottlenecks." },
    { name: "Unit Testing", match: ["junit", "testng", "mockito", "jest", "pytest", "tdd", "unit test"], q: ["What makes a unit test good vs brittle?"], tip: "Mocks vs fakes, coverage that matters, TDD stories." },
    { name: "iOS / Swift", match: ["swift", "swiftui", "ios", "objective-c", "uikit"], q: ["How does ARC work and how do you avoid retain cycles?"], tip: "SwiftUI vs UIKit, concurrency, memory, app lifecycle." },
    { name: "Android / Kotlin", match: ["kotlin", "android", "jetpack", "jetpack compose"], q: ["How do coroutines and Flow work together?"], tip: "Lifecycle, ViewModel, Compose, coroutines." },
    { name: "React Native", match: ["react native"], q: ["When does React Native hit its limits and what do you do?"], tip: "Bridge/new architecture, native modules, performance." },
    { name: "Security", match: ["oauth", "jwt", "sso", "owasp", "authentication", "authorization", "pci", "security"], q: ["How does OAuth2 authorization code flow work?", "Name an OWASP Top 10 issue you've fixed."], tip: "OAuth2/OIDC, JWT pitfalls, OWASP Top 10, secrets handling." },
    { name: "Linux / Networking", match: ["linux", "unix", "bash", "shell scripting", "tcp/ip", "dns", "networking", "load balanc*"], q: ["How would you find what's using all the disk space or CPU on a box?"], tip: "Core commands, processes, networking basics, DNS, TLS." },
    { name: "Agile / Scrum", match: ["agile", "scrum", "kanban", "scaled agile", "sprint"], q: ["What does your team's sprint look like, and what would you change?"], tip: "Ceremonies, estimation, how you handle scope changes." },
    { name: "Jira / Confluence", match: ["jira", "confluence", "smartsheet", "rally"], q: ["How do you keep Jira useful instead of noisy?"], tip: "Workflows, dashboards, reporting to stakeholders." },
    { name: "Stakeholder Management", match: ["stakeholder", "cross-functional", "executive", "leadership"], q: ["Tell me about managing a stakeholder with conflicting goals."], tip: "Have a story with tension, action and a measurable result." },
    { name: "Supply Chain / Retail", match: ["supply chain", "inventory", "fulfillment", "logistics", "retail", "e-commerce", "ecommerce", "omnichannel", "merchandising", "point of sale"], q: ["What do you know about how inventory moves from DC to store to customer?"], tip: "Learn basic retail terms: DC, SKU, OOS, replenishment, omnichannel, last mile." },
  ],
};

/**
 * ============================================================
 * PROJECTS — src/data/projects.js
 * ============================================================
 *
 * HOW TO ADD A NEW PROJECT
 * ─────────────────────────
 * Copy the template below and paste it as a new object
 * at the TOP of the projects array (most recent first).
 * Then run: git add . && git commit -m "add: [project name]" && git push
 *
 * FIELD REFERENCE
 * ─────────────────────────
 * REQUIRED fields — the card and case study won't work without these:
 *   title           string   — project name shown on card
 *   category        string   — used for filter tabs e.g. 'Business Analysis'
 *   tags            array    — tech/skill pills e.g. ['Python', 'Streamlit']
 *   outcome         string   — 1-2 sentences. Shown on card (truncated) and in case study
 *   githubUrl       string   — GitHub repo link. Use '#' if private/not yet public
 *   artifacts       array    — links shown at bottom of case study panel
 *                              e.g. [{ label: 'Live Tool', link: 'https://...' }, { label: 'GitHub', link: '...' }]
 *   skillsUsage     array    — skill breakdown bars shown on card
 *                              e.g. [{ name: 'Python', value: 40 }, { name: 'Business Analysis', value: 60 }]
 *                              values should add to 100
 *
 * OPTIONAL fields — case study panel only, skip if not applicable:
 *   problem         string   — the business problem being solved
 *   decision        string   — the strategic decision made
 *   context         string   — background/setting
 *   business_question string — the core question being answered
 *   data            string   — data sources used
 *   approach        string   — methodology
 *   insights        array    — key findings as string array
 *   recommendation  string   — what you'd recommend based on findings
 *   validation      string   — how you validated the work
 *   liveUrl         string   — live demo URL if separate from githubUrl
 *
 * ─────────────────────────
 * TEMPLATE — copy from here:
 * ─────────────────────────
 * {
 *   title: 'Your Project Title',
 *   category: 'Business Analysis',      // pick from existing or add new
 *   tags: ['Python', 'Streamlit'],
 *   outcome: 'One or two sentences describing what was built and what it does.',
 *   githubUrl: 'https://github.com/DhruvvKumar98/your-repo',
 *   artifacts: [
 *     { label: 'Live Tool', link: 'https://your-live-url.streamlit.app' },
 *     { label: 'GitHub',    link: 'https://github.com/DhruvvKumar98/your-repo' },
 *   ],
 *   skillsUsage: [
 *     { name: 'Business Analysis', value: 40 },
 *     { name: 'Python / Streamlit', value: 35 },
 *     { name: 'Data Modelling', value: 25 },
 *   ],
 *   // Optional case study fields below — delete any you don't need
 *   problem: 'What problem does this solve?',
 *   decision: 'What was the strategic decision?',
 *   context: 'Background and setting.',
 *   business_question: 'The core question being answered.',
 *   data: 'Data sources used.',
 *   approach: 'How you approached the problem.',
 *   insights: [
 *     'First key finding.',
 *     'Second key finding.',
 *   ],
 *   recommendation: 'What you would recommend.',
 *   validation: 'How you validated the work.',
 * },
 * ============================================================
 */
const projects = [
  {
    title: 'Email Command Center',
    category: 'Desktop Engineering',
    problem: 'Managing two Gmail accounts and a calendar across browser tabs is a constant context switch. No lightweight desktop widget exists that aggregates multiple inboxes, auto-classifies emails, and lets you triage without leaving your workflow.',
    decision: 'Build a frameless, always-on-top Electron widget that floats on the desktop — two Gmail accounts, Google Calendar, smart 4-layer AI classification, and right-click actions (archive, spam, re-categorize) — all in a 380×640px window that collapses to a hanging emoji badge.',
    tags: ['Electron', 'Node.js', 'Google APIs', 'SQLite', 'Ollama', 'OAuth2', 'CSS'],
    outcome: 'Shipped a 10-file, ~1600-line desktop widget handling 2 Gmail accounts + Calendar with a 4-layer classification pipeline (learned rules → sender patterns → local LLM → keyword fallback), encrypted token storage via Windows DPAPI, and desktop notifications.',
    context: 'Personal productivity tool built in 2 sessions. Designed for daily use on Windows — sits in the corner of the screen, syncs every 30 minutes, collapses to a draggable emoji yo-yo when not in use. Built entirely in ponytail mode (shortest working diff, no over-engineering).',
    business_question: 'Can a single floating widget replace the tab-switching workflow for managing multiple email accounts and surface what actually needs attention?',
    data: 'Live Gmail and Google Calendar data via OAuth2 Desktop App flow. Emails stored in local SQLite (sql.js WASM). 25 sender-domain rules + optional Ollama (qwen3:4b) for AI classification.',
    approach: '6-phase build: scaffold (Electron frameless window) → Gmail/Calendar integration (OAuth2, chunked fetch) → intelligence layer (4-tier classifier with learned rules as training mechanism) → in-widget actions (archive, spam, re-categorize via context menu) → notifications + theming (Pinterest light theme, scroll-snap panels) → packaging (VBS shortcut for Windows Home).',
    insights: [
      'The "learned rules" layer — saving sender→category mappings when the user re-categorizes — is a better training mechanism than fine-tuning for this scale. It\'s instant, deterministic, and exactly matches user intent.',
      'sql.js (pure WASM SQLite) eliminates the native compilation dependency chain that better-sqlite3 requires — no node-gyp, no Python, no C++ toolchain. For ~200 emails the performance difference is invisible.',
      'Token encryption via Electron safeStorage (Windows DPAPI) with transparent migration from plain JSON was a 15-line security upgrade that protects refresh tokens at rest.',
    ],
    recommendation: 'For personal productivity tools, the "floating widget" form factor — always visible, one-click collapse, right-click actions — is significantly faster than browser-based alternatives. The 4-layer classification approach (rules → patterns → LLM → fallback) degrades gracefully when Ollama is unavailable.',
    validation: 'Full security audit covering shell.openExternal validation, accountId whitelist, SQL injection (parameterized queries), XSS prevention, and token encryption. Tested across both accounts with live Gmail data. Edge cases: null thread IDs, archived emails, disconnected accounts, Ollama unavailability.',
    githubUrl: 'https://github.com/DhruvvKumar98/email-command-center',
    artifacts: [
      { label: 'GitHub', link: 'https://github.com/DhruvvKumar98/email-command-center' },
    ],
    skillsUsage: [
      { name: 'Electron / Node.js', value: 35 },
      { name: 'Google APIs / OAuth2', value: 25 },
      { name: 'AI Classification', value: 20 },
      { name: 'Security / Encryption', value: 20 },
    ],
  },
  {
    title: 'Decision Ledger',
    category: 'Decision Intelligence',
    problem: 'Organisations make hundreds of strategic decisions per quarter but have no system for tracking them. When a product launch fails, there is no trail back to the assumptions that justified it. Decisions live in meeting notes, Slack threads, and the memories of people who may have already left.',
    decision: 'Build a full-stack decision tracking and review system that captures decisions at the point they are made, structures them with context and measurable expected outcomes, tracks actual results, and surfaces patterns through an analytical SQL layer.',
    tags: ['PostgreSQL', 'FastAPI', 'Streamlit', 'Docker', 'SQLAlchemy', 'Plotly'],
    outcome: 'Deployed a 3-service Docker Compose system with 7 analytical SQL views, async REST API with auth middleware, and an interactive Streamlit dashboard — tracking 50 decisions across 5 categories for a fictional e-commerce company.',
    context: 'Portfolio project built to substantiate the Decision Intelligence claim in the tagline. Introduces SQL schema design, analytical views, and API development to the portfolio — all previously absent.',
    business_question: 'What percentage of our decisions achieved their projected outcome, which categories have the highest reversal rate, and how long does it take to move from problem identification to resolution?',
    data: 'Synthetic seed data: 50 decisions and 26 reviews for a fictional subscription e-commerce company (Nexura Commerce), spanning 6 months across pricing, product, hiring, market entry, and operational categories.',
    approach: 'Database-first build: PostgreSQL schema with constraints, indexes, and triggers designed before any application code. 7 analytical views (accuracy, velocity, reversal rate, compliance, summary) using window functions and CTEs. Async FastAPI backend with SQLAlchemy 2.0 ORM. Streamlit frontend with 4 dashboard pages and 7 Plotly chart types.',
    insights: [
      'Decision accuracy varies sharply by category — pricing decisions succeeded at a higher rate than hiring decisions, suggesting different information quality at the point of decision.',
      'Review compliance (whether teams actually revisit decisions at their scheduled review date) is the most actionable metric — low compliance means the feedback loop is broken regardless of decision quality.',
      'Reversal rate by category reveals where the organisation is systematically under-informed, not just unlucky.',
    ],
    recommendation: 'Any team serious about improving decision quality needs a structured capture-and-review loop. The analytical layer — not the storage — is what turns a decision log into a decision intelligence system.',
    validation: '30+ automated API tests with async httpx client, SQL view correctness tests with deterministic seed data, CI pipeline (GitHub Actions) with PostgreSQL 16 service container, ruff linting, and full security audit.',
    githubUrl: 'https://github.com/DhruvvKumar98/decision-ledger',
    liveUrl: 'https://decision-ledger-ietcgke26aemhzqq9nquvt.streamlit.app/',
    artifacts: [
      { label: 'Live Tool', link: 'https://decision-ledger-ietcgke26aemhzqq9nquvt.streamlit.app/' },
      { label: 'GitHub', link: 'https://github.com/DhruvvKumar98/decision-ledger' },
    ],
    skillsUsage: [
      { name: 'SQL / PostgreSQL', value: 30 },
      { name: 'Python / FastAPI', value: 30 },
      { name: 'Streamlit / Plotly', value: 20 },
      { name: 'Docker / DevOps', value: 20 },
    ],
  },
  {
    title: 'XAI Stock Prediction Dashboard',
    category: 'ML & Explainability',
    problem: 'Investment decisions rely on black-box models that stakeholders can\'t interrogate or trust.',
    decision: 'Build an end-to-end explainable AI system that forecasts stock prices AND explains every prediction in plain visual terms.',
    tags: ['Python', 'LSTM', 'SHAP', 'TensorFlow', 'Streamlit'],
    outcome: 'Deployed a configurable Streamlit app with three SHAP-based explanation layers per prediction, enabling non-technical stakeholders to know when to trust the model.',
    context: 'M.Sc. thesis project at University of Europe for Applied Sciences, Berlin. Designed as a decision-support tool for retail investors and financial analysts.',
    business_question: 'How can AI-driven stock forecasts be made trustworthy and actionable for non-technical decision-makers?',
    data: 'Historical daily stock prices from major exchanges; macroeconomic indicators; engineered lag features.',
    approach: 'LSTM neural network trained with a strict 70/15/15 chronological train-val-test split. SHAP DeepExplainer used to surface global feature importance, per-instance waterfall charts, and heatmaps. Deployed via Streamlit with configurable stock and date range inputs.',
    insights: [
      'SHAP waterfall charts revealed that momentum and volume features drove short-term spikes more than fundamentals.',
      'Chronological split (not random) prevented data leakage — a common failure in academic stock prediction work.',
      'Three explanation layers gave users different levels of detail: overview (global), decision (per-prediction), and trend (heatmap).',
    ],
    recommendation: 'Integrate explainability as a first-class business requirement in any AI system where humans need to act on model outputs.',
    validation: 'Test-set-only RMSE/MAE evaluation across multiple stocks and time periods to ensure honest, reproducible results.',
    githubUrl: 'https://github.com/DhruvvKumar98/Thesis-Project-AI-Driven-Financial-Tool-for-Optimized-Investment-Strategies',
    artifacts: [
      { label: 'GitHub', link: 'https://github.com/DhruvvKumar98/Thesis-Project-AI-Driven-Financial-Tool-for-Optimized-Investment-Strategies' },
    ],
    skillsUsage: [
      { name: 'LSTM / TensorFlow', value: 35 },
      { name: 'SHAP / XAI', value: 30 },
      { name: 'Streamlit', value: 20 },
      { name: 'Data Engineering', value: 15 },
    ],
  },
  {
    title: 'Market Basket Analysis',
    category: 'Analytics',
    problem: 'Retailers lack visibility into which products are bought together, missing cross-sell and bundling opportunities.',
    decision: 'Apply association rule mining to transaction data to surface high-confidence, high-lift product pairs for merchandising decisions.',
    tags: ['Python', 'Apriori', 'mlxtend', 'Retail Analytics'],
    outcome: 'Identified actionable product affinity rules with lift >3, directly informing bundle promotions and store layout recommendations.',
    context: 'End-to-end analytics project on retail transactional data, framed as a business recommendation deliverable.',
    business_question: 'Which products are frequently bought together and how can retailers use this to increase basket size and margin?',
    data: 'Retail transaction logs with customer IDs, product categories and purchase timestamps.',
    approach: 'Cleaned and one-hot encoded transaction data; applied Apriori algorithm via mlxtend to generate frequent itemsets; filtered by confidence and lift thresholds.',
    insights: [
      'Several cross-category pairs had lift >3, indicating much stronger affinity than baseline purchase rates.',
      'Bundling low-margin staples with high-margin items improved profitability per transaction.',
      'Time-of-day patterns showed affinity rules varied between weekday and weekend shoppers.',
    ],
    recommendation: 'Implement targeted bundle promotions for top lift pairs and redesign floor layout to co-locate high-affinity categories.',
    validation: 'Rules validated against holdout transactions; top recommendations tested with A/B framing.',
    githubUrl: 'https://github.com/DhruvvKumar98/Market-Basket-Analysis-',
    artifacts: [
      { label: 'GitHub', link: 'https://github.com/DhruvvKumar98/Market-Basket-Analysis-' },
    ],
    skillsUsage: [
      { name: 'Python / mlxtend', value: 45 },
      { name: 'Data Cleaning', value: 25 },
      { name: 'Business Analysis', value: 30 },
    ],
  },
  {
    title: 'E-Commerce Recommendation System',
    category: 'ML & Product',
    problem: 'E-commerce platforms show generic product listings, leading to low conversion and poor personalisation.',
    decision: 'Build a collaborative filtering and content-based recommendation engine that personalises product suggestions per user.',
    tags: ['Python', 'scikit-learn', 'Collaborative Filtering', 'NLP'],
    outcome: 'Delivered a hybrid recommendation model producing personalised product rankings based on interaction history and product metadata.',
    context: 'ML project applying recommendation system techniques to a real-world e-commerce dataset.',
    business_question: 'How can we increase product discovery and conversion by personalising recommendations to individual user behaviour?',
    data: 'User interaction logs (views, purchases, ratings) and product metadata including category and description.',
    approach: 'Combined collaborative filtering (user-item matrix factorisation) with content-based filtering (TF-IDF on product descriptions) in a hybrid ensemble. Evaluated with precision@k and recall@k.',
    insights: [
      'Hybrid model outperformed pure collaborative filtering for cold-start users with limited history.',
      'Content signals were especially useful for niche categories with sparse interaction data.',
      'Top-10 recommendations improved precision by ~18% vs popularity-based baseline.',
    ],
    recommendation: 'Deploy hybrid approach with collaborative filtering as primary signal and content-based as fallback for new or sparse users.',
    validation: 'Offline evaluation using precision@k, recall@k, and NDCG on held-out interaction data.',
    githubUrl: 'https://github.com/DhruvvKumar98/E-Commerce-Recommendation-System-ML',
    artifacts: [
      { label: 'GitHub', link: 'https://github.com/DhruvvKumar98/E-Commerce-Recommendation-System-ML' },
    ],
    skillsUsage: [
      { name: 'Collaborative Filtering', value: 35 },
      { name: 'NLP / TF-IDF', value: 25 },
      { name: 'Python / scikit-learn', value: 30 },
      { name: 'Evaluation', value: 10 },
    ],
  },
  {
    title: 'Real-Time Data Pipeline (Kafka + Airflow + GCP)',
    category: 'Data Engineering',
    problem: 'Batch pipelines create reporting delays that make operational dashboards stale and unreliable for fast-moving decisions.',
    decision: 'Build a real-time streaming data pipeline using Kafka, Airflow and GCP to ingest, process and serve fresh data continuously.',
    tags: ['Python', 'Apache Kafka', 'Apache Airflow', 'GCP', 'Data Engineering'],
    outcome: 'End-to-end streaming pipeline demonstrating real-time ingestion, orchestration, and cloud delivery — reducing simulated reporting lag from batch cycles to near-real-time.',
    context: 'Data engineering project demonstrating production-grade pipeline architecture using industry-standard tools.',
    business_question: 'How can organisations move from slow batch ETL to real-time data availability for operational decisions?',
    data: 'Simulated streaming event data processed through Kafka topics and orchestrated via Airflow DAGs.',
    approach: 'Kafka producers simulate event streams; Airflow orchestrates ingestion and transformation DAGs; GCP (BigQuery / Cloud Storage) serves as the data warehouse layer.',
    insights: [
      'Kafka decoupling allows producers and consumers to scale independently without pipeline bottlenecks.',
      'Airflow DAG design is the critical reliability point — poorly structured dependencies cause cascading failures.',
      'GCP BigQuery partitioning on event timestamp dramatically reduced query cost on large datasets.',
    ],
    recommendation: 'For analytics use cases requiring sub-hourly freshness, streaming pipelines with Kafka + orchestration are significantly more reliable than cron-based batch ETL.',
    validation: 'End-to-end pipeline tested with simulated load; DAG reliability and latency measured across runs.',
    githubUrl: 'https://github.com/DhruvvKumar98/Data-Engineering-with-Kafka-Airflow-GCP-Real-time-Data-Pipeline',
    artifacts: [
      { label: 'GitHub', link: 'https://github.com/DhruvvKumar98/Data-Engineering-with-Kafka-Airflow-GCP-Real-time-Data-Pipeline' },
    ],
    skillsUsage: [
      { name: 'Apache Kafka', value: 30 },
      { name: 'Apache Airflow', value: 30 },
      { name: 'GCP / BigQuery', value: 25 },
      { name: 'Python', value: 15 },
    ],
  },
  {
    title: 'Exploratory Data Analysis',
    category: 'Analytics',
    problem: 'Raw datasets contain hidden patterns, quality issues and distributional quirks that derail downstream modelling if ignored.',
    decision: 'Structured EDA framework covering data quality, distributions, correlations and outlier detection — documented for reuse across projects.',
    tags: ['Python', 'Pandas', 'Seaborn', 'Jupyter', 'Statistics'],
    outcome: 'Reusable EDA template and analysis notebooks demonstrating systematic data profiling workflow applicable across domains.',
    context: 'Project-level EDA toolkit built to standardise the first-mile data investigation step across analytics and ML projects.',
    business_question: 'What patterns, anomalies and relationships exist in this dataset before any modelling decisions are made?',
    data: 'Multiple datasets across domains (retail, finance, demographics) used to stress-test the EDA framework.',
    approach: 'Structured pipeline: schema audit → missing data analysis → univariate distributions → bivariate correlations → outlier flagging → summary narrative. Documented in reproducible Jupyter notebooks.',
    insights: [
      'Missing data patterns are rarely random — visualising missingness often reveals upstream system issues.',
      'Correlation heatmaps consistently surface multicollinearity that would break naive regression models.',
      'Outlier analysis frequently identifies data entry errors rather than genuine extreme values.',
    ],
    recommendation: 'Run structured EDA before any modelling or dashboard build — assumptions made without it consistently produce wrong outputs.',
    validation: 'Findings cross-checked with domain knowledge and used to inform feature engineering decisions in downstream models.',
    githubUrl: 'https://github.com/DhruvvKumar98/Exploratory-Data-Analysis',
    artifacts: [
      { label: 'GitHub', link: 'https://github.com/DhruvvKumar98/Exploratory-Data-Analysis' },
    ],
    skillsUsage: [
      { name: 'Pandas / NumPy', value: 40 },
      { name: 'Seaborn / Matplotlib', value: 35 },
      { name: 'Statistical Analysis', value: 25 },
    ],
  },
  {
    title: 'Return Radar',
    category: 'Business Analysis',
    problem: 'Zalando cut its return window from 100 to 30 days in January 2025, creating an operational blind spot for small fashion brands selling on the platform — they had no independent tool to model the impact on their return risk or inventory.',
    decision: 'Build a free, publicly accessible business intelligence tool that helps Zalando partner brands understand their return risk exposure, simulate inventory backlog, and get prioritised actions — written entirely in plain English for non-technical brand operators.',
    tags: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'Business Analysis', 'E-Commerce'],
    outcome: 'Deployed a live tool at return-radar-xzpldtsqyytl3rfiwsrlne.streamlit.app — input 5 numbers, get a return risk score, 90-day inventory simulation across 3 scenarios, and 3 prioritised business recommendations.',
    context: 'Independent business analysis portfolio project. Built in Berlin, May 2026, in response to a real policy change affecting thousands of SME fashion brands across Germany, Netherlands, and Italy.',
    business_question: 'How can small fashion brands selling on Zalando understand and manage their return rate exposure before Zalando penalises their account visibility?',
    data: 'Static reference benchmarks from McKinsey, Bitkom, NRF, and Zalando corporate reports. Category return rate benchmarks, penalty threshold estimates, and financial constants (holding cost rate, resale velocity, secondary market discount).',
    approach: 'Composite risk score model with 4 weighted sub-scores (benchmark comparison 40%, threshold proximity 35%, price factor 15%, volume factor 10%). 90-day daily inventory simulation across 3 scenarios. 12-action recommendation library with conditional triggers based on user inputs.',
    insights: [
      'Zalando has solved return intelligence for itself — ML models, fit AI, computer vision. Their seller partners have a spreadsheet. That asymmetry is the entire reason this tool exists.',
      'The 30-day window compresses the same volume of returns into a single month — sellers who looked fine under 100 days now appear to exceed penalty thresholds.',
      'Framing every output as a business question (not a data output) is what makes a tool useful to a non-technical operator.',
    ],
    recommendation: 'For any platform-dependent SME, return rate management is not optional — it directly affects algorithmic visibility, cash flow, and account standing. Independent benchmarking tools fill a critical gap.',
    validation: 'Benchmarks cross-referenced across 15+ published academic and industry sources. Tool tested across all 7 product categories and edge cases (0% and 70% return rates).',
    githubUrl: 'https://github.com/DhruvvKumar98/return-radar',
    liveUrl: 'https://return-radar-xzpldtsqyytl3rfiwsrlne.streamlit.app/',
    artifacts: [
      { label: 'Live Tool', link: 'https://return-radar-xzpldtsqyytl3rfiwsrlne.streamlit.app/' },
      { label: 'GitHub', link: 'https://github.com/DhruvvKumar98/return-radar' },
    ],
    skillsUsage: [
      { name: 'Business Analysis', value: 35 },
      { name: 'Python / Streamlit', value: 30 },
      { name: 'Data Modelling', value: 20 },
      { name: 'UX / Product Thinking', value: 15 },
    ],
  },
  {
    title: 'Cohort Retention Simulator',
    category: 'Growth Analytics',
    problem: 'HelloFresh lost over 2 million active subscribers between 2021 and 2025. Every investor communication named early-cohort churn as the cause. FY2026 guidance is still –3% to –6%.',
    decision: 'Build a live simulator that models the LTV impact of retention interventions using HelloFresh\'s own FY2025 disclosures — mirroring their exact metric: net revenue per conversion after 20 weeks.',
    tags: ['Python', 'Streamlit', 'Plotly', 'NumPy', 'Growth Analytics', 'Subscription'],
    outcome: 'Live Streamlit tool with 4 interactive tabs: retention curve, net LTV waterfall, gross profit breakdown, and a sensitivity heatmap across churn rate × intervention uplift. Every input labelled DISCLOSED / ESTIMATED / MODELLED with inline citations.',
    context: 'Portfolio project targeting HelloFresh (Berlin HQ). Built to match HelloFresh\'s own disclosed retention metric — net revenue per conversion after 20 weeks (+21% vs H2 2023 following The Refresh). FY2026 guidance still negative; the problem is live.',
    business_question: 'What is a 1pp improvement in early-cohort churn worth in LTV terms — and at what intervention cost does it become ROI-positive?',
    data: 'HelloFresh FY2025 Annual Report (revenue per order €49, gross margin 25%, marketing spend €1.4B). Industry benchmarks from Recurly Research 2024. All inputs provenance-labelled.',
    approach: 'Weekly cohort simulation with separate early-churn (weeks 1–8) and stable-churn (weeks 9+) phases, pause/winback pool, and an optional intervention that reduces churn by a user-defined number of percentage points. Sensitivity heatmap runs 36 simulations across churn × uplift grid.',
    insights: [
      'At default parameters, CAC payback occurs at week 9. A 2pp churn reduction from a €8/subscriber intervention adds ~€18 net LTV per subscriber — ROI of ~17x over 20 weeks.',
      'The 20-week default horizon matches HelloFresh\'s own disclosed metric window, making the output directly comparable to their investor communications.',
      'Sensitivity heatmap reveals the intervention becomes ROI-negative at intervention costs above ~€25/subscriber at 2pp uplift — a defensible threshold for budget decisions.',
    ],
    recommendation: 'At HelloFresh\'s scale (~500K new subscribers per quarter), a 2pp retention improvement in weeks 1–8 generates tens of millions in annual incremental gross profit. The Refresh is improving early metrics but FY2026 guidance confirms the structural problem is unsolved.',
    validation: 'Model validated against HelloFresh\'s disclosed 20-week net revenue per conversion metric. Sensitivity analysis tested across full slider range. Edge cases verified (0% churn, 100% churn, zero intervention cost).',
    githubUrl: 'https://github.com/DhruvvKumar98/cohort-retention-simulator',
    liveUrl: 'https://cohort-retention-simulator-b3z9wzt7c3jntzrulb69mh.streamlit.app/',
    artifacts: [
      { label: 'Live Tool', link: 'https://cohort-retention-simulator-b3z9wzt7c3jntzrulb69mh.streamlit.app/' },
      { label: 'GitHub', link: 'https://github.com/DhruvvKumar98/cohort-retention-simulator' },
    ],
    skillsUsage: [
      { name: 'Growth Modelling', value: 35 },
      { name: 'Python / NumPy', value: 25 },
      { name: 'Streamlit / Plotly', value: 25 },
      { name: 'Business Analysis', value: 15 },
    ],
  },
  {
    title: 'CAC Efficiency Dashboard',
    category: 'Growth Analytics',
    problem: 'Fashion e-commerce companies over-allocate budget to expensive paid channels (CAC €28–€35) while under-investing in owned channels (CAC €6–€7), inflating blended acquisition cost without proportional customer gain.',
    decision: 'Build a multi-company channel scenario modeller showing how budget reallocation across 5 channels impacts blended CAC — with confidence indicators (HIGH/MEDIUM/LOW) on every scenario assumption.',
    tags: ['Python', 'Streamlit', 'Plotly', 'NumPy', 'CAC', 'Growth Analytics', 'E-Commerce'],
    outcome: 'Live 4-tab Streamlit dashboard covering AboutYou (pre-acquisition), Zalando, and Delivery Hero. Sidebar sliders model real-time budget reallocation impact. Channel splits labelled as SCENARIO ASSUMPTION throughout — not presented as disclosed figures.',
    context: 'Started when AboutYou was independently listed. Zalando acquired them for €1.2B in July 2025 — validating that CAC efficiency was a real and financially material problem. Tool reframed as multi-company to cover the acquisition and add Delivery Hero (Frankfurt-listed, €800M+ marketing, 70+ markets, Berlin HQ).',
    business_question: 'How does shifting marketing budget from high-CAC paid channels to low-CAC owned channels affect blended customer acquisition cost — and what does that mean for unit economics at scale?',
    data: 'AboutYou FY2024/25 Annual Report + Zalando acquisition docs. Zalando FY2025. Delivery Hero FY2024. Channel CAC benchmarks from AppsFlyer Fashion E-Commerce Report 2024 and Adjust Growth Index 2024.',
    approach: 'Per-channel CAC estimated from industry benchmark midpoints (AppsFlyer 2024). Efficiency score = blended CAC / channel CAC (>1 = more efficient than average). Budget reallocation modelled by recalculating customer acquisition at benchmark rates across the new channel mix.',
    insights: [
      'Organic/SEO (€7 benchmark CAC) and Referral/CRM (€6) are 3–4× more cost-efficient than blended average for all three companies — consistently under-allocated relative to paid social.',
      'AboutYou\'s marketing spend cut from €420M (FY2023) to €244M (FY2024/25) was an efficiency programme, not a retreat — CAC per customer actually improved as the budget shifted away from high-CAC channels.',
      'Zalando\'s post-acquisition challenge: integrating 12.9M new customers into a 52M-customer ecosystem while managing two brand identities on one consolidated marketing budget.',
    ],
    recommendation: 'A 5pp reallocation from paid social to referral/CRM channels reduces blended CAC by approximately 8–12% at benchmark rates, with compounding effect as the owned channel base grows. Long-term CAC reduction requires investing in SEO and CRM infrastructure, not just shifting ad spend.',
    validation: 'Channel splits cross-referenced across Meta Ad Library, SimilarWeb, and LinkedIn Ad Library. Confidence indicators (HIGH/MEDIUM/LOW) assigned per channel per company. All scenario assumptions explicitly labelled throughout the tool.',
    githubUrl: 'https://github.com/DhruvvKumar98/cac-efficiency-dashboard',
    liveUrl: 'https://cac-efficiency-dashboard-me4vtotubamnjhr9ipc4qu.streamlit.app/',
    artifacts: [
      { label: 'Live Tool', link: 'https://cac-efficiency-dashboard-me4vtotubamnjhr9ipc4qu.streamlit.app/' },
      { label: 'GitHub', link: 'https://github.com/DhruvvKumar98/cac-efficiency-dashboard' },
    ],
    skillsUsage: [
      { name: 'Business Analysis', value: 30 },
      { name: 'Growth Modelling', value: 30 },
      { name: 'Python / Streamlit', value: 25 },
      { name: 'Data Research', value: 15 },
    ],
  },
];

export default projects;

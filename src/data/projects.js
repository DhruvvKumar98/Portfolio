const base = import.meta.env.BASE_URL;

export const selectedWork = [
  {
    title: 'Return Radar',
    tags: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'Business Analysis'],
    problem: 'Zalando cut its return window from 100 to 30 days, creating a blind spot for small fashion brands on the platform.',
    outcome: 'Live tool: input 5 numbers, get a return risk score, 90-day inventory simulation, and 3 prioritised recommendations.',
    liveUrl: 'https://return-radar-xzpldtsqyytl3rfiwsrlne.streamlit.app/',
    githubUrl: 'https://github.com/DhruvvKumar98/return-radar',
    image: `${base}projects/return-radar.jpg`,
  },
  {
    title: 'Decision Ledger',
    tags: ['PostgreSQL', 'FastAPI', 'Streamlit', 'Docker', 'Plotly'],
    problem: 'Organisations make hundreds of strategic decisions per quarter but have no system for tracking them or learning from outcomes.',
    outcome: '3-service Docker Compose system with 7 analytical SQL views, async REST API, and an interactive Streamlit dashboard tracking 50 decisions across 5 categories.',
    liveUrl: 'https://decision-ledger-ietcgke26aemhzqq9nquvt.streamlit.app/',
    githubUrl: 'https://github.com/DhruvvKumar98/decision-ledger',
    image: `${base}projects/decision-ledger.jpg`,
  },
  {
    title: 'Cohort Retention Simulator',
    tags: ['Python', 'Streamlit', 'Plotly', 'NumPy', 'Growth Analytics'],
    problem: 'HelloFresh lost over 2 million active subscribers between 2021 and 2025. Every investor communication named early-cohort churn as the cause.',
    outcome: 'Live simulator with 4 tabs: retention curve, net LTV waterfall, gross profit breakdown, and sensitivity heatmap. Every input labelled DISCLOSED / ESTIMATED / MODELLED.',
    liveUrl: 'https://cohort-retention-simulator-b3z9wzt7c3jntzrulb69mh.streamlit.app/',
    githubUrl: 'https://github.com/DhruvvKumar98/cohort-retention-simulator',
    image: `${base}projects/cohort-retention.jpg`,
  },
  {
    title: 'CAC Efficiency Dashboard',
    tags: ['Python', 'Streamlit', 'Plotly', 'NumPy', 'Growth Analytics'],
    problem: 'Fashion e-commerce companies over-allocate budget to expensive paid channels while under-investing in owned channels.',
    outcome: 'Multi-company channel scenario modeller covering AboutYou, Zalando, and Delivery Hero. Sidebar sliders model real-time budget reallocation impact.',
    liveUrl: 'https://cac-efficiency-dashboard-me4vtotubamnjhr9ipc4qu.streamlit.app/',
    githubUrl: 'https://github.com/DhruvvKumar98/cac-efficiency-dashboard',
    image: `${base}projects/cac-dashboard.jpg`,
  },
  {
    title: 'XAI Stock Prediction Dashboard',
    tags: ['Python', 'LSTM', 'SHAP', 'TensorFlow', 'Streamlit'],
    problem: "M.Sc. thesis: investment decisions rely on black-box models that stakeholders can't interrogate or trust.",
    outcome: 'Built a configurable Streamlit app with three SHAP-based explanation layers per prediction, enabling non-technical stakeholders to know when to trust the model.',
    liveUrl: null,
    githubUrl: 'https://github.com/DhruvvKumar98/Thesis-Project-AI-Driven-Financial-Tool-for-Optimized-Investment-Strategies',
    image: `${base}projects/xai-stock.jpg`,
    note: 'M.Sc. thesis',
  },
  {
    title: 'Bien Viage Desk',
    tags: ['FastAPI', 'SQLite', 'Python'],
    problem: 'A travel agency needed a digital operations system to replace manual workflows.',
    outcome: 'Shipped a FastAPI and SQLite operations app: 20-document spec, 20-feature MVP, 180+ tests.',
    liveUrl: null,
    githubUrl: null,
    image: null,
    note: 'Client project, private code',
  },
];

export const practice = [
  {
    title: 'Market Basket Analysis',
    oneLiner: 'Association rule mining (Apriori) on retail data to surface cross-sell opportunities.',
    githubUrl: 'https://github.com/DhruvvKumar98/Market-Basket-Analysis-',
  },
  {
    title: 'E-Commerce Recommendation System',
    oneLiner: 'Hybrid collaborative + content-based filtering for personalised product ranking.',
    githubUrl: 'https://github.com/DhruvvKumar98/E-Commerce-Recommendation-System-ML',
  },
  {
    title: 'Titanic GCP Batch Pipeline',
    oneLiner: '7-task Airflow DAG on GCP with BigQuery validation and Terraform IaC.',
    githubUrl: 'https://github.com/DhruvvKumar98/titanic-gcp-batch-pipeline',
  },
];

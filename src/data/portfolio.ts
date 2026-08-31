export const personalInfo = {
  name: "WooAh Choi",
  title: "Machine Learning & Backend Engineer",
  email: "wooah.choi2@gmail.com",
  github: "https://github.com/hncpyj",
  blog: "https://backenddeveloper.tistory.com/",
  linkedin: "https://linkedin.com/in/wooah-choi",
  intro:
    "Machine Learning Engineer with a production engineering foundation, specialising in NLP, information retrieval, and the evaluation of systems that are harder to verify than they look. MSc AI at Queen Mary University of London, where my dissertation applied mechanistic interpretability to a Transformer policy in partially observable RL. Previously built enterprise search and NLP in production, including the Supreme Court of Korea's e-litigation search.",
  about:
    "MSc AI student at Queen Mary University of London, with nearly 3 years of industry experience as a Software Engineer at Konan Technology building enterprise search and NLP systems. My coursework spans Machine Learning, Neural Networks and NLP, Information Retrieval, Reinforcement Learning, and Conversational Agents — building depth in both theory and implementation.\n\nMy dissertation is a mechanistic analysis of a PPO-trained causal Transformer policy in a partially observable MiniGrid T-maze. Its central finding was methodological: the aggregate success metric hid a failure mode, because an agent that always turns the same way scores around 50% while having learned nothing about the instruction cue. I designed a worst-case metric, Smin = min(S_key, S_ball), that exposes those one-sided policies, and used causal interventions to test control rather than infer it from correlation. Difference-vector attribution assigned 33–58% of the retrieval difference to padding, yet exchanging the padding source reversed no decision while exchanging the real-transition source reversed both — correlation and causation pointing at different things on the same policy. That signature held in only three of six successful checkpoints, so equal behaviour did not imply equal mechanism. A parameter-matched LSTM also solved the task at Smin = 0.898, which moved the contribution from architecture comparison to the analysis and evaluation framework itself.\n\nI review for the FinNLP workshop at EMNLP 2026, the annual workshop of the ACL Special Interest Group on Financial and Economic NLP.\n\nAs co-founder of GridFlow Trade (selected for QMUL QIncubator), I built a UK electricity price forecasting pipeline: 48 domain-driven features on 55,000+ real half-hourly settlement periods, with XGBoost achieving MAE £4.10/MWh (R²=0.943) — a 76% error reduction over a Naive baseline.\n\nAt Konan Technology, I delivered production search and NLP systems for the Supreme Court of Korea, reducing litigation search latency from 5+ minutes to 8 seconds, and shipped query intelligence features across four enterprise clients.\n\nKaggle: Top ~17% in Google AI4Code · Top ~28% in RSNA 2022 Cervical Spine Fracture Detection.",
  introHighlight: [
    "Machine Learning Engineer",
    "NLP",
    "information retrieval",
    "evaluation",
    "mechanistic interpretability",
    "Supreme Court of Korea",
  ],
  aboutHighlightBlue: [
    "Queen Mary University of London",
    "MSc AI",
    "QMUL QIncubator",
    "Konan Technology",
  ],
  aboutHighlightGreen: [
    "1.000 through 32 bindings",
    "MAE £4.10/MWh",
    "76% error reduction",
    "5+ minutes to 8 seconds",
    "Top ~17%",
    "Top ~28%",
  ],
};

export const experiences = [
  {
    company: "Konan Technology",
    role: "Software Engineer, AI Solution Development Team",
    period: "Nov 2020 — Jun 2023",
    description:
      "Built and improved enterprise search and NLP systems across four clients, cutting Supreme Court litigation search latency from 5+ minutes to 8 seconds. Applied BERT-based NER, SFX/SRL query analysis, fastText, and vector search; shipped query intelligence features including related terms, recommendations, popular queries, and typo correction.",
    projects: [
      {
        name: "Supreme Court of Korea - E-litigation Search and Analysis",
        description:
          "Built a next-generation electronic litigation search and analysis system, reducing search latency from 5+ minutes to 8 seconds and resolving 375+ misanalysed cases. Optimised Java backend algorithms and indexing pipeline to achieve 37× search speed improvement.\n\nApplied speech act analysis (SFX) and semantic role labeling (SRL) to derive structured query constraints (time, location, case context). Fine-tuned a BERT-based NER model to extract case numbers, law names, and party names, with 4%+ improvement in extraction quality. Built vector search for related case retrieval and search analytics dashboards (line, bubble, dendrogram charts) for administrators.",
        tech: [
          "Java",
          "Spring",
          "Oracle",
          "Jenkins",
          "GitLab",
          "Python",
          "PyTorch",
          "BERT",
          "Docker",
          "Linux",
          "C++",
        ],
      },
      {
        name: "Millie's Library - Book Search and User Pattern Analysis",
        description:
          "Engineered an automated indexing system handling 100M+ data points, designed to scale beyond 1B records. Improved search ranking quality by 38% via custom scoring logic. Implemented auto-completion, related-term suggestion, and typo correction. Delivered time-series analysis of search terms for recommended and popular keyword features.",
        tech: ["C++", "Python", "MySQL", "Linux"],
      },
      {
        name: "Heungkuk Fire & Marine Insurance - Main Website Search Renewal",
        description:
          "Full-stack development of the web application's search system. Implemented AJAX-based continuous scrolling for smooth user experience and built auto-completion and popular search term features. Supported production rollout with log-based quality monitoring.",
        tech: ["Java", "Oracle", "SVN", "Linux", "JavaScript"],
      },
      {
        name: "Ministry of SMEs and Startups - Venture Confirmation System Search",
        description:
          "Developed search engine and RESTful API with text extraction and indexing from documents via Aspose and PDFBox. Implemented recursive file/folder deletion logic for efficient data management.",
        tech: ["Java", "PostgreSQL", "SVN", "Linux", "AWS S3"],
      },
    ],
  },
];

export const skills = {
  languages: ["Python", "Java", "TypeScript", "JavaScript", "C++", "R", "SQL"],
  ml: [
    "PyTorch",
    "TensorFlow",
    "scikit-learn",
    "XGBoost",
    "LightGBM",
    "BERT",
    "Transformer",
    "Hugging Face",
    "LLM",
    "RAG",
    "Embeddings",
    "Generative AI",
    "Semantic / Vector Search",
    "Mechanistic Interpretability",
    "RL (PPO)",
    "pandas",
    "NumPy",
  ],
  frameworks: ["NestJS", "Spring", "Spring Boot", "Express.js"],
  databases: ["PostgreSQL", "MySQL", "Oracle", "Redis", "MongoDB"],
  cloud: ["AWS (EC2, S3, RDS, Lambda)", "Docker", "Jenkins", "GitLab CI/CD", "GitHub Actions"],
  api: ["REST API", "GraphQL", "OAuth2", "JWT"],
  tools: ["Git", "Linux", "Nginx", "TypeORM", "JPA"],
};

export const projects = [
  {
    slug: "dissertation-mechanistic-interp",
    title:
      "Dissertation: Causal Cue Retrieval and Greedy Route Execution — A Mechanistic Analysis of a Transformer Policy",
    description:
      "Mechanistic interpretability of a PPO-trained causal Transformer in a partially observable MiniGrid T-maze. Designed a worst-case cue metric that exposed one-sided shortcut policies hidden by aggregate success, then used causal interventions to verify genuine cue-dependent branch control rather than inferring it from correlation.",
    tech: ["PyTorch", "RL (PPO)", "Mechanistic Interpretability", "MiniGrid", "Python"],
    status: "Research",
    image: "/images/dissertation/architecture-comparison.png",
    gallery: [
      {
        src: "/images/dissertation/architecture-comparison.png",
        caption:
          "All three policies are trained under one shared PPO protocol — same task, same encodings, same cue-balanced schedule — so any difference comes from the architecture rather than the setup. The matched LSTM is included as a fairness control at equal parameter count, and it can solve the full task.",
      },
      {
        src: "/images/dissertation/training-dynamics.png",
        caption:
          "Why aggregate success is not enough. The dashed line marks a cue-blind policy that always takes the same route: it scores 0.5 on overall success while having learned nothing about the cue. Smin = min(S_key, S_ball) collapses for such a policy, which is what makes the failure mode visible.",
      },
      {
        src: "/images/dissertation/causal-interventions.png",
        caption:
          "Causal interventions on 1,000 held-out episodes. Under normal operation the policy is confident in the correct branch. Blocking retrieval pushes it to no branch preference (0.43 / 0.57), and patching in the opposite memory flips the decision outright (0.03 / 0.09) — evidence that the retrieved cue is used, not merely present.",
      },
    ],
    stats: [
      { label: "Transformer @ 32 bindings", value: "1.000" },
      { label: "Matched LSTM @ 8 bindings", value: "≤0.77" },
      { label: "Seeds reproducing it", value: "6 / 6" },
      { label: "Causal signature held in", value: "3 / 6" },
    ],
  },
  {
    slug: "gridflow-trade",
    title: "GridFlow Trade — AI-Powered BESS Trading Platform",
    description:
      "UK electricity price forecasting pipeline for battery energy storage trading. XGBoost model on 55,000+ real half-hourly settlement periods achieves MAE £4.10/MWh (R²=0.943), a 76% error reduction over Naive baseline. Selected for QMUL QIncubator.",
    tech: ["Python", "XGBoost", "LightGBM", "LSTM", "PostgreSQL", "Elexon API", "NESO API"],
    status: "Active",
    link: "https://www.gridflowtrade.com",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80",
    stats: [
      { label: "MAE", value: "£4.10/MWh" },
      { label: "R²", value: "0.943" },
      { label: "Error reduction vs Naive", value: "76%" },
      { label: "Training samples", value: "55,000+" },
    ],
  },
  {
    slug: "stock-ai-youtube",
    title: "Stock AI YouTube Pipeline",
    description:
      "Automated weekly AI stock analysis video pipeline using yfinance, OpenAI GPT-4, moviepy, and Stable Diffusion. Fetches market data, generates narrated scripts, synthesises visuals, and uploads to YouTube end-to-end.",
    tech: ["Python", "OpenAI GPT-4", "yfinance", "moviepy", "Stable Diffusion"],
    status: "Completed",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
    stats: [
      { label: "Pipeline steps automated", value: "5" },
      { label: "Human time per video", value: "~0 min" },
    ],
  },
  {
    slug: "buildu",
    title: "BuildU — AI University Application Advisor",
    description:
      "AI-powered university application advisor that analyses uploaded documents via OCR and generates personalised application strategies using GPT-4. Built with Next.js 15 and deployed on Vercel.",
    tech: ["Next.js 15", "OpenAI GPT-4", "Tesseract.js", "TypeScript", "Vercel"],
    status: "Completed",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    stats: [
      { label: "OCR engine", value: "Tesseract.js" },
      { label: "LLM", value: "GPT-4" },
      { label: "Deployment", value: "Vercel" },
    ],
  },
  {
    slug: "invntz-hackathon",
    title: "Invntz Hackathon — E-commerce Aggregator",
    description:
      "Web scraping and aggregation platform collecting product data from 5 e-commerce sites via automated browser crawling. Built with Spring Boot, Selenium, and Jsoup. Awarded 2nd place.",
    tech: ["Spring Boot", "Selenium", "Jsoup", "Java", "PostgreSQL"],
    status: "Completed",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
    stats: [
      { label: "Sites scraped", value: "5" },
      { label: "Hackathon result", value: "2nd place" },
    ],
  },
  {
    slug: "generative-storytelling",
    title: "Generative AI Storytelling & Illustration Agent",
    description:
      "End-to-end pipeline that converts keyword inputs into narrative stories using LLM APIs, then generates picture-book style illustrations via image-generation APIs. Extended to image-to-video workflows for animated output.",
    tech: ["Python", "OpenAI", "Stable Diffusion", "LLM APIs", "Pipeline Design"],
    status: "Prototype",
    image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=1200&q=80",
    stats: [
      { label: "Input", value: "Keywords" },
      { label: "Output", value: "Story + Illustrations" },
    ],
  },
  {
    slug: "ate",
    title: "[ATE] Recipe & Ingredients Management",
    description:
      "Full-stack application for managing recipes and tracking ingredients, including recipe CRUD, inventory tracking, and shopping list generation. Built with NestJS backend and React Native mobile client.",
    tech: ["NestJS", "TypeORM", "PostgreSQL", "TypeScript", "React Native", "REST API"],
    status: "In Development",
    github: "https://github.com/hncpyj",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=80",
    stats: [
      { label: "Backend", value: "NestJS" },
      { label: "Mobile", value: "React Native" },
      { label: "DB", value: "PostgreSQL" },
    ],
  },
  {
    slug: "so-easy",
    title: "SO Easy — Shared Office Booking Platform",
    description:
      "Team project: platform connecting shared office providers with businesses seeking flexible workspaces. My contributions: search engine implementation and kanban board feature. Includes availability, booking management, and payment integration.",
    tech: ["NestJS", "TypeScript", "PostgreSQL", "GraphQL", "AWS"],
    status: "Completed",
    github: "https://github.com/hncpyj",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    stats: [
      { label: "My role", value: "Search + Kanban" },
      { label: "API", value: "GraphQL" },
      { label: "Infra", value: "AWS" },
    ],
  },
  {
    slug: "kaggle-ai4code",
    title: "[Kaggle] Google AI4Code — Notebook Cell Ordering",
    description:
      "Transformer-based approach (CodeBERT, DistilBERT) for predicting the correct execution order of cells in Python notebooks. Included EDA, feature engineering, and iterative experiments benchmarking multiple architectures.",
    tech: ["Python", "PyTorch", "CodeBERT", "DistilBERT", "NLP", "scikit-learn"],
    status: "Completed",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80",
    stats: [
      { label: "Result", value: "Top ~17%" },
      { label: "Model", value: "CodeBERT" },
    ],
  },
  {
    slug: "kaggle-rsna",
    title: "[Kaggle] RSNA 2022 Cervical Spine Fracture Detection",
    description:
      "Medical imaging pipeline for detecting cervical spine fractures from CT scans. Applied data augmentation, normalization, and ROI extraction, followed by EfficientNetV2-based classification to predict seven fracture probabilities per patient.",
    tech: ["Python", "PyTorch", "EfficientNetV2", "Computer Vision", "scikit-learn"],
    status: "Completed",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80",
    stats: [
      { label: "Result", value: "Top ~28%" },
      { label: "Model", value: "EfficientNetV2" },
      { label: "Task", value: "Multi-label classification" },
    ],
  },
];

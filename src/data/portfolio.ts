export const personalInfo = {
  name: "WooAh Choi",
  title: "Machine Learning & Backend Engineer",
  email: "wooah.choi2@gmail.com",
  github: "https://github.com/hncpyj",
  blog: "https://backenddeveloper.tistory.com/",
  linkedin: "https://linkedin.com/in/wooah-choi",
  intro:
    "Machine Learning Engineer with a backend background focused on forecasting, information retrieval, and decision-making under uncertainty. I’m strengthening ML/NLP/IR fundamentals (math-first), including reinforcement learning and LLM-based NLP, and applying them to an energy trading research project built around leakage-resistant evaluation and backtesting.",
  about:
    "I’m transitioning from Backend Engineer to Machine Learning Engineer through an MSc in Artificial Intelligence at Queen Mary University of London. My current coursework spans Machine Learning, Neural Networks and NLP, Natural Language Processing, Information Retrieval, Statistical Planning and Reinforcement Learning, Conversational Agents (LLM-centered dialogue systems), and AI Ethics, Regulation and Law. This is building depth in both modeling and the theory behind it.\n\nCurrently, I’m in the research and design phase of a battery energy storage trading project in the UK electricity market. The current focus is defining market scope, data requirements, and a leakage-resistant evaluation protocol (rolling or walk-forward validation) so that future model changes translate into measurable, decision-relevant improvements. Next steps are to implement the data pipeline and a baseline forecasting and backtesting loop, then iterate toward probabilistic forecasting to support risk-aware bidding and position sizing. Longer term, I plan to explore decision policies informed by reinforcement learning.\n\nPreviously, I worked at Konan Technology for 2 years and 8 months on enterprise search and analysis services. I focused on information retrieval fundamentals such as indexing pipelines and ranking logic, applied NLP and ML approaches (BERT, NER, SFX, SRL, fastText, vector search), and leveraged search logs and time-series signals to deliver query intelligence features like related terms, recommendations, popular queries, and typo suggestions. I also supported quality monitoring and production stabilization.\n\nKaggle: Top ~17% in Google AI4Code and Top ~28% in RSNA 2022 Cervical Spine Fracture Detection.",  
  
  introHighlight: [
    "Machine Learning Engineer",
    "forecasting",
    "retrieval",
    "reinforcement learning",
    "LLM",
    "backtesting",
  ],
  /** Optional: phrases in about text to style as blue (link-style) */
  aboutHighlightBlue: [
    "Queen Mary University of London",
    "MSc in Artificial Intelligence",
    "QMUL",
    "Kaggle",
  ],
  /** Optional: phrases to style as green highlight */
  aboutHighlightGreen: [
    "leakage-resistant",
    "research project",
    "Machine Learning Engineer",
    "probabilistic forecasting",
    "Top ~17%",
  ],
};

export const experiences = [
  {
    company: "Konan Technology",
    role: "Backend Software Engineer",
    period: "Nov 2020 — Jun 2023",
    description:
      "Built and improved enterprise search and analysis services centered on information retrieval, indexing pipelines, and ranking logic. Applied NLP/ML approaches including BERT-based NER, SFX, SRL, fastText, and vector search. Leveraged search logs and time-series signals to ship query intelligence features (related terms, recommendations, popular queries, typo suggestions) and support quality monitoring and stabilization.",
    projects: [
      {
        name: "Supreme Court of Korea - E-litigation Search and Analysis",
        description:
          "Contributed to improving query understanding for a judicial information search service, focusing on intent-driven retrieval for case law and rulings. Worked on a query analysis approach using speech act analysis (SFX) and semantic role labeling (SRL) to derive structured constraints from user queries, such as time (recency), location (court), and case context. Collected and processed search logs, identified patterns, and ran transfer-learning experiments for SFX classification using PyTorch.\n\nFor entity extraction, trained and evaluated a BERT-based NER model to detect entities such as case number, law name, and party name, and supported mapping extracted tags to retrieval fields. When baseline quality was not sufficient, fine-tuned the NER model, re-indexed documents with updated tags, and measured a 4%+ improvement in extraction quality in internal evaluation.",
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
          "Built an indexing automation pipeline handling 100M+ data points and designed a dynamic volume system intended to scale beyond 1B records. \n\n Improved sorting quality by 38 percent by introducing a more detailed ranking logic and validating changes via monitoring during stabilization. Conducted user pattern analysis to refine retrieval behavior and ranking priorities.",
        tech: ["C++", "Python", "MySQL", "Linux"],
      },
      {
        name: "Heungkuk Insurance - Main Website Search Renewal",
        description:
          "Renewed the web search experience and shipped query assistance features including auto-completion and popular search terms. Improved usability with AJAX-based continuous scrolling and supported production rollout with log-based quality checks.",
        tech: ["Java", "Oracle", "SVN", "Linux", "JavaScript"],
      },
      {
        name: "Ministry of SMEs and Startups - Venture Confirmation System Search",
        description:
          "Implemented search features and APIs, including text extraction and indexing from documents stored in AWS S3. Delivered supporting backend utilities such as recursive file and folder deletion logic to handle operational workflows.",
        tech: ["Java", "PostgreSQL", "SVN", "Linux", "AWS S3"],
      },
    ],
  },
];

export const skills = {
  languages: ["TypeScript", "Java", "JavaScript", "SQL"],
  frameworks: ["NestJS", "Spring", "Spring Boot", "Express.js"],
  databases: ["PostgreSQL", "MySQL", "Redis", "MongoDB"],
  cloud: ["AWS (EC2, S3, RDS, Lambda)", "Docker", "Jenkins", "GitHub Actions"],
  api: ["REST API", "GraphQL", "OAuth2", "JWT"],
  tools: ["Git", "Linux", "Nginx", "TypeORM", "JPA"],
};

export const projects = [
  {
    title: "Grid Flow Trade - Battery Energy Storage Trading (Research)",
    description:
      "Research and design work for a battery energy storage trading system in the UK electricity market. Defining market scope, data requirements, and a leakage-resistant evaluation setup (rolling or walk-forward validation) before implementation. Next milestones include building a baseline forecasting and backtesting loop, then iterating toward probabilistic forecasting for risk-aware bidding and position sizing.",
    tech: [
      "Time Series Forecasting",
      "Backtesting",
      "Probabilistic Forecasting",
      "Rolling Validation",
      "Python",
      "PostgreSQL",
    ],
    status: "Research",
  },
  {
    title: "Generative Storytelling and Illustration AI Agent",
    description:
      "Prototype pipeline that turns keyword inputs into stories using generative AI APIs, then generates picture-book style illustrations from the story prompts. Iterating on prompt templates and orchestration to improve consistency, with a planned extension toward short-form animation workflows.",
    tech: ["LLM APIs", "Prompting", "Automation", "Pipeline Design"],
    status: "Prototype",
  },
  {
    title: "[Kaggle] Google AI4Code - Notebook Cell Ordering",
    description:
      "Transformer-based approach (CodeBERT, DistilBERT) for predicting notebook cell order, including EDA, feature engineering, and iterative experiments. Result: Top ~17%.",
    tech: ["Transformers", "CodeBERT", "DistilBERT", "NLP", "Experimentation"],
    status: "Completed",
  },
  {
    title: "[Kaggle] RSNA 2022 Cervical Spine Fracture Detection",
    description:
      "Medical imaging pipeline with augmentation, normalization, and ROI extraction, followed by EfficientNetV2-based classification experiments for slice-level targets. Result: Top ~28%.",
    tech: ["Computer Vision", "EfficientNetV2", "Preprocessing", "Model Training"],
    status: "Completed",
  },
  {
    title: "[ATE] Recipe and Ingredients Management",
    description:
      "Full-stack application for managing recipes and tracking ingredients, including recipe CRUD, inventory tracking, and shopping list generation.",
    tech: ["NestJS", "TypeORM", "PostgreSQL", "TypeScript", "REST API"],
    github: "https://github.com/hncpyj",
    status: "In Development",
  },
  {
    title: "SO Easy - Share Office Platform",
    description:
      "Platform connecting shared office providers with businesses seeking flexible workspaces. Includes availability, booking management, and payment integration.",
    tech: ["NestJS", "TypeScript", "PostgreSQL", "GraphQL", "AWS"],
    github: "https://github.com/hncpyj",
    status: "In Development",
  },
];

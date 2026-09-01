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
      "Built and improved enterprise search and NLP systems across four clients, cutting Supreme Court litigation search latency from 5+ minutes to 8 seconds. Applied BERT-based NER, SFX/SRL query analysis, fastText, and vector search; shipped query intelligence features including related terms, recommendations, popular queries, and typo correction.\n\nAlongside the four builds below, I supported 14 shorter engagements across finance, government, healthcare, manufacturing, energy and policing — engine installs and integrations, escalation support, and internal training on the search stack. These included a redundant, high-availability search deployment for the Export-Import Bank of Korea, where the topology the client specified was not achievable under the constraints in place; I prepared the technical case, presented it, and we agreed an alternative that met the availability requirement.",
    projects: [
      {
        slug: "supreme-court",
        name: "Supreme Court of Korea - E-litigation Search and Analysis",
        // The system I worked on is largely on a closed network. This public
        // portal exposes the same class of features, so it is offered as
        // "see the product", not "see my screen".
        link: "https://portal.scourt.go.kr/pgp/index.on?m=PGP1011M01&l=N&c=900",
        linkLabel: "Public portal",
        stats: [
          { label: "Search latency", value: "5+ min → 8 s" },
          { label: "Speed improvement", value: "37×" },
          { label: "Misanalysed cases resolved", value: "375+" },
          { label: "NER extraction quality", value: "+4%" },
        ],
        gallery: [
          {
            src: "/images/supreme-court/architecture.svg",
            caption:
              "The query pipeline I designed. Entities are tagged into typed fields offline, so at query time SFX and NER can route each term to the field that holds it rather than matching against the whole corpus. Vector search handles expansion and typo correction; search-log analytics feed expansion terms back in.",
          },
          {
            src: "/images/supreme-court/thesaurus.png",
            caption:
              "The part of this work I would point at first. Expanding a query term does not mean fetching synonyms — in law it means walking a hierarchy. Here 손해 (damages) expands into hyponyms (lost profit, medical expenses, direct, consequential, foreseeable, irrecoverable) and separately into related concepts (intent to cause damage, damage security, mitigation duty). A user searching the general term still reaches judgments that only ever use the specific one, which is exactly the omission problem a court system cannot tolerate.",
          },
          {
            src: "/images/supreme-court/keyword-map.png",
            caption:
              "The same concept mapped across all five corpora at once. 손해 (damages) surfaces as 손해액 and 위자료 in case law, 손해배상 and 이해관계인 in statutes, 불가항력 and 국제사법재판소 in treaties, 배상기 and 상당인과관계 in literature, and 확정일자 and 유가증권 in registry precedents. The same legal idea is expressed with different vocabulary depending on which corpus you are in, which is why a single flat synonym list does not work here.",
          },
          {
            src: "/images/supreme-court/case-law-search.png",
            caption:
              "Case law results. The system I worked on runs mostly on a closed network, but this public portal exposes the same class of features I built: morphological search rather than substring matching, related terms beside the query, relevance-versus-popularity ranking, result counts per field (full text 14,377 / summary 4,874 / holding 4,154), and facet counts by court level, precedent grade and case type.",
          },
          {
            src: "/images/supreme-court/literature-autocomplete.png",
            caption:
              "Auto-completion over the literature corpus. The suggestions are whole article titles containing the typed term, not prefix matches on a static dictionary — on the systems I delivered these candidates came from search-log analysis, so they tracked what users were actually looking for.",
          },
          {
            src: "/images/supreme-court/statutes.png",
            caption:
              "Statutes, with a schema of their own: promulgation number and date, enforcement date, amendment status, and a choice between current-only and historical versions. Each corpus needs its own typed fields; a single generic index cannot answer \"which version was in force on this date\".",
          },
          {
            src: "/images/supreme-court/treaties.png",
            caption:
              "Treaties, again with a different schema — bilateral versus multilateral, counterpart country, subject area, continent, effective date versus gazette date. Five corpora, five field sets, one query-understanding layer in front of them.",
          },
          {
            src: "/images/supreme-court/rules-precedents.png",
            caption:
              "Rules, established practice and registry precedents. Note the field-scoped tabs — title (7) / body (157) / appendix (0) / forms (3) / rule number (19) — which is the same idea as scoping a query to the field the entity actually lives in, surfaced to the user as a choice.",
          },
        ],
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
        slug: "millie-library",
        name: "Millie's Library - Book Search and User Pattern Analysis",
        stats: [
          { label: "Indexed points", value: "100M+" },
          { label: "Designed to scale to", value: "1B+ records" },
          { label: "Ranking quality", value: "+38%" },
          { label: "Searchable collections", value: "5" },
        ],
        gallery: [
          {
            src: "/images/millie/architecture.svg",
            caption:
              "The search stack as I built it. Full and dynamic indexing keep the index current without a nightly rebuild; the query layer handles completion, typo correction and expansion before retrieval; and the ranking layer combines field matches with engagement counted over rolling windows. Everything the log-analytics loop derives at the bottom is fed back into the query layer at the top.",
          },
          {
            src: "/images/millie/recommended-terms.png",
            caption:
              "The recommended-search-terms row, and the piece of this project I am proudest of. It was not in the original scope, the engine had no such feature, and there was no labelled data to build one from — the client asked for it anyway. What I built groups accounts by when in the day they search, then forecasts each group's term demand from its own search history, so the row is driven by search behaviour rather than editorially curated. The feature is still in the app.",
          },
          {
            src: "/images/millie/popular-terms.png",
            caption:
              "Popular search terms with rise/fall/steady markers, timestamped to the aggregation window. Note rows 1 and 9 (오디세이 / 오디세이아) and 2 and 8 (히가시노 게이고 / 히가시노게이고): spelling and spacing variants are counted separately rather than merged. That is the raw form the log analysis needs — which variant users actually type is exactly the signal the typo-correction dictionary is extracted from, and merging them before counting would throw it away.",
          },
          {
            src: "/images/millie/autocomplete.png",
            caption:
              "Auto-completion on the partial term 이토록. The matches are whole titles containing the term, and the term is highlighted wherever it falls — mid-title in 누군가를 이토록 사랑한 적 and 심리학이 이토록 재미있을 줄이야, not just at the start. Korean prefix matching alone would have missed both. The candidate dictionary is rebuilt by a batch job that exports title and category fields ordered by recent opens, so ranking inside the suggestion list follows real demand.",
          },
          {
            src: "/images/millie/unified-results.png",
            caption:
              "Unified search across five collections — books, webtoons/webnovels, Millie Road, posts, shelves — each with its own count and its own tab. One query, five differently-shaped result sets, ranked independently and then presented together.",
          },
          {
            src: "/images/millie/author-results.png",
            caption:
              "An author query returns a curated collection card above the books. Ranking here is not pure text relevance — 97 titles match 히가시노 and the order they come back in is decided by the ranking layer, which weighs field matches against engagement signals such as recent opens, shelf adds, completion percentage and review count. Tuning those weights against a fixed list of about a hundred test queries is the work behind the 38% ranking-quality improvement.",
          },
        ],
        description:
          "Engineered an automated indexing system handling 100M+ data points, designed to scale beyond 1B records. Improved search ranking quality by 38% via custom scoring logic. Implemented auto-completion, related-term suggestion, and typo correction. Delivered time-series analysis of search terms for recommended and popular keyword features.",
        tech: ["C++", "Python", "MySQL", "Linux"],
      },
      {
        slug: "heungkuk-fire",
        name: "Heungkuk Fire & Marine Insurance - Main Website Search Renewal",
        link: "https://m.heungkukfire.co.kr/common/search/CCOTF0201_M01/CCOTF0201_M01.do",
        linkLabel: "Live search",
        stats: [
          { label: "Result categories", value: "6" },
          { label: "Shipped", value: "2022 — still live" },
          { label: "Layer", value: "Full-stack" },
        ],
        gallery: [
          {
            src: "/images/heungkuk/architecture.svg",
            caption:
              "Where this delivery sits. The search engine is the same one behind my other Konan deliveries; what was mine here was everything in front of it — the JSP/JSTL page, the AJAX layer that requests each category, the incremental rendering, and the log-derived popular terms and completion candidates that populate the empty state.",
          },
          {
            src: "/images/heungkuk/results-and-popular-terms.png",
            caption:
              "The page still running today, on a query for 보험 (insurance): popular-term chips above, recent searches, then 468 results split by category with a count on each tab. The chips are worth a second look — they read 제지급 · 철회 · 배서 · 금리인하 · 모바일 here, and a different five when I checked earlier the same day. They are derived from the search logs and rotate with them, which is the whole point of not hard-coding an empty state.\n\nThe menu results underneath show what Korean morphological indexing buys you: 보험 is highlighted inside 장기보험증권, 자동차보험금지급확인서 and 휴면보험금신청 — mid-word, in compounds the user never typed. Substring matching would find some of these by accident and miss the rest.",
          },
          {
            src: "/images/heungkuk/documents-glossary.png",
            caption:
              "Two of the six categories have shapes the others do not. Forms are PDFs, indexed by their extracted text and returned as downloads rather than pages. Glossary entries (104 of them for this query) expand inline, so a user who searched a term they did not understand gets the definition without leaving the results — with the query highlighted through the definition body as well. Each of these needed its own template and its own rendering path in the page.",
          },
        ],
        description:
          "Full-stack development of the web application's search system. Implemented AJAX-based continuous scrolling for smooth user experience and built auto-completion and popular search term features. Supported production rollout with log-based quality monitoring.",
        tech: [
          "Java",
          "JSP",
          "JSTL",
          "JavaScript",
          "AJAX",
          "Oracle",
          "SVN",
          "Linux",
        ],
      },
      {
        slug: "venture-confirmation",
        name: "Ministry of SMEs and Startups - Venture Confirmation System Search",
        link: "https://www.smes.go.kr/venturein/totalSearch/viewTotalSearchList?keyword=%EB%B2%A4%EC%B2%98%ED%99%95%EC%9D%B8",
        linkLabel: "Live search",
        stats: [
          { label: "Result categories", value: "3" },
          { label: "Date-range filters", value: "6" },
          { label: "Document source", value: "AWS S3" },
          { label: "Deliverable", value: "Search + REST API" },
        ],
        gallery: [
          {
            src: "/images/venture/architecture.svg",
            caption:
              "The pipeline. Attached documents live in S3 rather than on the search server, so indexing them starts with a fetch: pull the object, extract its text, index it alongside the record it belongs to, then delete the downloaded tree. The query side is a REST API, shipped with a written guide because the deliverable included someone else being able to call it.",
          },
          {
            src: "/images/venture/search-filters.png",
            caption:
              "The live search on a query for 벤처확인 (venture certification): 276 results across three collections, with the count on each tab — including 벤처공시 (disclosures) at 0. Above it, the controls: refine within results, popular terms, sort by relevance or recency, and a period filter of all / 1 day / 1 week / 1 month / 1 year / custom. The period filter is a domain requirement rather than a nicety — government application windows expire, and a two-year-old notice about one is worse than no result.",
          },
          {
            src: "/images/venture/refine-within-results.png",
            caption:
              "Refine within results, doing its job. The box now holds 수수료 (fee) with the checkbox ticked, so the second term is applied to the 276 results from the first query rather than to the whole corpus: 276 → 28, and both terms stay highlighted in every hit. The user narrowed instead of starting over — which is also why both queries have to be carried in the request state rather than just the latest one.",
          },
        ],
        description:
          "Developed search engine and RESTful API with text extraction and indexing from documents via Aspose and PDFBox. Implemented recursive file/folder deletion logic for efficient data management.",
        tech: [
          "Java",
          "PostgreSQL",
          "AWS S3",
          "Aspose",
          "PDFBox",
          "REST API",
          "SVN",
          "Linux",
        ],
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
      { label: "Matched LSTM, retrospective @ 8", value: "0.688" },
      { label: "Paired gap, seeds reproducing", value: "6 / 6" },
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

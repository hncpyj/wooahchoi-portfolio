/**
 * Canonical skill vocabulary.
 *
 * Two levels on purpose. Specific technologies stay their own facets, because
 * "Oracle" and "PostgreSQL" are different signals to a hiring engineer and
 * collapsing them into "SQL" throws that away. Parents exist only so a broad
 * click ("Databases") can gather its children.
 *
 * Aliases map the inconsistent raw strings used across the site onto one id.
 * The free-text search will reuse this dictionary for query expansion.
 *
 * `evidence` records where the skill is actually backed up:
 *   experience  — paid production work
 *   project     — a project on this site
 *   coursework  — taught modules or assignments, no shipped artefact
 *   none        — NEEDS_REVIEW, nothing to point at yet
 */

export type SkillCategory =
  | "ML/AI"
  | "NLP & Search"
  | "Languages"
  | "Backend"
  | "Data"
  | "Infrastructure";

export type Evidence = "experience" | "project" | "coursework" | "none";

export type CanonicalSkill = {
  id: string;
  label: string;
  category: SkillCategory;
  parent?: string;
  aliases: string[];
  evidence: Evidence;
  note?: string;
};

export const SKILLS: CanonicalSkill[] = [
  // ============================================================== ML / AI
  { id: "pytorch", label: "PyTorch", category: "ML/AI", aliases: ["pytorch", "torch"], evidence: "experience" },
  {
    id: "tensorflow",
    label: "TensorFlow",
    category: "ML/AI",
    aliases: ["tensorflow", "keras"],
    evidence: "project",
    note: "Kaggle competitions.",
  },
  {
    id: "huggingface",
    label: "Hugging Face",
    category: "ML/AI",
    aliases: ["hugging face", "huggingface"],
    evidence: "project",
    note: "Kaggle work. Not used at Konan — the BERT fine-tuning there ran on an internal stack.",
  },

  { id: "transformer", label: "Transformers", category: "ML/AI", aliases: ["transformer", "transformers", "causal transformer"], evidence: "experience" },
  { id: "bert", label: "BERT", category: "ML/AI", parent: "transformer", aliases: ["bert"], evidence: "experience", note: "Supreme Court NER." },
  { id: "codebert", label: "CodeBERT / DistilBERT", category: "ML/AI", parent: "transformer", aliases: ["codebert", "distilbert"], evidence: "project" },

  { id: "llm", label: "LLM", category: "ML/AI", aliases: ["llm", "llm apis", "openai", "openai gpt-4", "gpt-4", "gpt"], evidence: "project" },
  { id: "generative-ai", label: "Generative AI", category: "ML/AI", aliases: ["generative ai", "stable diffusion", "moviepy"], evidence: "project" },

  { id: "rl", label: "Reinforcement Learning (PPO)", category: "ML/AI", aliases: ["rl (ppo)", "rl", "ppo", "reinforcement learning", "minigrid"], evidence: "project" },
  { id: "interpretability", label: "Mechanistic Interpretability", category: "ML/AI", aliases: ["mechanistic interpretability", "interpretability"], evidence: "project" },
  { id: "evaluation", label: "Evaluation & Benchmarking", category: "ML/AI", aliases: ["evaluation", "benchmarking", "backtesting"], evidence: "project", note: "Dissertation Smin metric and causal ablations; GridFlow leakage-free validation." },

  { id: "xgboost", label: "XGBoost", category: "ML/AI", aliases: ["xgboost"], evidence: "project" },
  { id: "lightgbm", label: "LightGBM", category: "ML/AI", aliases: ["lightgbm"], evidence: "project" },
  { id: "lstm", label: "LSTM", category: "ML/AI", aliases: ["lstm"], evidence: "project" },
  { id: "sklearn", label: "scikit-learn", category: "ML/AI", aliases: ["scikit-learn", "sklearn"], evidence: "project" },
  { id: "computer-vision", label: "Computer Vision", category: "ML/AI", aliases: ["computer vision", "efficientnetv2"], evidence: "project", note: "Kaggle RSNA only." },

  {
    id: "rag",
    label: "RAG",
    category: "ML/AI",
    aliases: ["rag", "retrieval augmented", "retrieval-augmented generation"],
    evidence: "coursework",
    note: "NEEDS_REVIEW: MSc coursework only. The Supreme Court system was retrieval without generation; the GPT-4 projects generate without retrieval. RAG appears in 11 of 21 screened job postings, so this is the highest-value gap to close with a real project.",
  },

  // ========================================================= NLP & Search
  { id: "nlp", label: "NLP", category: "NLP & Search", aliases: ["nlp", "natural language processing"], evidence: "experience", note: "Broad by design: every Konan delivery is a text search system and the LLM projects process language. Use the child facets (NER, query intent, topic modelling) when you need precision." },
  { id: "information-retrieval", label: "Information Retrieval", category: "NLP & Search", aliases: ["information retrieval", "ir", "search engine", "bm25"], evidence: "experience", note: "All four Konan client deliveries." },
  { id: "indexing", label: "Indexing Pipelines", category: "NLP & Search", parent: "information-retrieval", aliases: ["indexing", "index", "re-indexing"], evidence: "experience", note: "Millie's Library: 100M+ points, designed to scale beyond 1B." },
  { id: "ranking", label: "Ranking & Scoring", category: "NLP & Search", parent: "information-retrieval", aliases: ["ranking", "scoring", "relevance"], evidence: "experience", note: "Millie's Library: +38% ranking quality via custom scoring logic." },
  { id: "semantic-search", label: "Semantic / Vector Search", category: "NLP & Search", parent: "information-retrieval", aliases: ["semantic / vector search", "semantic search", "vector search", "embeddings", "embedding"], evidence: "experience" },
  { id: "query-expansion", label: "Query Expansion", category: "NLP & Search", parent: "information-retrieval", aliases: ["query expansion"], evidence: "experience" },
  { id: "typo-correction", label: "Typo Correction", category: "NLP & Search", parent: "information-retrieval", aliases: ["typo correction", "spelling correction", "did you mean"], evidence: "experience" },
  { id: "autocomplete", label: "Auto-completion", category: "NLP & Search", parent: "information-retrieval", aliases: ["auto-completion", "autocomplete", "related-term suggestion"], evidence: "experience" },
  { id: "ner", label: "Named Entity Recognition", category: "NLP & Search", parent: "nlp", aliases: ["ner", "named entity recognition", "entity extraction"], evidence: "experience", note: "Case numbers, law names, party names." },
  { id: "intent-classification", label: "Query Intent Classification", category: "NLP & Search", parent: "nlp", aliases: ["sfx", "srl", "semantic role labelling", "dialogue behaviour analysis", "intent classification"], evidence: "experience", note: "SFX + SRL, 4%+ accuracy improvement." },
  { id: "topic-modelling", label: "Topic Modelling (LDA)", category: "NLP & Search", parent: "nlp", aliases: ["lda", "topic modelling", "topic modeling", "tf-idf"], evidence: "experience" },
  { id: "web-scraping", label: "Web Scraping & OCR", category: "NLP & Search", aliases: ["selenium", "jsoup", "tesseract.js", "ocr", "crawling"], evidence: "project" },

  // ============================================================ Languages
  { id: "python", label: "Python", category: "Languages", aliases: ["python"], evidence: "experience" },
  { id: "java", label: "Java", category: "Languages", aliases: ["java"], evidence: "experience" },
  { id: "spring", label: "Spring", category: "Languages", parent: "java", aliases: ["spring", "spring boot", "spring mvc"], evidence: "experience" },
  { id: "jpa", label: "JPA", category: "Languages", parent: "java", aliases: ["jpa"], evidence: "experience", note: "Konan Spring work. Supreme Court and Heungkuk are the confirmed Spring projects." },
  { id: "cpp", label: "C++", category: "Languages", aliases: ["c++", "cpp"], evidence: "experience" },
  { id: "typescript", label: "TypeScript", category: "Languages", aliases: ["typescript", "ts"], evidence: "project" },
  { id: "javascript", label: "JavaScript", category: "Languages", aliases: ["javascript", "js", "ajax"], evidence: "experience" },
  {
    id: "r",
    label: "R",
    category: "Languages",
    aliases: ["r"],
    evidence: "coursework",
    note: "Statistics modules and assignments during the CS + Statistics double major. Kept deliberately: it is part of the evidence for a statistical foundation, alongside the A+ in linear algebra and discrete mathematics.",
  },

  // ============================================================== Backend
  { id: "nestjs", label: "NestJS", category: "Backend", aliases: ["nestjs", "nest.js"], evidence: "project" },
  { id: "typeorm", label: "TypeORM", category: "Backend", parent: "nestjs", aliases: ["typeorm"], evidence: "project" },
  { id: "expressjs", label: "Express.js", category: "Backend", aliases: ["express.js", "express"], evidence: "project", note: "ATE. NestJS runs on Express underneath." },
  { id: "oauth2", label: "OAuth2", category: "Backend", aliases: ["oauth2", "oauth"], evidence: "project", note: "ATE authentication." },
  { id: "jwt", label: "JWT", category: "Backend", aliases: ["jwt"], evidence: "project", note: "ATE authentication." },
  { id: "nextjs", label: "Next.js / React", category: "Backend", aliases: ["next.js 15", "next.js", "nextjs", "react", "react native"], evidence: "project" },
  { id: "rest-api", label: "REST API", category: "Backend", aliases: ["rest api", "restful api", "api"], evidence: "experience" },
  { id: "graphql", label: "GraphQL", category: "Backend", aliases: ["graphql"], evidence: "project" },

  // ================================================================= Data
  { id: "oracle", label: "Oracle", category: "Data", parent: "sql", aliases: ["oracle", "pl/sql"], evidence: "experience", note: "Supreme Court and Heungkuk Insurance. Enterprise Oracle, not just generic SQL." },
  { id: "mysql", label: "MySQL", category: "Data", parent: "sql", aliases: ["mysql"], evidence: "experience", note: "Millie's Library." },
  { id: "postgresql", label: "PostgreSQL", category: "Data", parent: "sql", aliases: ["postgresql", "postgres"], evidence: "experience", note: "Ministry of SMEs, and the personal projects." },
  { id: "sql", label: "SQL", category: "Data", aliases: ["sql"], evidence: "experience", note: "Parent facet. Clicking it gathers Oracle, MySQL and PostgreSQL." },
  { id: "pandas", label: "pandas / NumPy", category: "Data", aliases: ["pandas", "numpy"], evidence: "project" },
  { id: "time-series", label: "Time-Series Analysis", category: "Data", aliases: ["time series", "time-series analysis"], evidence: "experience", note: "Search-log analysis for recommended and popular keywords; GridFlow price forecasting." },
  { id: "data-viz", label: "Data Visualisation", category: "Data", aliases: ["visualisation", "visualization", "dashboard", "line chart", "bubble chart", "dendrogram"], evidence: "experience", note: "Search analytics dashboards for Supreme Court administrators." },
  { id: "data-pipelines", label: "Data Pipelines", category: "Data", aliases: ["pipeline design", "elexon api", "neso api", "yfinance", "data pipeline"], evidence: "project" },

  // ======================================================= Infrastructure
  { id: "docker", label: "Docker", category: "Infrastructure", aliases: ["docker", "container"], evidence: "experience" },
  { id: "jenkins", label: "Jenkins", category: "Infrastructure", parent: "cicd", aliases: ["jenkins"], evidence: "experience" },
  { id: "gitlab", label: "GitLab", category: "Infrastructure", parent: "cicd", aliases: ["gitlab", "gitlab ci/cd"], evidence: "experience" },
  { id: "cicd", label: "CI/CD", category: "Infrastructure", aliases: ["ci/cd"], evidence: "experience", note: "Jenkins pipelines on GitLab for unit/integration testing and production deployment." },
  { id: "github-actions", label: "GitHub Actions", category: "Infrastructure", parent: "cicd", aliases: ["github actions"], evidence: "project", note: "Confirmed from GitHub PR history. Jenkins on GitLab was the Konan setup; Actions is the personal-project side." },
  { id: "git", label: "Git", category: "Infrastructure", aliases: ["git", "svn"], evidence: "experience", note: "Universal, so it carries little signal as a filter — kept because it belongs in a skills inventory." },
  { id: "aws", label: "AWS", category: "Infrastructure", aliases: ["aws", "aws s3", "aws (ec2, s3, rds, lambda)", "ec2", "s3", "rds", "lambda"], evidence: "experience" },
  { id: "vercel", label: "Vercel", category: "Infrastructure", aliases: ["vercel"], evidence: "project" },
  { id: "linux", label: "Linux", category: "Infrastructure", aliases: ["linux"], evidence: "experience" },
];

/**
 * Listed on the site previously with nothing to point at, and no natural home.
 * Either find evidence or drop them from the CV.
 * Git and SVN are excluded deliberately — too generic to work as facets.
 */
/** Now surfaced as real facets with evidence: "none" — see the notes on each. */
/** Dropped after review: Redis, MongoDB, Nginx — no work to point at. Remove
 *  them from the CV too. */
export const NEEDS_EVIDENCE: string[] = [];

const ALIAS_TO_ID = new Map<string, string>();
for (const skill of SKILLS) {
  ALIAS_TO_ID.set(skill.id, skill.id);
  ALIAS_TO_ID.set(skill.label.toLowerCase(), skill.id);
  for (const alias of skill.aliases) ALIAS_TO_ID.set(alias, skill.id);
}

export function resolveSkill(raw: string): string | null {
  return ALIAS_TO_ID.get(raw.trim().toLowerCase()) ?? null;
}

export function getSkill(id: string): CanonicalSkill | undefined {
  return SKILLS.find((s) => s.id === id);
}

/** A parent facet also matches everything beneath it. */
export function expandSkill(id: string): string[] {
  const children = SKILLS.filter((s) => s.parent === id).map((s) => s.id);
  return [id, ...children];
}

/**
 * Tags for documents whose real content is richer than their tag list.
 * The Konan deliveries are taken verbatim from the CV stack lists, plus the
 * techniques named in their bullets.
 * Keyed by project slug or experience sub-project name.
 */
export const EXTRA_TAGS: Record<string, string[]> = {
  // [Java, Spring, Jenkins, GitLab, Python, Linux, Docker, C++, PyTorch, BERT, Oracle]
  "Supreme Court of Korea - E-litigation Search and Analysis": [
    "java", "spring", "jpa", "jenkins", "gitlab", "cicd", "git", "python", "linux", "docker",
    "cpp", "pytorch", "bert", "oracle",
    "information-retrieval", "indexing", "semantic-search", "query-expansion",
    "typo-correction", "nlp", "ner", "intent-classification", "topic-modelling",
    "time-series", "data-viz",
  ],
  // [C++, Python, MySQL]
  "Millie's Library - Book Search and User Pattern Analysis": [
    "cpp", "python", "mysql",
    "information-retrieval", "indexing", "ranking", "autocomplete",
    "typo-correction", "time-series",
  ],
  // [Java, JavaScript, Oracle]
  "Heungkuk Fire & Marine Insurance - Main Website Search Renewal": [
    "java", "spring", "jpa", "javascript", "oracle", "nlp",
    "information-retrieval", "autocomplete",
  ],
  // [Java, PostgreSQL]
  "Ministry of SMEs and Startups - Venture Confirmation System Search": [
    "java", "postgresql", "aws", "nlp",
    "information-retrieval", "indexing", "rest-api",
  ],

  "dissertation-mechanistic-interp": ["evaluation", "python", "transformer"],
  "gridflow-trade": ["pandas", "data-pipelines", "evaluation", "time-series", "python"],
  "kaggle-ai4code": ["transformer", "codebert", "nlp", "pandas", "huggingface", "tensorflow"],
  "kaggle-rsna": ["computer-vision", "pandas", "huggingface", "tensorflow"],
  "stock-ai-youtube": ["llm", "generative-ai", "data-pipelines", "nlp"],
  buildu: ["llm", "web-scraping", "nextjs", "typescript", "vercel", "nlp", "github-actions", "cicd"],
  "generative-storytelling": ["llm", "generative-ai", "python", "nlp"],
  "invntz-hackathon": ["web-scraping", "java", "spring", "postgresql"],
  ate: ["nestjs", "typeorm", "expressjs", "oauth2", "jwt", "rest-api", "postgresql", "typescript", "aws", "nextjs"],
  "so-easy": ["nestjs", "typeorm", "graphql", "postgresql", "typescript", "aws", "information-retrieval"],
};

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { experiences, projects } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, TrendingUp } from "lucide-react";
import type { Metadata } from "next";


/**
 * Detail pages cover personal projects and the client deliveries under
 * Experience. The Konan work is the strongest evidence on this site, so it
 * needs somewhere to point at, not just a bullet.
 */
type Entry = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  status: string;
  image?: string;
  gallery?: { src: string; caption: string }[];
  stats?: { label: string; value: string }[];
  context?: string;
  period?: string;
  github?: string;
  link?: string;
  /** Button text for `link`. "Visit Site" is wrong for a client's public portal. */
  linkLabel?: string;
};

const entries: Entry[] = [
  ...(projects as unknown as Entry[]),
  ...experiences.flatMap((exp) =>
    (exp.projects ?? [])
      .filter((sub): sub is typeof sub & { slug: string } => "slug" in sub)
      .map(
        (sub): Entry => ({
          slug: sub.slug,
          title: sub.name,
          description: sub.description,
          tech: sub.tech ?? [],
          status: "Completed",
          context: exp.company,
          period: exp.period,
          stats: "stats" in sub ? sub.stats : undefined,
          gallery: "gallery" in sub ? sub.gallery : undefined,
          link: "link" in sub ? sub.link : undefined,
          linkLabel: "linkLabel" in sub ? sub.linkLabel : undefined,
        })
      )
  ),
];

const findEntry = (slug: string) => entries.find((e) => e.slug === slug);

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const project = findEntry(slug);
  if (!project) return {};
  return {
    title: `${project.title} | WooAh Choi`,
    description: project.description,
  };
}

const statusColor: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Completed: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  Prototype: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Research: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  "In Development": "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
};

const projectDetails: Record<
  string,
  {
    overview: string;
    sections: { heading: string; body: string }[];
  }
> = {
  "dissertation-mechanistic-interp": {
    overview:
      "A mechanistic study of how a PPO-trained causal Transformer policy solves a partially observable MiniGrid T-maze, where the instruction cue is no longer visible at the point the decision is made. The headline result is methodological rather than architectural: the aggregate success metric hid a failure mode, and a worst-case metric plus causal interventions were needed to tell genuine memory use apart from a shortcut.",
    sections: [
      {
        heading: "Problem",
        body: "In a T-maze where the cue (key or ball) disappears before the junction, an agent that always turns the same way scores roughly 50% on mean success while having learned nothing about the cue. Aggregate success therefore cannot distinguish a policy that retrieves the instruction from one that has collapsed onto a single route. Any claim about memory made on that metric is unfalsifiable.",
      },
      {
        heading: "Making the task honest",
        body: "Before measuring anything I removed the ways the result could be trivially explained: a symmetric maze layout so neither branch is geometrically favoured, and explicit verification that no visual leakage lets the agent observe the cue at decision time. Without this step a positive result would say nothing about memory.",
      },
      {
        heading: "The metric",
        body: "I defined Smin = min(S_key, S_ball), the worse of the two cue branches. One-sided policies that look competent under mean success collapse under Smin, which makes the failure mode visible instead of averaged away. Checkpoint selection was locked to a validation split so the reported number is not chosen on the test set.",
      },
      {
        heading: "Causal interventions",
        body: "Correlational evidence — a probe decoding the cue from a hidden state — shows only that the information is present, not that the policy uses it. To test use rather than presence I applied three intervention families: retrieval blocking, opposite-memory patching, and norm-preserving source exchange, the last controlling for the possibility that an effect is merely an activation-magnitude artefact. Ridge-decoded probes targeted the retrieval output and the gated feature at the decision timesteps.",
      },
      {
        heading: "Results, including the inconvenient one",
        body: "Difference-vector attribution assigned 33–58% of the key–ball retrieval difference to padding. But exchanging the padding-derived source reversed no decision, while exchanging the real-transition source reversed both — at exactly preserved norm, so the effect was not an artefact of activation magnitude. Correlation and causation pointed at different sources on the same policy, which is the result the dissertation is built around.\n\nTwo things complicate it, and both are reported. The symmetric real-only signature appeared in only three of six checkpoints, so equal behaviour did not imply equal mechanism. And a parameter-matched LSTM (h = 304, 2.90M parameters) also solved the task, at Smin = 0.898. That removed the architecture-comparison claim I started with, so the contribution moved to where the evidence actually supported it: the analysis and the measurement framework, not a ranking of architectures.\n\nThe one clean architectural separation came from a preregistered fixed-length follow-up that isolates retrospective load from navigation. The Transformer held 1.000 accuracy through 32 stored bindings and 0.9997 at 64. At eight bindings with a retrospective query, the matched LSTM reached 0.688 against the Transformer's 0.997 — a paired gap of +0.308 (95% CI [+0.294, +0.326]), positive in all six held-out seeds, and still +0.243 against an LSTM four times the size.\n\nThe separation is specific, and the dissertation says so: prospective queries do not separate the architectures the same way (the matched LSTM reaches 0.878 at eight bindings there). The supported claim is timing-moderated load sensitivity in this task, not a general ranking of architectures.",
      },
      {
        heading: "What is reusable",
        body: "A branch-level failure decomposition separating Type-I (readout) from Type-II (aggregation) failures, locked checkpoint selection, and a causal context-ablation taxonomy. Together these separate real memory use from shortcut behaviour in any task with a similar branch structure — the same problem that golden sets and adversarial cases address in LLM evaluation.",
      },
    ],
  },
  "venture-confirmation": {
    overview:
      "The Venture Confirmation System is the Korean government's register for certified venture businesses — companies apply through it, and the public searches it for scheme guidance, disclosures and support material. I built the search: the indexing path, the REST API, and the guide someone else needed in order to call it.\n\nMost of the interesting work on this one was in the plumbing rather than in the retrieval.",
    sections: [
      {
        heading: "The documents were not on the server",
        body: "The records themselves come out of the database, but their attachments — application forms, guidance documents, the files hanging off notices and FAQ entries — live in S3, not on the machine doing the indexing. That changes the shape of the job. Reading a local file either works or throws; fetching an object over a network can hang, half-succeed, or fail for one file in a batch of hundreds while the rest are fine.\n\nSo the first thing I wrote was the S3 download method, called per file from the indexing connector, with failures caught per file so one bad object does not take the whole run down with it. Only then does extraction start.",
      },
      {
        heading: "Making a PDF into text",
        body: "A PDF is not text until something makes it text, and on a government site a lot of the substance is inside the attachments rather than in the page body. Someone searching for a filing deadline should find the form that states it, not just the notice that links to the form.\n\nExtraction went through the engine's text filter, backed by Aspose and PDFBox, and the extracted text was indexed alongside the record it belonged to. Results are grouped into three collections: scheme guidance, venture disclosures, and customer support.",
      },
      {
        heading: "The recursive delete, and why it matters",
        body: "This is the least impressive line on my CV and one of the ones I would most happily defend.\n\nAn S3 object key is a path, not a filename — the documents here are keyed by type and upload date, so a key looks like pdf/202103/11/<file>. The download method recreates that structure locally, which means one indexing run does not leave a handful of files behind in a flat folder. It leaves a nested, date-partitioned tree.\n\nA delete call will not remove a directory that still has anything in it, so \"clean up after yourself\" is not one operation. It is a depth-first walk: recurse into each subdirectory, clear its contents, and only then remove the directory itself on the way back up.\n\nGet it wrong and nothing fails. The indexing job succeeds, the search works, the tests pass — and every run leaves debris behind until, weeks later, the disk fills up in production. The bugs I find most interesting are the ones that do not announce themselves, and this was an early, very small example of one.",
      },
      {
        heading: "An API someone else has to call",
        body: "The search is exposed as a REST API taking keyword, category, sort order, date range and paging; the site's search page is built on it. The deliverable was not just the endpoint but the guide — what each parameter does, what comes back, what happens at the edges — because someone who had not built it had to integrate against it.\n\nThat turned out to be the useful part of this project for me. Writing the interface down forces you to notice which of your parameters only make sense if you already know how the thing works internally, which is the same instinct that later made me care about whether a result set is explainable to the person looking at it.",
      },
      {
        heading: "The query surface",
        body: "Sort by relevance or by newest, filter by all time / 1 day / 1 week / 1 month / 1 year / custom range, and refine within results — a second query applied to the current result set rather than to the whole corpus, so a user narrows instead of starting over.\n\nThe period filter earns its place on a site like this rather than being a generic extra: government notices expire, and a two-year-old announcement about an application window is arguably worse than no result at all. Each category also carries its own count, zero counts included, so the shape of the result set is visible before anything is opened.",
      },
    ],
  },
  "heungkuk-fire": {
    overview:
      "Heungkuk Fire & Marine is a Korean insurer. This delivery was the search on their main site — and unlike my other Konan projects, the engine was not the hard part. Everything the user touches was: the page, the AJAX layer, the result rendering, and the empty state. It was my first full-stack delivery, and the project where I found out that the parts of engineering I was weakest at were the parts users actually touch.\n\nIt shipped in 2022 and the search is still running.",
    sections: [
      {
        heading: "What was actually mine",
        body: "The search platform already existed — I had worked on it for other clients. What did not exist was this site's search experience. I built the JSP/JSTL pages, the JavaScript that talks to the search API, and the rendering of six differently-shaped result categories: site menus, insurance products, FAQ entries, downloadable PDF forms, the insurance glossary, and everything else.\n\nEach category has its own count, and the counts are shown even when they are zero. That sounds trivial and is not: it tells the user the shape of the result set before they open anything, so nobody taps through three empty tabs to find out their query only matched notices.",
      },
      {
        heading: "Continuous scrolling instead of paging",
        body: "The requirement was that results keep loading as the user scrolls, rather than replacing the page with the next set. So paging moved into AJAX: the current page stays where it is and the next block of results is appended below.\n\nWhat made it harder than it sounds is that scroll position, request state and rendered output all have to stay consistent with each other while the user keeps scrolling — and the same path is exercised again when they switch category or search again. Auto-completion has the same shape of problem on a shorter timescale. This is where most of the JavaScript work on this project went, and almost none of it is visible when it is right.",
      },
      {
        heading: "The empty state",
        body: "A search box with nothing in it is a dead end, especially on an insurance site where users often do not know the term for the thing they want. So the empty state shows popular search terms as tappable chips.\n\nThey come from the search logs rather than an editor's guess, and they still rotate: checking the live site twice on the same day returned 보험금청구 · 자동이체 · 약관 · 주행거리 · 해지 once and 제지급 · 철회 · 배서 · 금리인하 · 모바일 the next time. That is the same principle as the recommended terms at Millie's Library and the related terms in the Supreme Court system — three different domains, one idea: the logs already know what people are looking for.",
      },
      {
        heading: "The part I was bad at",
        body: "I wanted to do this well and for a while I could not. The problems were not conceptually hard — they were front-end problems, script execution order and client-side state I had not had to reason about before, and I did not yet have a mental model for them. It was the first time the gap between wanting to build something well and knowing how was that wide.\n\nWhat I wrote down at the time was two things: clean code, and script execution order. They are really the same lesson — in a codebase where anything can run at any time, the discipline has to come from you rather than from the compiler. I took that into Millie's Library, and Millie's Library is where the testing discipline in the rest of my work came from.",
      },
    ],
  },
  "millie-library": {
    overview:
      "Millie's Library is one of Korea's largest subscription e-book services. It was replacing the search behind the app, and the brief was not only \"make search work\" — two of the things the client wanted, ranking control and personalised recommended search terms, did not exist in the engine and had to be designed from scratch. I delivered the indexing pipeline, the ranking logic, and the search-log analytics the keyword features are derived from, then stayed through launch and stabilisation.",
    sections: [
      {
        heading: "Indexing that stays current",
        body: "A catalogue this size cannot be rebuilt from scratch every time a book's metadata changes, and it cannot be left stale either — a title that just went live has to be findable immediately. So indexing runs in two modes: a periodic full index that guarantees consistency, and a dynamic index that applies incremental changes as they arrive. The pipeline handles over 100M indexed points and was designed with headroom past 1B records.\n\nThe other half of index quality is language. Korean is agglutinative, so substring matching gives you both false positives and misses; the win came from morphological analysis with a much wider dictionary than the previous setup had.",
      },
      {
        heading: "Ranking logic, built from nothing",
        body: "There was no ranking layer to tune. Results came back in whatever order retrieval produced them, which for a catalogue of this size means the right book is somewhere on page four.\n\nWhat I built combines two families of signal. First, field matches — a query hitting the title should not count the same as one hitting the author or the narrator. Second, engagement, counted over rolling windows rather than all-time: opens in the last 7 and 30 days, shelf adds over the same windows, review count, completion percentage, dwell time. Recent windows are weighted more heavily than lifetime totals, which is what stops a book that was popular three years ago from permanently occupying the top slot.\n\nEvery one of those signals carries its own weight, and weights interact — raising one to fix a bad result usually breaks a good one elsewhere. The client's product manager and I built a fixed list of around a hundred test queries, including spacing and spelling variants, and re-ran the whole list on every weight change so a fix could be checked against the same baseline instead of the one query that prompted it. That discipline is where the 38% ranking-quality improvement came from; it was not a single clever idea.",
      },
      {
        heading: "Deriving keyword features from the logs",
        body: "Popular terms, rising terms, related terms and recommended terms are all downstream of one thing: analysis of the search logs over time. Volume per term across rolling windows is what produces both the popularity ranking and the rise/fall markers next to it. None of it is hand-curated, so it tracks what users are actually searching for rather than what someone assumed they would.\n\nThe same pipeline produces two things that are less visible and more useful. The typo-correction dictionary is extracted automatically instead of being maintained by hand. And terms that are searched repeatedly but return few or no results are flagged — sometimes that means a missing dictionary entry, and sometimes it means readers want a book the catalogue does not carry, which goes to the acquisition team. Search logs turned out to be a demand signal, not just a quality signal.",
      },
      {
        heading: "The feature that had no data",
        body: "Personalised recommended search terms were not in the original scope. The engine had no such capability, there was no labelled data to train anything on, and the client asked for it regardless. Nobody on the project had an approach.\n\nI was taking a forecasting course at the time, and the idea came from there: treat search history as a time series rather than as a bag of terms, and use when someone searches as the grouping variable. Accounts that search at similar times of day turn out to behave similarly, which gives you groups without needing demographic data or an explicit profile, and each group's term demand can then be projected forward from its own history.\n\nIt shipped with the search relaunch, and the recommended-terms row is still in the app today. Of everything I built at Konan, this is the piece I would point at if someone asked whether I can produce a method rather than implement one.",
      },
      {
        heading: "Auto-completion",
        body: "Suggestions are whole titles containing the typed term, with the match highlighted wherever it falls rather than only at the start — Korean prefix matching alone would miss a term that appears in the middle of a title, which in practice is most of them.\n\nThe candidate dictionary is rebuilt by a batch job that exports the title and category fields, orders them by recent opens, and then triggers a reload of the completion module. Ordering by demand means the suggestion list is itself ranked, so the most likely completion is the first one.",
      },
      {
        heading: "What I took from it",
        body: "This was the project where I learned what quality actually costs. The client tested at QA depth — the same fixed query list, the same criteria, every time a variable changed — and thinking through side effects before touching anything became a habit rather than an intention. It is also the first project where the hardest questions I raised had no answer inside my own company and had to go to the engine's R&D team, which is how I found out that being stuck is often a bug report rather than a knowledge gap.\n\nAnd it was fun. Watching results reorder as I moved a weight is the closest thing to a tight feedback loop I had found in production work at that point, and it is a large part of why retrieval and evaluation are still what I want to work on.",
      },
    ],
  },
  "supreme-court": {
    overview:
      "The Supreme Court of Korea was replacing its electronic litigation search system. The users are judges, clerks and litigants searching case law, judgments and treaties — a domain where a missed result is not an inconvenience but a consequence for someone's case. I owned the NLP and search layer end to end, from requirements analysis and infrastructure design through deployment and post-launch stabilisation.\n\nThe role had been scoped for an engineer at assistant-manager grade, which at that company required three years and a track record. I was assigned to it on the day I completed my first year.",
    sections: [
      {
        heading: "Why not a rule-based layer",
        body: "The common approach in comparable systems was a rule-based chatbot sitting in front of search. That works until a user phrases something the rules did not anticipate, and in a legal corpus that is most of the time. I argued for learned query understanding instead, and built it in two parts: SFX (speech act analysis) with SRL to work out what the user was actually constraining — recency, which court, case context — and a BERT-based NER to pull out the entities that matter in law: case numbers, statute names, party names.\n\nWhere documents resisted clean categorisation, SRL-derived labels were used as the training signal rather than forcing a category that did not fit.",
      },
      {
        heading: "Routing instead of matching",
        body: "Once entities are tagged into typed fields at index time, a query does not have to be matched against everything. SFX segments it, each term is routed to the field that actually holds that entity type, and the result comes back without scanning the rest. On top of that, vector search handles query expansion and typo correction, so a slightly wrong case number or an unfamiliar phrasing still lands.",
      },
      {
        heading: "Results",
        body: "Search latency dropped from over five minutes to eight seconds, a 37× improvement, from rebuilding the Java backend algorithms and the indexing pipeline. Fine-tuning the NER and re-indexing improved extraction quality by 4%+. 375+ previously misanalysed cases were resolved.\n\nI also set up the Jenkins CI/CD pipelines on GitLab for unit and integration testing through to production deployment.",
      },
      {
        heading: "The feedback loop",
        body: "Search logs were mined for related and recommended keywords, which fed back into query expansion and the results UI. Supervised tagging (LKWD) degraded results because of errors in the tagging step, so unsupervised LDA with careful preprocessing was used instead — it performed better in a single pass. I also attempted TF-IDF summarisation and was not satisfied with the quality; it stayed unfinished.\n\nAdministrators got search analytics dashboards — line, bubble and dendrogram charts — so search quality could be monitored rather than assumed.",
      },
      {
        heading: "What I took from it",
        body: "Because omissions in a court system affect real trials, \"good enough on average\" was not an acceptable bar. I kept testing and iterating until omissions were eliminated rather than reduced. That is the same instinct I later formalised in my dissertation, where an aggregate metric turned out to be hiding a failure mode, and it is why evaluation work interests me now.",
      },
    ],
  },
  "gridflow-trade": {
    overview:
      "GridFlow Trade is a battery energy storage (BESS) trading research platform targeting the UK Balancing Mechanism. The core deliverable is a leakage-resistant price forecasting pipeline that informs bid/offer price decisions in the 30-minute settlement market.",
    sections: [
      {
        heading: "Problem",
        body: "UK electricity prices are highly non-stationary — they are driven by renewable intermittency, demand cycles, interconnector flows, and system stress events. Naïve models trained on raw price series massively overfit to temporal leakage, producing misleadingly good in-sample results that fail out-of-sample.",
      },
      {
        heading: "Feature Engineering",
        body: "I engineered 48 domain-driven features on 55,000+ real UK half-hourly settlement periods sourced via the NESO and Elexon APIs. Features include: cyclical temporal encodings (hour, day-of-week, settlement period), price lags from 30-min to 7-day, rolling statistics (mean, std, min/max), weather × generation cross-features, Loss of Load Probability (LOLP), and de-rated generation margin.",
      },
      {
        heading: "Model Selection",
        body: "I benchmarked a full progression: Naïve → Linear/Ridge → LightGBM → XGBoost → 2-layer LSTM, all evaluated with time-based expanding-window cross-validation to prevent temporal leakage. ADF stationarity tests, STL seasonal decomposition, and ACF/PACF analysis informed feature transformations. Lasso/Ridge regularisation was applied to prevent overfitting on high-cardinality lag features.",
      },
      {
        heading: "Results",
        body: "XGBoost achieved MAE £4.10/MWh with R²=0.943 on held-out settlement periods — a 76% error reduction over the Naïve baseline. The model was deployed as an XGBoost quantile regression for BM bid/offer price prediction. GridFlow Trade was selected for the QMUL QIncubator programme and pitched to an investor panel in April 2026.",
      },
    ],
  },
  "stock-ai-youtube": {
    overview:
      "A fully automated pipeline that produces weekly AI-generated stock analysis videos and uploads them to YouTube with zero manual intervention.",
    sections: [
      {
        heading: "Pipeline",
        body: "1. Data fetch: yfinance pulls weekly OHLCV and fundamental data for a predefined watchlist.\n2. Script generation: OpenAI GPT-4 receives the market data and produces a structured narration script with headline, key moves, and outlook sections.\n3. Visual synthesis: Stable Diffusion generates thematic background images; price charts are rendered with matplotlib and composited via moviepy.\n4. Upload: the finished MP4 is uploaded to YouTube via the Data API v3 with auto-generated title, description, and tags.",
      },
      {
        heading: "Design decisions",
        body: "GPT-4 is prompted with a strict JSON output schema so the script parser is deterministic. Stable Diffusion runs locally to avoid per-image API costs. moviepy handles all video composition, transitions, and audio overlay. The full pipeline runs in under 10 minutes on a consumer GPU.",
      },
    ],
  },
  buildu: {
    overview:
      "BuildU is an AI-powered university application advisor. Users upload their personal statement, transcript, or other application documents; the app extracts the text via OCR, analyses it with GPT-4, and returns personalised feedback and strategy recommendations.",
    sections: [
      {
        heading: "OCR Pipeline",
        body: "Document uploads are processed client-side with Tesseract.js, which handles PDF, PNG, and JPG inputs and produces clean plain-text output. This approach avoids server-side file storage and keeps processing fast for the end user.",
      },
      {
        heading: "AI Analysis",
        body: "The extracted text is sent to OpenAI GPT-4 with a structured prompt that asks the model to: (1) identify strengths and gaps in the applicant's profile, (2) suggest target universities matched to the profile, and (3) produce specific action items to strengthen the application. The response is streamed back to the UI using Next.js server actions.",
      },
      {
        heading: "Deployment",
        body: "The app is deployed on Vercel with Next.js 15 App Router, using server-side rendering for the landing page and client components for the interactive upload and results flow. Edge functions handle the GPT-4 streaming response.",
      },
    ],
  },
  "invntz-hackathon": {
    overview:
      "A web scraping and product aggregation platform built for the Invntz hackathon. The platform crawls 5 e-commerce sites, normalises product data, and serves a unified search and comparison interface.",
    sections: [
      {
        heading: "Scraping Architecture",
        body: "Spring Boot orchestrates the scraping jobs. Sites requiring JavaScript rendering are handled by Selenium WebDriver (headless Chrome); static HTML pages are parsed directly with Jsoup. A scheduling layer runs each site's crawler on a configurable interval and stores results in PostgreSQL.",
      },
      {
        heading: "Result",
        body: "The team was awarded 2nd place at the Invntz hackathon, judged on technical implementation, data coverage, and the live product comparison demo.",
      },
    ],
  },
  "generative-storytelling": {
    overview:
      "An end-to-end generative pipeline that takes a set of keywords and produces a fully illustrated short story — and optionally, a short animated video.",
    sections: [
      {
        heading: "Story Generation",
        body: "The user provides 3–5 keywords. A structured GPT prompt generates a multi-paragraph narrative with consistent characters and a clear arc. Prompt templates were iterated extensively to improve consistency across story genres.",
      },
      {
        heading: "Illustration Generation",
        body: "Each paragraph of the story is condensed into a Stable Diffusion prompt. A consistent style token is prepended to every prompt to maintain visual coherence across illustrations. Generated images are then composited with the story text using PIL.",
      },
      {
        heading: "Animation Extension",
        body: "A subsequent pipeline uses moviepy to animate the illustrations — pan/zoom effects, fade transitions, and text-to-speech narration — producing a short MP4 suitable for social media.",
      },
    ],
  },
  ate: {
    overview:
      "ATE (from 'ate' — past tense of eat) is a full-stack recipe and ingredients management application. Users can create and browse recipes, track pantry inventory, and auto-generate shopping lists based on what is missing for a selected recipe.",
    sections: [
      {
        heading: "Backend",
        body: "The NestJS API uses TypeORM with PostgreSQL for relational data modelling. Entities include Recipe, Ingredient, InventoryItem, and ShoppingList, with computed relations for the 'missing ingredients' shopping list query.",
      },
      {
        heading: "Features",
        body: "Recipe CRUD with ingredient quantities and steps. Pantry inventory tracking with stock levels. One-tap shopping list generation that diffs a recipe's ingredient list against current inventory. Search and filter by ingredient, cuisine, or preparation time.",
      },
    ],
  },
  "so-easy": {
    overview:
      "SO Easy is a shared office booking platform built as a team project. The platform connects flexible workspace providers with businesses looking for short-term office solutions. My contributions were the search engine and the kanban board feature.",
    sections: [
      {
        heading: "My Contributions",
        body: "Search engine: implemented full-text search with filtering by location, capacity, price range, and availability using PostgreSQL full-text search and custom ranking logic.\n\nKanban board: a real-time board for office managers to track booking requests through stages (Pending → Confirmed → Checked-in → Completed). Built with a GraphQL subscription for live updates.",
      },
      {
        heading: "Platform Overview",
        body: "The broader platform includes: space listing management, calendar-based availability views, booking and payment integration (Toss Payments), and a review system. The backend is NestJS with GraphQL; infrastructure runs on AWS (EC2, RDS, S3).",
      },
    ],
  },
  "kaggle-ai4code": {
    overview:
      "Google AI4Code challenged competitors to restore the correct cell execution order of shuffled Python Jupyter notebooks — essentially a sequence ordering problem over code and markdown cells.",
    sections: [
      {
        heading: "Approach",
        body: "I fine-tuned CodeBERT and DistilBERT to predict pairwise cell orderings, then used a ranking aggregation step to produce the final sequence. EDA revealed strong signals in markdown headings, import statements, and variable reference patterns across cells.",
      },
      {
        heading: "Feature Engineering",
        body: "Beyond the raw cell text, I extracted: cell type (code vs markdown), relative cell position in the original (as a training signal), cross-cell token overlap, and notebook-level metadata. Iterative experiments on a held-out local validation set guided architecture and hyperparameter choices.",
      },
      {
        heading: "Result",
        body: "Final standing: Top ~17% on the private leaderboard.",
      },
    ],
  },
  "kaggle-rsna": {
    overview:
      "The RSNA 2022 challenge required automated detection of cervical spine fractures in CT scan volumes, with separate binary predictions for each of the 7 cervical vertebrae plus an overall fracture label.",
    sections: [
      {
        heading: "Preprocessing Pipeline",
        body: "CT volumes were processed slice-by-slice. Preprocessing included HU windowing, normalisation, and data augmentation (random flip, rotation, brightness jitter). ROI extraction focused crops on the cervical spine region to reduce background noise.",
      },
      {
        heading: "Model",
        body: "EfficientNetV2 was used as the backbone for slice-level feature extraction. Slice features were aggregated across the volume with a lightweight temporal pooling layer to produce vertebra-level predictions. The model was trained with BCE loss with positive-class weighting to handle the significant class imbalance in fracture labels.",
      },
      {
        heading: "Result",
        body: "Final standing: Top ~28% on the private leaderboard.",
      },
    ],
  },
};

export default function ProjectPage({ params }: Props) {
  const { slug } = params;
  const project = findEntry(slug);
  if (!project) notFound();

  const detail = projectDetails[slug];

  return (
    <div className="min-h-screen">
      {/* Hero. Client deliveries have no image of their own and should not
          borrow stock photography, so they get a plain gradient instead. */}
      <div className="relative h-72 w-full overflow-hidden sm:h-96">
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950" />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-5xl mx-auto">
          <Badge
            className={`mb-3 border-0 ${statusColor[project.status] ?? "bg-gray-100 text-gray-700"}`}
          >
            {project.status}
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Back */}
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link href="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        {/* Tech + links */}
        <div className="flex flex-wrap items-center gap-3">
          {project.tech.map((t) => (
            <Badge key={t} variant="secondary" className="text-sm">
              {t}
            </Badge>
          ))}
          <div className="ml-auto flex gap-2">
            {"github" in project && typeof project.github === "string" && (
              <Button asChild variant="outline" size="sm">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
            )}
            {"link" in project && typeof project.link === "string" && (
              <Button asChild size="sm">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {("linkLabel" in project && typeof project.linkLabel === "string"
                    ? project.linkLabel
                    : "Visit Site")}
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        {"stats" in project && Array.isArray(project.stats) && project.stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.stats.map((stat: { label: string; value: string }) => (
              <div
                key={stat.label}
                className="rounded-xl border bg-card p-4 text-center shadow-sm"
              >
                <div className="flex justify-center mb-1">
                  <TrendingUp className="h-4 w-4 text-cyan-500" />
                </div>
                <div className="text-xl font-bold tracking-tight">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Figures. Real work, with captions that say what the reader is
            looking at — the point of a portfolio page over a CV bullet. */}
        {"gallery" in project &&
          Array.isArray(project.gallery) &&
          project.gallery.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold">Figures</h2>
              {(project.gallery as { src: string; caption: string }[]).map(
                (figure, i) => {
                  // Diagrams are the argument and are in English, so they run
                  // full width. Product screenshots are mostly Korean UI that a
                  // non-Korean reader cannot parse anyway — shown small, as
                  // evidence that the thing exists, with the caption carrying
                  // the meaning. Click for full resolution.
                  const isDiagram = figure.src.endsWith(".svg");

                  if (isDiagram) {
                    return (
                      <figure key={figure.src} className="space-y-3">
                        <div className="relative w-full overflow-hidden rounded-xl border bg-white shadow-sm">
                          <Image
                            src={figure.src}
                            alt={figure.caption}
                            width={1600}
                            height={900}
                            sizes="(max-width: 768px) 100vw, 900px"
                            className="h-auto w-full object-contain"
                            priority={i === 0}
                          />
                        </div>
                        <figcaption className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                          {figure.caption}
                        </figcaption>
                      </figure>
                    );
                  }

                  return (
                    <figure
                      key={figure.src}
                      className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6"
                    >
                      <a
                        href={figure.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group shrink-0 self-start"
                        title="Open full size"
                      >
                        <Image
                          src={figure.src}
                          alt={figure.caption}
                          width={1200}
                          height={1600}
                          sizes="240px"
                          className="max-h-72 w-auto rounded-lg border bg-white object-contain shadow-sm transition-shadow group-hover:shadow-md"
                        />
                        <span className="mt-1.5 block text-[11px] text-muted-foreground/70 group-hover:text-muted-foreground">
                          Open full size
                        </span>
                      </a>
                      <figcaption className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {figure.caption}
                      </figcaption>
                    </figure>
                  );
                }
              )}
            </div>
          )}

        {/* Overview */}
        {detail ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{detail.overview}</p>
            </div>

            <div className="space-y-6">
              {detail.sections.map((sec) => (
                <div key={sec.heading} className="rounded-xl border bg-card p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-3">{sec.heading}</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground leading-relaxed">{project.description}</p>
        )}
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);
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
        body: "The validation-selected checkpoint reached Smin = 0.959, and the interventions confirmed genuine cue-dependent branch control. However, a parameter-matched LSTM (h = 304, 2.90M parameters) also solved the task at Smin = 0.898. That result removed the architecture-comparison claim I had started with, so the contribution moved to where the evidence actually supported it: the analysis and the measurement framework, not a ranking of architectures.",
      },
      {
        heading: "What is reusable",
        body: "A branch-level failure decomposition separating Type-I (readout) from Type-II (aggregation) failures, locked checkpoint selection, and a causal context-ablation taxonomy. Together these separate real memory use from shortcut behaviour in any task with a similar branch structure — the same problem that golden sets and adversarial cases address in LLM evaluation.",
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
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const detail = projectDetails[slug];

  return (
    <div className="min-h-screen">
      {/* Hero image */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
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
                  Visit Site
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

import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  // Without this, Next cannot resolve relative URLs in openGraph/twitter metadata
  // and logs a warning on every build.
  metadataBase: new URL("https://wooahchoi.com"),
  title: "WooAh Choi | Machine Learning Engineer, AI Safety and Evaluation",
  description:
    "Portfolio of WooAh Choi — Machine Learning Engineer working on AI safety, agent control and the evaluation of systems that are harder to verify than they look. PyTorch, Transformers, reinforcement learning, NLP and information retrieval, with three years of production engineering.",
  keywords: [
    "Machine Learning Engineer",
    "AI Safety",
    "Evaluation",
    "Agent Control",
    "Mechanistic Interpretability",
    "Python",
    "PyTorch",
    "Reinforcement Learning",
    "Transformer",
    "LLM",
    "BERT",
    "XGBoost",
    "NLP",
    "Information Retrieval",
    "Java",
    "PostgreSQL",
    "AWS",
  ],
  authors: [{ name: "WooAh Choi" }],
  openGraph: {
    title: "WooAh Choi | Machine Learning Engineer, AI Safety and Evaluation",
    description:
      "Machine Learning Engineer working on AI safety, agent control and the evaluation of systems that are harder to verify than they look.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "WooAh Choi | Machine Learning Engineer, AI Safety and Evaluation",
    description:
      "Machine Learning Engineer working on AI safety, agent control and the evaluation of systems that are harder to verify than they look.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

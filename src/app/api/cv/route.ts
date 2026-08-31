import { NextResponse } from "next/server";

/**
 * The CV is no longer generated from portfolio.ts.
 *
 * It used to be rendered on the fly with jsPDF, which meant the downloaded file
 * silently drifted from the real CV — most seriously, it omitted the entire
 * `skills.ml` block, so an ML engineering CV downloaded with no ML skills on it,
 * and had no Education or Academic Service sections at all.
 *
 * The real document now lives at public/WooAh_Choi_CV.pdf, exported from
 * career/WooahChoi_CV.docx. This route is kept only so that any existing link
 * to /api/cv still resolves to the correct file.
 */
export function GET() {
  return NextResponse.redirect(
    new URL("/WooAh_Choi_CV.pdf", "https://wooahchoi.com"),
    308
  );
}

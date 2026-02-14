// src/app/api/cv/route.ts
import { NextResponse } from "next/server";
import { jsPDF } from "jspdf";

// Single source of truth
import { personalInfo, experiences, projects, skills } from "@/data/portfolio";

// Avoid caching in dev and prod
export const dynamic = "force-dynamic";
export const revalidate = 0;

type RGB = [number, number, number];

function sanitizeText(input: string) {
  // jsPDF는 기본 폰트에서 일부 문자가 깨질 수 있음.
  // 필요 시 여기에서 더 정리해도 됨.
  return (input || "").replace(/\u2014/g, "-").replace(/\u2013/g, "-");
}

export async function GET() {
  try {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    let y = 18;

    // Colors
    const primary: RGB = [99, 102, 241]; // violet
    const dark: RGB = [20, 24, 38];
    const gray: RGB = [90, 102, 120];
    const lightGray: RGB = [226, 232, 240];

    const lineHeight = (fontSize: number) => fontSize * 0.45 + 1.2;

    const checkPage = (needed: number) => {
      if (y + needed > pageHeight - 18) {
        doc.addPage();
        y = 18;
      }
    };

    const drawSectionTitle = (title: string) => {
      checkPage(14);
      doc.setTextColor(primary[0], primary[1], primary[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12.5);
      doc.text(title.toUpperCase(), margin, y);
      y += 2;

      doc.setDrawColor(primary[0], primary[1], primary[2]);
      doc.setLineWidth(0.6);
      doc.line(margin, y, margin + contentWidth, y);
      y += 6;
    };

    const drawParagraph = (
      text: string,
      fontSize: number,
      color: RGB,
      opts?: { bold?: boolean; indent?: number; maxWidth?: number }
    ) => {
      const bold = !!opts?.bold;
      const indent = opts?.indent ?? 0;
      const maxWidth = opts?.maxWidth ?? contentWidth - indent;

      doc.setTextColor(color[0], color[1], color[2]);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(fontSize);

      const safe = sanitizeText(text);
      const lines = doc.splitTextToSize(safe, maxWidth);

      checkPage(lines.length * lineHeight(fontSize) + 2);
      doc.text(lines, margin + indent, y);
      y += lines.length * lineHeight(fontSize);
      y += 1.5;
    };

    const drawKeyValueLine = (label: string, value: string) => {
      checkPage(7);
      doc.setFontSize(9.2);

      doc.setTextColor(dark[0], dark[1], dark[2]);
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, margin, y);

      doc.setTextColor(gray[0], gray[1], gray[2]);
      doc.setFont("helvetica", "normal");
      doc.text(sanitizeText(value), margin + 30, y);
      y += 5.5;
    };

    // =========================
    // Header
    // =========================
    doc.setFillColor(primary[0], primary[1], primary[2]);
    doc.rect(0, 0, pageWidth, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text(sanitizeText(personalInfo.name), margin, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(sanitizeText(personalInfo.title), margin, 29);

    doc.setFontSize(9);
    const linkToLabel = (url: string) => {
      try {
        const u = new URL(url.startsWith("http") ? url : `https://${url}`);
        return u.hostname.replace(/^www\./, "") + u.pathname.replace(/\/$/, "");
      } catch {
        return url;
      }
    };
    const contactParts = [
      personalInfo.email,
      personalInfo.github && linkToLabel(personalInfo.github),
      personalInfo.linkedin && linkToLabel(personalInfo.linkedin),
      personalInfo.blog && linkToLabel(personalInfo.blog),
    ].filter(Boolean) as string[];
    doc.text(sanitizeText(contactParts.join("  |  ")), margin, 36);

    y = 50;

    // =========================
    // Summary (use intro)
    // =========================
    drawSectionTitle("Professional Summary");
    drawParagraph(personalInfo.intro, 9.6, dark);

    // =========================
    // Experience
    // =========================
    drawSectionTitle("Work Experience");

    const exp = experiences?.[0];
    if (exp) {
      checkPage(18);

      doc.setTextColor(dark[0], dark[1], dark[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11.2);
      doc.text(sanitizeText(exp.company), margin, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.2);
      doc.setTextColor(gray[0], gray[1], gray[2]);
      doc.text(
        sanitizeText(`${exp.role}  |  ${exp.period}`),
        margin + 45,
        y
      );
      y += 6;

      drawParagraph(exp.description, 9.2, gray);

      // Projects under the experience
      if (Array.isArray(exp.projects) && exp.projects.length > 0) {
        for (const p of exp.projects) {
          checkPage(20);

          doc.setTextColor(dark[0], dark[1], dark[2]);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(9.8);
          doc.text(`• ${sanitizeText(p.name)}`, margin + 2, y);
          y += 4.2;

          doc.setFont("helvetica", "normal");
          doc.setFontSize(9.0);
          doc.setTextColor(gray[0], gray[1], gray[2]);
          const descLines = doc.splitTextToSize(
            sanitizeText(p.description),
            contentWidth - 8
          );
          checkPage(descLines.length * 3.7 + 7);
          doc.text(descLines, margin + 6, y);
          y += descLines.length * 3.7;

          if (Array.isArray(p.tech) && p.tech.length > 0) {
            doc.setTextColor(primary[0], primary[1], primary[2]);
            doc.setFontSize(8.0);
            doc.text(`Tech: ${sanitizeText(p.tech.join(", "))}`, margin + 6, y);
            y += 5.2;
          } else {
            y += 2.5;
          }
        }
      }
    } else {
      drawParagraph("No experience data found.", 9.2, gray);
    }

    // =========================
    // Skills (optional)
    // =========================
    drawSectionTitle("Technical Skills");

    // Keep it compact to avoid 2 pages
    if (skills) {
      drawKeyValueLine("Languages", (skills.languages || []).join(", "));
      drawKeyValueLine("Frameworks", (skills.frameworks || []).join(", "));
      drawKeyValueLine("Databases", (skills.databases || []).join(", "));
      drawKeyValueLine("Cloud", (skills.cloud || []).join(", "));
      drawKeyValueLine("API", (skills.api || []).join(", "));
      drawKeyValueLine("Tools", (skills.tools || []).join(", "));
    } else {
      drawParagraph("No skills data found.", 9.2, gray);
    }

    // =========================
    // Projects (from projects array)
    // =========================
    drawSectionTitle("Projects");

    const projectList = Array.isArray(projects) ? projects : [];
    for (const p of projectList) {
      checkPage(18);

      doc.setTextColor(dark[0], dark[1], dark[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.8);
      doc.text(`• ${sanitizeText(p.title)}`, margin + 2, y);
      y += 4.2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.0);
      doc.setTextColor(gray[0], gray[1], gray[2]);
      const descLines = doc.splitTextToSize(sanitizeText(p.description), contentWidth - 8);
      checkPage(descLines.length * 3.7 + 8);
      doc.text(descLines, margin + 6, y);
      y += descLines.length * 3.7;

      if (Array.isArray(p.tech) && p.tech.length > 0) {
        doc.setTextColor(primary[0], primary[1], primary[2]);
        doc.setFontSize(8.0);
        doc.text(`Tech: ${sanitizeText(p.tech.join(", "))}`, margin + 6, y);
        y += 4.8;
      }

      if (p.status) {
        doc.setTextColor(gray[0], gray[1], gray[2]);
        doc.setFontSize(8.2);
        doc.text(`Status: ${sanitizeText(p.status)}`, margin + 6, y);
        y += 5.0;
      } else {
        y += 2.5;
      }
    }

    // =========================
    // Footer
    // =========================
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.setLineWidth(0.3);
      doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);

      doc.setTextColor(gray[0], gray[1], gray[2]);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(
        `${sanitizeText(personalInfo.name)}  |  ${sanitizeText(personalInfo.title)}  |  Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 5,
        { align: "center" }
      );
    }

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=WooAh_Choi_Resume.pdf",
        // No caching so it always reflects latest portfolio.ts
        "Cache-Control": "no-store",
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("CV generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate CV" },
      { status: 500 }
    );
  }
}
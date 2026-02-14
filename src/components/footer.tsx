import { personalInfo } from "@/data/portfolio";
import { Github, Linkedin, BookOpen, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            Wooah Choi
          </span>
          <span className="text-sm text-muted-foreground">
            &copy; {currentYear} {personalInfo.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${personalInfo.email}`}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-violet-600 hover:bg-violet-100 dark:hover:bg-violet-500/10 dark:hover:text-violet-400 transition-colors"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-500/10 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={personalInfo.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-500/10 dark:hover:text-orange-400 transition-colors"
            aria-label="Blog"
          >
            <BookOpen className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

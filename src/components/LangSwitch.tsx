import Link from "next/link";

interface LangSwitchProps {
  current: "ko" | "en";
  koHref: string;
  enHref: string;
}

export default function LangSwitch({ current, koHref, enHref }: LangSwitchProps) {
  return (
    <div className="flex items-center gap-1 text-sm">
      {current === "ko" ? (
        <span className="px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-500/15 text-orange-700 dark:text-orange-300 font-medium">
          KO
        </span>
      ) : (
        <Link
          href={koHref}
          className="px-2 py-0.5 rounded text-muted-foreground hover:bg-orange-100 dark:hover:bg-orange-500/15 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
        >
          KO
        </Link>
      )}
      <span className="text-muted-foreground/40">/</span>
      {current === "en" ? (
        <span className="px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300 font-medium">
          EN
        </span>
      ) : (
        <Link
          href={enHref}
          className="px-2 py-0.5 rounded text-muted-foreground hover:bg-violet-100 dark:hover:bg-violet-500/15 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
        >
          EN
        </Link>
      )}
    </div>
  );
}

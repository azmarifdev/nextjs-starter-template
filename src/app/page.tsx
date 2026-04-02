import { ArrowRight, Globe, Sparkles } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { LangSwitcher } from "@/components/layout/lang-switcher";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <main className="landing-wrap">
      <header className="showcase-topbar">
        <div className="showcase-topbar-inner container">
          <p className="showcase-brand">nextjs-starter-template</p>
          <div className="showcase-topbar-actions">
            <LangSwitcher />
            <ThemeSwitcher />
            <Link className="showcase-signin" href="/login">
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <section className="showcase-hero container">
        <p className="showcase-badge">
          <Sparkles size={14} />
          By A. Z. M. Arif · Full Stack Software Developer
        </p>
        <h1 className="showcase-title">
          <span>Next.js</span> starter template
        </h1>
        <p className="showcase-subtitle">
          {t("subtitle")} Built for quick launch, maintainable growth, and production-grade
          development workflow.
        </p>
        <p className="showcase-meta">
          <Globe size={14} /> azmarif.dev · @azmarifdev
        </p>
        <div className="showcase-actions">
          <Link className="showcase-btn-primary" href="/register">
            Get started <ArrowRight size={15} />
          </Link>
          <a
            className="showcase-btn-secondary"
            href="https://github.com/azmarifdev/nextjs-starter-template"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </section>
    </main>
  );
}

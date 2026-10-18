# Blog Migration: Tistory to English Blog

Source: `https://backenddeveloper.tistory.com/`
Target: `/blog` route in this Next.js portfolio

## Architecture

```
portfolio/
  content/
    blog-ko/          # Korean MDX files (migrated from Tistory)
    blog-en/          # English MDX files (translated, future)
    migration-manifest.json
  public/
    blog-assets/
      <slug>/         # Downloaded images per post
  src/
    lib/blog.ts       # getAllPosts(), getPostBySlug()
    app/blog/
      page.tsx        # /blog index
      [slug]/page.tsx # /blog/<slug> post page
```

## MDX Frontmatter Schema

```yaml
---
title: "..."
date: "YYYY-MM-DD"
source_url: "https://backenddeveloper.tistory.com/<id>"
original_slug: "<tistory-numeric-id>"
category: "..."
subcategory: "..."         # optional
tags: []                   # optional
migration_status: "ko_complete" | "en_complete" | "pending"
asset_path: "/blog-assets/<slug>"
lang: "ko" | "en"
---
```

## Migration Steps (per article)

1. Archive: `curl -A "Mozilla/5.0..." "https://backenddeveloper.tistory.com/<id>" > blog/archive/tistory-original/<id>/original.html`
2. Extract article body (`.contents_style` div, depth-counted closing tag)
3. Download images: use `srcset` URLs from `img1.daumcdn.net` (public proxy); NOT `src` (signed Kakao CDN, 404)
4. Convert HTML to MDX (Python script, see below)
5. Escape LaTeX math: within `$...$`, replace `{` with `\{` and `}` with `\}` (MDX v2 parses unescaped curly braces as JSX)
6. Place MDX in `content/blog-ko/<slug>.mdx`
7. Verify: `npm run build`, structural QA via JS in browser

## Known Issues

**Tistory image CDN**: Article HTML has `src="https://blog.kakaocdn.net/..."` (session-signed, 404 without auth) and `srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=..."` (public Daum proxy, CORS OK). Always use `srcset` for downloads.

**MDX curly braces**: LaTeX math like `$y_{new}$` must be written `$y_\{new\}$` in MDX v2. The build fails with "Could not parse expression with acorn" otherwise.

## HTML-to-MDX Conversion (Python sketch)

```python
from bs4 import BeautifulSoup
import html, re

def html_to_mdx(article_html, asset_prefix, slug):
    soup = BeautifulSoup(article_html, 'html.parser')
    lines = []
    for el in soup.find_all(['h1','h2','h3','h4','h5','h6','p','figure','ul','ol','hr']):
        tag = el.name
        if tag.startswith('h'):
            level = int(tag[1])
            lines.append('#' * level + ' ' + el.get_text().strip())
        elif tag == 'p':
            text = el.get_text().strip()
            if text:
                lines.append(text)
        elif tag == 'figure':
            img = el.find('img')
            if img:
                srcset = img.get('srcset','').split(' ')[0]
                # download srcset URL, save as {n:02d}-{hash}.png
                lines.append(f'![]({asset_prefix}/{filename})')
        # ... etc
    
    # escape curly braces in math
    def escape_math(m):
        return m.group(0).replace('{', r'\{').replace('}', r'\}')
    mdx = re.sub(r'\$[^$]+\$', escape_math, '\n\n'.join(lines))
    return mdx
```

## Batch Migration Plan

For each article in the Tistory RSS feed (`https://backenddeveloper.tistory.com/rss`):
1. Parse `<item>` entries: `<title>`, `<link>`, `<pubDate>`, `<category>`
2. Extract numeric ID from URL
3. Run per-article steps above
4. Add entry to `migration-manifest.json`
5. Commit in batches of 10-20 articles

Translation (not handled here): paste Korean MDX content to ChatGPT, create `content/blog-en/<slug>.mdx` with same frontmatter but `lang: "en"` and translated body.

## Status

Pilot article 183 (feature extraction) fully migrated and verified.
See `content/migration-manifest.json` for per-article tracking.

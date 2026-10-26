# aradhyachandra.github.io

My portfolio site: plain HTML, CSS and a little JavaScript. No framework and no build step.
Live at https://aradhyachandra.github.io

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Links start with `/`, so open the site through the server, not
by double-clicking the file.

## Where things are

| File | What it holds |
|---|---|
| `index.html` | Home page: hero with results panel, how I work, project rows, experience, skills, about, contact |
| `projects/*.html` | One case-study page per project |
| `assets/css/style.css` | All styling. Colours and fonts are the tokens at the top (`--accent`, `--gold`, `--display`, `--sans`) |
| `assets/js/main.js` | Light/dark toggle, current-section highlight, fade-in on scroll |
| `assets/img/` | Charts (copied from each project repo), smaller `home-*.webp` copies used on the home page, and `og-image.png` (link preview) |
| `resume/Aradhya_Chandra_Resume.pdf` | The resume behind the "Resume (PDF)" button |
| `tools/og-image.html` | Source for the link-preview image (see below) |

## Edit text

Open the HTML file and change the words between the tags. Every section in `index.html` starts
with a comment like `<!-- ===== Projects ===== -->`. Then commit and push; GitHub Pages updates
in a minute or two.

Rule: every number must come from the project's own results files or report. Don't round up.

## Add a project

1. Copy `projects/customer-churn.html` to `projects/<new-name>.html` and replace the text inside
   `<main>`: the header (question and three KPI tiles), one `<section class="cs-section">` per
   heading, the matching links in the "On this page" list, and the previous/next links at the
   bottom. Update the `<title>`, `description`, `og:` and `canonical` lines in `<head>`.
2. Copy one or two charts from the project repo into `assets/img/` (keep them under ~200 KB) and
   write a caption and alt text for each.
3. In `index.html`, copy one `<article class="feature">` block in the Projects section and edit it
   (rows alternate left/right automatically). Point "Read the case study" to the new page and
   "Code" to the repo. Add a smaller WebP copy of the chart for the home page (about 1000px wide).

## Replace the resume

Save the new PDF over `resume/Aradhya_Chandra_Resume.pdf` (keep the file name) and push.

## Add a photo

Put a square photo (about 300×300, under 60 KB) at `assets/img/photo.jpg`, then follow the comment
above the `monogram` div in `index.html`.

## Link-preview image

`assets/img/og-image.png` (1200×630) is what Gmail, LinkedIn and WhatsApp show. To change it, edit
`tools/og-image.html` and re-render it with Chrome:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --window-size=1200,630 --virtual-time-budget=4000 --screenshot="$PWD/assets/img/og-image.png" "file://$PWD/tools/og-image.html"
```

LinkedIn caches previews; use https://www.linkedin.com/post-inspector/ to refresh one.

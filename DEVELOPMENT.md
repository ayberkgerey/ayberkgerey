# ayberkgerey: portfolio site

Personal engineering portfolio for Ayberk Gerey, built with Next.js (App Router), TypeScript, and Tailwind CSS. All content lives in local TypeScript files. There is no backend, database, or CMS.

`README.md` at the repository root is the GitHub profile page and is not part of the site.

## Local development

Requires Node.js 20.9 or newer.

```bash
git clone https://github.com/ayberkgerey/ayberkgerey.git
cd ayberkgerey
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run lint       # ESLint
npm run build      # production build, prerenders every page
npm run start      # serve the production build
```

## Project structure

```
ayberkgerey/
  app/                     routes and layouts
    layout.tsx             header, footer, fonts, default metadata
    page.tsx               home
    projects/page.tsx      project list
    projects/[slug]/       project detail pages, generated from data/projects.ts
    about/page.tsx
    not-found.tsx
  components/
    layout/                header, navigation, footer, container
    home/                  hero, current focus, journey preview
    projects/              project card and detail layout
    content/               renderer for paragraphs, lists, code, and tables
    ui/                    buttons, tags, headings, icons, portrait
  data/
    profile.ts             name, intro, links, email, about page, experience, skills
    navigation.ts          main navigation items
    projects.ts            all projects
  lib/content.ts           project lookup helpers
  types/content.ts         shared content types
  public/images/           static images
```

Pages only render data. To change what the site says, edit the files in `data/`.

## Common edits

### Replace the profile photo

1. Add the photo to `public/images/`, for example `public/images/ayberk-gerey.jpg`. A portrait crop around 4:5 works best.
2. In `data/profile.ts`, set the portrait path:

   ```ts
   portrait: {
     src: "/images/ayberk-gerey.jpg",
     alt: "Portrait of Ayberk Gerey",
   },
   ```

While `src` is `null`, the hero shows a labeled placeholder.

### Edit the introduction

`data/profile.ts` holds the hero `headline` and `intro`, the home page `journeySummary` and `journeyStages`, and the About page text in `about`.

### Configure social links and email

Edit `email` and `links` in `data/profile.ts`. The header, footer, and About page all read from there.

### Add a project

Append an object to the `projects` array in `data/projects.ts`:

```ts
{
  slug: "my-new-project",            // URL: /projects/my-new-project
  title: "My New Project",
  summary: "One or two sentences for the card and page description.",
  kind: "Case study",
  tags: ["AWS", "Terraform"],
  featured: true,                    // shows it on the home page (first three)
  repositoryUrl: "https://github.com/ayberkgerey/my-new-project",
  sections: {
    overview: [{ type: "paragraph", text: "What it is and why it exists." }],
  },
},
```

Every section is optional, and a section without content is not rendered. Available sections, in page order:

| Field | Heading on the page |
| --- | --- |
| `sections.overview` | Overview |
| `sections.problem` | Problem and Objectives |
| `sections.architecture` | Architecture |
| `diagram` | Architecture Diagram |
| `stack` | Technology Stack |
| `sections.implementation` | Implementation |
| `sections.decisions` | Key Technical Decisions |
| `sections.testing` | Testing and Validation |
| `sections.security` | Security Considerations |
| `sections.lessons` | Challenges and Lessons Learned |
| `sections.future` | Future Improvements |
| `repositoryUrl` | GitHub Repository |
| `videoUrl` | Related YouTube Video |

Each `sections.*` entry is a list of blocks:

```ts
{ type: "paragraph", text: "Text with `inline code` in backticks." }
{ type: "heading", text: "A sub-heading" }
{ type: "list", items: ["First", "Second"], ordered: false }
{ type: "code", language: "hcl", caption: "main.tf", code: `resource "aws_vpc" "main" {}` }
{ type: "table", columns: ["Name", "Value"], rows: [["CIDR", "10.0.0.0/16"]] }
```

To add an architecture diagram or card image, put the file in `public/images/projects/`, import it at the top of `data/projects.ts`, and reference it:

```ts
import myDiagram from "@/public/images/projects/my-diagram.png";

diagram: { src: myDiagram, alt: "Describe what the diagram shows", caption: "Optional caption" },
coverImage: { src: myDiagram, alt: "" },
```

Importing the image lets Next.js read its size and serve optimized, responsive versions.

### Add a navigation item

Add an entry to `mainNav` in `data/navigation.ts` after creating the matching route under `app/`.

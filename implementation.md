  # Skills & Agents Registry - Implementation Plan

  ## Overview

  A static site built with Astro, hosted on GitHub Pages, that allows users to browse and search for skills and agents. Contributors can add new entries via Pull Requests, with automatic schema validation.

  ---

  ## Project Structure

  /
  ├── src/
  │   ├── content/
  │   │   ├── skills/
  │   │   │   └── example-skill.md
  │   │   └── agents/
  │   │       └── example-agent.md
  │   │
  │   ├── content.config.ts          # Schema definitions
  │   │
  │   ├── components/
  │   │   ├── Card.astro
  │   │   ├── CardGrid.astro
  │   │   ├── SearchBar.astro
  │   │   ├── Tabs.astro
  │   │   ├── Pagination.astro
  │   │   └── CodeModal.tsx          # React island for interactivity
  │   │
  │   ├── layouts/
  │   │   └── Layout.astro
  │   │
  │   ├── pages/
  │   │   ├── index.astro            # Redirects to /skills/1
  │   │   ├── skills/
  │   │   │   └── [...page].astro    # /skills/1, /skills/2, etc.
  │   │   └── agents/
  │   │       └── [...page].astro    # /agents/1, /agents/2, etc.
  │   │
  │   └── styles/
  │       └── global.css
  │
  ├── public/
  │   └── favicon.svg
  │
  ├── .github/
  │   ├── workflows/
  │   │   └── deploy.yml
  │   └── PULL_REQUEST_TEMPLATE.md
  │
  ├── astro.config.mjs
  ├── package.json
  ├── tsconfig.json
  └── README.md

  ---

  ## Content Collection Schemas

  ### src/content.config.ts

  ```typescript
  import { defineCollection, z } from 'astro:content';

  const skillsCollection = defineCollection({
    type: 'content',
    schema: z.object({
      name: z.string().min(3).max(50),
      description: z.string().min(10).max(200),
      author: z.string(),
      authorUrl: z.string().url().optional(),
      tags: z.array(z.string()).max(5).default([]),
      dateAdded: z.coerce.date().default(() => new Date()),
    }),
  });

  const agentsCollection = defineCollection({
    type: 'content',
    schema: z.object({
      name: z.string().min(3).max(50),
      description: z.string().min(10).max(200),
      author: z.string(),
      authorUrl: z.string().url().optional(),
      tags: z.array(z.string()).max(5).default([]),
      model: z.string().optional(),
      dateAdded: z.coerce.date().default(() => new Date()),
    }),
  });

  export const collections = {
    skills: skillsCollection,
    agents: agentsCollection,
  };

  ---
  Content File Format

  Example Skill: src/content/skills/example-skill.md

  ---
  name: "Git Commit Helper"
  description: "Analyzes staged changes and generates conventional commit messages"
  author: "johndoe"
  authorUrl: "https://github.com/johndoe"
  tags: ["git", "automation", "commit"]
  dateAdded: 2024-01-15
  ---

  ```python
  # Git Commit Helper Skill
  # Analyzes staged changes and suggests commit messages

  import subprocess

  def get_staged_diff():
      result = subprocess.run(
          ["git", "diff", "--cached"],
          capture_output=True,
          text=True
      )
      return result.stdout

  def suggest_commit_message(diff: str) -> str:
      # Implementation here
      pass

  ### Example Agent: src/content/agents/example-agent.md

  ```markdown
  ---
  name: "Code Reviewer"
  description: "Reviews code changes and provides constructive feedback on best practices"
  author: "janedoe"
  authorUrl: "https://github.com/janedoe"
  tags: ["review", "best-practices", "quality"]
  model: "claude-3"
  dateAdded: 2024-01-20
  ---

  ```yaml
  name: Code Reviewer
  description: Reviews code changes and provides constructive feedback

  system_prompt: |
    You are an expert code reviewer. Analyze the provided code and give
    constructive feedback on:
    - Code quality and readability
    - Potential bugs or issues
    - Performance considerations
    - Best practices

  tools:
    - read_file
    - search_code

  ---

  ## Components

  ### Card.astro

  ```astro
  ---
  interface Props {
    name: string;
    description: string;
    author: string;
    tags: string[];
    slug: string;
    type: 'skill' | 'agent';
  }

  const { name, description, author, tags, slug, type } = Astro.props;
  ---

  <article class="card" data-slug={slug} data-type={type}>
    <h3 class="card-title">{name}</h3>
    <p class="card-description">{description}</p>
    <div class="card-meta">
      <span class="card-author">by {author}</span>
      <div class="card-tags">
        {tags.map(tag => <span class="tag">{tag}</span>)}
      </div>
    </div>
  </article>

  <style>
    .card {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 1.5rem;
      cursor: pointer;
      transition: box-shadow 0.2s, transform 0.2s;
      background: white;
    }

    .card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transform: translateY(-2px);
    }

    .card-title {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      color: #1a1a1a;
    }

    .card-description {
      margin: 0 0 1rem 0;
      color: #666;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .card-author {
      font-size: 0.85rem;
      color: #888;
    }

    .card-tags {
      display: flex;
      gap: 0.25rem;
      flex-wrap: wrap;
    }

    .tag {
      background: #f0f0f0;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      color: #555;
    }
  </style>

  CardGrid.astro

  ---
  // Wrapper component for card grid layout
  ---

  <div class="card-grid">
    <slot />
  </div>

  <style>
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      padding: 1.5rem 0;
    }
  </style>

  SearchBar.astro

  ---
  // Client-side search that filters visible cards
  ---

  <div class="search-container">
    <input
      type="search"
      id="search-input"
      placeholder="Search by name or description..."
      autocomplete="off"
    />
  </div>

  <style>
    .search-container {
      margin: 1.5rem 0;
    }

    #search-input {
      width: 100%;
      max-width: 400px;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      outline: none;
      transition: border-color 0.2s;
    }

    #search-input:focus {
      border-color: #0066cc;
    }
  </style>

  <script>
    const input = document.getElementById('search-input') as HTMLInputElement;

    input?.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value.toLowerCase();
      const cards = document.querySelectorAll('.card');

      cards.forEach(card => {
        const title = card.querySelector('.card-title')?.textContent?.toLowerCase() || '';
        const desc = card.querySelector('.card-description')?.textContent?.toLowerCase() || '';
        const matches = title.includes(query) || desc.includes(query);
        (card as HTMLElement).style.display = matches ? '' : 'none';
      });
    });
  </script>

  Tabs.astro

  ---
  interface Props {
    active: 'skills' | 'agents';
  }

  const { active } = Astro.props;
  ---

  <nav class="tabs">
    <a
      href="/skills/1"
      class:list={['tab', { active: active === 'skills' }]}
    >
      Skills
    </a>
    <a
      href="/agents/1"
      class:list={['tab', { active: active === 'agents' }]}
    >
      Agents
    </a>
  </nav>

  <style>
    .tabs {
      display: flex;
      gap: 0;
      border-bottom: 1px solid #e0e0e0;
      margin-bottom: 1rem;
    }

    .tab {
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      color: #666;
      border-bottom: 2px solid transparent;
      transition: color 0.2s, border-color 0.2s;
    }

    .tab:hover {
      color: #333;
    }

    .tab.active {
      color: #0066cc;
      border-bottom-color: #0066cc;
    }
  </style>

  Pagination.astro

  ---
  interface Props {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
  }

  const { currentPage, totalPages, baseUrl } = Astro.props;
  ---

  <nav class="pagination">
    {currentPage > 1 ? (
      <a href={`${baseUrl}/${currentPage - 1}`} class="pagination-link prev">
        ← Previous
      </a>
    ) : (
      <span class="pagination-link prev disabled">← Previous</span>
    )}

    <span class="pagination-info">
      Page {currentPage} of {totalPages}
    </span>

    {currentPage < totalPages ? (
      <a href={`${baseUrl}/${currentPage + 1}`} class="pagination-link next">
        Next →
      </a>
    ) : (
      <span class="pagination-link next disabled">Next →</span>
    )}
  </nav>

  <style>
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      padding: 2rem 0;
    }

    .pagination-link {
      padding: 0.5rem 1rem;
      text-decoration: none;
      color: #0066cc;
      border: 1px solid #0066cc;
      border-radius: 4px;
      transition: background-color 0.2s, color 0.2s;
    }

    .pagination-link:hover:not(.disabled) {
      background-color: #0066cc;
      color: white;
    }

    .pagination-link.disabled {
      color: #ccc;
      border-color: #ccc;
      cursor: not-allowed;
    }

    .pagination-info {
      color: #666;
    }
  </style>

  CodeModal.tsx (React Island)

  import { useState, useEffect } from 'react';

  interface Item {
    slug: string;
    type: string;
    name: string;
    code: string;
  }

  interface Props {
    items: Item[];
  }

  export default function CodeModal({ items }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<Item | null>(null);

    useEffect(() => {
      const handleCardClick = (e: Event) => {
        const card = (e.target as HTMLElement).closest('.card');
        if (card) {
          const slug = card.getAttribute('data-slug');
          const type = card.getAttribute('data-type');
          const item = items.find(i => i.slug === slug && i.type === type);
          if (item) {
            setActiveItem(item);
            setIsOpen(true);
          }
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      document.addEventListener('click', handleCardClick);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('click', handleCardClick);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [items]);

    if (!isOpen || !activeItem) return null;

    return (
      <div className="modal-overlay" onClick={() => setIsOpen(false)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <header className="modal-header">
            <h2>{activeItem.name}</h2>
            <button className="modal-close" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </header>
          <div className="modal-body">
            <pre><code>{activeItem.code}</code></pre>
          </div>
        </div>
      </div>
    );
  }

  Global CSS (add modal styles to Layout.astro or separate file)

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
  }

  .modal {
    background: white;
    border-radius: 8px;
    max-width: 800px;
    width: 100%;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e0e0e0;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.25rem;
  }

  .modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    padding: 0.25rem 0.5rem;
  }

  .modal-close:hover {
    color: #333;
  }

  .modal-body {
    padding: 1.5rem;
    overflow: auto;
  }

  .modal-body pre {
    margin: 0;
    background: #f6f8fa;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
  }

  .modal-body code {
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  ---
  Layouts

  Layout.astro

  ---
  interface Props {
    title: string;
  }

  const { title } = Astro.props;
  ---

  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="A community-driven registry of skills and agents" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <title>{title} | Skills & Agents Registry</title>
    </head>
    <body>
      <div class="container">
        <slot />
      </div>
    </body>
  </html>

  <style is:global>
    * {
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      margin: 0;
      padding: 0;
      background: #fafafa;
      color: #1a1a1a;
      line-height: 1.6;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    /* Modal styles */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 2rem;
    }

    .modal {
      background: white;
      border-radius: 8px;
      max-width: 800px;
      width: 100%;
      max-height: 80vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 1.25rem;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
      padding: 0.25rem 0.5rem;
    }

    .modal-close:hover {
      color: #333;
    }

    .modal-body {
      padding: 1.5rem;
      overflow: auto;
    }

    .modal-body pre {
      margin: 0;
      background: #f6f8fa;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
    }

    .modal-body code {
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  </style>

  ---
  Pages

  index.astro (Redirect to Skills)

  ---
  return Astro.redirect('/skills/1');
  ---

  skills/[...page].astro

  ---
  import { getCollection } from 'astro:content';
  import Layout from '../../layouts/Layout.astro';
  import Card from '../../components/Card.astro';
  import CardGrid from '../../components/CardGrid.astro';
  import Pagination from '../../components/Pagination.astro';
  import SearchBar from '../../components/SearchBar.astro';
  import Tabs from '../../components/Tabs.astro';
  import CodeModal from '../../components/CodeModal.tsx';

  export async function getStaticPaths({ paginate }) {
    const skills = await getCollection('skills');
    const sorted = skills.sort((a, b) =>
      b.data.dateAdded.getTime() - a.data.dateAdded.getTime()
    );

    return paginate(sorted, { pageSize: 12 });
  }

  const { page } = Astro.props;

  // Prepare data for the modal
  const itemsWithCode = await Promise.all(
    page.data.map(async (entry) => ({
      slug: entry.slug,
      type: 'skill',
      name: entry.data.name,
      code: entry.body,
    }))
  );
  ---

  <Layout title="Skills">
    <main>
      <h1>Skills & Agents Registry</h1>
      <p class="subtitle">Community-driven collection of reusable skills and agents</p>

      <SearchBar />

      <Tabs active="skills" />

      <CardGrid>
        {page.data.map((entry) => (
          <Card
            name={entry.data.name}
            description={entry.data.description}
            author={entry.data.author}
            tags={entry.data.tags}
            slug={entry.slug}
            type="skill"
          />
        ))}
      </CardGrid>

      <Pagination
        currentPage={page.currentPage}
        totalPages={page.lastPage}
        baseUrl="/skills"
      />

      <CodeModal client:load items={itemsWithCode} />
    </main>
  </Layout>

  <style>
    .subtitle {
      color: #666;
      margin-top: 0;
      margin-bottom: 1.5rem;
    }
  </style>

  agents/[...page].astro

  ---
  import { getCollection } from 'astro:content';
  import Layout from '../../layouts/Layout.astro';
  import Card from '../../components/Card.astro';
  import CardGrid from '../../components/CardGrid.astro';
  import Pagination from '../../components/Pagination.astro';
  import SearchBar from '../../components/SearchBar.astro';
  import Tabs from '../../components/Tabs.astro';
  import CodeModal from '../../components/CodeModal.tsx';

  export async function getStaticPaths({ paginate }) {
    const agents = await getCollection('agents');
    const sorted = agents.sort((a, b) =>
      b.data.dateAdded.getTime() - a.data.dateAdded.getTime()
    );

    return paginate(sorted, { pageSize: 12 });
  }

  const { page } = Astro.props;

  // Prepare data for the modal
  const itemsWithCode = await Promise.all(
    page.data.map(async (entry) => ({
      slug: entry.slug,
      type: 'agent',
      name: entry.data.name,
      code: entry.body,
    }))
  );
  ---

  <Layout title="Agents">
    <main>
      <h1>Skills & Agents Registry</h1>
      <p class="subtitle">Community-driven collection of reusable skills and agents</p>

      <SearchBar />

      <Tabs active="agents" />

      <CardGrid>
        {page.data.map((entry) => (
          <Card
            name={entry.data.name}
            description={entry.data.description}
            author={entry.data.author}
            tags={entry.data.tags}
            slug={entry.slug}
            type="agent"
          />
        ))}
      </CardGrid>

      <Pagination
        currentPage={page.currentPage}
        totalPages={page.lastPage}
        baseUrl="/agents"
      />

      <CodeModal client:load items={itemsWithCode} />
    </main>
  </Layout>

  <style>
    .subtitle {
      color: #666;
      margin-top: 0;
      margin-bottom: 1.5rem;
    }
  </style>

  ---
  Configuration Files

  astro.config.mjs

  import { defineConfig } from 'astro/config';
  import react from '@astrojs/react';

  export default defineConfig({
    site: 'https://yourusername.github.io',
    base: '/skills-repo',
    integrations: [react()],
    output: 'static',
  });

  package.json

  {
    "name": "skills-agents-registry",
    "type": "module",
    "version": "1.0.0",
    "scripts": {
      "dev": "astro dev",
      "build": "astro build",
      "preview": "astro preview",
      "astro": "astro"
    },
    "dependencies": {
      "astro": "^5.0.0",
      "@astrojs/react": "^4.0.0",
      "react": "^19.0.0",
      "react-dom": "^19.0.0"
    }
  }

  tsconfig.json

  {
    "extends": "astro/tsconfigs/strict",
    "compilerOptions": {
      "jsx": "react-jsx",
      "jsxImportSource": "react"
    }
  }

  ---
  GitHub Configuration

  .github/workflows/deploy.yml

  name: Deploy to GitHub Pages

  on:
    push:
      branches: [main]
    workflow_dispatch:

  permissions:
    contents: read
    pages: write
    id-token: write

  concurrency:
    group: pages
    cancel-in-progress: false

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - name: Checkout
          uses: actions/checkout@v4

        - name: Setup Node
          uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: npm

        - name: Install dependencies
          run: npm ci

        - name: Build Astro site
          run: npm run build

        - name: Upload artifact
          uses: actions/upload-pages-artifact@v3
          with:
            path: dist

    deploy:
      needs: build
      runs-on: ubuntu-latest
      environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
      steps:
        - name: Deploy to GitHub Pages
          id: deployment
          uses: actions/deploy-pages@v4

  .github/PULL_REQUEST_TEMPLATE.md

  ## Contribution Type

  - [ ] New Skill
  - [ ] New Agent
  - [ ] Bug Fix
  - [ ] Documentation

  ## Checklist

  - [ ] I have followed the content format (frontmatter + code block)
  - [ ] The `name` is between 3-50 characters
  - [ ] The `description` is between 10-200 characters
  - [ ] I have added no more than 5 tags
  - [ ] The code is tested and working

  ## Description

  <!-- Brief description of your skill/agent -->

  ---
  README.md

  # Skills & Agents Registry

  A community-driven collection of reusable skills and agents.

  ## Contributing

  ### Adding a Skill

  1. Fork this repository
  2. Create a new file: `src/content/skills/your-skill-name.md`
  3. Use the following format:

  ```markdown
  ---
  name: "Your Skill Name"
  description: "A brief description of what your skill does (10-200 chars)"
  author: "yourusername"
  authorUrl: "https://github.com/yourusername"
  tags: ["tag1", "tag2"]
  dateAdded: 2024-01-15
  ---

  ```python
  # Your code here

  4. Open a Pull Request

  ### Adding an Agent

  1. Fork this repository
  2. Create a new file: `src/content/agents/your-agent-name.md`
  3. Use the following format:

  ```markdown
  ---
  name: "Your Agent Name"
  description: "A brief description of what your agent does (10-200 chars)"
  author: "yourusername"
  authorUrl: "https://github.com/yourusername"
  tags: ["tag1", "tag2"]
  model: "claude-3"
  dateAdded: 2024-01-15
  ---

  ```yaml
  # Your agent configuration here

  4. Open a Pull Request

  ## Schema Requirements

  ### Skills

  | Field | Type | Required | Constraints |
  |-------|------|----------|-------------|
  | name | string | Yes | 3-50 characters |
  | description | string | Yes | 10-200 characters |
  | author | string | Yes | - |
  | authorUrl | string | No | Valid URL |
  | tags | string[] | No | Max 5 items |
  | dateAdded | date | No | Defaults to today |

  ### Agents

  | Field | Type | Required | Constraints |
  |-------|------|----------|-------------|
  | name | string | Yes | 3-50 characters |
  | description | string | Yes | 10-200 characters |
  | author | string | Yes | - |
  | authorUrl | string | No | Valid URL |
  | tags | string[] | No | Max 5 items |
  | model | string | No | - |
  | dateAdded | date | No | Defaults to today |

  ## Development

  ```bash
  # Install dependencies
  npm install

  # Start dev server
  npm run dev

  # Build for production
  npm run build

  # Preview production build
  npm run preview

  License

  MIT

  ---

  ## Implementation Checklist

  - [ ] Initialize Astro project with `npm create astro@latest`
  - [ ] Install React integration: `npx astro add react`
  - [ ] Configure astro.config.mjs with site URL and base path
  - [ ] Create src/content.config.ts with Zod schemas
  - [ ] Create src/layouts/Layout.astro
  - [ ] Create src/components/Card.astro
  - [ ] Create src/components/CardGrid.astro
  - [ ] Create src/components/SearchBar.astro
  - [ ] Create src/components/Tabs.astro
  - [ ] Create src/components/Pagination.astro
  - [ ] Create src/components/CodeModal.tsx
  - [ ] Create src/pages/index.astro (redirect)
  - [ ] Create src/pages/skills/[...page].astro
  - [ ] Create src/pages/agents/[...page].astro
  - [ ] Add global styles including modal CSS
  - [ ] Create src/content/skills/ directory with example skill
  - [ ] Create src/content/agents/ directory with example agent
  - [ ] Create .github/workflows/deploy.yml
  - [ ] Create .github/PULL_REQUEST_TEMPLATE.md
  - [ ] Write README.md with contribution guidelines
  - [ ] Test local development with `npm run dev`
  - [ ] Test production build with `npm run build && npm run preview`
  - [ ] Push to GitHub and verify deployment

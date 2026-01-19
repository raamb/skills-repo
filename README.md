# Skills & Agents Registry

A community-driven collection of reusable skills and agents for Claude Code.

## Contributing

We welcome contributions! Follow these detailed steps to add your skill or agent to the registry.

### Adding a Skill

Skills are reusable code snippets, functions, or tools that can help with specific tasks.

#### Step-by-Step Guide

**1. Fork and Clone the Repository**

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/skills-repo.git
cd skills-repo

# Install dependencies
npm install
```

**2. Create a New Branch**

```bash
git checkout -b add-my-skill-name
```

**3. Create Your Skill File**

Create a new file in `src/content/skills/` with a descriptive, kebab-case name:

```bash
# Good examples:
src/content/skills/database-migration-helper.md
src/content/skills/json-formatter.md
src/content/skills/api-error-handler.md

# Bad examples (avoid):
src/content/skills/myskill.md
src/content/skills/Skill1.md
src/content/skills/new_skill_2024.md
```

**4. Format Your Skill**

Use this exact format with proper frontmatter:

```markdown
---
name: Database Migration Helper
description: Generates and validates SQL migration scripts with rollback support for database schema changes
allowed-tools: Read, Write, Bash(psql:*)
platform: Claude
author: yourusername
authorUrl: https://github.com/yourusername
tags: ["database", "sql", "migration"]
dateAdded: 2024-01-15
---

# Database Migration Helper

Generates SQL migration scripts with automatic rollback support.

## Overview

This skill helps you create timestamped database migration files with proper up/down migration support.

## Usage

1. **Analyze the current schema**
2. **Generate migration file** with timestamp
3. **Include rollback statements**
4. **Validate SQL syntax**

## Example Migration

\`\`\`sql
-- Migration: 20240115120000_add_users_table

-- Up Migration
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

-- Down Migration (Rollback)
DROP INDEX IF EXISTS idx_users_email;
DROP TABLE IF EXISTS users;
\`\`\`

## Best Practices

- Always include both up and down migrations
- Use descriptive migration names
- Test rollback before deploying
- Keep migrations atomic and focused
```

**5. Test Your Skill Locally**

```bash
# Start the dev server
npm run dev

# Visit http://localhost:4321/skills-repo
# Verify your skill appears and displays correctly
```

**6. Commit and Push**

```bash
git add src/content/skills/your-skill-name.md
git commit -m "Add [Skill Name] skill"
git push origin add-my-skill-name
```

**7. Open a Pull Request**

- Go to your fork on GitHub
- Click "Compare & pull request"
- Fill out the PR template (auto-populated)
- Ensure all checklist items are completed
- Submit the PR

### Adding an Agent

Agents are AI configurations with specific behaviors, prompts, and tools for specialized tasks.

#### Step-by-Step Guide

**1. Fork and Clone** (same as Skills)

**2. Create a New Branch**

```bash
git checkout -b add-my-agent-name
```

**3. Create Your Agent File**

Create a new file in `src/content/agents/` with a descriptive, kebab-case name:

```bash
# Good examples:
src/content/agents/security-auditor.md
src/content/agents/documentation-writer.md
src/content/agents/test-case-generator.md
```

**4. Format Your Agent**

Use this exact format:

```markdown
---
name: Security Auditor
description: Reviews code for security vulnerabilities and suggests fixes with detailed remediation steps
platform: Claude
model: sonnet
author: yourusername
authorUrl: https://github.com/yourusername
tags: ["security", "audit", "vulnerability"]
dateAdded: 2024-01-15
---

You are a security expert specializing in code auditing and vulnerability assessment.

## Your Responsibilities

- **Identify Security Vulnerabilities**: XSS, SQL injection, CSRF, authentication issues
- **Check for Sensitive Data Exposure**: API keys, credentials, PII leakage
- **Review Authentication & Authorization**: Access control, session management
- **Suggest Secure Coding Practices**: Input validation, output encoding, parameterized queries
- **Provide Actionable Remediation**: Concrete steps to fix each vulnerability

## Approach

1. **Analyze the code systematically** from entry points to data storage
2. **Look for common vulnerability patterns** in the OWASP Top 10
3. **Explain WHY** each issue is a security risk
4. **Show HOW** to fix it with code examples
5. **Prioritize findings** by severity: Critical > High > Medium > Low

## Output Format

For each vulnerability found:

**Severity**: [Critical/High/Medium/Low]
**Location**: `file.js:42`
**Issue**: [Brief description]
**Risk**: [Potential impact]
**Fix**: [Concrete solution with code example]

## Example

**Severity**: High
**Location**: `auth.js:23`
**Issue**: Password stored in plain text
**Risk**: If database is compromised, all user passwords are exposed
**Fix**: Use bcrypt to hash passwords:
\`\`\`javascript
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);
\`\`\`

Always maintain a constructive and educational tone.
```

**5-7. Test, Commit, Push, and PR** (same as Skills)

## Pull Request Checklist

Before submitting your PR, ensure you've completed these items:

- [ ] **File Naming**: Used kebab-case (e.g., `my-skill-name.md`)
- [ ] **Frontmatter**: All required fields are present and valid
- [ ] **Name**: Between 3-50 characters, descriptive and clear
- [ ] **Description**: Between 10-200 characters, explains what it does
- [ ] **Tags**: Maximum of 5 relevant tags
- [ ] **Code Quality**: Code is well-commented and functional
- [ ] **Testing**: Tested locally with `npm run dev`
- [ ] **Build**: Runs `npm run build` without errors
- [ ] **Single Purpose**: PR adds only ONE skill or agent
- [ ] **No Duplicates**: Checked that similar skill/agent doesn't exist

## Schema Requirements

### Skills Schema

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| `name` | string | ✅ Yes | Descriptive name | `Git Commit Helper` |
| `description` | string | ✅ Yes | 10-200 characters | `Analyzes staged changes and generates conventional commit messages` |
| `platform` | string | ✅ Yes | One of: Claude, OpenAI, GitHub Copilot, Other | `Claude` |
| `allowed-tools` | string | ❌ No | Comma-separated tool list | `Read, Write, Bash(git:*)` |
| `author` | string | ❌ No | GitHub username | `johndoe` |
| `authorUrl` | string | ❌ No | Valid URL | `https://github.com/johndoe` |
| `tags` | string[] | ❌ No | Max 5 items | `["git", "automation", "commit"]` |
| `dateAdded` | date | ❌ No | YYYY-MM-DD format (auto-defaults to today) | `2024-01-15` |

**Content**: Must contain detailed markdown documentation explaining the skill with examples and best practices.

### Agents Schema

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| `name` | string | ✅ Yes | Descriptive name | `Code Reviewer` |
| `description` | string | ✅ Yes | 10-200 characters | `Reviews code changes and provides constructive feedback` |
| `platform` | string | ✅ Yes | One of: Claude, OpenAI, GitHub Copilot, Other | `Claude` |
| `model` | string | ❌ No | Model name | `sonnet` or `opus` |
| `author` | string | ❌ No | GitHub username | `janedoe` |
| `authorUrl` | string | ❌ No | Valid URL | `https://github.com/janedoe` |
| `tags` | string[] | ❌ No | Max 5 items | `["review", "quality"]` |
| `dateAdded` | date | ❌ No | YYYY-MM-DD format (auto-defaults to today) | `2024-01-20` |

**Content**: Must contain the agent's system prompt with clear responsibilities, approach, and output format in markdown.

## Common Mistakes to Avoid

### ❌ Bad Frontmatter
```markdown
---
name: my skill                          # Not descriptive enough
description: test                       # Too short (< 10 chars)
platform:                               # Missing required field
author:                                 # Empty (if included, must have value)
tags: ["a", "b", "c", "d", "e", "f"]  # Too many tags (> 5)
---
```

### ✅ Good Frontmatter for Skills
```markdown
---
name: API Response Validator
description: Validates API responses against JSON schema with detailed error reporting
platform: Claude
allowed-tools: Read, Write
author: johndoe
authorUrl: https://github.com/johndoe
tags: ["api", "validation", "testing"]
dateAdded: 2024-01-15
---
```

### ✅ Good Frontmatter for Agents
```markdown
---
name: API Response Validator Agent
description: Automatically validates API responses and suggests improvements
platform: Claude
model: sonnet
author: johndoe
authorUrl: https://github.com/johndoe
tags: ["api", "validation", "testing"]
dateAdded: 2024-01-15
---
```

### ❌ Bad File Names
- `mySkill.md` (camelCase)
- `new_skill.md` (snake_case)
- `skill-1.md` (non-descriptive)
- `SKILL.md` (UPPERCASE)

### ✅ Good File Names
- `api-response-validator.md`
- `docker-compose-generator.md`
- `log-parser-utility.md`

## Best Practices

### For Skills

1. **Include Complete Examples**: Show how to use your skill with real examples
2. **Add Error Handling**: Include try-catch blocks and validation
3. **Document Parameters**: Clearly explain function parameters and return values
4. **Specify Platform**: Set the correct platform field (Claude, OpenAI, GitHub Copilot, Other)
5. **List Tools**: If your skill uses specific tools, include them in `allowed-tools`
6. **Keep It Focused**: One skill should do one thing well

### For Agents

1. **Clear System Prompt**: Explain the agent's role, responsibilities, and behavior
2. **Specify Platform & Model**: Set platform (e.g., Claude) and optionally model (e.g., sonnet, opus)
3. **Define Success Criteria**: Explain what good output looks like
4. **Include Examples**: Show example interactions and output formats
5. **Keep Instructions Clear**: Use structured markdown with headings and bullet points

## Recommended Tags

Choose relevant tags from this list (or suggest new ones):

**Skills:**
- `automation`, `api`, `testing`, `git`, `database`, `security`
- `parsing`, `validation`, `formatting`, `codegen`, `cli`
- `deployment`, `monitoring`, `logging`, `debugging`

**Agents:**
- `review`, `testing`, `documentation`, `refactoring`, `debugging`
- `security`, `optimization`, `analysis`, `generation`
- `best-practices`, `architecture`, `quality`

## Validation

Your submission will be automatically validated against the schema. Common errors:

| Error | Cause | Solution |
|-------|-------|----------|
| `name is required` | Missing name field | Add a descriptive name |
| `description is required` | Missing description field | Add a detailed description (10-200 chars) |
| `platform is required` | Missing platform field | Add platform: Claude, OpenAI, GitHub Copilot, or Other |
| `description must be at least 10 characters` | Description too short | Write a detailed description |
| `tags must contain at most 5 element(s)` | Too many tags | Reduce to 5 most relevant tags |
| `authorUrl must be a valid URL` | Invalid URL format | Use full URL: `https://github.com/username` |

## Development

### Local Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Visit http://localhost:4321/skills-repo
```

### Testing Your Contribution

```bash
# Build for production (tests schema validation)
npm run build

# If build fails, check the error message for schema violations
```

### Preview Production Build

```bash
npm run preview
```

## FAQ

**Q: Can I submit multiple skills/agents in one PR?**
A: No, please submit one skill or agent per PR to make reviews easier.

**Q: What programming languages are supported for skills?**
A: Any language! Python, JavaScript, TypeScript, Bash, Go, Rust, etc. Skills are language-agnostic documentation.

**Q: What is the `platform` field?**
A: The platform field indicates which AI coding assistant the skill/agent is designed for (Claude, OpenAI, GitHub Copilot, or Other). This helps users filter and find relevant content for their tools.

**Q: What's the difference between a skill and an agent?**
A: Skills are instructional documents/guides for performing specific tasks. Agents are AI system prompts with defined behaviors, responsibilities, and output formats.

**Q: How long does PR review take?**
A: Usually within 1-3 days. Make sure all checklist items are complete to speed up the process.

**Q: Can I update an existing skill/agent?**
A: Yes! Submit a PR with improvements. Please explain what changed and why.

**Q: What if my skill requires external dependencies?**
A: Document all dependencies clearly in your markdown with installation instructions.

**Q: Do I need to include quotes around field values in frontmatter?**
A: No! Use unquoted strings for most fields. Arrays (tags) should use JSON format: `["tag1", "tag2"]`

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
name: "Database Migration Helper"
description: "Generates and validates SQL migration scripts with rollback support"
author: "yourusername"
authorUrl: "https://github.com/yourusername"
tags: ["database", "sql", "migration"]
dateAdded: 2024-01-15
---

\`\`\`python
# Database Migration Helper
# Generates SQL migration scripts with automatic rollback

import hashlib
from datetime import datetime

def generate_migration(changes: dict) -> str:
    """
    Generate a timestamped migration file.

    Args:
        changes: Dictionary of database changes

    Returns:
        SQL migration script
    """
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    migration = f"-- Migration {timestamp}\n\n"

    # Add your implementation here

    return migration
\`\`\`
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
name: "Security Auditor"
description: "Reviews code for security vulnerabilities and suggests fixes"
author: "yourusername"
authorUrl: "https://github.com/yourusername"
tags: ["security", "audit", "vulnerability"]
model: "claude-sonnet-4"
dateAdded: 2024-01-15
---

\`\`\`yaml
name: Security Auditor
description: Reviews code for security vulnerabilities

system_prompt: |
  You are a security expert specializing in code auditing.

  Your responsibilities:
  - Identify security vulnerabilities (XSS, SQL injection, CSRF, etc.)
  - Check for sensitive data exposure
  - Review authentication and authorization logic
  - Suggest secure coding practices
  - Provide actionable remediation steps

  Always explain WHY something is a security risk and HOW to fix it.

tools:
  - read_file
  - search_code
  - grep

settings:
  temperature: 0.3
  max_tokens: 4000
\`\`\`
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
| `name` | string | ✅ Yes | 3-50 characters | `"Git Commit Helper"` |
| `description` | string | ✅ Yes | 10-200 characters | `"Analyzes staged changes and generates conventional commit messages"` |
| `author` | string | ✅ Yes | GitHub username | `"johndoe"` |
| `authorUrl` | string | ❌ No | Valid URL | `"https://github.com/johndoe"` |
| `tags` | string[] | ❌ No | Max 5 items | `["git", "automation", "commit"]` |
| `dateAdded` | date | ❌ No | YYYY-MM-DD format (auto-defaults to today) | `2024-01-15` |

**Code Block**: Must contain actual code in any language (Python, JavaScript, Bash, etc.)

### Agents Schema

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| `name` | string | ✅ Yes | 3-50 characters | `"Code Reviewer"` |
| `description` | string | ✅ Yes | 10-200 characters | `"Reviews code changes and provides constructive feedback"` |
| `author` | string | ✅ Yes | GitHub username | `"janedoe"` |
| `authorUrl` | string | ❌ No | Valid URL | `"https://github.com/janedoe"` |
| `tags` | string[] | ❌ No | Max 5 items | `["review", "quality"]` |
| `model` | string | ❌ No | Claude model name | `"claude-sonnet-4"` |
| `dateAdded` | date | ❌ No | YYYY-MM-DD format (auto-defaults to today) | `2024-01-20` |

**Code Block**: Must contain YAML agent configuration with system_prompt and tools

## Common Mistakes to Avoid

### ❌ Bad Frontmatter
```markdown
---
name: my skill          # Missing quotes
description: test       # Too short (< 10 chars)
author:                 # Empty field
tags: ["a", "b", "c", "d", "e", "f"]  # Too many tags (> 5)
---
```

### ✅ Good Frontmatter
```markdown
---
name: "API Response Validator"
description: "Validates API responses against JSON schema with detailed error reporting"
author: "johndoe"
authorUrl: "https://github.com/johndoe"
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
4. **Use Type Hints**: Include type hints for Python or TypeScript
5. **Keep It Focused**: One skill should do one thing well

### For Agents

1. **Clear System Prompt**: Explain the agent's role, responsibilities, and behavior
2. **Specific Tools**: Only include tools the agent actually needs
3. **Set Appropriate Temperature**: Use lower (0.2-0.4) for analytical tasks, higher (0.7-0.9) for creative tasks
4. **Define Success Criteria**: Explain what good output looks like
5. **Include Examples**: Show example interactions in comments

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
| `name must be at least 3 characters` | Name too short | Use a descriptive name (3-50 chars) |
| `description must be at least 10 characters` | Description too short | Write a detailed description (10-200 chars) |
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
A: Any language! Python, JavaScript, TypeScript, Bash, Go, Rust, etc.

**Q: How long does PR review take?**
A: Usually within 1-3 days. Make sure all checklist items are complete to speed up the process.

**Q: Can I update an existing skill/agent?**
A: Yes! Submit a PR with improvements. Please explain what changed and why.

**Q: What if my skill requires external dependencies?**
A: Include installation instructions in comments at the top of your code.

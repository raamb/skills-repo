---
name: git-commit-helper
description: Analyzes staged changes and generates conventional commit messages following best practices. Use when committing code, creating commits, or when the user asks to commit changes.
allowed-tools: Bash(git:*)
author: johndoe
authorUrl: https://github.com/johndoe
tags: ["git", "automation", "commit"]
dateAdded: 2024-01-15
platform: OpenAI
---

# Git Commit Helper

Analyzes staged Git changes and generates conventional commit messages that follow industry best practices.

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type       | Description                          |
|------------|--------------------------------------|
| `feat`     | New feature                          |
| `fix`      | Bug fix                              |
| `docs`     | Documentation changes                |
| `style`    | Formatting, missing semicolons, etc. |
| `refactor` | Code refactoring                     |
| `test`     | Adding tests                         |
| `chore`    | Maintenance tasks                    |

### Scope (Optional)

The area of the codebase affected (e.g., `api`, `auth`, `ui`, `database`)

### Subject Rules

- Use imperative mood: "Add feature" not "Added feature"
- Don't capitalize first letter
- No period at the end
- Maximum 50 characters

## Steps

1. **Check staged changes**:
   ```bash
   git diff --cached --stat
   git diff --cached
   ```

2. **Analyze the changes** to determine:
   - What type of change is this?
   - What scope/area is affected?
   - What is the main purpose?

3. **Generate commit message** following the format above

4. **Create the commit**:
   ```bash
   git commit -m "type(scope): subject"
   ```

## Examples

### Feature addition
```
feat(auth): add OAuth2 login support
```

### Bug fix
```
fix(api): resolve null pointer in user endpoint
```

### Documentation
```
docs(readme): update installation instructions
```

### Refactoring
```
refactor(database): simplify query builder logic
```

### Breaking change
```
feat(api)!: remove deprecated v1 endpoints

BREAKING CHANGE: API v1 endpoints have been removed. Use v2 endpoints instead.
```

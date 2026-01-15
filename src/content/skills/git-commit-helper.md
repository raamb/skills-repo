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
```

---
name: commit-helper
description: Generates clear, conventional commit messages from git diffs. Use when writing commits, reviewing staged changes, or asking about commit message format.
allowed-tools: Bash, Read
---

# Commit Message Helper

Generate conventional commit messages following best practices.

## Instructions

1. Run `git diff --staged` to see staged changes
2. If nothing staged, run `git diff` to see unstaged changes
3. Analyze the changes and determine the type:
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting, semicolons)
   - `refactor`: Code refactoring without feature/fix
   - `test`: Adding or updating tests
   - `chore`: Maintenance tasks, dependencies

## Commit Message Format

```
<type>(<optional scope>): <description>

<optional body>

<optional footer>
```

## Rules

- Subject line under 50 characters
- Use imperative mood ("Add feature" not "Added feature")
- No period at end of subject
- Body explains what and why, not how
- Reference issues/PRs in footer when applicable

## Example Output

```
feat(auth): Add password reset functionality

Implement forgot password flow with email verification.
Users can now reset their password via email link.

Closes #123
```

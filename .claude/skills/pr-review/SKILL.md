---
name: pr-review
description: Reviews pull requests for code quality, bugs, security issues, and best practices. Use when reviewing PRs, checking code changes, or asking for code review.
allowed-tools: Bash, Read, Grep, Glob
---

# Pull Request Review

Perform thorough code reviews focusing on quality, security, and maintainability.

## Instructions

1. Get the PR diff: `git diff main...HEAD` (or specified base branch)
2. List changed files: `git diff --name-only main...HEAD`
3. Read each changed file for full context
4. Analyze changes against the checklist below

## Review Checklist

### Code Quality
- [ ] Code is readable and self-documenting
- [ ] No unnecessary complexity or over-engineering
- [ ] Follows existing code patterns and conventions
- [ ] No duplicate code that should be abstracted
- [ ] Error handling is appropriate

### Security
- [ ] No hardcoded secrets or credentials
- [ ] User input is validated and sanitized
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Authentication/authorization properly implemented

### Performance
- [ ] No obvious performance issues (N+1 queries, etc.)
- [ ] Large data sets handled efficiently
- [ ] No memory leaks or resource cleanup issues

### Testing
- [ ] Changes have appropriate test coverage
- [ ] Edge cases are tested
- [ ] Tests are meaningful, not just for coverage

### Documentation
- [ ] Complex logic is documented
- [ ] Public APIs have clear documentation
- [ ] README updated if needed

## Output Format

```markdown
## PR Review Summary

### Overview
[Brief description of what the PR does]

### Approval Status
[APPROVE / REQUEST CHANGES / NEEDS DISCUSSION]

### Findings

#### Critical Issues
- [List any blocking issues]

#### Suggestions
- [List improvement suggestions]

#### Positive Notes
- [Highlight good practices observed]
```

---
name: nextjs-component
description: Creates Next.js React components following project conventions. Use when creating new components, building UI elements, or scaffolding React code.
allowed-tools: Read, Write, Glob, Grep
---

# Next.js Component Generator

Create React components following Next.js 13+ App Router conventions.

## Instructions

1. First, examine existing components to understand project patterns:
   - Check `components/` directory structure
   - Look at existing component files for styling approach
   - Identify if TypeScript is used
   - Check for shared utilities or hooks

2. Determine component type:
   - **Server Component** (default): No 'use client', can fetch data directly
   - **Client Component**: Add 'use client' for interactivity, hooks, browser APIs

## Component Structure

### Server Component (default)
```tsx
import { ComponentProps } from '@/types'

interface Props {
  // Define props with TypeScript
}

export default function ComponentName({ prop1, prop2 }: Props) {
  return (
    <div>
      {/* Component content */}
    </div>
  )
}
```

### Client Component
```tsx
'use client'

import { useState } from 'react'

interface Props {
  // Define props
}

export default function ComponentName({ prop1 }: Props) {
  const [state, setState] = useState()

  return (
    <div>
      {/* Interactive content */}
    </div>
  )
}
```

## Best Practices

- Use TypeScript interfaces for props
- Follow existing naming conventions in the project
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use semantic HTML elements
- Ensure accessibility (aria labels, keyboard navigation)
- Match existing styling approach (CSS modules, Tailwind, etc.)

## File Organization

```
components/
├── UI/              # Reusable UI primitives
├── Layout/          # Layout components
├── Forms/           # Form-related components
└── [Feature]/       # Feature-specific components
```

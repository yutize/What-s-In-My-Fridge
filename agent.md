# What's In My Fridge — AI Agent Routing Guide

> This file defines which LLM should handle which type of task for this project.

---

## LLM Routing Matrix

| Task Type | Model | When to Use |
|---|---|---|
| **UI Changes** | **Gemini** | Any visual/styling changes: CSS tweaks, layout adjustments, color schemes, component appearance, responsive design, animations, Tailwind/DaisyUI class updates |
| **Small Code Changes** | **Claude Sonnet** | Minor logic fixes, bug fixes, small refactors, adding/editing a single component, updating types, adjusting form validation, small API tweaks, adding env vars |
| **Complex Changes & Architecture** | **Claude Opus** | Multi-file refactors, new features spanning multiple layers (route → page → component → service → DB), architecture decisions, new integrations (e.g., Gemini ADK), database schema changes, new API endpoints, state management changes |

---

## Decision Flowchart

```
Is this change purely visual (CSS, layout, colors, spacing)?
  → YES → Use Gemini
  → NO ↓

Does this change touch ≤ 2 files and involves simple logic?
  → YES → Use Claude Sonnet
  → NO ↓

Does this involve new features, architecture, multi-layer changes, or integrations?
  → YES → Use Claude Opus
```

---

## Examples

### Gemini (UI Changes)
- Updating the green gradient on the nutrition page
- Changing font sizes or spacing on section cards
- Adding hover effects to buttons
- Adjusting dark mode colors
- Responsive breakpoint tweaks
- Adding CSS animations or transitions

### Claude Sonnet (Small Changes)
- Fixing a bug in `nutritionController.ts`
- Adding a new field to the `NutritionProfile` type
- Updating form validation logic
- Adding a new checkbox option to allergies
- Fixing a TypeScript type error
- Small component prop changes

### Claude Opus (Complex / Architecture)
- Adding the AI Nutrition Chatbot feature (Gemini ADK integration)
- Adding new database tables (e.g., `ChatHistory`)
- Creating new API routes and server-side actions
- Implementing real-time streaming chat
- Multi-component feature builds (chatbot panel + profile form + backend agent)
- Refactoring the middleware/service layer
- Setting up new third-party SDK integrations

---

## Tech Stack Reference

- **Frontend**: React 19 + React Router 7 (SSR) + TypeScript
- **Styling**: Tailwind CSS 4 + DaisyUI 5
- **Backend**: React Router server-side (loaders/actions) + better-sqlite3
- **API**: Edamam (recipes), Google Gemini (AI chatbot — planned)
- **Deployment**: Vercel

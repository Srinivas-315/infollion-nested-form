# Nested Question Builder — Infollion Task 5

A dynamic, production-grade React form where users can add questions and recursively nest sub-questions. Built with **React 19 + Vite**, featuring a premium dark glassmorphism UI.

---

## ✨ Features

### Core

- **Add Parent Questions** — dynamically add new top-level questions
- **Text Input + Type Dropdown** — each question has a text field and type selector (Short Answer / True-False)
- **Conditional Nesting** — True/False questions with answer "True" unlock the "Add Sub-Question" button
- **Recursive Nesting** — child questions support infinite depth nesting with the same structure
- **Auto-Numbering** — hierarchical numbering (Q1, Q1.1, Q1.1.1, Q2) computed at render time
- **Delete Cascade** — deleting a question removes all its children
- **Form Submission** — displays all questions in a hierarchical read-only review view

### UI/UX

- 🌙 Premium dark theme with glassmorphism
- 🎨 Depth-based accent colors for visual hierarchy
- ✨ Smooth micro-animations (slide-in, pop, float)
- 📱 Fully responsive design
- 🎯 Clean, accessible form controls

---

## 🏗️ Architecture

```
src/
├── components/
│   ├── QuestionCard.jsx    ← ⭐ Recursive component (renders itself for children)
│   ├── QuestionForm.jsx    ← Text input + type dropdown + radio buttons
│   ├── SubmissionView.jsx  ← Hierarchical read-only display
│   └── Toolbar.jsx         ← Add Question + Submit buttons
├── hooks/
│   └── useQuestions.js     ← useReducer state management (recursive tree ops)
├── utils/
│   └── numbering.js        ← Auto-numbering utility
├── App.jsx                 ← Root component
├── App.css                 ← Complete styling
└── main.jsx                ← Vite entry point
```

### Key Design Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| State management | `useReducer` | Clean, predictable state for recursive data |
| Data structure | Recursive tree (`children[]`) | Natural fit for nested questions |
| Auto-numbering | Computed at render via `indexPath` | Never stale, handles infinite depth |
| Component pattern | Recursive `QuestionCard` | Elegantly handles any nesting depth |

---

## 🚀 Setup & Run

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/infollion-nested-form.git
cd infollion-nested-form

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📝 How It Works

1. Click **"Add New Question"** to create a parent question
2. Enter question text and select the answer type
3. If type is **True/False** and answer is **True** → an "Add Sub-Question" button appears
4. Sub-questions have the same structure and can be nested further
5. Click **"Submit"** to view all questions in a hierarchical review format
6. Click **"Back to Edit"** to return and modify

---

## 🛠️ Tech Stack

- **React 19** — UI framework
- **Vite** — Build tool & dev server
- **Vanilla CSS** — Custom dark theme, no utility framework dependency

---

## 📄 License

MIT

import React from "react";

/**
 * Toolbar — top bar with "Add New Question", "Submit", and "Reset" buttons.
 * Also displays the current question count and a persistence indicator.
 */
export default function Toolbar({ questionCount, onAddQuestion, onSubmit, onReset, hasQuestions }) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <h1 className="toolbar-title">
          <span className="toolbar-icon">📝</span>
          Nested Question Builder
        </h1>
        <div className="toolbar-badges">
          <span className="question-count">
            {questionCount} {questionCount === 1 ? "question" : "questions"}
          </span>
          <span className="persistence-badge" title="Your form is automatically saved">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Auto-saved
          </span>
        </div>
      </div>
      <div className="toolbar-right">
        {hasQuestions && (
          <button className="btn-reset" onClick={onReset} title="Clear all questions and saved data">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
            Reset
          </button>
        )}
        <button className="btn-add-parent" onClick={onAddQuestion}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add New Question
        </button>
        <button
          className="btn-submit"
          onClick={onSubmit}
          disabled={questionCount === 0}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Submit
        </button>
      </div>
    </div>
  );
}

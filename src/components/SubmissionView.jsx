import React from "react";
import { getQuestionNumber } from "../utils/numbering";

/**
 * Renders a single question node in the submission view (recursive).
 */
function SubmissionNode({ question, indexPath }) {
  const number = getQuestionNumber(indexPath);
  const depth = indexPath.length - 1;

  const typeLabel = question.type === "true_false" ? "True / False" : "Short Answer";
  const answerLabel =
    question.type === "true_false" && question.answer
      ? question.answer === "true"
        ? "True"
        : "False"
      : null;

  return (
    <div className="submission-node" style={{ "--depth": depth }}>
      <div className="submission-row">
        <span className="submission-number">{number}</span>
        <div className="submission-details">
          <p className="submission-text">
            {question.text || <em className="empty-text">No question text entered</em>}
          </p>
          <div className="submission-meta">
            <span className="meta-badge type-badge">{typeLabel}</span>
            {answerLabel && (
              <span className={`meta-badge answer-badge ${answerLabel.toLowerCase()}`}>
                Answer: {answerLabel}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Recursive children */}
      {question.children.length > 0 && (
        <div className="submission-children">
          {question.children.map((child, idx) => (
            <SubmissionNode
              key={child.id}
              question={child}
              indexPath={[...indexPath, idx]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * SubmissionView — read-only hierarchical display of all questions after form submission.
 */
export default function SubmissionView({ questions, onBack }) {
  /**
   * Recursively count all questions (parent + children).
   */
  function countAll(nodes) {
    return nodes.reduce(
      (sum, node) => sum + 1 + countAll(node.children),
      0
    );
  }

  const totalCount = countAll(questions);

  return (
    <div className="submission-view">
      <div className="submission-header">
        <div className="submission-header-left">
          <h2 className="submission-title">
            <span className="submission-icon">✅</span>
            Form Submitted Successfully
          </h2>
          <p className="submission-subtitle">
            Review your {totalCount} {totalCount === 1 ? "question" : "questions"} below
          </p>
        </div>
        <button className="btn-back" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Edit
        </button>
      </div>

      <div className="submission-body">
        {questions.map((q, index) => (
          <SubmissionNode
            key={q.id}
            question={q}
            indexPath={[index]}
          />
        ))}
      </div>
    </div>
  );
}

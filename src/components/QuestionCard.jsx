import React from "react";
import QuestionForm from "./QuestionForm";
import { getQuestionNumber, getDepth } from "../utils/numbering";

/**
 * Accent colors for different nesting depths.
 * Cycles through these for visual hierarchy.
 */
const DEPTH_COLORS = [
  "#6c63ff", // Purple — depth 0
  "#00d2ff", // Cyan — depth 1
  "#ff6b9d", // Pink — depth 2
  "#ffd93d", // Yellow — depth 3
  "#6bcb77", // Green — depth 4
  "#ff8a5c", // Orange — depth 5+
];

function getAccentColor(depth) {
  return DEPTH_COLORS[depth % DEPTH_COLORS.length];
}

/**
 * QuestionCard — ⭐ The recursive star component.
 *
 * Renders a single question with its form fields, action buttons,
 * and recursively renders its children as nested QuestionCards.
 *
 * Props:
 *   - question: the question node object
 *   - indexPath: array of indices for auto-numbering (e.g. [0, 1, 2])
 *   - onUpdate: callback to update a field
 *   - onAddChild: callback to add a child question
 *   - onDelete: callback to delete this question
 *   - dragHandleProps: props from react-beautiful-dnd for the drag handle (parent only)
 */
export default function QuestionCard({
  question,
  indexPath,
  onUpdate,
  onAddChild,
  onDelete,
  dragHandleProps,
}) {
  const depth = getDepth(indexPath);
  const number = getQuestionNumber(indexPath);
  const accentColor = getAccentColor(depth);
  const canAddChild =
    question.type === "true_false" && question.answer === "true";

  return (
    <div
      className="question-card"
      style={{
        "--accent-color": accentColor,
        "--depth": depth,
      }}
    >
      {/* Card Header */}
      <div className="card-header">
        {/* Drag Handle — only on parent (depth 0) questions */}
        {dragHandleProps && (
          <div className="drag-handle" {...dragHandleProps} title="Drag to reorder">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="9" cy="5" r="1.5" />
              <circle cx="15" cy="5" r="1.5" />
              <circle cx="9" cy="12" r="1.5" />
              <circle cx="15" cy="12" r="1.5" />
              <circle cx="9" cy="19" r="1.5" />
              <circle cx="15" cy="19" r="1.5" />
            </svg>
          </div>
        )}
        <span className="question-number" style={{ backgroundColor: accentColor }}>
          {number}
        </span>
        <span className="depth-label">
          {depth === 0 ? "Parent Question" : `Nested — Level ${depth}`}
        </span>
        <button
          className="btn-delete"
          onClick={() => onDelete(question.id)}
          title="Delete this question and all sub-questions"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
          Delete
        </button>
      </div>

      {/* Question Form Fields */}
      <QuestionForm question={question} onUpdate={onUpdate} />

      {/* Action Buttons */}
      <div className="card-actions">
        {canAddChild && (
          <button
            className="btn-add-child"
            onClick={() => onAddChild(question.id)}
            style={{ borderColor: accentColor, color: accentColor }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Sub-Question
          </button>
        )}
      </div>

      {/* Recursive Children */}
      {question.children.length > 0 && (
        <div className="children-container">
          <div className="children-connector" style={{ backgroundColor: accentColor }}></div>
          {question.children.map((child, childIndex) => (
            <QuestionCard
              key={child.id}
              question={child}
              indexPath={[...indexPath, childIndex]}
              onUpdate={onUpdate}
              onAddChild={onAddChild}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import React from "react";

/**
 * QuestionForm — renders the input fields for a single question.
 * - Text input for the question text
 * - Dropdown to select type (Short Answer / True-False)
 * - Conditional radio buttons when type is True/False
 */
export default function QuestionForm({ question, onUpdate }) {
  return (
    <div className="question-form">
      {/* Question Text Input */}
      <div className="form-field">
        <label className="form-label">Question Text</label>
        <input
          type="text"
          className="form-input"
          placeholder="Enter your question here..."
          value={question.text}
          onChange={(e) => onUpdate(question.id, "text", e.target.value)}
        />
      </div>

      {/* Type Dropdown */}
      <div className="form-field">
        <label className="form-label">Answer Type</label>
        <select
          className="form-select"
          value={question.type}
          onChange={(e) => onUpdate(question.id, "type", e.target.value)}
        >
          <option value="short_answer">Short Answer</option>
          <option value="true_false">True / False</option>
        </select>
      </div>

      {/* Conditional: True/False Answer Radio Buttons */}
      {question.type === "true_false" && (
        <div className="form-field">
          <label className="form-label">Answer</label>
          <div className="radio-group">
            <label className={`radio-option ${question.answer === "true" ? "selected" : ""}`}>
              <input
                type="radio"
                name={`answer-${question.id}`}
                value="true"
                checked={question.answer === "true"}
                onChange={(e) => onUpdate(question.id, "answer", e.target.value)}
              />
              <span className="radio-dot"></span>
              True
            </label>
            <label className={`radio-option ${question.answer === "false" ? "selected" : ""}`}>
              <input
                type="radio"
                name={`answer-${question.id}`}
                value="false"
                checked={question.answer === "false"}
                onChange={(e) => onUpdate(question.id, "answer", e.target.value)}
              />
              <span className="radio-dot"></span>
              False
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

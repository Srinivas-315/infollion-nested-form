import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Toolbar from "./components/Toolbar";
import QuestionCard from "./components/QuestionCard";
import SubmissionView from "./components/SubmissionView";
import { useQuestions } from "./hooks/useQuestions";
import "./App.css";

/**
 * App — Root component.
 * Wires the useQuestions hook to the UI.
 * Toggles between form editing mode and submission review mode.
 * Wraps parent questions in DragDropContext for reordering.
 */
export default function App() {
  const {
    questions,
    addQuestion,
    addChild,
    updateField,
    deleteQuestion,
    reorderQuestions,
    resetAll,
  } = useQuestions();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (questions.length === 0) return;
    setIsSubmitted(true);
  };

  const handleBack = () => {
    setIsSubmitted(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;
    reorderQuestions(result.source.index, result.destination.index);
  };

  return (
    <div className="app">
      {/* Background Decoration */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      {!isSubmitted ? (
        <>
          {/* Toolbar */}
          <Toolbar
            questionCount={questions.length}
            onAddQuestion={addQuestion}
            onSubmit={handleSubmit}
            onReset={resetAll}
            hasQuestions={questions.length > 0}
          />

          {/* Questions List with Drag & Drop */}
          <div className="questions-container">
            {questions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <h3 className="empty-title">No Questions Yet</h3>
                <p className="empty-desc">
                  Click <strong>"Add New Question"</strong> to get started
                  building your nested question form.
                </p>
                <button className="btn-add-parent" onClick={addQuestion}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Your First Question
                </button>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="questions-list">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`droppable-area ${snapshot.isDraggingOver ? "drag-over" : ""}`}
                    >
                      {questions.map((q, index) => (
                        <Draggable key={q.id} draggableId={q.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`draggable-item ${snapshot.isDragging ? "is-dragging" : ""}`}
                            >
                              <QuestionCard
                                question={q}
                                indexPath={[index]}
                                onUpdate={updateField}
                                onAddChild={addChild}
                                onDelete={deleteQuestion}
                                dragHandleProps={provided.dragHandleProps}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        </>
      ) : (
        <SubmissionView questions={questions} onBack={handleBack} />
      )}
    </div>
  );
}

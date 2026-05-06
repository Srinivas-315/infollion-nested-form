import { useReducer, useCallback, useEffect } from "react";
import { saveQuestions, loadQuestions, clearQuestions } from "../utils/storage";

/**
 * Creates a fresh question node.
 */
function createQuestion() {
  return {
    id: crypto.randomUUID(),
    text: "",
    type: "short_answer",
    answer: null,
    children: [],
  };
}

/**
 * Recursively find a node by ID and apply a transform function.
 * Returns a new tree (immutable update).
 */
function mapTree(nodes, targetId, transform) {
  return nodes.map((node) => {
    if (node.id === targetId) {
      return transform(node);
    }
    if (node.children.length > 0) {
      return {
        ...node,
        children: mapTree(node.children, targetId, transform),
      };
    }
    return node;
  });
}

/**
 * Recursively remove a node by ID from the tree.
 */
function filterTree(nodes, targetId) {
  return nodes
    .filter((node) => node.id !== targetId)
    .map((node) => ({
      ...node,
      children: filterTree(node.children, targetId),
    }));
}

/**
 * Reducer for managing the questions tree.
 */
function questionsReducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;

    case "ADD_QUESTION":
      return [...state, createQuestion()];

    case "ADD_CHILD": {
      return mapTree(state, action.parentId, (node) => ({
        ...node,
        children: [...node.children, createQuestion()],
      }));
    }

    case "UPDATE_FIELD": {
      const { id, field, value } = action;
      return mapTree(state, id, (node) => {
        const updated = { ...node, [field]: value };

        // When type changes to short_answer, clear answer and children
        if (field === "type" && value === "short_answer") {
          updated.answer = null;
          updated.children = [];
        }

        // When type changes to true_false, default answer to null
        if (field === "type" && value === "true_false") {
          updated.answer = null;
          updated.children = [];
        }

        // When answer changes to false, clear children
        if (field === "answer" && value === "false") {
          updated.children = [];
        }

        return updated;
      });
    }

    case "DELETE_QUESTION":
      return filterTree(state, action.id);

    case "REORDER": {
      const { sourceIndex, destinationIndex } = action;
      const reordered = [...state];
      const [moved] = reordered.splice(sourceIndex, 1);
      reordered.splice(destinationIndex, 0, moved);
      return reordered;
    }

    case "RESET":
      return [];

    default:
      return state;
  }
}

/**
 * Custom hook that encapsulates all question state management.
 * Includes localStorage persistence and drag-and-drop reordering.
 * Returns the questions array and action dispatchers.
 */
export function useQuestions() {
  const [questions, dispatch] = useReducer(questionsReducer, [], () => {
    // Lazy initializer — hydrate from localStorage on mount
    return loadQuestions();
  });

  // Persist to localStorage on every state change
  useEffect(() => {
    saveQuestions(questions);
  }, [questions]);

  const addQuestion = useCallback(() => {
    dispatch({ type: "ADD_QUESTION" });
  }, []);

  const addChild = useCallback((parentId) => {
    dispatch({ type: "ADD_CHILD", parentId });
  }, []);

  const updateField = useCallback((id, field, value) => {
    dispatch({ type: "UPDATE_FIELD", id, field, value });
  }, []);

  const deleteQuestion = useCallback((id) => {
    dispatch({ type: "DELETE_QUESTION", id });
  }, []);

  const reorderQuestions = useCallback((sourceIndex, destinationIndex) => {
    dispatch({ type: "REORDER", sourceIndex, destinationIndex });
  }, []);

  const resetAll = useCallback(() => {
    clearQuestions();
    dispatch({ type: "RESET" });
  }, []);

  return {
    questions,
    addQuestion,
    addChild,
    updateField,
    deleteQuestion,
    reorderQuestions,
    resetAll,
  };
}

/**
 * Auto-numbering utility for nested questions.
 * Converts an index path array to a hierarchical question number.
 *
 * Examples:
 *   [0]       → "Q1"
 *   [0, 0]    → "Q1.1"
 *   [0, 2, 1] → "Q1.3.2"
 *   [1]       → "Q2"
 */
export function getQuestionNumber(indexPath) {
  const numberParts = indexPath.map((i) => i + 1);
  return `Q${numberParts.join(".")}`;
}

/**
 * Returns the nesting depth (0-based) from an index path.
 */
export function getDepth(indexPath) {
  return indexPath.length - 1;
}

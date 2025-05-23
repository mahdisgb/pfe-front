import type { CrudOperators } from "@refinedev/core";

export const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case "gte":
    case "lte":
    case "ne":
      return `_${operator}`;
    case "contains":
      return "_like";
    default:
      return "";
  }
};
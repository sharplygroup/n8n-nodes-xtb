# XTB Node Refactoring Plan

This document outlines the plan to refactor the `nodes/Xtb/Xtb.node.ts` file into smaller, more manageable chunks.

## Goals

*   Improve the maintainability and readability of the code.
*   Reduce the size and complexity of the `Xtb.node.ts` file.
*   Make the code more modular and testable.

## Step-by-Step Plan

1.  **Move Resource Handling to Separate Files:**
    *   Create `TradingResource.ts`, `MarketDataResource.ts`, and `AccountResource.ts` in the `nodes/Xtb/lib` directory.
    *   Move the corresponding `case` blocks from the `execute` method's main `switch (resource)` statement into these new files.
    *   Create methods in each `*Operations.ts` file to handle the individual operations.
    *   Update the `Xtb.node.ts` file to import and use these new resource handlers.
    *   Run `pnpm lint` and `pnpm build` to ensure no errors are introduced.
2.  **Modularize Operations within Resources:**
    *   Within each resource file (e.g., `TradingResource.ts`), further break down the `switch (operation)` statement into separate functions or classes for each operation (e.g., `openTrade`, `closeTrade`, `getTrades`).
    *   This will make each operation more self-contained and easier to maintain.
    *   Run `pnpm lint` and `pnpm build` after each modularization to ensure correctness.
3.  **Extract Parameter Definitions:**
    *   The `properties` array in the `description` object is quite large. Consider extracting groups of related parameters into separate files and importing them into the `Xtb.node.ts` file.
    *   This could be done by resource or by operation.
    *   Run `pnpm lint` and `pnpm build` after each extraction.
4.  **Refactor WebSocketManager Usage:**
    *   Ensure the `WebSocketManager` is being used efficiently and that its lifecycle is properly managed.
    *   Consider if the `WebSocketManager` can be further encapsulated or if its responsibilities can be distributed.
    *   Run `pnpm lint` and `pnpm build` after any changes to the `WebSocketManager` usage.
5.  **Error Handling:**
    *   Review the error handling logic to ensure it is consistent and effective.
    *   Consider creating custom error classes for specific XTB API errors.
    *   Run `pnpm lint` and `pnpm build` after any changes to the error handling.
6.  **Testing:**
    *   Add unit tests for each of the new modules and functions to ensure they are working correctly.
    *   This will help prevent regressions in the future.

## Next Steps

*   Start implementing the refactoring plan, one step at a time.
*   Run `pnpm lint` and `pnpm build` after each step to ensure correctness.
*   Document the changes in this file as they are made.
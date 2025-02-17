# XTB API Node Refactoring Plan

## Overview

The `nodes/Xtb/Xtb.node.ts` file is currently too large and complex. This document outlines a plan to refactor the file into smaller, more manageable chunks.

## Goals

*   Reduce the size and complexity of `Xtb.node.ts`.
*   Improve the readability and maintainability of the code.
*   Make it easier to add new features and operations in the future.

## Plan

1.  **Analyze the existing code:**
    *   Understand the overall structure of the `Xtb.node.ts` file.
    *   Identify the main sections:
        *   Node definition (`description` property)
        *   `execute` method
        *   Helper functions for different operations (trading, market data, account)
    *   Look for logical groupings of code that can be extracted into separate functions or classes.

2.  **Extract operation-specific logic:**
    *   Create separate files for each resource (trading, marketData, account) and their corresponding operations. For example:
        *   `nodes/Xtb/lib/TradingOperations.ts`
        *   `nodes/Xtb/lib/MarketDataOperations.ts`
        *   `nodes/Xtb/lib/AccountOperations.ts`
    *   Move the relevant code from the `execute` method into these files. Each operation (e.g., `openTrade`, `getSymbol`, `getAccountData`) will become a separate function within its respective module.

3.  **Refactor the `execute` method:**
    *   The `execute` method in `Xtb.node.ts` will become a dispatcher that calls the appropriate function based on the `resource` and `operation` parameters.
    *   This will make the `execute` method much smaller and easier to read.

4.  **Update imports and references:**
    *   Make sure all the necessary modules are imported in the new files.
    *   Update the references to the extracted functions in the `execute` method.

5.  **Implement step-by-step refactoring with linting and building:**
    *   Perform the refactoring in small, incremental steps.
    *   After each step, run `pnpm lint` and `pnpm build` to ensure that the code is still working correctly.
    *   If there are any errors, fix them before moving on to the next step.

## Detailed Steps

1.  Create the `docs/xtb-api-refactoring.md` file: This file will document the refactoring process. **(DONE)**
2.  Create the `nodes/Xtb/lib/TradingOperations.ts` file: This file will contain the trading-related operations. **(DONE)**
3.  Create the `nodes/Xtb/lib/MarketDataOperations.ts` file: This file will contain the market data-related operations. **(DONE)**
4.  Create the `nodes/Xtb/lib/AccountOperations.ts` file: This file will contain the account-related operations. **(DONE)**
5.  Move trading operations to `nodes/Xtb/lib/TradingOperations.ts`: Extract `handleTradeTransaction`, `openTrade`, `closeTrade`, and `getTrades` functions. **(DONE)**
6.  Move market data operations to `nodes/Xtb/lib/MarketDataOperations.ts`: Extract `getAllSymbols`, `getSymbol`, `getChartData`, `getTickPrices`, and `getTradingHours` functions. **(DONE)**
7.  Move account operations to `nodes/Xtb/lib/AccountOperations.ts`: Extract `getAccountData`, `getMarginLevel`, `getMarginTrade`, `getCommission`, and `calculateProfit` functions. **(DONE)**
8.  Update `Xtb.node.ts`:
    *   Import the new operation files. **(DONE)**
    *   Refactor the `execute` method to call the appropriate functions from the new files. **(DONE)**
9.  Run `pnpm lint` and `pnpm build`: Check for any errors and fix them. **(DONE)**
10. Test the node: Create a workflow that uses the XTB node and test all the operations to make sure they are working correctly.
11. Update `docs/xtb-api-refactoring.md`: Document the changes that were made and any problems that were encountered.

## Problems Encountered

*   Incorrect line numbers when using `apply_diff`. This was resolved by reading the file content first to get the correct line numbers.
*   Invalid diff format when using `apply_diff`. This was resolved by using `write_to_file` to rewrite the entire file instead of using `apply_diff` for large changes.
*   Missing commas and incorrect syntax in the `properties` section. This was resolved by carefully reviewing the code and adding the missing commas.
*   Unused imports in `Xtb.node.ts`. This was resolved by removing the unused imports.

## Next Steps

*   Test the node to make sure all the operations are working correctly.
*   Update the documentation to reflect the changes that were made.
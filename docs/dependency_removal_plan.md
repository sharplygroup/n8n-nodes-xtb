# Dependency Removal Plan

This document outlines the plan to remove the dependency on `n8n-workflow` from the following files:

-   `nodes/Xtb/lib/operations/AccountOperations.ts`
-   `nodes/Xtb/lib/operations/AdditionalOperations.ts`
-   `nodes/Xtb/lib/operations/MarketDataOperations.ts`
-   `nodes/Xtb/lib/operations/TradingOperations.ts`

## Detailed Steps

1.  **AccountOperations.ts**
    -   Remove the following import statement:
        ```typescript
        import { IExecuteFunctions, IDataObject, NodeOperationError } from 'n8n-workflow';
        ```
    -   Replace usages of `IExecuteFunctions`, `IDataObject`, and `NodeOperationError` with suitable alternatives.

2.  **AdditionalOperations.ts**
    -   Remove the following import statement:
        ```typescript
        import { IDataObject } from 'n8n-workflow';
        ```
    -   Replace usages of `IDataObject` with suitable alternatives.

3.  **MarketDataOperations.ts**
    -   Remove the following import statement:
        ```typescript
        import { IExecuteFunctions, IDataObject, NodeOperationError } from 'n8n-workflow';
        ```
    -   Replace usages of `IExecuteFunctions`, `IDataObject`, and `NodeOperationError` with suitable alternatives.

4.  **TradingOperations.ts**
    -   Remove the following import statement:
        ```typescript
        import { IExecuteFunctions, IDataObject, NodeOperationError } from 'n8n-workflow';
        ```
    -   Replace usages of `IExecuteFunctions`, `IDataObject`, and `NodeOperationError` with suitable alternatives.

## Next Steps

1.  Switch to code mode.
2.  Implement the changes outlined above.
3.  Run `pnpm verify` to ensure the changes did not introduce any errors.
# Implementation Plan for AdditionalResource.ts

## Overview
Create a new resource class to handle additional XTB API operations following the same pattern as AccountResource.ts.

## File Location
`nodes/Xtb/resources/AdditionalResource.ts`

## Class Structure
```typescript
export class AdditionalResource {
    constructor(
        private readonly additionalOperations: AdditionalOperations,
        private readonly executeFunctions: IExecuteFunctions,
    ) {}

    async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject>
    private async executeMethod(operation: string): Promise<IWebSocketResponse>
}
```

## Operations to Implement
1. getCalendar
2. getServerTime
3. getStepRules
4. getVersion
5. getBalance
6. getCandles (requires symbol parameter)
7. getKeepAlive
8. getNews
9. getProfits
10. getTradeStatus
11. ping

## Implementation Steps
1. Create the file with necessary imports
2. Implement the class structure
3. Implement the execute method following AccountResource pattern
4. Implement executeMethod with switch statement for all operations
5. Implement private methods for each operation
6. Add special handling for getCandles operation as it requires a parameter

## Next Steps
After approval:
1. Switch to code mode to implement the solution
2. Create the file and implement the class
3. Test each operation
4. Update the node's main file to use the new resource

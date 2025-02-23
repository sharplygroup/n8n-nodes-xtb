import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import {
	SymbolOperations,
	ISymbolsResponse,
	ISymbolResponse,
	IWebSocketResponse,
} from '@sharplygroup/xtb-api-js';

export class SymbolResource {
	constructor(
		private readonly symbolOperations: SymbolOperations,
		private readonly executeFunctions: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		const result = await this.executeMethod(operation);
		return result as unknown as IDataObject;
	}

	private async executeMethod(operation: string): Promise<IWebSocketResponse> {
		switch (operation) {
			case 'getAllSymbols':
				return this.getAllSymbols();
			case 'getSymbol':
				return this.getSymbol();
			default:
				throw new NodeOperationError(
					this.executeFunctions.getNode(),
					`Unknown symbol operation: ${operation}`,
				);
		}
	}

	private async getAllSymbols(): Promise<ISymbolsResponse> {
		return this.symbolOperations.getAllSymbols();
	}

	private async getSymbol(symbol: string): Promise<ISymbolResponse> {
		return this.symbolOperations.getSymbol(symbol);
	}
}

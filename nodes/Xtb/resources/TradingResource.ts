import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import {
	TradingOperations,
	ITradeTransactionResponse,
	IWebSocketResponse,
} from '@sharplygroup/xtb-api-js';

export class TradingResource {
	constructor(
		private readonly tradingOperations: TradingOperations,
		private readonly executeFunctions: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		const result = await this.executeMethod(operation);
		return result as unknown as IDataObject;
	}

	private async executeMethod(operation: string): Promise<IWebSocketResponse> {
		switch (operation) {
			case 'tradeTransaction':
				return this.tradeTransaction();
			case 'tradeTransactionStatus':
				return this.tradeTransactionStatus();
			default:
				throw new NodeOperationError(
					this.executeFunctions.getNode(),
					`Unknown trading operation: ${operation}`,
				);
		}
	}

	private async tradeTransaction(): Promise<ITradeTransactionResponse> {
		// TODO: Implement parameters
		return this.tradingOperations.tradeTransaction({});
	}

	private async tradeTransactionStatus(): Promise<any> {
		// TODO: Implement parameters
		return this.tradingOperations.tradeTransactionStatus(0);
	}
}

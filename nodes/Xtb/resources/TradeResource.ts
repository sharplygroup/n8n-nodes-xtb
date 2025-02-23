import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import {
	TradeOperations,
	ITradesResponse,
	IWebSocketResponse,
} from '@sharplygroup/xtb-api-js';

export class TradeResource {
	constructor(
		private readonly tradeOperations: TradeOperations,
		private readonly executeFunctions: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		const result = await this.executeMethod(operation);
		return result as unknown as IDataObject;
	}

	private async executeMethod(operation: string): Promise<IWebSocketResponse> {
		switch (operation) {
			case 'getTrades':
				return this.getTrades();
			case 'getTradeRecords':
				return this.getTradeRecords();
			case 'getTradesHistory':
				return this.getTradesHistory();
			case 'getTradeStatus':
				return this.getTradeStatus();
			default:
				throw new NodeOperationError(
					this.executeFunctions.getNode(),
					`Unknown trade operation: ${operation}`,
				);
		}
	}

	private async getTrades(): Promise<ITradesResponse> {
		// TODO: Implement parameters
		return this.tradeOperations.getTrades(false);
	}

	private async getTradeRecords(): Promise<ITradesResponse> {
		// TODO: Implement parameters
		return this.tradeOperations.getTradeRecords([]);
	}

	private async getTradesHistory(): Promise<ITradesResponse> {
		// TODO: Implement parameters
		return this.tradeOperations.getTradesHistory(0, 0);
	}

	private async getTradeStatus(): Promise<any> {
		// TODO: Implement parameters
		return this.tradeOperations.getTradeStatus(0);
	}
}

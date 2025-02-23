import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import { TradeOperations, ITradesResponse, IWebSocketResponse } from '@sharplygroup/xtb-api-js';

export class TradeResource {
	constructor(
		private readonly tradeOperations: TradeOperations,
		private readonly executeFunctions: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		const result = await this.executeMethod(operation, i);
		return result as unknown as IDataObject;
	}

	private async executeMethod(operation: string, i: number): Promise<IWebSocketResponse> {
		switch (operation) {
			case 'getTrades': {
				const openedOnly = this.executeFunctions.getNodeParameter('openedOnly', i) as boolean;
				return this.getTrades(openedOnly);
			}
			case 'getTradeRecords': {
				const orders = this.executeFunctions.getNodeParameter('orders', i) as number[];
				return this.getTradeRecords(orders);
			}
			case 'getTradesHistory': {
				const end = this.executeFunctions.getNodeParameter('end', i) as number;
				const start = this.executeFunctions.getNodeParameter('start', i) as number;
				return this.getTradesHistory(end, start);
			}
			case 'getTradeStatus': {
				const order = this.executeFunctions.getNodeParameter('order', i) as number;
				return this.getTradeStatus(order);
			}
			default:
				throw new NodeOperationError(
					this.executeFunctions.getNode(),
					`Unknown trade operation: ${operation}`,
				);
		}
	}

	private async getTrades(openedOnly: boolean): Promise<ITradesResponse> {
		return this.tradeOperations.getTrades(openedOnly);
	}

	private async getTradeRecords(orders: number[]): Promise<ITradesResponse> {
		return this.tradeOperations.getTradeRecords(orders);
	}

	private async getTradesHistory(end: number, start: number): Promise<ITradesResponse> {
		return this.tradeOperations.getTradesHistory(end, start);
	}

	private async getTradeStatus(order: number): Promise<any> {
		return this.tradeOperations.getTradeStatus(order);
	}
}

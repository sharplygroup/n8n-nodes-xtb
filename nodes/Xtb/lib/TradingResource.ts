import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import { TradingOperations } from 'lib/TradingOperations';

export class TradingResource {
	constructor(
		private readonly tradingOperations: TradingOperations,
		private readonly executeFunctions: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		switch (operation) {
			case 'openTrade':
				return this.openTrade(items, i);
			case 'closeTrade':
				return this.closeTrade(items, i);
			case 'getTrades':
				return this.getTrades();
			default:
				throw new NodeOperationError(
					this.executeFunctions.getNode(),
					`Unknown trading operation: ${operation}`,
				);
		}
	}

	private async openTrade(items: INodeExecutionData[], i: number): Promise<IDataObject> {
		const symbol = this.executeFunctions.getNodeParameter('symbol', i) as string;
		const cmd = this.executeFunctions.getNodeParameter('cmd', i) as number;
		const volume = this.executeFunctions.getNodeParameter('volume', i) as number;
		const price = this.executeFunctions.getNodeParameter('price', i) as number;
		const additionalFields = this.executeFunctions.getNodeParameter(
			'additionalFields',
			i,
		) as IDataObject;
		return this.tradingOperations.openTrade(symbol, cmd, volume, price, additionalFields);
	}

	private async closeTrade(items: INodeExecutionData[], i: number): Promise<IDataObject> {
		const order = this.executeFunctions.getNodeParameter('order', i) as number;
		return this.tradingOperations.closeTrade(order);
	}

	private async getTrades(): Promise<IDataObject> {
		return this.tradingOperations.getTrades();
	}
}

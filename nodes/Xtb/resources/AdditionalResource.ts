import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { AdditionalOperations } from 'xtb-api-module';

export class AdditionalResource {
	constructor(
		private readonly additionalOperations: AdditionalOperations,
		private readonly node: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		if (operation === 'getCalendar') {
			return this.additionalOperations.getCalendar();
		} else if (operation === 'getIbsHistory') {
			const start = this.node.getNodeParameter('start', i) as number;
			const end = this.node.getNodeParameter('end', i) as number;
			return this.additionalOperations.getIbsHistory(start, end);
		} else if (operation === 'getServerTime') {
			return this.additionalOperations.getServerTime();
		} else if (operation === 'getStepRules') {
			return this.additionalOperations.getStepRules();
		} else if (operation === 'getTradeRecords') {
			const orders = this.node.getNodeParameter('orders', i) as number[];
			return this.additionalOperations.getTradeRecords(orders);
		} else if (operation === 'getTradesHistory') {
			const start = this.node.getNodeParameter('start', i) as number;
			const end = this.node.getNodeParameter('end', i) as number;
			return this.additionalOperations.getTradesHistory(start, end);
		} else if (operation === 'getVersion') {
			return this.additionalOperations.getVersion();
		} else if (operation === 'tradeTransactionStatus') {
			const order = this.node.getNodeParameter('order', i) as number;
			return this.additionalOperations.tradeTransactionStatus(order);
		} else if (operation === 'getBalance') {
			return this.additionalOperations.getBalance();
		} else if (operation === 'getCandles') {
			const symbol = this.node.getNodeParameter('symbol', i) as string;
			return this.additionalOperations.getCandles(symbol);
		} else if (operation === 'getKeepAlive') {
			return this.additionalOperations.getKeepAlive();
		} else if (operation === 'getNews') {
			return this.additionalOperations.getNews();
		} else if (operation === 'getProfits') {
			return this.additionalOperations.getProfits();
		} else if (operation === 'getTradeStatus') {
			return this.additionalOperations.getTradeStatus();
		} else if (operation === 'ping') {
			return this.additionalOperations.ping();
		} else {
			throw new Error(`Unknown operation: ${operation}`);
		}
	}
}

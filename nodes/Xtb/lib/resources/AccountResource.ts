import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import { AccountOperations } from '../operations/AccountOperations';

export class AccountResource {
	constructor(
		private readonly accountOperations: AccountOperations,
		private readonly executeFunctions: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		switch (operation) {
			case 'getAccountData':
				return this.getAccountData();
			case 'getMarginLevel':
				return this.getMarginLevel();
			case 'getMarginTrade':
				return this.getMarginTrade(items, i);
			case 'getCommission':
				return this.getCommission(items, i);
			case 'calculateProfit':
				return this.calculateProfit(items, i);
			default:
				throw new NodeOperationError(
					this.executeFunctions.getNode(),
					`Unknown account operation: ${operation}`,
				);
		}
	}

	private async getAccountData(): Promise<IDataObject> {
		return this.accountOperations.getAccountData();
	}

	private async getMarginLevel(): Promise<IDataObject> {
		return this.accountOperations.getMarginLevel();
	}

	private async getMarginTrade(items: INodeExecutionData[], i: number): Promise<IDataObject> {
		const symbol = this.executeFunctions.getNodeParameter('symbol', i) as string;
		const volume = this.executeFunctions.getNodeParameter('volume', i) as number;
		return this.accountOperations.getMarginTrade(symbol, volume);
	}

	private async getCommission(items: INodeExecutionData[], i: number): Promise<IDataObject> {
		const symbol = this.executeFunctions.getNodeParameter('symbol', i) as string;
		const volume = this.executeFunctions.getNodeParameter('volume', i) as number;
		return this.accountOperations.getCommission(symbol, volume);
	}

	private async calculateProfit(items: INodeExecutionData[], i: number): Promise<IDataObject> {
		const symbol = this.executeFunctions.getNodeParameter('symbol', i) as string;
		const volume = this.executeFunctions.getNodeParameter('volume', i) as number;
		const openPrice = this.executeFunctions.getNodeParameter('openPrice', i) as number;
		const closePrice = this.executeFunctions.getNodeParameter('closePrice', i) as number;
		const cmd = this.executeFunctions.getNodeParameter('cmd', i) as number;
		return this.accountOperations.calculateProfit(symbol, volume, openPrice, closePrice, cmd);
	}
}

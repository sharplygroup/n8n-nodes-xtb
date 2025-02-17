import { IDataObject } from 'n8n-workflow';
import { WebSocketManager } from './../utils/WebSocketManager';

export class AdditionalOperations {
	constructor(private readonly wsManager: WebSocketManager) {}

	async getCalendar(): Promise<IDataObject> {
		const response = await this.wsManager.sendCommand({
			command: 'getCalendar',
		});
		if (Array.isArray(response.returnData)) {
			return response.returnData[0] || {};
		}
		return response.returnData || {};
	}

	async getIbsHistory(start: number, end: number): Promise<IDataObject> {
		const response = await this.wsManager.sendCommand({
			command: 'getIbsHistory',
			arguments: {
				start,
				end,
			},
		});
		if (Array.isArray(response.returnData)) {
			return response.returnData[0] || {};
		}
		return response.returnData || {};
	}

	async getServerTime(): Promise<IDataObject> {
		const response = await this.wsManager.sendCommand({
			command: 'getServerTime',
		});
		if (Array.isArray(response.returnData)) {
			return response.returnData[0] || {};
		}
		return response.returnData || {};
	}

	async getStepRules(): Promise<IDataObject> {
		const response = await this.wsManager.sendCommand({
			command: 'getStepRules',
		});
		if (Array.isArray(response.returnData)) {
			return response.returnData[0] || {};
		}
		return response.returnData || {};
	}

	async getTradeRecords(orders: number[]): Promise<IDataObject> {
		const response = await this.wsManager.sendCommand({
			command: 'getTradeRecords',
			arguments: {
				orders,
			},
		});
		if (Array.isArray(response.returnData)) {
			return response.returnData[0] || {};
		}
		return response.returnData || {};
	}

	async getTradesHistory(start: number, end: number): Promise<IDataObject> {
		const response = await this.wsManager.sendCommand({
			command: 'getTradesHistory',
			arguments: {
				start,
				end,
			},
		});
		if (Array.isArray(response.returnData)) {
			return response.returnData[0] || {};
		}
		return response.returnData || {};
	}

	async getVersion(): Promise<IDataObject> {
		const response = await this.wsManager.sendCommand({
			command: 'getVersion',
		});
		if (Array.isArray(response.returnData)) {
			return response.returnData[0] || {};
		}
		return response.returnData || {};
	}

	async tradeTransactionStatus(order: number): Promise<IDataObject> {
		const response = await this.wsManager.sendCommand({
			command: 'tradeTransactionStatus',
			arguments: {
				order,
			},
		});
		if (Array.isArray(response.returnData)) {
			return response.returnData[0] || {};
		}
		return response.returnData || {};
	}

	async getBalance(): Promise<IDataObject> {
		await this.wsManager.sendStreamCommand({
			command: 'getBalance',
		});
		return {};
	}

	async getCandles(symbol: string): Promise<IDataObject> {
		await this.wsManager.sendStreamCommand({
			command: 'getCandles',
			symbol,
		});
		return {};
	}

	async getKeepAlive(): Promise<IDataObject> {
		await this.wsManager.sendStreamCommand({
			command: 'getKeepAlive',
		});
		return {};
	}

	async getNews(): Promise<IDataObject> {
		await this.wsManager.sendStreamCommand({
			command: 'getNews',
		});
		return {};
	}

	async getProfits(): Promise<IDataObject> {
		await this.wsManager.sendStreamCommand({
			command: 'getProfits',
		});
		return {};
	}

	async getTradeStatus(): Promise<IDataObject> {
		await this.wsManager.sendStreamCommand({
			command: 'getTradeStatus',
		});
		return {};
	}

	async ping(): Promise<IDataObject> {
		await this.wsManager.sendStreamCommand({
			command: 'ping',
		});
		return {};
	}
}
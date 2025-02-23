import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import { ServerOperations, IWebSocketResponse } from '@sharplygroup/xtb-api-js';

export class ServerResource {
	constructor(
		private readonly serverOperations: ServerOperations,
		private readonly executeFunctions: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		const result = await this.executeMethod(operation);
		return result as unknown as IDataObject;
	}

	private async executeMethod(operation: string): Promise<IWebSocketResponse> {
		switch (operation) {
			case 'getServerTime':
				return this.getServerTime();
			case 'getVersion':
				return this.getVersion();
			case 'ping':
				return this.ping();
			default:
				throw new NodeOperationError(
					this.executeFunctions.getNode(),
					`Unknown server operation: ${operation}`,
				);
		}
	}

	private async getServerTime(): Promise<any> {
		return this.serverOperations.getServerTime();
	}

	private async getVersion(): Promise<any> {
		return this.serverOperations.getVersion();
	}

	private async ping(): Promise<any> {
		await this.serverOperations.ping();
		return {};
	}
}

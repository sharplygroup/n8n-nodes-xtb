import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import { NewsOperations, IWebSocketResponse } from '@sharplygroup/xtb-api-js';

export class NewsResource {
	constructor(
		private readonly newsOperations: NewsOperations,
		private readonly executeFunctions: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		const result = await this.executeMethod(operation, i);
		return result as unknown as IDataObject;
	}

	private async executeMethod(operation: string, i: number): Promise<IWebSocketResponse> {
		switch (operation) {
			case 'getNews': {
				const end = this.executeFunctions.getNodeParameter('end', i) as number;
				const start = this.executeFunctions.getNodeParameter('start', i) as number;
				return this.getNews(end, start);
			}
			default:
				throw new NodeOperationError(
					this.executeFunctions.getNode(),
					`Unknown news operation: ${operation}`,
				);
		}
	}

	private async getNews(end: number, start: number): Promise<any> {
		return this.newsOperations.getNews(end, start);
	}
}

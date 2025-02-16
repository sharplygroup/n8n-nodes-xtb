import { IWebSocketResponse } from '../utils/WebSocketManager';
import { IDataObject } from 'n8n-workflow';

export interface ITradeTransactionResponse extends IWebSocketResponse {
	returnData?: IDataObject & {
		order: number;
	};
}
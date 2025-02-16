import { IWebSocketResponse } from '../utils/WebSocketManager';
import { IDataObject } from 'n8n-workflow';

export interface IMarginTradeResponse extends IWebSocketResponse {
	returnData?: {
		margin: number;
	};
}
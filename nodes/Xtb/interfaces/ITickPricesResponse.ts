import { IWebSocketResponse } from '../utils/WebSocketManager';
import { IDataObject } from 'n8n-workflow';

export interface ITickPricesResponse extends IWebSocketResponse {
	returnData?: {
		quotations: IDataObject[];
	};
}
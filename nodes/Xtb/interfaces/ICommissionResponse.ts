import { IWebSocketResponse } from '../utils/WebSocketManager';
import { IDataObject } from 'n8n-workflow';

export interface ICommissionResponse extends IWebSocketResponse {
	returnData?: {
		commission: number;
		rateOfExchange: number;
	};
}
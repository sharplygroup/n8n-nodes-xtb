import { IWebSocketResponse } from '../utils/WebSocketManager';
import { IDataObject } from 'n8n-workflow';

export interface IProfitCalculationResponse extends IWebSocketResponse {
	returnData?: {
		profit: number;
	};
}
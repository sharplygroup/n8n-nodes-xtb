import { IWebSocketResponse } from '../utils/WebSocketManager';
import { IDataObject } from 'n8n-workflow';

export interface ITradingHoursResponse extends IWebSocketResponse {
	returnData?: IDataObject[];
}
import { IWebSocketResponse } from '../utils/WebSocketManager';
import { IDataObject } from 'n8n-workflow';

export interface ITradesResponse extends IWebSocketResponse {
	returnData?: IDataObject[];
}
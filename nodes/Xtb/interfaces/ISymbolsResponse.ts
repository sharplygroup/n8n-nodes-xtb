import { IWebSocketResponse } from '../utils/WebSocketManager';
import { IDataObject } from 'n8n-workflow';

export interface ISymbolsResponse extends IWebSocketResponse {
	returnData?: IDataObject[];
}
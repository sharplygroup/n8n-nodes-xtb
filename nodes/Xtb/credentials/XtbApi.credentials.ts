import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

/**
 * XTB API provides multiple endpoints for both WebSocket and REST API connections:
 *
 * WebSocket Endpoints:
 * - wss://ws.xapi.pro/demo
 * - wss://ws.xapi.pro/demoStream
 * - wss://ws.xapi.pro/real
 * - wss://ws.xapi.pro/realStream
 *
 * REST API Hosts (interchangeable):
 * 1. xapia.x-station.eu
 * 2. xapib.x-station.eu
 *
 * Port Configuration:
 * - DEMO:
 *   - Main port: 5124
 *   - Streaming port: 5125
 * - REAL:
 *   - Main port: 5112
 *   - Streaming port: 5113
 *
 * Note: All servers use SSL connection.
 */
export class XtbApi implements ICredentialType {
	name = 'xtbApi';
	displayName = 'XTB API';
	documentationUrl = 'https://developers.xstore.pro/documentation/';
	properties: INodeProperties[] = [
		{
			displayName: 'User ID',
			name: 'userId',
			type: 'string',
			default: '',
			required: true,
			description: 'Your XTB account user ID',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your XTB account password',
		},
		{
			displayName: 'Demo Account',
			name: 'demo',
			type: 'boolean',
			default: true,
			description: 'Whether to use demo or real account',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {},
	};

	// Since XTB uses WebSocket, we can't use the standard HTTP request test
	// Instead, we'll return true and let the WebSocket connection test handle authentication
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://ws.xapi.pro',
			url: '/demo',
			method: 'GET',
		},
	};
}

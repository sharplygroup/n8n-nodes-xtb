# Credentials file [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/\#credentials-file "Permanent link")

The credentials file defines the authorization methods for the node. The settings in this file affect what n8n displays in the **Credentials** modal, and must reflect the authentication requirements of the service you're connecting to.

In the credentials file, you can use all the [n8n UI elements](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/). n8n encrypts the data that's stored using credentials using an encryption key.

## Structure of the credentials file [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/\#structure-of-the-credentials-file "Permanent link")

The credentials file follows this basic structure:

1. Import statements
2. Create a class for the credentials
3. Within the class, define the properties that control authentication for the node.

### Outline structure [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/\#outline-structure "Permanent link")

|     |     |
| --- | --- |
| ```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
``` | ```
import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';
export class ExampleNode implements ICredentialType {
	name = 'exampleNodeApi';
	displayName = 'Example Node API';
	documentationUrl = '';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
    		// Can be body, header, qs or auth
			qs: {
        		// Use the value from `apiKey` above
				'api_key': '={{$credentials.apiKey}}'
			}
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.domain}}',
			url: '/bearer',
		},
	};
}
``` |

## Parameters [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/\#parameters "Permanent link")

### `name` [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/\#name "Permanent link")

String. The internal name of the object. Used to reference it from other places in the node.

### `displayName` [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/\#displayname "Permanent link")

String. The name n8n uses in the GUI.

### `documentationUrl` [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/\#documentationurl "Permanent link")

String. URL to your credentials documentation.

### `properties` [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/\#properties "Permanent link")

Each object contains:

- `displayName`: the name n8n uses in the GUI.
- `name`: the internal name of the object. Used to reference it from other places in the node.
- `type`: the data type expected, such as `string`.
- `default`: the URL that n8n should use to test credentials.

### `authenticate` [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/\#authenticate "Permanent link")

- `authenticate`: Object. Contains objects that tell n8n how to inject the authentication data as part of the API request.

#### `type` [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/\#type "Permanent link")

String. If you're using an authentication method that sends data in the header, body, or query string, set this to `'generic'`.

#### `properties` [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/\#properties_1 "Permanent link")

Object. Defines the authentication methods. Options are:

- `body`: Object. Sends authentication data in the request body. Can contain nested objects.




|     |     |
| --- | --- |
| ```
1
2
3
4
5
6
7
8
9
``` | ```
authenticate: IAuthenticateGeneric = {
	type: 'generic',
	properties: {
		body: {
			username: '={{$credentials.username}}',
			password: '={{$credentials.password}}',
		},
	},
};
``` |

- `header`: Object. Send authentication data in the request header.




|     |     |
| --- | --- |
| ```
1
2
3
4
5
6
7
8
``` | ```
authenticate: IAuthenticateGeneric = {
	type: 'generic',
	properties: {
		header: {
			Authorization: '=Bearer {{$credentials.authToken}}',
		},
	},
};
``` |

- `qs`: Object. Stands for "query string." Send authentication data in the request query string.




|     |     |
| --- | --- |
| ```
1
2
3
4
5
6
7
8
``` | ```
authenticate: IAuthenticateGeneric = {
	type: 'generic',
	properties: {
		qs: {
			token: '={{$credentials.token}}',
		},
	},
};
``` |

- `auth`: Object. Used for Basic Auth. Requires `username` and `password` as the key names.




|     |     |
| --- | --- |
| ```
1
2
3
4
5
6
7
8
9
``` | ```
authenticate: IAuthenticateGeneric = {
	type: 'generic',
	properties: {
		auth: {
			username: '={{$credentials.username}}',
			password: '={{$credentials.password}}',
		},
	},
};
``` |


### `test` [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/\#test "Permanent link")

Provide a `request` object containing a URL and authentication type that n8n can use to test the credential.

|     |     |
| --- | --- |
| ```
1
2
3
4
5
6
``` | ```
test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.domain}}',
			url: '/bearer',
		},
	};
``` |
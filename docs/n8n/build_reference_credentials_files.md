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
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>32<br>33<br>34<br>35<br>36<br>37<br>``` | ```<br>import {<br>	IAuthenticateGeneric,<br>	ICredentialTestRequest,<br>	ICredentialType,<br>	INodeProperties,<br>} from 'n8n-workflow';<br>export class ExampleNode implements ICredentialType {<br>	name = 'exampleNodeApi';<br>	displayName = 'Example Node API';<br>	documentationUrl = '';<br>	properties: INodeProperties[] = [<br>		{<br>			displayName: 'API Key',<br>			name: 'apiKey',<br>			type: 'string',<br>			default: '',<br>		},<br>	];<br>	authenticate: IAuthenticateGeneric = {<br>		type: 'generic',<br>		properties: {<br>    		// Can be body, header, qs or auth<br>			qs: {<br>        		// Use the value from `apiKey` above<br>				'api_key': '={{$credentials.apiKey}}'<br>			}<br>		},<br>	};<br>	test: ICredentialTestRequest = {<br>		request: {<br>			baseURL: '={{$credentials?.domain}}',<br>			url: '/bearer',<br>		},<br>	};<br>}<br>``` |

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
| ```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>``` | ```<br>authenticate: IAuthenticateGeneric = {<br>	type: 'generic',<br>	properties: {<br>		body: {<br>			username: '={{$credentials.username}}',<br>			password: '={{$credentials.password}}',<br>		},<br>	},<br>};<br>``` |

- `header`: Object. Send authentication data in the request header.




|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>``` | ```<br>authenticate: IAuthenticateGeneric = {<br>	type: 'generic',<br>	properties: {<br>		header: {<br>			Authorization: '=Bearer {{$credentials.authToken}}',<br>		},<br>	},<br>};<br>``` |

- `qs`: Object. Stands for "query string." Send authentication data in the request query string.




|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>``` | ```<br>authenticate: IAuthenticateGeneric = {<br>	type: 'generic',<br>	properties: {<br>		qs: {<br>			token: '={{$credentials.token}}',<br>		},<br>	},<br>};<br>``` |

- `auth`: Object. Used for Basic Auth. Requires `username` and `password` as the key names.




|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>``` | ```<br>authenticate: IAuthenticateGeneric = {<br>	type: 'generic',<br>	properties: {<br>		auth: {<br>			username: '={{$credentials.username}}',<br>			password: '={{$credentials.password}}',<br>		},<br>	},<br>};<br>``` |


### `test` [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/\#test "Permanent link")

Provide a `request` object containing a URL and authentication type that n8n can use to test the credential.

|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>5<br>6<br>``` | ```<br>test: ICredentialTestRequest = {<br>		request: {<br>			baseURL: '={{$credentials?.domain}}',<br>			url: '/bearer',<br>		},<br>	};<br>``` |
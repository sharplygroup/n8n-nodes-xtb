# Build a declarative-style node [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#build-a-declarative-style-node "Permanent link")

This tutorial walks through building a declarative-style node. Before you begin, make sure this is the node style you need. Refer to [Choose your node building approach](https://docs.n8n.io/integrations/creating-nodes/plan/choose-node-method/) for more information.

## Prerequisites [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#prerequisites "Permanent link")

You need the following installed on your development machine:

- [git](https://git-scm.com/downloads)
- Node.js and npm. Minimum version Node 18.17.0. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).

You need some understanding of:

- JavaScript/TypeScript
- REST APIs
- git

## Build your node [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#build-your-node "Permanent link")

In this section, you'll clone n8n's node starter repository, and build a node that integrates the [NASA API](https://api.nasa.gov/). You'll create a node that uses two of NASA's services: APOD (Astronomy Picture of the Day) and Mars Rover Photos. To keep the code examples short, the node won't implement every available option for the Mars Rover Photos endpoint.

Existing node

n8n has a built-in NASA node. To avoid clashing with the existing node, you'll give your version a different name.

### Step 1: Set up the project [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#step-1-set-up-the-project "Permanent link")

n8n provides a starter repository for node development. Using the starter ensures you have all necessary dependencies. It also provides a linter.

Clone the repository and navigate into the directory:

1. [Generate a new repository](https://github.com/n8n-io/n8n-nodes-starter/generate) from the template repository.
2. Clone your new repository:


```<br>git clone https://github.com/<your-organization>/<your-repo-name>.git n8n-nodes-nasa-pics<br>cd n8n-nodes-nasa-pics<br>``` |


The starter contains example nodes and credentials. Delete the following directories and files:

- `nodes/ExampleNode`
- `nodes/HTTPBin`
- `credentials/ExampleCredentials.credentials.ts`
- `credentials/HttpBinApi.credentials.ts`

Now create the following directories and files:

`nodes/NasaPics`

`nodes/NasaPics/NasaPics.node.json`

`nodes/NasaPics/NasaPics.node.ts`

`credentials/NasaPicsApi.credentials.ts`

These are the key files required for any node. Refer to [Node file structure](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-file-structure/) for more information on required files and recommended organization.

Now install the project dependencies:

```<br>npm i<br>```

### Step 2: Add an icon [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#step-2-add-an-icon "Permanent link")

Save the NASA SVG logo from [here](https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg) as `nasapics.svg` in `nodes/NasaPics/`.

n8n recommends using an SVG for your node icon, but you can also use PNG. If using PNG, the icon resolution should be 60x60px. Node icons should have a square or near-square aspect ratio.

Don't reference Font Awesome

If you want to use a Font Awesome icon in your node, download and embed the image.

### Step 3: Create the node [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#step-3-create-the-node "Permanent link")

Every node must have a base file. Refer to [Node base file](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/) for detailed information about base file parameters.

In this example, the file is `NasaPics.node.ts`. To keep this tutorial short, you'll place all the node functionality in this one file. When building more complex nodes, you should consider splitting out your functionality into modules. Refer to [Node file structure](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-file-structure/) for more information.

#### Step 3.1: Imports [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#step-31-imports "Permanent link")

Start by adding the import statements:

```<br>import { INodeType, INodeTypeDescription } from 'n8n-workflow';<br>```

#### Step 3.2: Create the main class [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#step-32-create-the-main-class "Permanent link")

The node must export an interface that implements INodeType. This interface must include a `description` interface, which in turn contains the `properties` array.

Class names and file names

Make sure the class name and the file name match. For example, given a class `NasaPics`, the filename must be `NasaPics.node.ts`.

```<br>export class NasaPics implements INodeType {<br>	description: INodeTypeDescription = {<br>		// Basic node details will go here<br>		properties: [<br>		// Resources and operations will go here<br>		]<br>	};<br>}<br>```

#### Step 3.3: Add node details [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#step-33-add-node-details "Permanent link")

All nodes need some basic parameters, such as their display name, icon, and the basic information for making a request using the node. Add the following to the `description`:

```<br>displayName: 'NASA Pics',<br>name: 'NasaPics',<br>icon: 'file:nasapics.svg',<br>group: ['transform'],<br>version: 1,<br>subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',<br>description: 'Get data from NASAs API',<br>defaults: {<br>	name: 'NASA Pics',<br>},<br>inputs: ['main'],<br>outputs: ['main'],<br>credentials: [<br>	{<br>		name: 'NasaPicsApi',<br>		required: true,<br>	},<br>],<br>requestDefaults: {<br>	baseURL: 'https://api.nasa.gov',<br>	headers: {<br>		Accept: 'application/json',<br>		'Content-Type': 'application/json',<br>	},<br>},<br>```

n8n uses some of the properties set in `description` to render the node in the Editor UI. These properties are `displayName`, `icon`, `description`, and `subtitle`.

#### Step 3.4: Add resources [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#step-34-add-resources "Permanent link")

The resource object defines the API resource that the node uses. In this tutorial, you're creating a node to access two of NASA's API endpoints: `planetary/apod` and `mars-photos`. This means you need to define two resource options in `NasaPics.node.ts`. Update the `properties` array with the resource object:

```<br>properties: [<br>	{<br>		displayName: 'Resource',<br>		name: 'resource',<br>		type: 'options',<br>		noDataExpression: true,<br>		options: [<br>			{<br>				name: 'Astronomy Picture of the Day',<br>				value: 'astronomyPictureOfTheDay',<br>			},<br>			{<br>				name: 'Mars Rover Photos',<br>				value: 'marsRoverPhotos',<br>			},<br>		],<br>		default: 'astronomyPictureOfTheDay',<br>	},<br>	// Operations will go here<br>]<br>```

`type` controls which UI element n8n displays for the resource, and tells n8n what type of data to expect from the user. `options` results in n8n adding a dropdown that allows users to choose one option. Refer to [Node UI elements](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/) for more information.

#### Step 3.5: Add operations [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#step-35-add-operations "Permanent link")

The operations object defines the available operations on a resource.

In a declarative-style node, the operations object includes `routing` (within the `options` array). This sets up the details of the API call.

Add the following to the `properties` array, after the `resource` object:

```<br>{<br>	displayName: 'Operation',<br>	name: 'operation',<br>	type: 'options',<br>	noDataExpression: true,<br>	displayOptions: {<br>		show: {<br>			resource: [<br>				'astronomyPictureOfTheDay',<br>			],<br>		},<br>	},<br>	options: [<br>		{<br>			name: 'Get',<br>			value: 'get',<br>			action: 'Get the APOD',<br>			description: 'Get the Astronomy Picture of the day',<br>			routing: {<br>				request: {<br>					method: 'GET',<br>					url: '/planetary/apod',<br>				},<br>			},<br>		},<br>	],<br>	default: 'get',<br>},<br>{<br>	displayName: 'Operation',<br>	name: 'operation',<br>	type: 'options',<br>	noDataExpression: true,<br>	displayOptions: {<br>		show: {<br>			resource: [<br>				'marsRoverPhotos',<br>			],<br>		},<br>	},<br>	options: [<br>		{<br>			name: 'Get',<br>			value: 'get',<br>			action: 'Get Mars Rover photos',<br>			description: 'Get photos from the Mars Rover',<br>			routing: {<br>				request: {<br>					method: 'GET',<br>				},<br>			},<br>		},<br>	],<br>	default: 'get',<br>},<br>{<br>	displayName: 'Rover name',<br>	description: 'Choose which Mars Rover to get a photo from',<br>	required: true,<br>	name: 'roverName',<br>	type: 'options',<br>	options: [<br>		{name: 'Curiosity', value: 'curiosity'},<br>		{name: 'Opportunity', value: 'opportunity'},<br>		{name: 'Perseverance', value: 'perseverance'},<br>		{name: 'Spirit', value: 'spirit'},<br>	],<br>	routing: {<br>		request: {<br>			url: '=/mars-photos/api/v1/rovers/{{$value}}/photos',<br>		},<br>	},<br>	default: 'curiosity',<br>	displayOptions: {<br>		show: {<br>			resource: [<br>				'marsRoverPhotos',<br>			],<br>		},<br>	},<br>},<br>{<br>	displayName: 'Date',<br>	description: 'Earth date',<br>	required: true,<br>	name: 'marsRoverDate',<br>	type: 'dateTime',<br>	default:'',<br>	displayOptions: {<br>		show: {<br>			resource: [<br>				'marsRoverPhotos',<br>			],<br>		},<br>	},<br>	routing: {<br>		request: {<br>			// You've already set up the URL. qs appends the value of the field as a query string<br>			qs: {<br>				earth_date: '={{ new Date($value).toISOString().substr(0,10) }}',<br>			},<br>		},<br>	},<br>},<br>// Optional/additional fields will go here<br>```

This code creates two operations: one to get today's APOD image, and another to send a get request for photos from one of the Mars Rovers. The object named `roverName` requires the user to choose which Rover they want photos from. The `routing` object in the Mars Rover operation references this to create the URL for the API call.

#### Step 3.6: Optional fields [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#step-36-optional-fields "Permanent link")

Most APIs, including the NASA API that you're using in this example, have optional fields you can use to refine your query.

To avoid overwhelming users, n8n displays these under **Additional Fields** in the UI.

For this tutorial, you'll add one additional field, to allow users to pick a date to use with the APOD endpoint. Add the following to the properties array:

 ```<br>{<br>	displayName: 'Additional Fields',<br>	name: 'additionalFields',<br>	type: 'collection',<br>	default: {},<br>	placeholder: 'Add Field',<br>	displayOptions: {<br>		show: {<br>			resource: [<br>				'astronomyPictureOfTheDay',<br>			],<br>			operation: [<br>				'get',<br>			],<br>		},<br>	},<br>	options: [<br>		{<br>			displayName: 'Date',<br>			name: 'apodDate',<br>			type: 'dateTime',<br>			default: '',<br>			routing: {<br>				request: {<br>					// You've already set up the URL. qs appends the value of the field as a query string<br>					qs: {<br>						date: '={{ new Date($value).toISOString().substr(0,10) }}',<br>					},<br>				},<br>			},<br>		},<br>	],									<br>}<br>```

### Step 4: Set up authentication [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#step-4-set-up-authentication "Permanent link")

The NASA API requires users to authenticate with an API key.

Add the following to `nasaPicsApi.credentials.ts`:

```<br>import {<br>	IAuthenticateGeneric,<br>	ICredentialType,<br>	INodeProperties,<br>} from 'n8n-workflow';<br>export class NasaPicsApi implements ICredentialType {<br>	name = 'NasaPicsApi';<br>	displayName = 'NASA Pics API';<br>	// Uses the link to this tutorial as an example<br>	// Replace with your own docs links when building your own nodes<br>	documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';<br>	properties: INodeProperties[] = [<br>		{<br>			displayName: 'API Key',<br>			name: 'apiKey',<br>			type: 'string',<br>			default: '',<br>		},<br>	];<br>	authenticate = {<br>		type: 'generic',<br>		properties: {<br>			qs: {<br>				'api_key': '={{$credentials.apiKey}}'<br>			}<br>		},<br>	} as IAuthenticateGeneric;<br>}<br>```

For more information about credentials files and options, refer to [Credentials file](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/).

### Step 5: Add node metadata [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#step-5-add-node-metadata "Permanent link")

Metadata about your node goes in the JSON file at the root of your node. n8n refers to this as the codex file. In this example, the file is `NasaPics.node.json`.

Add the following code to the JSON file:

```<br>{<br>	"node": "n8n-nodes-base.NasaPics",<br>	"nodeVersion": "1.0",<br>	"codexVersion": "1.0",<br>	"categories": [<br>		"Miscellaneous"<br>	],<br>	"resources": {<br>		"credentialDocumentation": [<br>			{<br>				"url": ""<br>			}<br>		],<br>		"primaryDocumentation": [<br>			{<br>				"url": ""<br>			}<br>		]<br>	}<br>}<br>```

For more information on these parameters, refer to [Node codex files](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-codex-files/).

### Step 6: Update the npm package details [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#step-6-update-the-npm-package-details "Permanent link")

Your npm package details are in the `package.json` at the root of the project. It's essential to include the `n8n` object with links to the credentials and base node file. Update this file to include the following information:

```<br>{<br>	// All node names must start with "n8n-nodes-"<br>	"name": "n8n-nodes-nasapics",<br>	"version": "0.1.0",<br>	"description": "n8n node to call NASA's APOD and Mars Rover Photo services.",<br>	"keywords": [<br>		// This keyword is required for community nodes<br>		"n8n-community-node-package"<br>	],<br>	"license": "MIT",<br>	"homepage": "https://n8n.io",<br>	"author": {<br>		"name": "Test",<br>		"email": "test@example.com"<br>	},<br>	"repository": {<br>		"type": "git",<br>		// Change the git remote to your own repository<br>		// Add the new URL here<br>		"url": "git+<your-repo-url>"<br>	},<br>	"main": "index.js",<br>	"scripts": {<br>		// don't change<br>	},<br>	"files": [<br>		"dist"<br>	],<br>	// Link the credentials and node<br>	"n8n": {<br>		"n8nNodesApiVersion": 1,<br>		"credentials": [<br>			"dist/credentials/NasaPicsApi.credentials.js"<br>		],<br>		"nodes": [<br>			"dist/nodes/NasaPics/NasaPics.node.js"<br>		]<br>	},<br>	"devDependencies": {<br>		// don't change<br>	},<br>	"peerDependencies": {<br>		// don't change<br>	}<br>}<br>```

You need to update the `package.json` to include your own information, such as your name and repository URL. For more information on npm `package.json` files, refer to [npm's package.json documentation](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).

## Test your node [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#test-your-node "Permanent link")

You can test your node as you build it by running it in a local n8n instance.

1. Install n8n using npm:



```<br>npm install n8n -g<br>```

2. When you are ready to test your node, publish it locally:



```<br># In your node directory<br>npm run build<br>npm link<br>```

3. Install the node into your local n8n instance:




```<br># In the nodes directory within your n8n installation<br># node-package-name is the name from the package.json<br>npm link <node-package-name><br>```







Check your directory



Make sure you run `npm link <node-name>` in the nodes directory within your n8n installation. This can be:



- `~/.n8n/custom/`
- `~/.n8n/<your-custom-name>`: if your n8n installation set a different name using `N8N_CUSTOM_EXTENSIONS`.

4. Start n8n:




```<br>n8n start<br>```

5. Open n8n in your browser. You should see your nodes when you search for them in the nodes panel.



Node names



Make sure you search using the node name, not the package name. For example, if your npm package name is `n8n-nodes-weather-nodes`, and the package contains nodes named `rain`, `sun`, `snow`, you should search for `rain`, not `weather-nodes`.


### Troubleshooting [\#](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/\#troubleshooting "Permanent link")

- There's no `custom` directory in `~/.n8n` local installation.

You have to create `custom` directory manually and run `npm init`

```<br># In ~/.n8n directory run<br>mkdir custom <br>cd custom <br>npm init<br>```
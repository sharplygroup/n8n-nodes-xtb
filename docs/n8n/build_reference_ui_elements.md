# Node user interface elements [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#node-user-interface-elements "Permanent link")

n8n provides a set of predefined UI components (based on a JSON file) that allows users to input all sorts of data types. The following UI elements are available in n8n.

## String [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#string "Permanent link")

Basic configuration:

```<br>{<br>	displayName: Name, // The value the user sees in the UI<br>	name: name, // The name used to reference the element UI within the code<br>	type: string,<br>	required: true, // Whether the field is required or not<br>	default: 'n8n',<br>	description: 'The name of the user',<br>	displayOptions: { // the resources and operations to display this element with<br>		show: {<br>			resource: [<br>				// comma-separated list of resource names<br>			],<br>			operation: [<br>				// comma-separated list of operation names<br>			]<br>		}<br>	},<br>}<br>```

[![String](https://docs.n8n.io/_images/integrations/creating-nodes/string.png)](https://docs.n8n.io/_images/integrations/creating-nodes/string.png)

String field for inputting passwords:

```<br>{<br>	displayName: 'Password',<br>	name: 'password',<br>	type: 'string',<br>	required: true,<br>	typeOptions: {<br>		password: true,<br>	},<br>	default: '',<br>	description: `User's password`,<br>	displayOptions: { // the resources and operations to display this element with<br>		show: {<br>			resource: [<br>				// comma-separated list of resource names<br>			],<br>			operation: [<br>				// comma-separated list of operation names<br>			]<br>		}<br>	},<br>}<br>```

[![Password](https://docs.n8n.io/_images/integrations/creating-nodes/password.png)](https://docs.n8n.io/_images/integrations/creating-nodes/password.png)

String field with more than one row:

```<br>{<br>	displayName: 'Description',<br>	name: 'description',<br>	type: 'string',<br>	required: true,<br>	typeOptions: {<br>		rows: 4,<br>	},<br>	default: '',<br>	description: 'Description',<br>	displayOptions: { // the resources and operations to display this element with<br>		show: {<br>			resource: [<br>				// comma-separated list of resource names<br>			],<br>			operation: [<br>				// comma-separated list of operation names<br>			]<br>		}<br>	},<br>}<br>```

[![Multiple rows](https://docs.n8n.io/_images/integrations/creating-nodes/multiple-rows.png)](https://docs.n8n.io/_images/integrations/creating-nodes/multiple-rows.png)

### Support drag and drop for data keys [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#support-drag-and-drop-for-data-keys "Permanent link")

Users can drag and drop data values to map them to fields. Dragging and dropping creates an [expression](https://docs.n8n.io/glossary/#expression-n8n) to load the data value. n8n supports this automatically.

You need to add an extra configuration option to support dragging and dropping data keys:

- `requiresDataPath: 'single'`: for fields that require a single string.
- `requiresDataPath: 'multiple'`: for fields that can accept a comma-separated list of string.

The [Compare Datasets node code](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/CompareDatasets/CompareDatasets.node.ts) has examples.

## Number [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#number "Permanent link")

Number field with decimal points:

```<br>{<br>	displayName: 'Amount',<br>	name: 'amount',<br>	type: 'number',<br>	required: true,<br>	typeOptions: {<br>		maxValue: 10,<br>		minValue: 0,<br>		numberPrecision: 2,<br>	},<br>	default: 10.00,<br>	description: 'Your current amount',<br>	displayOptions: { // the resources and operations to display this element with<br>		show: {<br>			resource: [<br>				// comma-separated list of resource names<br>			],<br>			operation: [<br>				// comma-separated list of operation names<br>			]<br>		}<br>	},<br>}<br>```

[![Decimal](https://docs.n8n.io/_images/integrations/creating-nodes/decimal.png)](https://docs.n8n.io/_images/integrations/creating-nodes/decimal.png)

## Collection [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#collection "Permanent link")

Use the `collection` type when you need to display optional fields.

```<br>{<br>	displayName: 'Filters',<br>	name: 'filters',<br>	type: 'collection',<br>	placeholder: 'Add Field',<br>	default: {},<br>	options: [<br>		{<br>			displayName: 'Type',<br>			name: 'type',<br>			type: 'options',<br>			options: [<br>				{<br>					name: 'Automated',<br>					value: 'automated',<br>				},<br>				{<br>					name: 'Past',<br>					value: 'past',<br>				},<br>				{<br>					name: 'Upcoming',<br>					value: 'upcoming',<br>				},<br>			],<br>			default: '',<br>		},<br>	],<br>	displayOptions: { // the resources and operations to display this element with<br>		show: {<br>			resource: [<br>				// comma-separated list of resource names<br>			],<br>			operation: [<br>				// comma-separated list of operation names<br>			]<br>		}<br>	},<br>}<br>```

[![Collection](https://docs.n8n.io/_images/integrations/creating-nodes/collection.png)](https://docs.n8n.io/_images/integrations/creating-nodes/collection.png)

## DateTime [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#datetime "Permanent link")

The `dateTime` type provides a date picker.

```<br>{<br>	displayName: 'Modified Since',<br>	name: 'modified_since',<br>	type: 'dateTime',<br>	default: '',<br>	description: 'The date and time when the file was last modified',<br>	displayOptions: { // the resources and operations to display this element with<br>		show: {<br>			resource: [<br>				// comma-separated list of resource names<br>			],<br>			operation: [<br>				// comma-separated list of operation names<br>			]<br>		}<br>	},<br>}<br>```

[![DateTime](https://docs.n8n.io/_images/integrations/creating-nodes/datetime.png)](https://docs.n8n.io/_images/integrations/creating-nodes/datetime.png)

## Boolean [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#boolean "Permanent link")

The `boolean` type adds a toggle for entering true or false.

```<br>{<br>	displayName: 'Wait for Image',<br>	name: 'waitForImage',<br>	type: 'boolean',<br>	default: true, // Initial state of the toggle<br>	description: 'Whether to wait for the image or not',<br>	displayOptions: { // the resources and operations to display this element with<br>		show: {<br>			resource: [<br>				// comma-separated list of resource names<br>			],<br>			operation: [<br>				// comma-separated list of operation names<br>			]<br>		}<br>	},<br>}<br>```

[![Boolean](https://docs.n8n.io/_images/integrations/creating-nodes/boolean.png)](https://docs.n8n.io/_images/integrations/creating-nodes/boolean.png)

## Color [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#color "Permanent link")

The `color` type provides a color selector.

```<br>{<br>	displayName: 'Background Color',<br>	name: 'backgroundColor',<br>	type: 'color',<br>	default: '', // Initially selected color<br>	displayOptions: { // the resources and operations to display this element with<br>		show: {<br>			resource: [<br>				// comma-separated list of resource names<br>			],<br>			operation: [<br>				// comma-separated list of operation names<br>			]<br>		}<br>	},<br>}<br>```

[![Color](https://docs.n8n.io/_images/integrations/creating-nodes/color.png)](https://docs.n8n.io/_images/integrations/creating-nodes/color.png)

## Options [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#options "Permanent link")

The `options` type adds an options list. Users can select a single value.

```<br>{<br>	displayName: 'Resource',<br>	name: 'resource',<br>	type: 'options',<br>	options: [<br>		{<br>			name: 'Image',<br>			value: 'image',<br>		},<br>		{<br>			name: 'Template',<br>			value: 'template',<br>		},<br>	],<br>	default: 'image', // The initially selected option<br>	description: 'Resource to consume',<br>	displayOptions: { // the resources and operations to display this element with<br>		show: {<br>			resource: [<br>				// comma-separated list of resource names<br>			],<br>			operation: [<br>				// comma-separated list of operation names<br>			]<br>		}<br>	},<br>}<br>```

[![Options](https://docs.n8n.io/_images/integrations/creating-nodes/options.png)](https://docs.n8n.io/_images/integrations/creating-nodes/options.png)

## Multi-options [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#multi-options "Permanent link")

The `multiOptions` type adds an options list. Users can select more than one value.

```<br>{<br>	displayName: 'Events',<br>	name: 'events',<br>	type: 'multiOptions',<br>	options: [<br>		{<br>			name: 'Plan Created',<br>			value: 'planCreated',<br>		},<br>		{<br>			name: 'Plan Deleted',<br>			value: 'planDeleted',<br>		},<br>	],<br>	default: [], // Initially selected options<br>	description: 'The events to be monitored',<br>	displayOptions: { // the resources and operations to display this element with<br>		show: {<br>			resource: [<br>				// comma-separated list of resource names<br>			],<br>			operation: [<br>				// comma-separated list of operation names<br>			]<br>		}<br>	},<br>}<br>```

[![Multi-options](https://docs.n8n.io/_images/integrations/creating-nodes/multioptions.png)](https://docs.n8n.io/_images/integrations/creating-nodes/multioptions.png)

## Filter [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#filter "Permanent link")

Use this component to evaluate, match, or filter incoming data.

This is the code from n8n's own If node. It shows a filter component working with a [collection](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/#collection) component where users can configure the filter's behavior.

```<br>{<br>	displayName: 'Conditions',<br>	name: 'conditions',<br>	placeholder: 'Add Condition',<br>	type: 'filter',<br>	default: {},<br>	typeOptions: {<br>		filter: {<br>			// Use the user options (below) to determine filter behavior<br>			caseSensitive: '={{!$parameter.options.ignoreCase}}',<br>			typeValidation: '={{$parameter.options.looseTypeValidation ? "loose" : "strict"}}',<br>		},<br>	},<br>},<br>{<br>displayName: 'Options',<br>name: 'options',<br>type: 'collection',<br>placeholder: 'Add option',<br>default: {},<br>options: [<br>	{<br>		displayName: 'Ignore Case',<br>		description: 'Whether to ignore letter case when evaluating conditions',<br>		name: 'ignoreCase',<br>		type: 'boolean',<br>		default: true,<br>	},<br>	{<br>		displayName: 'Less Strict Type Validation',<br>		description: 'Whether to try casting value types based on the selected operator',<br>		name: 'looseTypeValidation',<br>		type: 'boolean',<br>		default: true,<br>	},<br>],<br>},<br>```

[![Filter](https://docs.n8n.io/_images/integrations/creating-nodes/filter.png)](https://docs.n8n.io/_images/integrations/creating-nodes/filter.png)

## Assignment collection (drag and drop) [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#assignment-collection-drag-and-drop "Permanent link")

Use the drag and drop component when you want users to pre-fill name and value parameters with a single drag interaction.

```<br>{<br>	displayName: 'Fields to Set',<br>	name: 'assignments',<br>	type: 'assignmentCollection',<br>	default: {},<br>},<br>``` |

You can see an example in n8n's [Edit Fields (Set) node](https://github.com/n8n-io/n8n/tree/0faeab1228e26d69a2a93bdb2f89523cca1e4036/packages/nodes-base/nodes/Set/v2):

[![A gif showing the drag and drop action, as well as changing a field to fixed](https://docs.n8n.io/_images/integrations/builtin/core-nodes/set/drag-drop-fixed-toggle.gif)](https://docs.n8n.io/_images/integrations/builtin/core-nodes/set/drag-drop-fixed-toggle.gif)

## Fixed collection [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#fixed-collection "Permanent link")

Use the `fixedCollection` type to group fields that are semantically related.

```<br>{<br>	displayName: 'Metadata',<br>	name: 'metadataUi',<br>	placeholder: 'Add Metadata',<br>	type: 'fixedCollection',<br>	default: '',<br>	typeOptions: {<br>		multipleValues: true,<br>	},<br>	description: '',<br>	options: [<br>		{<br>			name: 'metadataValues',<br>			displayName: 'Metadata',<br>			values: [<br>				{<br>					displayName: 'Name',<br>					name: 'name',<br>					type: 'string',<br>					default: 'Name of the metadata key to add.',<br>				},<br>				{<br>					displayName: 'Value',<br>					name: 'value',<br>					type: 'string',<br>					default: '',<br>					description: 'Value to set for the metadata key.',<br>				},<br>			],<br>		},<br>	],<br>	displayOptions: { // the resources and operations to display this element with<br>		show: {<br>			resource: [<br>				// comma-separated list of resource names<br>			],<br>			operation: [<br>				// comma-separated list of operation names<br>			]<br>		}<br>	},<br>}<br>```

[![Fixed collection](https://docs.n8n.io/_images/integrations/creating-nodes/fixed-collection.png)](https://docs.n8n.io/_images/integrations/creating-nodes/fixed-collection.png)

## Resource locator [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#resource-locator "Permanent link")

[![Resource locator](https://docs.n8n.io/_images/integrations/creating-nodes/resource-locator.png)](https://docs.n8n.io/_images/integrations/creating-nodes/resource-locator.png)

The resource locator element helps users find a specific resource in an external service, such as a card or label in Trello.

The following options are available:

- ID
- URL
- List: allows users to select or search from a prepopulated list. This option requires more coding, as you must populate the list, and handle searching if you choose to support it.

You can choose which types to include.

Example:

```<br>{<br>	displayName: 'Card',<br>	name: 'cardID',<br>	type: 'resourceLocator',<br>	default: '',<br>	description: 'Get a card',<br>	modes: [<br>		{<br>			displayName: 'ID',<br>			name: 'id',<br>			type: 'string',<br>			hint: 'Enter an ID',<br>			validation: [<br>				{<br>					type: 'regex',<br>					properties: {<br>						regex: '^[0-9]',<br>						errorMessage: 'The ID must start with a number',<br>					},<br>				},<br>			],<br>			placeholder: '12example',<br>			// How to use the ID in API call<br>			url: '=http://api-base-url.com/?id={{$value}}',<br>		},<br>		{<br>			displayName: 'URL',<br>			name: 'url',<br>			type: 'string',<br>			hint: 'Enter a URL',<br>			validation: [<br>				{<br>					type: 'regex',<br>					properties: {<br>						regex: '^http',<br>						errorMessage: 'Invalid URL',<br>					},<br>				},<br>			],<br>			placeholder: 'https://example.com/card/12example/',<br>			// How to get the ID from the URL<br>			extractValue: {<br>				type: 'regex',<br>				regex: 'example.com/card/([0-9]*.*)/',<br>			},<br>		},<br>		{<br>			displayName: 'List',<br>			name: 'list',<br>			type: 'list',<br>			typeOptions: {<br>				// You must always provide a search method<br>				// Write this method within the methods object in your base file<br>				// The method must populate the list, and handle searching if searchable: true<br>				searchListMethod: 'searchMethod',<br>				// If you want users to be able to search the list<br>				searchable: true,<br>				// Set to true if you want to force users to search<br>				// When true, users can't browse the list<br>				// Or false if users can browse a list<br>				searchFilterRequired: true,<br>			},<br>		},<br>	],<br>	displayOptions: {<br>		// the resources and operations to display this element with<br>		show: {<br>			resource: [<br>				// comma-separated list of resource names<br>			],<br>			operation: [<br>				// comma-separated list of operation names<br>			],<br>		},<br>	},<br>},<br>```

Refer to the following for live examples:

- Refer to [`CardDescription.ts`](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Trello/CardDescription.ts) and [`Trello.node.ts`](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Trello/Trello.node.ts) in n8n's Trello node for an example of a list with search that includes `searchFilterRequired: true`.
- Refer to [`GoogleDrive.node.ts`](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Google/Drive/GoogleDrive.node.ts) for an example where users can browse the list or search.

## Resource mapper [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#resource-mapper "Permanent link")

If your node performs insert, update, or upsert operations, you need to send data from the node in a format supported by the service you're integrating with. A common pattern is to use a Set node before the node that sends data, to convert the data to match the schema of the service you're connecting to. The resource mapper UI component provides a way to get data into the required format directly within the node, rather than using a Set node. The resource mapper component can also validate input data against the schema provided in the node, and cast input data into the expected type.

Mapping and matching

Mapping is the process of setting the input data to use as values when updating row(s). Matching is the process of using column names to identify the row(s) to update.

```<br>{<br>	displayName: 'Columns',<br>	name: 'columns', // The name used to reference the element UI within the code<br>	type: 'resourceMapper', // The UI element type<br>	default: {<br>		// mappingMode can be defined in the component (mappingMode: 'defineBelow')<br>		// or you can attempt automatic mapping (mappingMode: 'autoMapInputData')<br>		mappingMode: 'defineBelow',<br>		// Important: always set default value to null<br>		value: null,<br>	},<br>	required: true,<br>	// See "Resource mapper type options interface" below for the full typeOptions specification<br>	typeOptions: {<br>		resourceMapper: {<br>			resourceMapperMethod: 'getMappingColumns',<br>			mode: 'update',<br>			fieldWords: {<br>				singular: 'column',<br>				plural: 'columns',<br>			},<br>			addAllFields: true, <br>			multiKeyMatch: true,<br>			supportAutoMap: true,<br>			matchingFieldsLabels: {<br>				title: 'Custom matching columns title',<br>				description: 'Help text for custom matching columns',<br>				hint: 'Below-field hint for custom matching columns',<br>			},<br>		},<br>	},<br>},<br>```

Refer to the [Postgres node (version 2)](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Postgres/v2) for a live example using a database schema.

Refer to the [Google Sheets node (version 2)](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Google/Sheet/v2) for a live example using a schema-less service.

### Resource mapper type options interface [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#resource-mapper-type-options-interface "Permanent link")

The `typeOptions` section must implement the following interface:

```<br>export interface ResourceMapperTypeOptions {<br>	// The name of the method where you fetch the schema<br>	// Refer to the Resource mapper method section for more detail<br>	resourceMapperMethod: string;<br>	// Choose the mode for your operation<br>	// Supported modes: add, update, upsert<br>	mode: 'add' | 'update' | 'upsert';<br>	// Specify labels for fields in the UI<br>	fieldWords?: { singular: string; plural: string };<br>	// Whether n8n should display a UI input for every field when node first added to workflow<br>	// Default is true<br>	addAllFields?: boolean;<br>	// Specify a message to show if no fields are fetched from the service <br>	// (the call is successful but the response is empty)<br>	noFieldsError?: string;<br>	// Whether to support multi-key column matching<br>	// multiKeyMatch is for update and upsert only<br>	// Default is false<br>	// If true, the node displays a multi-select dropdown for the matching column selector<br>	multiKeyMatch?: boolean;<br>	// Whether to support automatic mapping<br>	// If false, n8n hides the mapping mode selector field and sets mappingMode to defineBelow<br>	supportAutoMap?: boolean;<br>	// Custom labels for the matching columns selector<br>	matchingFieldsLabels?: {<br>		title?: string;<br>		description?: string;<br>		hint?: string;<br>	};<br>}<br>```

### Resource mapper method [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#resource-mapper-method "Permanent link")

This method contains your node-specific logic for fetching the data schema. Every node must implement its own logic for fetching the schema, and setting up each UI field according to the schema.

It must return a value that implements the `ResourceMapperFields` interface:

```<br>interface ResourceMapperField {<br>	// Field ID as in the service<br>	id: string;<br>	// Field label<br>	displayName: string;<br>	// Whether n8n should pre-select the field as a matching field<br>	// A matching field is a column used to identify the rows to modify<br>	defaultMatch: boolean;<br>	// Whether the field can be used as a matching field<br>	canBeUsedToMatch?: boolean;<br>	// Whether the field is required by the schema<br>	required: boolean;<br>	// Whether to display the field in the UI<br>	// If false, can't be used for matching or mapping<br>	display: boolean;<br>	// The data type for the field<br>	// These correspond to UI element types<br>	// Supported types: string, number, dateTime, boolean, time, array, object, options<br>	type?: FieldType;<br>	// Added at runtime if the field is removed from mapping by the user<br>	removed?: boolean;<br>	// Specify options for enumerated types<br>	options?: INodePropertyOptions[];<br>}<br>```

Refer to the [Postgres resource mapping method](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Postgres/v2/methods/resourceMapping.ts) and [Google Sheets resource mapping method](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Google/Sheet/v2/methods/resourceMapping.ts) for live examples.

## JSON [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#json "Permanent link")

```<br>{<br>	displayName: 'Content (JSON)',<br>	name: 'content',<br>	type: 'json',<br>	default: '',<br>	description: '',<br>	displayOptions: { // the resources and operations to display this element with<br>		show: {<br>			resource: [<br>				// comma-separated list of resource names<br>			],<br>			operation: [<br>				// comma-separated list of operation names<br>			]<br>		}<br>	},<br>}<br>```

[![JSON](https://docs.n8n.io/_images/integrations/creating-nodes/json.png)](https://docs.n8n.io/_images/integrations/creating-nodes/json.png)

## HTML [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#html "Permanent link")

The HTML editor allows users to create HTML templates in their workflows. The editor supports standard HTML, CSS in `<style>` tags, and expressions wrapped in `{{}}`. Users can add `<script>` tags to pull in additional JavaScript. n8n doesn't run this JavaScript during workflow execution.

```<br>{<br>	displayName: 'HTML Template', // The value the user sees in the UI<br>	name: 'html', // The name used to reference the element UI within the code<br>	type: 'string',<br>	typeOptions: {<br>		editor: 'htmlEditor',<br>	},<br>	default: placeholder, // Loads n8n's placeholder HTML template<br>	noDataExpression: true, // Prevent using an expression for the field<br>	description: 'HTML template to render',<br>},<br>```

Refer to [`Html.node.ts`](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Html/Html.node.ts) for a live example.

## Notice [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#notice "Permanent link")

Display a yellow box with a hint or extra info. Refer to [Node UI design](https://docs.n8n.io/integrations/creating-nodes/plan/node-ui-design/) for guidance on writing good hints and info text.

```<br>{<br>  displayName: 'Your text here',<br>  name: 'notice',<br>  type: 'notice',<br>  default: '',<br>},<br>```

[![Notice](https://docs.n8n.io/_images/integrations/creating-nodes/notice.png)](https://docs.n8n.io/_images/integrations/creating-nodes/notice.png)

## Hints [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#hints "Permanent link")

There are two types of hints: parameter hints and node hints:

- Parameter hints are small lines of text below a user input field.
- Node hints are a more powerful and flexible option than [Notice](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/#notice). Use them to display longer hints, in the input panel, output panel, or node details view.

### Add a parameter hint [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#add-a-parameter-hint "Permanent link")

Add the `hint` parameter to a UI element:

```<br>{<br>	displayName: 'URL',<br>	name: 'url',<br>	type: 'string',<br>	hint: 'Enter a URL',<br>	...<br>}<br>```

### Add a node hint [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#add-a-node-hint "Permanent link")

Define the node's hints in the `hints` property within the node `description`:

```<br>description: INodeTypeDescription = {<br>	...<br>	hints: [<br>		{<br>			// The hint message. You can use HTML.<br>			message: "This node has many input items. Consider enabling <b>Execute Once</b> in the node\'s settings.",<br>			// Choose from: info, warning, danger. The default is 'info'.<br>			// Changes the color. info (grey), warning (yellow), danger (red)<br>			type: 'info',<br>			// Choose from: inputPane, outputPane, ndv. By default n8n displays the hint in both the input and output panels.<br>			location: 'outputPane',<br>			// Choose from: always, beforeExecution, afterExecution. The default is 'always'<br>			whenToDisplay: 'beforeExecution',<br>			// Optional. An expression. If it resolves to true, n8n displays the message. Defaults to true.<br>			displayCondition: '={{ $parameter["operation"] === "select" && $input.all().length > 1 }}'<br>		}<br>	]<br>	...<br>}<br>```

### Add a dynamic hint to a programmatic-style node [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/\#add-a-dynamic-hint-to-a-programmatic-style-node "Permanent link")

In programmatic-style nodes you can create a dynamic message that includes information from the node execution. As it relies on the node output data, you can't display this type of hint until after execution.

```<br>if (operation === 'select' && items.length > 1 && !node.executeOnce) {<br>    // Expects two parameters: NodeExecutionData and an array of hints<br>	return new NodeExecutionOutput(<br>		[returnData],<br>		[<br>			{<br>				message: `This node ran ${items.length} times, once for each input item. To run for the first item only, enable <b>Execute once</b> in the node settings.`,<br>				location: 'outputPane',<br>			},<br>		],<br>	);<br>}<br>return [returnData];<br>```

For a live example of a dynamic hint in a programmatic-style node, view the [Split Out node code](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Transform/SplitOut/SplitOut.node.ts#L266).
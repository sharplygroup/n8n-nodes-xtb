# Structure of the node base file [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/structure/\#structure-of-the-node-base-file "Permanent link")

The node base file follows this basic structure:

1. Add import statements.
2. Create a class for the node.
3. Within the node class, create a `description` object, which defines the node.

A programmatic-style node also has an `execute()` method, which reads incoming data and parameters, then builds a request. The declarative style handles this using the `routing` key in the `properties` object, within `descriptions`.

## Outline structure for a declarative-style node [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/structure/\#outline-structure-for-a-declarative-style-node "Permanent link")

This code snippet gives an outline of the node structure.

```<br>import { INodeType, INodeTypeDescription } from 'n8n-workflow';<br>export class ExampleNode implements INodeType {<br>	description: INodeTypeDescription = {<br>		// Basic node details here<br>		properties: [<br>			// Resources and operations here<br>		]<br>	};<br>}<br>```

Refer to [Standard parameters](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/standard-parameters/) for information on parameters available to all node types. Refer to [Declarative-style parameters](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/declarative-style-parameters/) for the parameters available for declarative-style nodes.

## Outline structure for a programmatic-style node [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/structure/\#outline-structure-for-a-programmatic-style-node "Permanent link")

This code snippet gives an outline of the node structure.

```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>``` | ```<br>import { IExecuteFunctions } from 'n8n-core';<br>import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';<br>export class ExampleNode implements INodeType {<br>	description: INodeTypeDescription = {<br>    // Basic node details here<br>    properties: [<br>      // Resources and operations here<br>    ]<br>  };<br>  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {<br>    // Process data and return<br>  }<br>};<br>```

Refer to [Standard parameters](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/standard-parameters/) for information on parameters available to all node types. Refer to [Programmatic-style parameters](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-parameters/) and [Programmatic-style execute method](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-execute-method/) for more information on working with programmatic-style nodes.
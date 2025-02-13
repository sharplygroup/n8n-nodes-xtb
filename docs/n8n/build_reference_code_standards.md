# Code standards [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/\#code-standards "Permanent link")

Following defined code standards when building your node makes your code more readable and maintainable, and helps avoid errors. This document provides guidance on good code practices for node building. It focuses on code details. For UI standards and UX guidance, refer to [Node UI design](https://docs.n8n.io/integrations/creating-nodes/plan/node-ui-design/).

## Use the linter [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/\#use-the-linter "Permanent link")

The n8n node linter provides automatic checking for many of the node-building standards. You should ensure your node passes the linter's checks before publishing it. Refer to the [n8n node linter](https://docs.n8n.io/integrations/creating-nodes/test/node-linter/) documentation for more information.

## Use the starter [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/\#use-the-starter "Permanent link")

The n8n node starter project includes a recommended setup, dependencies (including the linter), and examples to help you get started. Begin new projects with the [starter](https://github.com/n8n-io/n8n-nodes-starter).

## Write in TypeScript [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/\#write-in-typescript "Permanent link")

All n8n code is TypeScript. Writing your nodes in TypeScript can speed up development and reduce bugs.

## Detailed guidelines for writing a node [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/\#detailed-guidelines-for-writing-a-node "Permanent link")

These guidelines apply to any node you build.

### Resources and operations [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/\#resources-and-operations "Permanent link")

If your node can perform several operations, call the parameter that sets the operation `Operation`. If your node can do these operations on more than one resource, create a `Resource` parameter. The following code sample shows a basic resource and operations setup:

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>32<br>33<br>34<br>35<br>36<br>37<br>38<br>39<br>40<br>41<br>42<br>43<br>44<br>``` | ```<br>export const ExampleNode implements INodeType {<br>    description: {<br>        displayName: 'Example Node',<br>        ...<br>        properties: [<br>            {<br>                displayName: 'Resource',<br>                name: 'resource',<br>                type: 'options',<br>                options: [<br>                    {<br>                        name: 'Resource One',<br>                        value: 'resourceOne'<br>                    },<br>                    {<br>                        name: 'Resource Two',<br>                        value: 'resourceTwo'<br>                    }<br>                ],<br>                default: 'resourceOne'<br>            },<br>            {<br>                displayName: 'Operation',<br>                name: 'operation',<br>                type: 'options',<br>                // Only show these operations for Resource One<br>                displayOptions: {<br>                    show: {<br>                        resource: [<br>                            'resourceOne'<br>                        ]<br>                    }<br>                },<br>                options: [<br>                    {<br>                        name: 'Create',<br>                        value: 'create',<br>                        description: 'Create an instance of Resource One'<br>                    }<br>                ]<br>            }<br>        ]<br>    }<br>}<br>``` |

### Reuse internal parameter names [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/\#reuse-internal-parameter-names "Permanent link")

All resource and operation fields in an n8n node have two settings: a display name, set using the `name` parameter, and an internal name, set using the `value` parameter. Reusing the internal name for fields allows n8n to preserve user-entered data if a user switches operations.

For example: you're building a node with a resource named 'Order'. This resource has several operations, including Get, Edit, and Delete. Each of these operations uses an order ID to perform the operation on the specified order. You need to display an ID field for the user. This field has a display label, and an internal name. By using the same internal name (set in `value`) for the operation ID field on each resource, a user can enter the ID with the Get operation selected, and not lose it if they switch to Edit.

When reusing the internal name, you must ensure that only one field is visible to the user at a time. You can control this using `displayOptions`.

## Detailed guidelines for writing a programmatic-style node [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/\#detailed-guidelines-for-writing-a-programmatic-style-node "Permanent link")

These guidelines apply when building nodes using the programmatic node-building style. They aren't relevant when using the declarative style. For more information on different node-building styles, refer to [Choose your node building approach](https://docs.n8n.io/integrations/creating-nodes/plan/choose-node-method/).

### Don't change incoming data [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/\#dont-change-incoming-data "Permanent link")

Never change the incoming data a node receives (data accessible with `this.getInputData()`) as all nodes share it. If you need to add, change, or delete data, clone the incoming data and return the new data. If you don't do this, sibling nodes that execute after the current one will operate on the altered data and process incorrect data.

It's not necessary to always clone all the data. For example, if a node changes the binary data but not the JSON data, you can create a new item that reuses the reference to the JSON item.

### Use the built in request library [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/\#use-the-built-in-request-library "Permanent link")

Some third-party services have their own libraries on npm, which make it easier to create an integration. The problem with these packages is that you add another dependency (plus all the dependencies of the dependencies). This adds more and more code, which has to be loaded, can introduce security vulnerabilities, bugs, and so on. Instead, use the built-in module:

|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>``` | ```<br>// If no auth needed<br>const response = await this.helpers.httpRequest(options);<br>// If auth needed<br>const response = await this.helpers.httpRequestWithAuthentication.call(<br>	this, <br>	'credentialTypeName', // For example: pipedriveApi<br>	options,<br>);<br>``` |

This uses the npm package [Axios](https://www.npmjs.com/package/axios).

Refer to [HTTP helpers](https://docs.n8n.io/integrations/creating-nodes/build/reference/http-helpers/) for more information, and for migration instructions for the removed `this.helpers.request`.
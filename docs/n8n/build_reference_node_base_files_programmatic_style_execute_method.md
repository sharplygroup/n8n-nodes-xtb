# Programmatic-style execute() method [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-execute-method/\#programmatic-style-execute-method "Permanent link")

The main difference between the declarative and programmatic styles is how they handle incoming data and build API requests. The programmatic style requires an `execute()` method, which reads incoming data and parameters, then builds a request. The declarative style handles requests using the `routing` key in the `operations` object.

The `execute()` method creates and returns an instance of `INodeExecutionData`.

Paired items

You must include input and output item pairing information in the data you return. For more information, refer to [Paired items](https://docs.n8n.io/integrations/creating-nodes/build/reference/paired-items/).
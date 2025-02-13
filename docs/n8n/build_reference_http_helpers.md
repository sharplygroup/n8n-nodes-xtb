# HTTP request helper for node builders [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/http-helpers/\#http-request-helper-for-node-builders "Permanent link")

n8n provides a flexible helper for making HTTP requests, which abstracts away most of the complexity.

Programmatic style only

The information in this document is for node building using the programmatic style. It doesn't apply to declarative style nodes.

## Usage [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/http-helpers/\#usage "Permanent link")

Call the helper inside the `execute` function.

|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>``` | ```<br>// If no auth needed<br>const response = await this.helpers.httpRequest(options);<br>// If auth needed<br>const response = await this.helpers.httpRequestWithAuthentication.call(<br>	this, <br>	'credentialTypeName', // For example: pipedriveApi<br>	options,<br>);<br>``` |

`options` is an object:

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>``` | ```<br>{<br>	url: string;<br>	headers?: object;<br>	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD';<br>	body?: FormData | Array | string | number | object | Buffer | URLSearchParams;<br>	qs?: object;<br>	arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma';<br>	auth?: {<br>		username: string,<br>		password: string,<br>	};<br>	disableFollowRedirect?: boolean;<br>	encoding?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';<br>	skipSslCertificateValidation?: boolean;<br>	returnFullResponse?: boolean;<br>	proxy?: {<br>		host: string;<br>		port: string | number;<br>		auth?: {<br>			username: string;<br>			password: string;<br>		},<br>		protocol?: string;<br>	};<br>	timeout?: number;<br>	json?: boolean;<br>}	<br>``` |

`url` is required. The other fields are optional. The default method is `GET`.

Some notes about the possible fields:

- `body`: you can use a regular JavaScript object for JSON payload, a buffer for file uploads, an instance of FormData for `multipart/form-data`, and `URLSearchParams` for `application/x-www-form-urlencoded`.
- `headers`: a key-value pair.
  - If `body` is an instance of `FormData` then n8n adds `content-type: multipart/form-data` automatically.
  - If `body` is an instance of `URLSearchParams`, then n8n adds `content-type: application/x-www-form-urlencoded`.
  - To override this behavior, set a `content-type` header.
- `arrayFormat`: if your query string contains an array of data, such as `const qs = {IDs: [15,17]}`, the value of `arrayFormat` defines how n8n formats it.
  - `indices` (default): `{ a: ['b', 'c'] }` as `a[0]=b&a[1]=c`
  - `brackets`: `{ a: ['b', 'c'] }` as `a[]=b&a[]=c`
  - `repeat`: `{ a: ['b', 'c'] }` as `a=b&a=c`
  - `comma`: `{ a: ['b', 'c'] }` as `a=b,c`
- `auth`: Used for Basic auth. Provide `username` and `password`. n8n recommends omitting this, and using `helpers.httpRequestWithAuthentication(...)` instead.
- `disableFollowRedirect`: By default, n8n follows redirects. You can set this to true to prevent this from happening.
- `skipSslCertificateValidation`: Used for calling HTTPS services without proper certificate
- `returnFullResponse`: Instead of returning just the body, returns an object with more data in the following format: `{body: body, headers: object, statusCode: 200, statusMessage: 'OK'}`
- `encoding`: n8n can detect the content type, but you can specify `arrayBuffer` to receive a Buffer you can read from and interact with.

## Example [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/http-helpers/\#example "Permanent link")

For an example, refer to the [Mattermost node](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Mattermost/v1/MattermostV1.node.ts).

## Deprecation of the previous helper [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/http-helpers/\#deprecation-of-the-previous-helper "Permanent link")

The previous helper implementation using `this.helpers.request(options)` used and exposed the `request-promise` library. This was removed in version 1.

To minimize incompatibility, n8n made a transparent conversion to another library called `Axios`.

If you are having issues, please report them in the [Community Forums](https://community.n8n.io/) or on [GitHub](https://github.com/n8n-io/n8n/issues).

## Migration guide to the new helper [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/http-helpers/\#migration-guide-to-the-new-helper "Permanent link")

The new helper is much more robust, library agnostic, and easier to use.

New nodes should all use the new helper. You should strongly consider migrating existing custom nodes to the new helper. These are the main considerations when migrating:

- Accepts `url`. Doesn't accept `uri`.
- `encoding: null` now must be `encoding: arrayBuffer`.
- `rejectUnauthorized: false` is now `skipSslCertificateValidation: true`
- Use `body` according to `content-type` headers to clarify the payload.
- `resolveWithFullResponse` is now `returnFullResponse` and has similar behavior
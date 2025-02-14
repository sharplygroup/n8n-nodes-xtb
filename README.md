# n8n-nodes-xtb

This is an n8n community node for interacting with the XTB Trading API. It provides functionality to perform trading operations through XTB's WebSocket API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-xtb` in **Enter npm package name**
4. Agree to the risks of using community nodes: select **I understand the risks of installing unverified code from a public source**
5. Select **Install**

## Operations

### Trading Operations

- **Open Trade**: Open a new trading position
  - Required Parameters:
    - Symbol (e.g., EURUSD)
    - Trade Type (Buy, Sell, Buy Limit, Sell Limit, Buy Stop, Sell Stop)
    - Volume (in lots)
    - Price (required for limit and stop orders)
  - Optional Parameters:
    - Stop Loss
    - Take Profit
    - Comment
    - Expiration (for pending orders)

- **Close Trade**: Close an existing trading position
  - Required Parameters:
    - Order Number

- **Get Trades**: Retrieve list of open trades
  - No additional parameters required

### Market Data Operations (Coming Soon)

- Real-time price data
- Historical data
- Symbol information

### Account Operations (Coming Soon)

- Account balance and equity
- Trading history
- Margin calculations

## Credentials

To use this node, you need to have an XTB trading account. You can create a demo account at [XTB's website](https://www.xtb.com/).

The following credentials are required:
- **User ID**: Your XTB account user ID
- **Password**: Your XTB account password
- **Demo Account**: Whether to use demo or real trading account (boolean)

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [XTB API documentation](https://developers.xstore.pro/documentation/)

## Version history

### 0.1.0

- Initial release
- Basic trading operations (open trade, close trade, get trades)
- WebSocket connection management
- Support for both demo and real accounts
# n8n-nodes-xtb

This is an n8n community node. It lets you use XTB in your n8n workflows.

XTB is a global online trading platform that offers access to a wide range of financial markets, including forex, indices, commodities, stocks, and ETFs.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)
[Compatibility](#compatibility)  
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

The following operations are supported by this node:

*   **Account:** `getCurrentUserData`, `getMarginLevel`
*   **Calculation:** `getCommissionDef`, `getMarginTrade`, `getProfitCalculation`
*   **Dma:** `getStepRules`
*   **MarketData:** `getCalendar`, `getChartLastRequest`, `getChartRangeRequest`, `getTickPrices`, `getTradingHours`
*   **News:** `getNews`
*   **Server:** `getServerTime`, `getVersion`, `ping`
*   **Symbol:** `getAllSymbols`, `getSymbol`
*   **Trade:** `getTrades`, `getTradeRecords`, `getTradesHistory`, `getTradeStatus`
*   **Trading:** `tradeTransaction`, `tradeTransactionStatus`

## Credentials

To authenticate with the XTB API, you need to provide the following credentials:

*   **User ID:** Your XTB user ID.
*   **Password:** Your XTB password.
*   **Environment:** Whether to use the demo or real trading environment. You can select the environment in the credentials settings.

Before using the XTB node, you need to have an XTB account. You can sign up for a demo account on the [XTB website](https://www.xtb.com/).

## Compatibility

This node is compatible with the latest version of n8n. There are no known incompatibility issues.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [XTB API Documentation](https://developers.xstore.pro/documentation/)

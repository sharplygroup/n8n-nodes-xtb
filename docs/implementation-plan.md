# XTB API Implementation Plan

## Current State
The implementation currently uses:
- WebSocket base URL: `wss://ws.xtb.com`
- Endpoints: `/demo`, `/demoStream`, `/real`, `/realStream`

## Required Changes

### 1. WebSocket Updates
Update WebSocket endpoints in `WebSocketManager.ts`:
- Change base URL from `wss://ws.xtb.com` to `wss://ws.xapi.pro`
- Keep existing endpoints:
  - `/demo`
  - `/demoStream`
  - `/real`
  - `/realStream`

### 2. Credentials Updates
Update `XtbApi.credentials.ts`:
- Change test request baseURL from `https://ws.xtb.com` to `https://ws.xapi.pro`

### 3. Documentation Updates
Add comprehensive documentation about all available endpoints:

#### WebSocket Endpoints
```
wss://ws.xapi.pro/demo
wss://ws.xapi.pro/demoStream
wss://ws.xapi.pro/real
wss://ws.xapi.pro/realStream
```

#### REST API Hosts
Two interchangeable addresses:
- `xapia.x-station.eu`
- `xapib.x-station.eu`

Port configurations:
- DEMO:
  - Main port: 5124
  - Streaming port: 5125
- REAL:
  - Main port: 5112
  - Streaming port: 5113

## Implementation Steps

1. Update WebSocketManager.ts:
   - Modify getMainSocketUrl() method
   - Modify getStreamSocketUrl() method

2. Update XtbApi.credentials.ts:
   - Update test request baseURL
   - Add comprehensive documentation in comments

3. Test Changes:
   - Test WebSocket connections for both demo and real accounts
   - Verify all endpoints are accessible
   - Ensure backward compatibility

## Notes
- All servers use SSL connection
- Communication is established as long as both server and client have opened and connected sockets
- Server guarantees that every separate reply to client command will be separated by two new line characters ("\n")
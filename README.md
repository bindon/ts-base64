# @bindon/base64
A fast and simple base64 library for typescript

## Install
```shell
npm install @bindon/base64
```

## Usage
```typescript
import Base64 from '@bindon/base64';
const plaintext = '🙌😂👍🎉😍🔥✨💯😏✌️';

// Base64.encode(string | ArrayBuffer | Uint8Array, Base64Options): string
Base64.encode(plaintext);                                     // 8J-ZjPCfmILwn5GN8J-OifCfmI3wn5Sl4pyo8J-Sr_CfmI_inIzvuI8
Base64.encode(plaintext, { padding: true, urlSafe: false });  // 8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8=
Base64.encode(plaintext, { padding: false, urlSafe: false }); // 8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8

// Base64.decode(string): Uint8Array
Base64.decode('8J-ZjPCfmILwn5GN8J-OifCfmI3wn5Sl4pyo8J-Sr_CfmI_inIzvuI8');  // Uint8Array(plaintext)
Base64.decode('8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8='); // Uint8Array(plaintext)
Base64.decode('8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8');  // Uint8Array(plaintext)

// Base64.decodeToString(string): string
Base64.decodeToString('8J-ZjPCfmILwn5GN8J-OifCfmI3wn5Sl4pyo8J-Sr_CfmI_inIzvuI8');  // plaintext
Base64.decodeToString('8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8='); // plaintext
Base64.decodeToString('8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8');  // plaintext
```

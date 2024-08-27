/**
 * RFC 4648
 *
 * @author bindon
 */
export interface Base64Options {
    urlSafe: boolean;
    padding: boolean;
}
declare const Base64: {
    decode: (data: string) => Uint8Array;
    decodeToString: (data: string) => string;
    encode: (data: string | ArrayBuffer | Uint8Array, options?: Base64Options) => string;
};
export default Base64;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importDefault(require("../src"));
const plaintext = {
    emoji: '🙌😂👍🎉😍🔥✨💯😏✌️',
};
const plainTextUint8Array = {
    emoji: new Uint8Array([
        240, 159, 153, 140, 240, 159, 152, 130, 240, 159, 145, 141, 240, 159, 142, 137, 240, 159, 152, 141, 240, 159, 148,
        165, 226, 156, 168, 240, 159, 146, 175, 240, 159, 152, 143, 226, 156, 140, 239, 184, 143,
    ]),
};
describe('encode', () => {
    test('empty string', () => {
        expect(src_1.default.encode('')).toBe('');
    });
    test(`${plaintext.emoji} - normal(padding)`, () => {
        expect(src_1.default.encode(plaintext.emoji, { padding: true, urlSafe: false })).toBe('8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8=');
    });
    test(`${plaintext.emoji} - normal(no-padding)`, () => {
        expect(src_1.default.encode(plaintext.emoji, { padding: false, urlSafe: false })).toBe('8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8');
    });
    test(`${plaintext.emoji} - url safe`, () => {
        expect(src_1.default.encode(plaintext.emoji)).toBe('8J-ZjPCfmILwn5GN8J-OifCfmI3wn5Sl4pyo8J-Sr_CfmI_inIzvuI8');
    });
});
describe('decode', () => {
    test('empty string', () => {
        expect(src_1.default.decode('')).toStrictEqual(new Uint8Array());
    });
    test(`${plaintext.emoji} - normal(padding)`, () => {
        expect(src_1.default.decode('8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8=')).toStrictEqual(plainTextUint8Array.emoji);
    });
    test(`${plaintext.emoji} - normal(no-padding)`, () => {
        expect(src_1.default.decode('8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8')).toStrictEqual(plainTextUint8Array.emoji);
    });
    test(`${plaintext.emoji} - url safe`, () => {
        expect(src_1.default.decode('8J-ZjPCfmILwn5GN8J-OifCfmI3wn5Sl4pyo8J-Sr_CfmI_inIzvuI8')).toStrictEqual(plainTextUint8Array.emoji);
    });
});
describe('decodeToString', () => {
    test('empty string', () => {
        expect(src_1.default.decodeToString('')).toBe('');
    });
    test(`${plaintext.emoji} - normal(padding)`, () => {
        expect(src_1.default.decodeToString('8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8=')).toBe(plaintext.emoji);
    });
    test(`${plaintext.emoji} - normal(no-padding)`, () => {
        expect(src_1.default.decodeToString('8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8')).toBe(plaintext.emoji);
    });
    test(`${plaintext.emoji} - url safe`, () => {
        expect(src_1.default.decodeToString('8J-ZjPCfmILwn5GN8J-OifCfmI3wn5Sl4pyo8J-Sr_CfmI_inIzvuI8')).toBe(plaintext.emoji);
    });
});

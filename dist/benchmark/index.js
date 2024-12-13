"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const benchmark_1 = __importDefault(require("benchmark"));
const plaintext = '🙌😂👍🎉😍🔥✨💯😏✌️';
const suite = new benchmark_1.default.Suite();
suite
    .add('Buffer', () => {
    Buffer.from(plaintext);
})
    .add('TextEncoder', () => {
    new TextEncoder().encode(plaintext);
})
    .on('cycle', (event) => {
    console.log(String(event.target));
})
    .on('complete', () => {
    console.log(suite.filter('fastest').map('name'));
})
    .run();

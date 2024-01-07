/* eslint-disable no-console */
import Benchmark from 'benchmark';
import { stringToUint8Array } from '../src/util';

const plaintext = '🙌😂👍🎉😍🔥✨💯😏✌️';
const suite = new Benchmark.Suite();

suite
  .add('Buffer', () => {
    Buffer.from(plaintext);
  })
  .add('TextEncoder', () => {
    new TextEncoder().encode(plaintext);
  })
  .add('Pure', () => {
    stringToUint8Array(plaintext);
  })
  .on('cycle', (event: Event) => {
    console.log(String(event.target));
  })
  .on('complete', () => {
    console.log(suite.filter('fastest').map('name'));
  })
  .run();

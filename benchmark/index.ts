/* eslint-disable no-console */
import Benchmark from 'benchmark';

const plaintext = '🙌😂👍🎉😍🔥✨💯😏✌️';
const suite = new Benchmark.Suite();

suite
  .add('Buffer', () => {
    Buffer.from(plaintext);
  })
  .add('TextEncoder', () => {
    new TextEncoder().encode(plaintext);
  })
  .on('cycle', (event: Event) => {
    console.log(String(event.target));
  })
  .on('complete', () => {
    console.log(suite.filter('fastest').map('name'));
  })
  .run();

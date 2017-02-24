
# nsq-stream

  Streaming interface for [nsq.js](https://github.com/segmentio/nsq.js).

## Example

```js
var nsqStream = require('nsq-stream');
var nsq = require('nsq.js');

var reader = nsq.reader(/* ... */);
var writer = nsq.writer(/* ... */);

var subscriber = nsqStream.createReadStream(reader);
subscriber.on('data', function(json){
  console.log(json);
});

var publisher = nsqStream.createWriteStream(writer, 'topic');
publisher.write({ foo: 'bar' });
```

## API

### createReadStream(reader[, type, opts])

  Create a readable stream from `reader`.

  Type can be:

  - `json`: `msg.json()` (default)
  - `buffer`: `msg.body`
  - `message`: `msg`

  `opts` supports:

  - `highWaterMark`: Selecting a `highWaterMark` of `0` will ensure no jobs
  get buffered and marked as finished before the writeStream consuming the
  messages accepts them. This keeps backpressure on nsqd side but will
  negatively impact performance in high throughput cases.

### createWriteStream(writer, topic)

  Create a writable stream from `writer` to `topic`.

  Write any `JSON.stringify()`-able JavaScript object to it.

## Backpressure

  Backpressure is created by not `.finish()`ing messages until they have
  been consumed. *NOTE* Some messages will be buffered in memory and marked as
  finished if `highWaterMark` is not set to 0.

## License

  MIT


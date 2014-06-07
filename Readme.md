
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

### createReadStream(reader[, type])

  Create a readable stream from `reader`.

  Type can be:

  - `json`: `msg.json()` (default)
  - `buffer`: `msg.body`
  - `message`: `msg`

### createWriteStream(writer, topic)

  Create a writable stream from `writer` to `topic`.

## Backpressure

  Backpressure is created by not `.finish()`ing messages until they have
  been consumed.

## License

  MIT


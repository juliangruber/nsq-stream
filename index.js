var Stream = require('readable-stream');
var inherits = require('util').inherits;
var assert = require('assert');

exports.createReadStream = function(reader, type){
  assert(reader, 'reader required');

  var json = !type || 'json' == type;
  var buffer = 'buffer' == type;
  var message = 'message' == type;

  var buf = [];
  reader.on('message', function(msg){
    buf.push(msg);
  });

  function next(fn){
    if (buf.length) return fn(buf.shift());
    reader.once('message', function(){
      next(fn);
    });
  }

  var objectMode = json || message;
  var stream = Stream.Readable({ objectMode: objectMode, highWaterMark: 0 });

  stream._read = function(){
    next(function(msg){
      msg.finish();
      var out = json ? msg.json()
        : buffer ? msg.body
        : msg;
      stream.push(out);
    });
  };

  stream.on('end', function(){
    buf.forEach(function(msg){
      msg.finish();
    });
    buf = [];
  });

  return stream;
};

exports.createWriteStream = function(writer, topic){
  assert(writer, 'writer required');
  assert(topic, 'topic required');

  var stream = Stream.Writable({ objectMode: true });

  stream._write = function(obj, enc, done){
    writer.publish(topic, obj, done);
  };

  return stream;
};


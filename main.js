/**
 * Created by Daniele Brugnara on 4/21/14.
 */

var he = require('he');

var HeRec = {
  //
}

HeRec.slave = function(obj, recWorker, worker, opts) {
  var keys
    , self = this
  ;
  try {
    keys = Object.keys(obj);
  } catch(e) {
    return worker(obj, opts);
  }
  //
  keys.forEach(function(key) {
    var o = obj[key];
    //
    if (o) {
      if (typeof o === 'object' || Array.isArray(o)) {
        obj[key] = recWorker(o, recWorker, worker, opts);
      }
      if (typeof o === 'string') {
        obj[key] = worker(o, opts)
      }
    }
  })
  return obj;
}

HeRec.decode = function(obj, opts) {
  return HeRec.slave(obj, HeRec.decode, he.decode, opts);
}

HeRec.encode = function(obj, opts) {
  return HeRec.slave(obj, HeRec.encode, he.encode, opts);
}

module.exports = HeRec;
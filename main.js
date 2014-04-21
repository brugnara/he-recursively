/**
 * Created by Daniele Brugnara on 4/21/14.
 */

var ent = require('ent')
;

var EntRec = {
  //
}

EntRec.slave = function(obj, recWorker, worker, opts) {
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

EntRec.decode = function(obj) {
  return EntRec.slave(obj, EntRec.decode, ent.decode);
}

EntRec.encode = function(obj, opts) {
  return EntRec.slave(obj, EntRec.encode, ent.encode);
}

module.exports = EntRec;
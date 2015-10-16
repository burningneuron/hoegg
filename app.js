var _ = require('lodash');

var doUnknown = function(keys, unknown) {
  if (_.isArray(unknown)) {
    for (var index = 0; index < unknown.length; index++) {
      doUnknown(keys, unknown[index]);
    }
  } else if (_.isString(unknown)) {
    // do nothing
  } else if (_.isObject(unknown)) {
    doObject(keys, unknown);
  }
};

var doObject = function(keys, object) {
  var myKeys = Object.keys(object);
  var intersection = _.intersection(keys, myKeys);

  if (intersection.length > 0) {
    for (var index = 0; index < intersection.length; index++) {
      delete object[intersection[index]];
    }
  }

  myKeys = Object.keys(object);
  keys = _.union(keys, myKeys);
  for (var i = 0; i < myKeys.length; i++) {
    doUnknown(keys, object[myKeys[i]]);
  }
};

var json =
  '{"wholesaler": "US Foods","delivered": "2015-06-19T05:15:00-0500","contacts": [{"wholesaler": "US Foods","name": "John Lederer"}, {"wholesaler": "Sysco","name": "Bill Delaney"}]}';
var parsed = JSON.parse(json);

doUnknown([], parsed);
console.log(JSON.stringify(parsed));

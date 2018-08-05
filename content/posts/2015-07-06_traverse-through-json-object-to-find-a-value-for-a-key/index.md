---
title: Traverse Through JSON object to find a value for a key
created: 2015-07-06 23:42
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_24
---

# Traverse Through JSON object to find a value for a key

Finding value assigned to a JSON key is often used in lot of applications. This ready to use code snippet will help you to traverse through JSON object and find value for a key. In case there is no key found it will return null.

```javascript
function lookupJson(obj, key) {
  var type = typeof key;
  if (type === 'string' || type === 'number') {
    key = ('' + key).replace(/\\[(.*?)\\]/, function(m, key) {
      return '.' + key;
    }).split('.');
  } //split the key using "." 
  for (var i = 0, l = key.length; i & lt; l; i++) {
    // If object found the key trim the object to the level and move on until the value is found 
    if (obj.hasOwnProperty(key[i])) {
      obj = obj[key[i]];
    } else {
      return null;
    }
  }
  return obj;
}
```

Hope this code snippet helps you.

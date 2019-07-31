# js-defer

`js-defer` is a simple library that internally uses the `postMessage` API to run functions as a separate JavaScript event. This is based on David Baron's [setTimeout with a shorter delay](https://dbaron.org/log/20100309-faster-timeouts).

### Usage:

```javascript
const jsDefer = require('js-defer');
const {init, defer} = jsDefer;

init(window);

const button = document.getElementById('test');
button.addEventListener('click', () => {
  defer(() => {
    button.innerHTML = 'Deferred clicked';
  })
});

```

### Running the test

```
cd test
parcel test.html
```

Then visit http://localhost:1234 
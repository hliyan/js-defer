const jsDefer = require('../index');
const {init, defer} = jsDefer;

init(window);
defer(() => {
  console.log('Deferred at load');
});

const button = document.getElementById('test');
button.addEventListener('click', () => {
  defer(() => {
    button.innerHTML = 'Deferred clicked';
  })
});
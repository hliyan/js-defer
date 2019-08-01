// credit: https://dbaron.org/log/20100309-faster-timeouts
const eventQueue = [];
const JS_DEFER_EVENT = 'js-defer-event';

/**
 * Initializes the current context to work with defer(). Call once at context load
 */
const init = () => {
  if (window) {
    window.removeEventListener("message", _onNotifyEvent, true); // if any duplicates
    window.addEventListener("message", _onNotifyEvent, true);
  } // else: fallback to setTimeout
};

/**
 * USAGE:
 * import {init, defer} from 'js-defer';
 * init();
 * defer(() => {
 *   console.log('Hello new event');
 * });
 */
const defer = window.postMessage ? (fn) => {
    if (typeof fn != "function") {
        throw Error("js-defer: not a function");
    }
    eventQueue.push(fn);
    window.postMessage(JS_DEFER_EVENT, "*");
} : (fn) => {
  setTimeout(fn);
};

const _onNotifyEvent = (event) => {
  // TODO: more security for origin
  if (event.source != window || event.data != JS_DEFER_EVENT)
      return;
  event.stopPropagation();
  if (eventQueue.length == 0)
      return;
  const fn = eventQueue.shift();
  fn();
};

module.exports = {defer, init};
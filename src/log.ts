// Handle browsers without a console
const nativeConsole = typeof window === 'undefined' ? console : window.console ||
  {
    log: function() {},
    info: function() {},
    warn: function() {},
    error: function() {},
    trace: function() {}
  };

// Save native console logging functions
const originalConsole = {
  log: nativeConsole.log,
  info: nativeConsole.info,
  warn: nativeConsole.warn,
  error: nativeConsole.error,
  trace: nativeConsole.trace
}

// extend the console with the enable and disable functions
constructLogger();

function constructLogger(){
  const log = function() {
    return originalConsole.log;
  }();

  const trace = function() {
    return Function.prototype.bind.call(originalConsole.info, nativeConsole, "[trace]");
  }();

  const debug = function() {
    return Function.prototype.bind.call(originalConsole.info, nativeConsole, "[debug]");
  }();

  const info = function() {
    // Crude fix to filter secp error caused by eccrypto dependency
    const filterSecpError = (...params: any[]) => { if (!(params && params[0] === "secp256k1 unavailable, reverting to browser version")) originalConsole.info(...params) };
    return filterSecpError;
  }();

  const warn = function() {
    return originalConsole.warn;
  }();

  const error = function() {
    return originalConsole.error;
  }();

  nativeConsole.log = log;
  nativeConsole.info = info;
  nativeConsole.trace = trace;
  nativeConsole.debug = debug;
  nativeConsole.warn = warn;
  nativeConsole.error = error;
}
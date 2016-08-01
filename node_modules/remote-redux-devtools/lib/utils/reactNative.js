'use strict';

exports.__esModule = true;
exports.getHostForRN = getHostForRN;
/*
 * Get React Native server IP if hostname is `localhost`
 * On Android emulator, the IP of host is `10.0.2.2` (Genymotion: 10.0.3.2)
 */
function getHostForRN(hostname) {
  if ((hostname === 'localhost' || hostname === '127.0.0.1') && typeof window !== 'undefined' && window.__fbBatchedBridge && window.__fbBatchedBridge.RemoteModules && window.__fbBatchedBridge.RemoteModules.AndroidConstants) {
    var _window$__fbBatchedBr = window.__fbBatchedBridge.RemoteModules.AndroidConstants.ServerHost;
    var ServerHost = _window$__fbBatchedBr === undefined ? hostname : _window$__fbBatchedBr;

    return ServerHost.split(':')[0];
  }

  return hostname;
}
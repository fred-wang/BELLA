/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* Fake receipt verifier for testing purpose. */

(function (exports) {

if (!exports.receipts) {
  exports.receipts = {};
}

var Verifier = function () {};

Verifier.State = function (name) {
  if (name === undefined) {
    return this;
  }
  var NewState = function () {};
  NewState.prototype = new Verifier.State();
  NewState.className = name;
  NewState.prototype.name = name;
  return NewState;
};

Verifier.states = {};
Verifier.states.NetworkError = Verifier.State("NetworkError");
Verifier.states.OK = Verifier.State("OK");

Verifier.prototype = {};
Verifier.prototype.states = Verifier.states;
exports.receipts.Verifier = Verifier;

exports.receipts.verify = function verify(callback, options) {
  var verifier = new exports.receipts.Verifier(options);
  verifier.state = new verifier.states.OK(); // always returns OK
  callback(verifier);
};

})(typeof exports == "undefined" ? (this.mozmarket ? this.mozmarket : this.mozmarket = {}) : exports);

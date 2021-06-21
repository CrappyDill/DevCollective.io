"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUuidTokenFromEmail = exports.getDefaultUser = exports.getSentEmail = void 0;
function getSentEmail(mailer) {
    var _a, _b;
    // @ts-expect-error mock is not officially on the types here.
    return (_b = (_a = mailer.send.mock.calls[0]) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.html;
}
exports.getSentEmail = getSentEmail;
var getDefaultUser = function (dataset) {
    return dataset.users[0];
};
exports.getDefaultUser = getDefaultUser;
var extractUuidTokenFromEmail = function (email) {
    var uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/i;
    var uuid = email && email.match(uuidRegex);
    return uuid ? uuid[0] : null;
};
exports.extractUuidTokenFromEmail = extractUuidTokenFromEmail;

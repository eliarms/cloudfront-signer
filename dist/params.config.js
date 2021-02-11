"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    cfUrl: process.env.CF_URL || '',
    expiry: Number(String(process.env.EXPIRY)) || 3600,
    pattern: process.env.PATTERN || '',
    keyPairId: process.env.KEYPAIRID || '',
    privateKeyFile: process.env.PRIVATEKEYFILE || '',
};
//# sourceMappingURL=params.config.js.map
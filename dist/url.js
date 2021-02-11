"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudFrontSigner = void 0;
const cloudfront_1 = __importDefault(require("aws-sdk/clients/cloudfront"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CloudFrontSigner {
    constructor(cfUrl, expiry, pattern, keyPairId, privateKeyFile) {
        this.policy = {};
        this.cfUrl = cfUrl;
        this.expiry = expiry;
        this.pattern = pattern;
        this.keyPairId = keyPairId;
        this.privateKeyFile = privateKeyFile;
    }
    get Custompolicy() {
        this.policy = {
            'Statement': [{
                    'Resource': 'http*://' + this.cfUrl + this.pattern,
                    'Condition': {
                        'DateLessThan': { 'AWS:EpochTime': this.expiry }
                    }
                }]
        };
        return JSON.stringify(this.policy);
    }
    get SignedUrl() {
        let privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, this.privateKeyFile), 'utf8');
        const signer = new cloudfront_1.default.Signer(this.keyPairId, privateKey);
        let response = '';
        signer.getSignedUrl({ url: "http://" + this.cfUrl, policy: this.Custompolicy }, function (err, url) {
            if (err) {
                response = JSON.stringify(err);
            }
            else {
                response = url;
            }
        });
        return response;
    }
}
exports.CloudFrontSigner = CloudFrontSigner;
//# sourceMappingURL=url.js.map
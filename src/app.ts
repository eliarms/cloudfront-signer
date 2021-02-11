import * as dotenv from 'dotenv';
dotenv.config();
import params from './params.config';
import {CloudFrontSigner} from './url';

const cfsigner = new CloudFrontSigner(
    params.cfUrl,
    params.expiry,
    params.pattern,
    params.keyPairId,
    params.privateKeyFile
);

console.log(cfsigner.SignedUrl);

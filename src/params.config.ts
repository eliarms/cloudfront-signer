export default {
    cfUrl: process.env.CF_URL ||  '',
    expiry: Number(String(process.env.EXPIRY)) || 3600,
    pattern: process.env.PATTERN || '',
    keyPairId: process.env.KEYPAIRID || '',
    privateKeyFile: process.env.PRIVATEKEYFILE || '',

   }

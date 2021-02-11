import CloudFront from 'aws-sdk/clients/cloudfront';
import fs from 'fs';
import path from 'path';



export class CloudFrontSigner{

    
    cfUrl:string;
    expiry:number;
    pattern:string;
    keyPairId:string;
    privateKeyFile:string;
    policy:{} = {};
    
    


    constructor(cfUrl:string, expiry:number,pattern:string,keyPairId:string,privateKeyFile:string){
        this.cfUrl = cfUrl;
        this.expiry = expiry;
        this.pattern = pattern;
        this.keyPairId = keyPairId;
        this.privateKeyFile = privateKeyFile;
        

    }
    get Custompolicy():string
    {
        this.policy  = {
            'Statement': [{
              'Resource': 'http*://' + this.cfUrl + this.pattern,
              'Condition': {
                'DateLessThan': {'AWS:EpochTime': this.expiry}
              }
            }]
          };
                    
        return JSON.stringify(this.policy);
    }

    get SignedUrl(): string {
        
    let privateKey = fs.readFileSync(path.join(__dirname, this.privateKeyFile), 'utf8');

    const signer = new CloudFront.Signer(this.keyPairId, privateKey);
    let response ='';
        
       signer.getSignedUrl({url: "http://"+this.cfUrl, policy:this.Custompolicy }, function(err, url) {
            if (err) {
                response = JSON.stringify(err);
            } else {
      
                response = url;    
            }
        });
        return response;
    }
}








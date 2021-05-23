# Signed URL Function
A Typescrtipt utility to create an AWS CloudFront Signed Url

This project creates a `CloudFront` Signed Url based on a custom policy which allows access to specific files on the CloudFront distribution.

The Policy is generated using a combination of will expire after a set amount of time and grant access to all files matching a predifined  `PATTERN`

The lifetime of the policy depends on the `EXPIRY` Timestamp defined in an environment variable:

## Usage
Create a `.env` file and the below paramters
 - `CF_URL`  :  The Endpoint
 - `EXPIRY`  :  The date and time that users can no longer access your content
 - `PATTERN` :  Define a custom patterns 
 - `KEYPAIRID` : Your CloudFront Certificate identifier
 - `PRIVATEKEYFILE` : The path to your private key file location

## Development 

Requirements
- node ~12.21.0
- npm ^6.14.11

### Build and test locally

Install required dependencies
```bash
npm ci
```

# Generating the signed Url

```
node dist/app.js
```




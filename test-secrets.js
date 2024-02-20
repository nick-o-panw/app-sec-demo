const {

    randomBytes

} = require("node:crypto");



const hashKey = {

    default: "deea456cb8054ad677892bcfe59e034719383aa6ef35a0105f99d1816f86eead",

};



const serviceKey = {

    "identity-service": "deea45634719383aa6ef35a0105f99d1816f86eeadabdc",

    "shopping-carts": "da692f2a0435f285e2488532d57a095b3fed1c09c2e745",

    "pricing-engine": "407288d23c5aca01feee4b50df770f1639ebbc742850e5",

    "referral-service": "fa83f2dd069bb6fce1d0ba007b3e05e8",

    "rewards-service": "dcf5b0e5fa7f15c60ab75cb53f28192bafa0d4f783fabc",

    "sso-service": "3ec0a573cdc6e524605df95c8767e7e79a8",

};



class CyKeyManager {

    constructor() {

        this.salt = new Buffer.from("73637363736373637363736373637363", "hex");

    }



    getHashKey(serviceName) {

        let secret;

        if (serviceName === undefined || hashKey[serviceName] === undefined) {

            // hash key is global

            secret = new Buffer.from(hashKey["default"], "hex");

        } else {

            secret = new Buffer.from(hashKey[serviceName], "hex");

        }

        return secret;

    }



    getSymmetricKey(serviceName) {

        if (serviceName === undefined || serviceKey[serviceName] === undefined) {

            throw new Error("Invalid input: serviceName");

            //return this.encKey; // temp

        }



        return new Buffer.from(serviceKey[serviceName], "hex");

    }



    getSalt() {

        return this.salt;

    }



    generateIv() {

        return randomBytes(16);

    }

}



module.exports = CyKeyManager;


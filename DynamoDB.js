require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const AWS = require("aws-sdk");

const DYNAMODB_AWS = "https://dynamodb.eu-west-3.amazonaws.com";
const REGION = "eu-west-3";

const HASH_KEY = "slug";

class DynamoDB {
  constructor() {
    AWS.config.update({
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
      region: process.env.REGION,
      endpoint: `https://dynamodb.${process.env.REGION}.amazonaws.com`
    });
    this.dbDocClient = new AWS.DynamoDB.DocumentClient();
  }

  /*
   * ITEMS
   */

  request(type, params) {
    return new Promise((resolve, reject) => {
      this.dbDocClient[type](
        params,
        (err, data) => (err ? reject(err) : resolve(data))
      );
    });
  }

  getPlace(slug) {
    const params = {
      TableName: process.env.PLACES_TABLE,
      Key: { slug }
    };

    return this.request("get", params).then(({ Item }) => Item);
  }

  insertPlace(slug, place) {
    const params = {
      TableName: process.env.PLACES_TABLE,
      Item: { [HASH_KEY]: slug, ...place }
    };

    return this.request("put", params);
  }
}

module.exports = DynamoDB;

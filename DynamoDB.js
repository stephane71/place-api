const AWS = require("aws-sdk");
const HASH_KEY = "slug";

class DynamoDB {
  constructor() {
    AWS.config.update({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRECT_ACCESS_KEY,
      region: process.env.TABLE_REGION,
      endpoint: `https://dynamodb.${process.env.TABLE_REGION}.amazonaws.com`
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
      TableName: process.env.TABLE_NAME,
      Key: { slug }
    };

    return this.request("get", params).then(({ Item }) => Item);
  }

  insertPlace(slug, place) {
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: { [HASH_KEY]: slug, ...place }
    };

    return this.request("put", params);
  }
}

module.exports = DynamoDB;

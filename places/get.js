require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const now = require("../utils/now");
const DynamoDB = require("../DynamoDB");
const placesDB = new DynamoDB();

module.exports.handler = async (event = {}, context, callback) => {
  now();
  console.log("[La Foulee] Get a place");

  const { slug } = event.pathParameters;

  if (!slug) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request" })
    });
    return;
  }

  let place = null;
  try {
    place = await placesDB.getPlace(slug);
  } catch (e) {
    console.log(e);
    callback(null, {
      statusCode: 500
    });
    return;
  }

  if (!place) {
    callback(null, {
      statusCode: 404
    });
    return;
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(place)
  });
};

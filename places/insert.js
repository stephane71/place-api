require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const now = require("../utils/now");
const DynamoDB = require("../DynamoDB");
const placesDB = new DynamoDB();

module.exports.handler = async (event = {}, context, callback) => {
  now();
  console.log("[La Foulee] Insert a place");
  console.log(event.body);

  if (!event.body)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request" })
    };

  const body = event.body ? JSON.parse(event.body) : {};
  const { slug, ...place } = body;

  console.log(slug, place);

  if (!slug || !place) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request" })
    };
  }

  try {
    await placesDB.insertPlace(slug, place);
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500
    };
  }

  return {
    statusCode: 200
  };
};

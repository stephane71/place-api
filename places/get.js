const DynamoDB = require("../DynamoDB");
const placesDB = new DynamoDB();

module.exports.handler = async (event = {}) => {
  const { slug } = event.pathParameters;

  if (!slug) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request" })
    };
  }

  try {
    const place = await placesDB.getPlace(slug);
    if (!place) {
      return {
        statusCode: 404
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(place)
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500
    };
  }
};

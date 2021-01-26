const middy = require("@middy/core");
const httpErrorHandler = require("@middy/http-error-handler");
const validator = require("@middy/validator");
const inputSchema = require("./schema");
/*const createError = require("http-errors");
const DynamoDB = require("../../DynamoDB");
const placesDB = new DynamoDB();*/

async function index(event = {}) {
  const { slug } = event.pathParameters;

  const place = slug;

  /*let place;
  try {
    place = await placesDB.getPlace(slug);
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
    };
  }

  if (!place) {
    return new createError.NotFound("This page could not be downloaded");
  }*/

  return {
    statusCode: 200,
    body: JSON.stringify(place),
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}

module.exports.handler = middy(index)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

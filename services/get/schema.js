const input = {
  type: "object",
  required: ["pathParameters"],
  properties: {
    pathParameters: {
      type: "object",
      required: ["slug"],
      properties: {
        year: { type: "string" },
      },
    },
  },
};

module.exports = {
  input,
};

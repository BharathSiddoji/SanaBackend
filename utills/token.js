const jwt = require("jsonwebtoken");
const {SECRET_TOKEN} = process.env
/**
 * Creates a JSON Web Token (JWT) for the given user ID, with an
 * expiration time of 24 hours.
 *
 * @param {string} id - The user ID to generate a token for.
 *
 * @returns {string} A JWT for the given user, as a string.
 */
const createToken = (id) => {
  return jwt.sign({ id }, SECRET_TOKEN, {
    expiresIn: 24 * 60 * 60, //expires in 24 hours
  });
};


module.exports =createToken;


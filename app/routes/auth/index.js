const express = require('express');
const { handleExceptions } = require('../../middlewares/error-handlers');

const user = require('./user');

const auth = express.Router();

/**
 * @api {get} /auth/logout/ Request a logout
 * @apiName GetLogout
 * @apiGroup Auth
 * @apiHeader {String}  Access-Control-Allow-Headers Access-Control-Allow-Headers: x-requested-with, Content-Type,
 * origin, authorization, accept, client-security-token
 * @apiHeader {String}  Access-Control-Allow-Origin Access-Control-Allow-Origin: https://ps.otakedev.com
 * @apiHeader {String}  Access-Control-Allow-Credentials Access-Control-Allow-Credentials: true
 * @apiHeader {String}  Cookie Cookie: connect.sid=***
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3000/auth/logout
 * @apiSuccess (200) {json} send back a confirmation
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "auth": true
 *    }
 * @apiError (404) {json} NotFoundError Element has not been found
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *    {
 *        "code": 404,
 *        "message": "please check URL"
 *    }
 */
auth.get('/logout', handleExceptions(user.logoutUser));
/**
 * @api {get} /auth/logout/ Request a check to see if a user is login
 * @apiName GetCheck
 * @apiGroup Auth
 * @apiHeader {String}  Access-Control-Allow-Headers Access-Control-Allow-Headers: x-requested-with, Content-Type,
 * origin, authorization, accept, client-security-token
 * @apiHeader {String}  Access-Control-Allow-Origin Access-Control-Allow-Origin: https://ps.otakedev.com
 * @apiHeader {String}  Access-Control-Allow-Credentials Access-Control-Allow-Credentials: true
 * @apiHeader {String}  Cookie Cookie: connect.sid=***
 * @apiExample {curl} Example usage:
 *                curl -i http://localhost:3000/auth/logout/
 * @apiSuccess (200) {json} send back a confirmation
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "auth": true
 *    }
 * @apiError (401) {json} UnauthenticatedUserError No privilege to access this resource
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *    {
 *      "code": 401,
 *      "message": "something went wrong"
 *    }
 */
auth.get('/check', handleExceptions(user.checkAuthentication));
/**
 * @api {post} /auth/logout/ Request a check for a token
 * @apiName PostToken
 * @apiGroup Auth
 * @apiHeader {String}  Access-Control-Allow-Headers Access-Control-Allow-Headers: x-requested-with, Content-Type,
 * origin, authorization, accept, client-security-token
 * @apiHeader {String}  Access-Control-Allow-Origin Access-Control-Allow-Origin: https://ps.otakedev.com
 * @apiHeader {String}  Access-Control-Allow-Credentials Access-Control-Allow-Credentials: true
 * @apiHeader {String}  Cookie Cookie: connect.sid=***
 * @apiExample {curl} Example usage:
 *     curl -d '{"token":"677868b5227e29ee2e701e00c4db160f"}'
 *            -H "Content-Type: application/json" -X POST http://localhost:3000/account/form/testimonial
 * @apiSuccess (200) {json} send back a confirmation
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "token": true
 *    }
 */
auth.post('/token', handleExceptions(user.checkTokenValidy));
/**
 * @api {post} /auth/login Request a login for a user
 * @apiName gGtCheck
 * @apiGroup Account
 * @apiHeader {String}  Access-Control-Allow-Headers Access-Control-Allow-Headers: x-requested-with, Content-Type,
 * origin, authorization, accept, client-security-token
 * @apiHeader {String}  Access-Control-Allow-Origin Access-Control-Allow-Origin: https://ps.otakedev.com
 * @apiHeader {String}  Access-Control-Allow-Credentials Access-Control-Allow-Credentials: true
 * @apiHeader {String}  Cookie Cookie: connect.sid=***
 * @apiExample {curl} Example usage:
 *     curl -d '{
 *                "username": "user",
 *                "password": "pswd"
 *              }'
 *            -H "Content-Type: application/json" -X POST http://localhost:3000/auth/login/
 * @apiSuccess (200) {json} send back a confirmation
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "auth": true
 *    }
 * @apiError (400) {json} ValidationError Fail to login
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *    {
 *      "code": 400,
 *      "message": "something went wrong"
 *    }
 */
auth.post('/login', handleExceptions(user.loginUser));

module.exports = auth;

const jwt = require('jsonwebtoken');
const ApiError = require('../Utils/ApiError.js');
const { asyncHandler } = require('../Utils/asyncHandler.js');
const { User } = require('../Models/user.model.js');

const VerifyJwt = asyncHandler(async (req, res, next) => {
    const incommingToken = req.cookies?.token || req.cookies?.mycookie;

    // it means user does not have token and is trying to access a protected resource.
    if (!incommingToken) {
        throw new ApiError(401, 'Unauthorized request');
    }

    const decodedToken = jwt.verify(incommingToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Error verifying the token:', err);
        } else {
            return decoded;
        }
    });

    if (!decodedToken) {
        throw new ApiError(401, 'Invalid access token');
    }

    const user = await User.findById(decodedToken._id).select('-password -email');

    req.user = user;
    next();
});

module.exports = VerifyJwt;

import { rateLimit } from 'express-rate-limit';

export default class RateLimiter {

    getLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 20, // limit each IP to 50 GET requests per windowMs
        message: 'Too many GET requests from this IP, please try again later.',
    });

    postLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 20, // limit each IP to 30 POST requests per windowMs
        message: 'Too many POST requests from this IP, please try again later.',
    });

    deleteLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 20, // limit each IP to 20 DELETE requests per windowMs
        message: 'Too many DELETE requests from this IP, please try again later.',
    });

    putLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 20, // limit each IP to 20 PUT requests per windowMs
        message: 'Too many PUT requests from this IP, please try again later.',
    });

}
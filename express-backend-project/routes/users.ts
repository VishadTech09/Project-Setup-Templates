import express, { Request, Response, NextFunction } from 'express';
import { validateAndTransform } from './../middlewares/class-validator.middleware';
import { UserAddDTO } from '../dto/users/user.add.dto';
import UserController from './../controllers/users/user.controller';
import AuthenticationMiddleware from './../middlewares/authentication.middleware';
import RateLimiter from './../util/rate-limiter';

const router = express.Router();
const controller = new UserController();
const authController = new AuthenticationMiddleware();
const rateLimiter = new RateLimiter();

/* GET users listing. */
router.get('/', rateLimiter.getLimiter, authController.authenticateJWT,
    controller.getAllUsers);

router.post('/', rateLimiter.postLimiter, authController.authenticateJWT,
    validateAndTransform(UserAddDTO),
    controller.addUser);

router.get('/:id', rateLimiter.getLimiter, authController.authenticateJWT,
    controller.getUser);

router.put('/', rateLimiter.putLimiter, authController.authenticateJWT,
    controller.updateUser);

router.delete('/', rateLimiter.deleteLimiter, authController.authenticateJWT,
    controller.removeUser);


module.exports = router;

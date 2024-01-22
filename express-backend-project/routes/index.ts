import express from 'express';
import { Request, Response, NextFunction, Router } from 'express';
import GlobalController from './../controllers/global/global.controller';
import EmailController from '../controllers/email/email.controller';
import RateLimiter from './../util/rate-limiter';

const router: Router = express.Router();
const globalController = new GlobalController();
const brevoEmailController = new EmailController();
const rateLimiter = new RateLimiter();

/* GET home page. */
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             example: [{ id: 1, name: 'John' }]
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error        
 */
router.get('/', rateLimiter.getLimiter, globalController.homePage);
/* GET home page. */
/**
 * @swagger
 * /api/token:
 *   post:
 *     summary: Get an authentication token
 *     description: Generate authentication token for the user which will be expired in 1 minutes
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             example: [{ id: 1, name: 'John' }]
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error        
 */
router.get('/token', rateLimiter.getLimiter, globalController.generateToken);
router.get('/mail/brevo', rateLimiter.getLimiter, brevoEmailController.sendEmailUsingBrevo);
router.get('/mail/sendgrid', rateLimiter.getLimiter, brevoEmailController.sendEmailUsingSendGrid);
module.exports = router;

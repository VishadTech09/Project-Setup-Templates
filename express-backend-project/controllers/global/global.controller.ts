import { Request, Response, NextFunction } from 'express';
import HttpStatusCode from '../../util/http-status-code';
import JwtHelper from './../../util/jwt-helper';
// The below client is used to send email functionality 

export default class GlobalController {
    
    homePage = function (request: Request, response: any, next: NextFunction) {
        const smileEmoji = '\u{1F604}'
        response.success({ message: { title: `${process.env.APP_TITLE} is working fine. ${smileEmoji} ` } });
    }

    generateToken = (request: Request, response: any) => {

        //Fetch the userId from the request
        const { userId } = request.body;


        if (!userId) {
            return response.error("Bad Request", HttpStatusCode.NOT_FOUND, "Unable to find user details")
        }

        const payload = {
            username: "Test User 1",
            email: 'test@gamil.com',
            role: 1
        };

        const jwtHelper = new JwtHelper();
        const token = jwtHelper.generateToken(payload);

        response.success({ token });
    }
}
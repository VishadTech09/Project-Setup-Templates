import HttpStatusCode from "../util/http-status-code";
import JwtHelper from "../util/jwt-helper";
import { NextFunction } from 'express';

export default class AuthenticationMiddleware {

    readonly jwtHelper = new JwtHelper();

    authenticateJWT = (request: any, response: any, next: NextFunction) => {
        const token = request.headers.authorization;

        if (!token) {
            return response.error('Unauthorized', HttpStatusCode.BAD_REQUEST, 'Please provide valid token.');
        }

        try {
            const decoded = this.jwtHelper.verifyToken(token);
            if(decoded){
                request.user = decoded;
                next();
            }else{
                return response.error('Forbidden', HttpStatusCode.UNAUTHORIZED, "Token is invalid or expired"); 
            }
          
        } catch (error: any) {
            console.log("Failed to verify token");
            return response.error('Forbidden', HttpStatusCode.UNAUTHORIZED, error.message);
        }
    }
}
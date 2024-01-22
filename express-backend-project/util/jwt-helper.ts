// jwtHelper.js

const jwt = require('jsonwebtoken');

// Define an enum for possible expiresIn values
enum TokenExpiration {
    ONE_MINUTE = '1m',
    FIFTEEN_MINUTES = '15m',
    ONE_HOUR = '1h',
    ONE_DAY = '1d',
}



export default class JwtHelper {
    
    readonly expiresIn = TokenExpiration.ONE_MINUTE;

    generateToken = (payload: any) => {
        const secretKey = process.env.JWT_TOKEN_SECRET;
        const options = { expiresIn: this.expiresIn };

        console.log('secretKey', secretKey)
        return jwt.sign(payload, secretKey, options)
    }

    verifyToken = (token: string) => {
        try {
            
            const secretKey = process.env.JWT_TOKEN_SECRET;
            token = token.replace('Bearer ','');          
            const decoded = jwt.verify(token, secretKey);             
            return decoded;
            
        } catch (error) {
            console.log(error);
            return null;
        }

    }
}

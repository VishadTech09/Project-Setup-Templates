
import { Request, NextFunction } from 'express';
import HttpStatusCode from './../util/http-status-code';
import BaseDTO from '../dto/base.dto';

 

const ResponseFormatter = (req: Request, res: any, next: NextFunction) => {
    // Success response
    res.success = (data: BaseDTO, status = HttpStatusCode.OK, message = 'Success') => {
        res.status(status).json({
            success: true,
            message,
            data,
        });
    };

    // Error response with details
    res.error = (message = 'Internal Server Error',
        statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
        errorDetails = null) => {

        res.status(statusCode).json({
            success: false,
            message,
            error: errorDetails,
        });
    };

    next();
};

export default ResponseFormatter;

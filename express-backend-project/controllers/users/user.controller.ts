import { NextFunction, Request, Response } from 'express';
import HttpStatusCode from './../../util/http-status-code';
/**
 * This controller handle all the resource request related to the 
 * User resource
 */
export default class UserController {
    users = [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "username": "john.doe1"
        },
        {
            "id": 2,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "username": "john.doe"
        },
        {
            "id": 3,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "username": "john.doe"
        },
    ];

    getUser = (request: Request, response: any, next: NextFunction) => {
        try {
            console.log(request.params);
            if (Number(request.params.id) > this.users.length) {
                return response.error("Content Not Found", HttpStatusCode.NOT_FOUND, "Unable to find User")
            }

            return response.success(this.users[0]);
        } catch (error: any) {
            //This block handle any other internal error
            response.error("Internal Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }

    }

    addUser = (request: Request, response: any, next: NextFunction) => {

        try {
            //Fetch the data from request after validation
            const dtoData = (request as any).data;

            //additional business logic processing and save data to BE.
            console.log(dtoData)

            //Once record is save just send new record only as response with 
            return response.success(dtoData, HttpStatusCode.CREATED);
        } catch (error) {

        }

    }

    removeUser = (request: Request, response: any, next: NextFunction) => {

        try {
            // add logic to remove user after performing business validation

            return response.success(this.users);
        } catch (error: any) {
            //This block handle any other internal error
            response.error("Internal Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    updateUser = (request: Request, response: any, next: NextFunction) => {
        try {
            //add logic to update existing user details after business validation logic

            return response.success(this.users);
        } catch (error: any) {
            //This block handle any other internal error
            response.error("Internal Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    getAllUsers = (request: Request, response: any, next: NextFunction) => {
        try {

            return response.success(this.users);
            
        } catch (error: any) {
            //This block handle any other internal error
            response.error("Internal Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
    }
}

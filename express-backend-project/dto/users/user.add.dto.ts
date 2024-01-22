import { IsNotEmpty, IsString, IsEmail, Length } from "class-validator";
import 'reflect-metadata';

export class UserAddDTO{
    @IsNotEmpty({message:'Name cannot be empty'})
    @IsString({message:'Name must be a string'})
    @Length(2,50, {message:'Name must be between 2 and 50 characters'})
    name!: string;

    @IsNotEmpty({message:'Name cannot be empty'})
    @IsString({message:'Name must be a string'})
    @Length(2,50, {message:'Name must be between 2 and 50 characters'})
    username!: string;
  
    @IsNotEmpty({message:'Email cannot be empty'})
    @IsEmail({},{message:'Invalid email format'})
    email!: string;
}
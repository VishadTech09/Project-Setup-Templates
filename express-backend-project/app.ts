import createError from 'http-errors';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as path from 'path'; 
import ResponseFormatter from './middlewares/response.formatter.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';


const dotenv = require('dotenv');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//setting up the configuration environment for application
const environment = process.env.NODE_ENV || 'development';
console.log(environment)
const envPath = path.join(__dirname, `.env.${environment || 'development'}`);
dotenv.config({ path: envPath });
console.log(envPath);

//initialise express application
var app = express();

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'Documentation for Express API',
    },
  },
  apis: ['**/*.ts'], // Array of TypeScript files to use for Swagger documentation
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



console.log(`Server is running on ${process.env.PORT}`);


app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Added middleware to format each response in standard format
app.use(ResponseFormatter);

//setup routers for each modules
app.use('/api/v1/', indexRouter);
// app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);




// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});

// error handler other than 404 error  :All other error will be handle in this
// middleware
app.use(function(err:any, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

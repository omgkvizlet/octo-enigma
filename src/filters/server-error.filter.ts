import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch(Error)
export class ServerErrorFilter implements ExceptionFilter {
  isDev: boolean;

  constructor(isDev: boolean) {
    this.isDev = isDev;
    // console.log(isDev);
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();

    // throw new NotFoundException({ entity: exception.name });

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      ...(this.isDev && { cause: exception.message }),
    });
  }
}

import { BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import { MongoError } from "mongodb";

@Catch(MongoError)
export class MongoErrorFilter implements ExceptionFilter {
  catch(exception: MongoError) {
    return new BadRequestException({
      code: exception.code,
      msg: exception.message,
    });
  }
}

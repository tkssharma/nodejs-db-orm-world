import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { CreateUserInput } from "../dto/create-user.input";

@Injectable()
export class ValidatePasswordPipe implements PipeTransform {
  transform(value: CreateUserInput) {
    if (value.password !== value.confirmPassword) {
      throw new BadRequestException("passwords dont match");
    }
    return value;
  }
}

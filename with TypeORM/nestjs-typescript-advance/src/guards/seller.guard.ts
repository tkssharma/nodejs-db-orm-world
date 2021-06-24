import { CanActivate, HttpStatus } from "@nestjs/common";
import {ExecutionContext,HttpException} from '@nestjs/common'

export class SellerGuard implements CanActivate {
  canActivate(context: ExecutionContext ): boolean | Promise<boolean> | import("rxjs").Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if(user.seller){
      return true;
    }
    throw new HttpException('Unauthorized Exception', HttpStatus.UNAUTHORIZED);
  }
}
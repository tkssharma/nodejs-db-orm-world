import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from './auth.service';
import { ExtractJwt, Strategy, VerifyCallback } from 'passport-jwt'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authservice: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('access-token'),
            secretOrKey: process.env.SECRET_KEY
        });
    }
    async validate(payload: any, done: VerifyCallback) {
        try {
            const user = await this.authservice.validateUser(payload);
            if (!user) {
                return done(new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED), null)
            }
            return done(null, payload);
        } catch (err) {
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED)
        }
    }
}
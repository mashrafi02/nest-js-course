import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import type { ConfigType } from '@nestjs/config';
import authConfig from '../config/auth.config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { REQUEST_USER_KEY } from '../../constants/constants';

type JwtPayload = {
    username: string;
    sub: number;
};


@Injectable()
export class AuthorizeGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,

        private readonly reflector: Reflector
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{


        // check if the route is public
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }
        
        const request: Request = context.switchToHttp().getRequest();

        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(token, this.authConfiguration);
            request[REQUEST_USER_KEY] = payload;
            // console.log(payload);
            
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
        
        return true;
    }
}
// auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { REQUEST_USER_KEY, Role } from '../../constants/constants';
import { ActiveUserType } from '../interfaces/active-user.interface';

type RequestWithUser = Request & {
  user?: ActiveUserType;
};


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. what roles does this route require?
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),   // route-level decorator
      context.getClass(),     // controller-level decorator
    ]);

    // 2. no @Roles() decorator → no restriction → allow
    if (!requiredRoles) return true;

    // 3. get the active user attached by AuthorizeGuard
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const { role } = request[REQUEST_USER_KEY] ?? {};

    // 4. check if user's role is in the required list
    return requiredRoles.includes(role);
  }
}
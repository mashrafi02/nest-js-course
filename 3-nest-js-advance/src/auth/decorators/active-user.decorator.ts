

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { ActiveUserType } from "../interfaces/active-user.interface";

type RequestWithUser = Request & {
    user?: ActiveUserType;
};

export const ActiveUser = createParamDecorator<
    keyof ActiveUserType | undefined,
    ActiveUserType | ActiveUserType[keyof ActiveUserType] | undefined
>((field, ctx: ExecutionContext) => {

    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    return field ? user?.[field] : user;
});


import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsException extends HttpException {
    constructor(fieldName: string, fieldValue: string) {
        super({
            status: HttpStatus.CONFLICT,
            error: `User with ${fieldName} '${fieldValue}' already exists`,
        }, HttpStatus.CONFLICT);
    }
}
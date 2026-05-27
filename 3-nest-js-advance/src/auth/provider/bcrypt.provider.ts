import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import bcrypt from 'bcryptjs';

@Injectable()
export class BcryptProvider extends HashingProvider {
    async hashPassword(password: string | Buffer): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password.toString(), salt);
    }

    async comparePassword(password: string | Buffer, hash: string | Buffer): Promise<boolean> {
        return bcrypt.compare(password.toString(), hash.toString());
    }
}
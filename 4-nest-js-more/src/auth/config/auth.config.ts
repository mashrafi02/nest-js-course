import { registerAs } from "@nestjs/config";

export default registerAs("authConfig", () => (
    {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN ?? '900', 10),
        refreshExpiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN ?? '86400', 10),
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER
    }
))
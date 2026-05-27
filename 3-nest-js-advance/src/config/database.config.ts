import { registerAs } from "@nestjs/config";

export default registerAs("database", () => (
    {
        port : process.env.PORT || 5432,
        dbUrl: process.env.DATABASE_URL,
        synchronize: process.env.TYPEORM_SYNC === 'true' ? true : false,
        autoLoadEntities: process.env.TYPEORM_AUTO_LOAD_ENTITIES === 'true' ? true : false,
    }
))
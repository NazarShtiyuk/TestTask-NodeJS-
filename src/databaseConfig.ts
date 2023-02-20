import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
    type: "postgres",
    host: "ep-shrill-breeze-068466.eu-central-1.aws.neon.tech",
    username: "nazarshtiyuk",
    password: "oagkJtR2w4Zs",
    database: "neondb",
    port: 5432,
    synchronize: true,
    entities: [__dirname + "/entity/*{.ts,.js}"],
    ssl: true
})
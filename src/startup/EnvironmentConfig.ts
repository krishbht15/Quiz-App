import * as dotenv from "dotenv";

export const env = () => {
    dotenv.config({path: `${process.env.NODE_ENV}.env`})
    return process.env;
}

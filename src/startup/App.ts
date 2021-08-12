import express from "express";
import {ApolloServer} from "apollo-server-express";
import schemaInstance from "./Schema";
import cors from "cors";
import db from "./Index";
import {createServer, Server} from "http";
import * as core from "express-serve-static-core";
import {env} from "./EnvironmentConfig";
import Auth from "./Auth";

class App {
    private app: core.Express;
    private server: ApolloServer;
    private httpServer: Server;

    public constructor() {
        this.setupServer();
    }

    public async setupServer() {
        this.app = express();
        this.server = new ApolloServer({
            schema: schemaInstance.getGraphQLSchema,
            introspection: true,
            playground: true,
            context: async ({req}) => {
                if (env().ENABLE_AUTH === "true" && req.body.operationName !== "IntrospectionQuery") {
                    return await Auth.validateAuth(req);   //un-comment this line for start auth validation
                }
            },
        });
        this.app.use('*', cors());
        this.server.applyMiddleware({app: this.app, path: '/graphql'});
        this.httpServer = createServer(this.app);
        await db;
        this.httpServer.listen({port: env().PORT}, (): void =>
            console.log("\n🚀 GraphQL is now run on http://localhost:" + env().PORT + "/graphql")
        );
    }
}

const server = new App();

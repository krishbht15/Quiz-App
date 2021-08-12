import 'graphql-import-node';
import {GraphQLSchema} from "graphql";
import {makeExecutableSchema} from "graphql-tools";
import * as modelSchema from "./ModelSchema.graphql";
import teacherController from "../controller/teacherController";
import studentController from "../controller/studentController";
import quizController from "../controller/quizController";
import questionController from "../controller/questionController";

class Schema {
    private static schema: Schema;
    private readonly graphQLSchema: GraphQLSchema;

    private constructor() {
        this.graphQLSchema = makeExecutableSchema({
            typeDefs: [modelSchema],
            resolvers: [teacherController, studentController, quizController, questionController],
        });
    }

    public get getGraphQLSchema() {
        return this.graphQLSchema;
    }

    public static get Instance() {
        return this.schema || (this.schema = new Schema());
    }
}

const schemaInstance = Schema.Instance;
export default schemaInstance;

import jwt from 'jsonwebtoken';
import {Role} from "../dto/Role";
import {AuthenticationError} from "apollo-server-express";


const TOKEN_KEY = "GrOmO"

class Auth {
    private static singleton: Auth;

    private constructor() {
    }

    private whiteListedQueryAndMutations = [];
    private allowedQueryAndMutationsForUser = []

    private checkWhiteListed(body) {
        return this.whiteListedQueryAndMutations.includes(body);
    }

    public async validateAuth(req): Promise<any> {
        const operationName = req.body.operationName;
        if (this.checkWhiteListed(operationName) === true) {
            return {};
        }
        const token = req.headers.authorization || '';
        let auth = this.decodeToken(token);
        return auth;
    }

    public generateToken(userId: string, role: Role): string {
        return jwt.sign(
            {userId, role},
            TOKEN_KEY,
            {
                expiresIn: role === Role.TEACHER ? '1d' : '30d',
            }
        );
    }

    private decodeToken(token: string): any {
        try {
            return jwt.verify(token, TOKEN_KEY);
        } catch (err) {
            throw new AuthenticationError("Messages.ERROR_INVALID_TOKEN");
        }
    }

    public static get Instance() {
        return this.singleton || (this.singleton = new Auth());
    }
}

export default Auth.Instance;

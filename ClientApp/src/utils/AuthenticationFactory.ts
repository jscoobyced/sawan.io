import { IAuthentication } from "./IAuthentication";

export class AuthenticationFactory {
    public static getAuthentication(): IAuthentication {
        return AuthenticationFactory.authentication;
    }

    public static registerAuthentication(authentication: IAuthentication, force = false) {
        if (!AuthenticationFactory.authentication || force) {
            AuthenticationFactory.authentication = authentication;
        }
    }

    private static authentication: IAuthentication;
}

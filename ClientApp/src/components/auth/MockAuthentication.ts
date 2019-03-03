import { IAuthentication } from "../../utils/IAuthentication";

export class MockAuthentication implements IAuthentication {
    public getTokenId = (): string => {
        return "";
    }
    public init = () => {
        return;
    }

    public isReady = (): boolean => {
        return false;
    }

    public isAuthSupported = (): boolean => {
        return false;
    }

    public signOut = (): Promise<any> => {
        return Promise.resolve();
    }

    public renderButton = (onSignIn: (user: any) => void): void => {
        return;
    }
}

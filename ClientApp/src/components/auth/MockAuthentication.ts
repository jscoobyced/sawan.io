import { IAuthentication } from "../../utils/IAuthentication";

export class MockAuthentication implements IAuthentication {
    public getAuthenticatedUser = () => {
        return {
            email: "user@example.org",
            family_name: "Smith",
            given_name: "Kevin",
            group: "Admin",
            id: "123456789",
            locale: "en_US",
            name: "Kevin Smith",
            picture: "",
            token: "",
            verified_email: true
        };
    }

    public getTokenId = (): string => {
        return "123456789";
    }

    public init = (callBack: () => void, buttonId: string) => {
        this.renderButton();
        callBack();
    }

    public isReady = (): boolean => {
        return true;
    }

    public isAuthSupported = (): boolean => {
        return true;
    }

    public signOut = (): Promise<any> => {
        return Promise.resolve();
    }

    public renderButton = () => {
        return;
    }

    public isAdmin() {
        return true;
    }
}

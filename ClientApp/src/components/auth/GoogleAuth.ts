import { ApiUtils } from "../../utils/ApiUtils";
import { AuthenticatedUser, IAuthentication } from "../../utils/IAuthentication";

export class GoogleAuth implements IAuthentication {

    private authenticatedUser: AuthenticatedUser = null as unknown as AuthenticatedUser;

    public init = (callBack: () => void, buttonId: string) => {
        const script = document.createElement("script");
        script.onload = () => {
            this.renderButton(buttonId);
            this.callBack = callBack;
        };
        script.src = "https://apis.google.com/js/platform.js";
        document.body.appendChild(script);
    }

    public isAuthSupported() {
        return this.isReady() && (typeof gapi.auth2 !== "undefined");
    }

    public renderButton = (buttonId: string) => {
        gapi.signin2.render(buttonId, {
            scope: 'profile email',
            longtitle: false,
            theme: 'dark',
            onsuccess: this.onSignIn,
        });
    }

    public isSignedIn(): boolean {
        if (!this.isAuthSupported()) {
            return false;
        }
        return gapi.auth2.getAuthInstance().isSignedIn.get();
    }

    public getTokenId(): string {
        if (!this.isAuthSupported()) {
            return "";
        }

        return gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
    }

    public getAuthenticatedUser = () => {
        return this.authenticatedUser;
    }

    public signOut = (): Promise<any> => {
        if (this.isAuthSupported()) {
            const auth2 = gapi.auth2.getAuthInstance();
            this.authenticatedUser = null as unknown as AuthenticatedUser;
            return auth2.signOut();
        }

        return Promise.reject();
    }

    public isAdmin = () => {
        return this.authenticatedUser && this.authenticatedUser.group === "Admin";
    }

    private isReady() {
        return (typeof gapi !== "undefined");
    }

    private callBack = (): void => { return; };

    private readonly onSignIn = (googleUser: gapi.auth2.GoogleUser) => {
        const url = "/api/User/authenticate";
        ApiUtils.postData<{}, AuthenticatedUser>(url, {})
            .then(response => {
                this.authenticatedUser = response;
                this.callBack();
            });
    }
}

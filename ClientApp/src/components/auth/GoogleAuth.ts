import { ApiUtils } from "../../utils/ApiUtils";
import { AuthenticatedUser, IAuthentication } from "../../utils/IAuthentication";

export class GoogleAuth implements IAuthentication {

    private authenticatedUser: AuthenticatedUser = null as unknown as AuthenticatedUser;
    private buttonId = '';

    public init = (callBack: () => void, buttonId: string) => {
        const script = document.createElement("script");
        this.buttonId = buttonId;
        script.onload = () => {
            this.renderButton();
            this.callBack = callBack;
        };
        script.src = "https://apis.google.com/js/platform.js";
        document.body.appendChild(script);
    }

    public isAuthSupported() {
        return this.isReady() && (typeof gapi.auth2 !== "undefined");
    }

    public renderButton = () => {
        gapi.signin2.render(this.buttonId, {
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
            return auth2.signOut().then(() => {
                return this.renderButton();
            });
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
                this.mapUser(response);
                this.callBack();
            });
    }

    private readonly mapUser = (user: AuthenticatedUser) => {
        if (user) {
            this.authenticatedUser = user;
        } else {
            const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
            this.authenticatedUser = {
                email: profile.getEmail(),
                family_name: profile.getFamilyName(),
                given_name: profile.getGivenName(),
                group: '',
                id: profile.getId(),
                locale: '',
                name: profile.getName(),
                picture: profile.getImageUrl(),
                token: '',
                verified_email: false
            };
        }
    }
}

import { IAuthentication } from "../../utils/IAuthentication";

export class GoogleAuth implements IAuthentication {

    public init = () => {
        const script = document.createElement("script");
        script.onload = () => {
            this.loadPlatformWhenGapiReady(script);
        };
        script.src = "https://apis.google.com/js/platform.js";
        document.body.appendChild(script);
    }

    public isReady() {
        return (typeof gapi !== "undefined");
    }

    public isAuthSupported() {
        return this.isReady() && (typeof gapi.auth2 !== "undefined");
    }

    public renderButton(onSignIn: (googleUser: gapi.auth2.GoogleUser) => void) {
        gapi.signin2.render('g-signin2', {
            scope: 'profile email',
            longtitle: false,
            theme: 'dark',
            onsuccess: onSignIn,
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

    public signOut = (): Promise<any> => {
        if (this.isAuthSupported()) {
            const auth2 = gapi.auth2.getAuthInstance();
            return auth2.signOut();
        }

        return Promise.reject();
    }

    private readonly loadPlatformWhenGapiReady = (script: any) => {
        script.getAttribute('gapi_processed');
    }
}

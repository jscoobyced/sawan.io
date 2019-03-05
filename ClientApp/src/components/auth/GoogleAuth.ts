import { IAuthentication } from "../../utils/IAuthentication";

export class GoogleAuth implements IAuthentication {

    public init = (callBack: () => void) => {
        const script = document.createElement("script");
        script.onload = () => {
            this.renderButton(callBack);
        };
        script.src = "https://apis.google.com/js/platform.js";
        document.body.appendChild(script);
    }

    public isAuthSupported() {
        return this.isReady() && (typeof gapi.auth2 !== "undefined");
    }

    public renderButton(onSignIn: () => void) {
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

    private isReady() {
        return (typeof gapi !== "undefined");
    }
}

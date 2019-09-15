import { ApiUtils } from '../../utils/ApiUtils';
import { AuthenticatedUser, IAuthentication } from '../../utils/IAuthentication';

export class GoogleAuth implements IAuthentication {
  private authenticatedUser: AuthenticatedUser = null as unknown as AuthenticatedUser;

  private buttonId = '';

  public init = (callBack: () => void, buttonId: string) => {
    const script = document.createElement('script');
    this.buttonId = buttonId;
    script.onload = () => {
      this.renderButton();
      this.callBack = callBack;
    };
    script.src = 'https://apis.google.com/js/platform.js';
    document.body.appendChild(script);
  }

  public isAuthSupported() {
    // eslint-disable-next-line no-undef
    return this.isReady() && (typeof gapi.auth2 !== 'undefined');
  }

  public renderButton = () => {
    // eslint-disable-next-line no-undef
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
    // eslint-disable-next-line no-undef
    return gapi.auth2.getAuthInstance().isSignedIn.get();
  }

  public getTokenId(): string {
    if (!this.isAuthSupported()) {
      return '';
    }

    // eslint-disable-next-line no-undef
    return gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
  }

  public getAuthenticatedUser = () => this.authenticatedUser

  public signOut = (): Promise<any> => {
    if (this.isAuthSupported()) {
      // eslint-disable-next-line no-undef
      const auth2 = gapi.auth2.getAuthInstance();
      this.authenticatedUser = null as unknown as AuthenticatedUser;
      return auth2.signOut().then(() => this.renderButton());
    }

    return Promise.reject();
  }

  public isAdmin = () => this.authenticatedUser && this.authenticatedUser.group === 'Admin'

  private isReady() {
    return (typeof gapi !== 'undefined');
  }

  private callBack = (): void => { };

  private readonly onSignIn = (googleUser: gapi.auth2.GoogleUser) => {
    const url = '/api/User/authenticate';
    ApiUtils.postData<{}, AuthenticatedUser>(url, {})
      .then((response) => {
        this.mapUser(response);
        this.callBack();
      });
  }

  private readonly mapUser = (user: AuthenticatedUser) => {
    if (user) {
      this.authenticatedUser = user;
    } else {
      // eslint-disable-next-line no-undef
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
        verified_email: false,
      };
    }
  }
}

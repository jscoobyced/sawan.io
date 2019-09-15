import { IAuthentication } from '../../utils/IAuthentication';

export class MockAuthentication implements IAuthentication {
    public getAuthenticatedUser = () => ({
      email: 'user@example.org',
      family_name: 'Smith',
      given_name: 'Kevin',
      group: 'Admin',
      id: '123456789',
      locale: 'en_US',
      name: 'Kevin Smith',
      picture: '',
      token: '',
      verified_email: true,
    })

    public getTokenId = (): string => '123456789'

    public init = (callBack: () => void, buttonId: string) => {
      this.renderButton();
      callBack();
    }

    public isReady = (): boolean => true

    public isAuthSupported = (): boolean => true

    public signOut = (): Promise<any> => Promise.resolve()

    public renderButton = () => {

    }

    public isAdmin() {
      return true;
    }
}

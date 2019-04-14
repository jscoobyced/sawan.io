export interface IAuthentication {
    getTokenId: () => string;
    init: (callBack: () => void, buttonId: string) => void;
    isAuthSupported: () => boolean;
    signOut: () => Promise<any>;
    renderButton: () => void;
    getAuthenticatedUser: () => AuthenticatedUser;
    isAdmin: () => boolean;
}

export interface AuthenticatedUser {
    email: string;
    family_name: string;
    given_name: string;
    group: string;
    id: string;
    locale: string;
    name: string;
    picture: string;
    token: string;
    verified_email: boolean;
}

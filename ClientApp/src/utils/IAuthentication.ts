export interface IAuthentication {
    getTokenId: () => string;
    init: (callBack: () => void) => void;
    isAuthSupported: () => boolean;
    signOut: () => Promise<any>;
    renderButton: (onSignIn: () => void) => void;
}

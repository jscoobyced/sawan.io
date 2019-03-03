export interface IAuthentication {
    getTokenId: () => string;
    init: () => void;
    isReady: () => boolean;
    isAuthSupported: () => boolean;
    signOut: () => Promise<any>;
    renderButton: (onSignIn: (user: any) => void) => void;
}

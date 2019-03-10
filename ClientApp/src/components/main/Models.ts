import { NavigationMenuContent } from "../../services/Models";

export interface HeaderProps {
    navigationMenuContent: NavigationMenuContent;
    signIn: (isSignedIn: boolean) => void;
    isSignedIn: boolean;
}

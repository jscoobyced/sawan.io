import { AuthenticationFactory } from "./AuthenticationFactory";

export class ApiUtils {
    public static async fetchData<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json() as Promise<T>;
    }

    public static async postData<T, U>(url: string, data: T): Promise<U> {
        const user = AuthenticationFactory.getAuthentication().getAuthenticatedUser();
        let token = "";
        if (user && user.token) {
            token = user.token;
        }
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                data,
                accessToken: AuthenticationFactory.getAuthentication().getTokenId()
            })
        })
            .then(response => {
                return response.json();
            }).then(response => {
                return response;
            });
    }
}

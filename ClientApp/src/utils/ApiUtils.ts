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
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data,
                token: AuthenticationFactory.getAuthentication().getTokenId()
            })
        })
            .then(response => {
                return response.json();
            }).then(response => {
                return response;
            });
    }
}

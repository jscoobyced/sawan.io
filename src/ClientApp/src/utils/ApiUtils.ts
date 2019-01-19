export class ApiUtils {
    public static async fetchData<T>(url: string): Promise<T> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json() as Promise<T>;
        }
        catch (error) {
            throw error;
        }
    }
}
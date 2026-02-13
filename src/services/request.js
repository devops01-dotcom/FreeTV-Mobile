import AxiosInstances from "./interceptors";
import config from "../utils/apiUrl";
import { resetNavigation } from "../utils/navigateTo";

export async function makeRequest(method, api, data) {
    try {
        const response = await AxiosInstances({
            method,
            url: `${config.API_URL}${api}`,
            data,
        });

    //    console.log('object api res---:', response)
        if (response.status === 200 || response.status === 201) {
            return response.data;
        }
        // if (response.status === 401) {
        //     resetNavigation('Login');
        //     return;
        // }
        return response.data;
    } catch (error) {
        console.error("Error in API request:", error);
        throw error;
    }
}

export function handleUnauthorized() {
    resetNavigation('Login');
}

// Usage example:
export async function post(api, data) {
    return makeRequest("POST", api, data);
}

export async function get(api, data) {
    return makeRequest("GET", api, data);
}

export async function del(api, data) {
    return makeRequest("DELETE", api, data);
}

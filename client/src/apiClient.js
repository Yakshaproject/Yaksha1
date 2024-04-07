const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const register = async (formdata) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formdata)
    })

    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message);
    }
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/validate-token`, {
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("Token Invalid")
    }

    return response.json();

}

export const login = async (formdata) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
    })

    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message);
    }
    return responseBody;
}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        credentials: "include",
        method: "POST",
    })
    if (!response.ok) {
        throw new Error("Error signing out");
    }
}
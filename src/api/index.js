const CliENT_ID = "2f8f49f0e6f245b7aa03d5a45aa92c18";
const CLIENT_SECRET = "c1ff48ff741042e0a63cbfa9fdbe51ec";

export const getAccessToken = async () => {
    const refresh_token = window.localStorage.getItem("refresh_token");
    if (window.localStorage.length !== 0 && refresh_token) {
        const response = await fetch(`https://accounts.spotify.com/api/token`, {
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(
              `2f8f49f0e6f245b7aa03d5a45aa92c18:c1ff48ff741042e0a63cbfa9fdbe51ec`
            )}`
          },
          body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
        });
        const data = await response.json();
        let accessToken = data.access_token;
        return accessToken;
    } else {
        const response = await fetch(`https://accounts.spotify.com/api/token`, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=client_credentials&client_id=${CliENT_ID}&client_secret=${CLIENT_SECRET}`,
        });
        
        const data = await response.json();
        let accessToken = data.access_token;
        return accessToken;
    }
};

const fetchWithAccessToken = async (url, options = {}) => {
    const token = await getAccessToken();
    const headers = {
        Authorization: `Bearer ${token}`,
        ...options.headers,
    };
    const fetchOptions = {
        ...options,
        headers,
    };
    const response = await fetch(url, fetchOptions);
    return response;
};

export const apiClient = {
    get: (url, options = {}) =>
        fetchWithAccessToken("https://api.spotify.com/v1/" + url, {
            ...options,
            method: "GET",
        }).then((res) => res.json()),
    post: (url, options = {}) =>
        fetchWithAccessToken("https://api.spotify.com/v1/" + url, {
            ...options,
            method: "POST",
        }).then((res) => res.json()),
};

export default apiClient;

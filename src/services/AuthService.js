import ApiService from './ApiService'
import jwtDecode from 'jwt-decode';
import appConfig from 'configs/app.config'

const { apiPrefix } = appConfig

//change before production 

// export async function apiSignIn(data) {
//     return ApiService.fetchData({
//         url: '/sign-in',
//         method: 'post',
//         data,
//     })
// }

export async function apiSignIn(data) {
    const response = await fetch(`${apiPrefix}/users/login/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const jsonData = await response.json(); // Wait for the response body to be parsed as JSON
    const decodedToken = jwtDecode(jsonData.access_token);
    // const result = getUserById(decodedToken.userID)
    const res = {
        user: decodedToken,
        token: jsonData.access_token
    };
    return res;
}

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut(data) {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
        data,
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}

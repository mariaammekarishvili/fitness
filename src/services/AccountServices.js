import ApiService from './ApiService'
import appConfig from 'configs/app.config'

const { apiPrefix } = appConfig

export async function apiGetAccountSettingData({ userId }, token) {
    try {
        const response = await fetch(`${apiPrefix}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data
        } else {
            throw new Error('Error retrieving customer list');
        }
    } catch (error) {
        console.error(error);
    }
  }

export async function apiGetAccountSettingIntegrationData() {
    return ApiService.fetchData({
        url: '/account/setting/integration',
        method: 'get',
    })
}

export async function apiGetAccountSettingBillingData() {
    return ApiService.fetchData({
        url: '/account/setting/billing',
        method: 'get',
    })
}

export async function apiGetAccountInvoiceData(params) {
    return ApiService.fetchData({
        url: '/account/invoice',
        method: 'get',
        params,
    })
}

export async function apiGetAccountLogData(data) {
    return ApiService.fetchData({
        url: '/account/log',
        method: 'post',
        data,
    })
}

export async function apiGetAccountFormData() {
    return ApiService.fetchData({
        url: '/account/form',
        method: 'get',
    })
}

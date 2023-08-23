import ApiService from './ApiService'
import appConfig from 'configs/app.config'

const { apiPrefix } = appConfig

export async function createNewUser({ data, companyId }, token) {
    try {
        const response = await fetch(`${apiPrefix}/users/register/${companyId}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            if (response.status == 409) {
                throw new Error('იუზერი უკვე არსებობს');
            } else {
                throw new Error('შექმნისას წარმოიქმნა პრობლემა');
            }
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        throw error;
    }
}

export const fetchList = async ({ companyId }, token) => {
    try {
        const response = await fetch(`${apiPrefix}/users/list/${companyId}`, {
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
};

export async function apiEditInfo({data, customerID}) {
    return ApiService.fetchData({
        url: `/users/update/${customerID}`,
        method: 'put',
        data,
    })
}

export async function apiDelete({data, customerID}) {
    return ApiService.fetchData({
        url: `/users/delete/${customerID}`,
        method: 'delete',
        data,
    })
}

export const updatePauseCustomer = async (token, id, countStopDays) => {
    try {
        const response = await fetch(`${apiPrefix}/customers/pause/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({countStopDays})
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error updating pause customer');
        }
    } catch (error) {
        console.error(error);
    }
};


// --------------------

export async function apiGetCrmCustomersStatistic(params) {
    return ApiService.fetchData({
        url: '/crm/customers-statistic',
        method: 'get',
        params,
    })
}

export async function apiGetCrmCustomerDetails(params) {
    return ApiService.fetchData({
        url: '/crm/customer-details',
        method: 'get',
        params,
    })
}


export async function apiGetCrmMails(params) {
    return ApiService.fetchData({
        url: '/crm/mails',
        method: 'get',
        params,
    })
}

export async function apiGetCrmMail(params) {
    return ApiService.fetchData({
        url: '/crm/mail',
        method: 'get',
        params,
    })
}



import ApiService from './ApiService'
import appConfig from 'configs/app.config'

const { apiPrefix } = appConfig

export async function apiGetCrmDashboardData(data) {
    return ApiService.fetchData({
        url: '/crm/dashboard',
        method: 'get',
        data,
    })
}

export async function apiGetCrmCalendar() {
    return ApiService.fetchData({
        url: '/crm/calendar',
        method: 'get',
    })
}

export async function apiGetCrmCustomers({ companyId }) {
    return ApiService.fetchData({
        url: `/customers/list/${companyId}`,
        method: 'get',
    })
}

export async function createNewCustomer({ data, companyId }, token) {
    try {
        const response = await fetch(
            `${apiPrefix}/customers/register/${companyId}`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        if (!response.ok) {
            if (response.status == 409) {
                throw new Error('იუზერი უკვე არსებობს')
            } else {
                throw new Error('შექმნისას წარმოიქმნა პრობლემა')
            }
        }

        const responseData = await response.json()

        return responseData
    } catch (error) {
        throw error
    }
}

export const fetchCustomers = async ({ companyId }, token) => {
    try {
        const response = await fetch(
            `${apiPrefix}/customers/list/${companyId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        )
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            throw new Error('Error retrieving customer list')
        }
    } catch (error) {
        console.error(error)
    }
}

export const putFixVisit = async (salesID, token) => {
    try {
        const response = await fetch(`${apiPrefix}/fixVisit/${salesID}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            console.log('Visit fixed successfully');
        } else {
            throw new Error('Error fixing visit');
        }
    } catch (error) {
        console.error(error);
    }
};


export async function apPutCrmCustomer({ data, customerID }) {
    return ApiService.fetchData({
        url: `/customers/update/${customerID}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteCrmCustomer({ data, customerID }) {
    return ApiService.fetchData({
        url: `/customers/delete/${customerID}`,
        method: 'delete',
        data,
    })
}
//  <---

export async function apiGetCrmCustomersStatistic(params) {
    return ApiService.fetchData({
        url: '/crm/customers-statistic',
        method: 'get',
        params,
    })
}

export async function apiGetCrmCustomerDetails(params) {
    return ApiService.fetchData({
        url: `/customers/${params.id}`,
        method: 'get',
        params,
    })
}
export const getUserPersonalInformation = async ({ id }, token) => {
    try {
        const response = await fetch(`${apiPrefix}/customers/${id}`, {
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

export const deleteUserTurniketCard = async (id, token) => {
    try {
        const response = await fetch(`${apiPrefix}/cards/delete/turniketCode/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            console.log('User deleted successfully');
        } else {
            throw new Error('Error deleting user');
        }
    } catch (error) {
        console.error(error);
    }
};
export const putUserNewTurniketCode = async (id, token, data) => {
    try {
        const response = await fetch(`${apiPrefix}/changeCard${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            console.log('User update successfully');
        } else {
            throw new Error('Error update user');
        }
    } catch (error) {
        console.error(error);
    }
};

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

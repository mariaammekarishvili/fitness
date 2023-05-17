import ApiService from './ApiService'

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

export async function apiGetCrmCustomers({companyId}) {
    return ApiService.fetchData({
        url: `/crm/customers/list/${companyId}`,
        method: 'get',
        // data,
    })
}

// export async function createNewCustomer({data,companyId}) {
//     return ApiService.fetchData({
//         url: `/customers/register/${companyId}`,
//         method: 'post',
//         data,
//     })
// }
const API = 'http://localhost:3000';

export async function createNewCustomer({ data, companyId }, token) {
  try {
    const response = await fetch(`${API}/customers/register/${companyId}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log(response.status);
      if (response.status) {
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
export async function apiGetCrmCustomersStatistic(params) {
    return ApiService.fetchData({
        url: '/crm/customers-statistic',
        method: 'get',
        params,
    })
}

export async function apPutCrmCustomer(data) {
    return ApiService.fetchData({
        url: '/crm/customers',
        method: 'put',
        data,
    })
}

export async function apiGetCrmCustomerDetails(params) {
    return ApiService.fetchData({
        url: '/crm/customer-details',
        method: 'get',
        params,
    })
}

export async function apiDeleteCrmCustomer(data) {
    return ApiService.fetchData({
        url: '/crm/customer/delete',
        method: 'delete',
        data,
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

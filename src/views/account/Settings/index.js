import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Tabs } from 'components/ui'
import { AdaptableCard, Container } from 'components/shared'
import { useNavigate, useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { apiGetAccountSettingData } from 'services/AccountServices'
import { useSelector } from 'react-redux'

const Profile = lazy(() => import('./components/Profile'))
const Password = lazy(() => import('./components/Password'))

const { TabNav, TabList } = Tabs

const settingsMenu = {
    profile: { label: 'პირადი ინფორმაცია', path: 'profile' },
    password: { label: 'პაროლი', path: 'password'}
}

const Settings = () => {
    const [currentTab, setCurrentTab] = useState('profile')
    const [data, setData] = useState({})

    const navigate = useNavigate()

    const location = useLocation()

    const path = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    )

    const onTabChange = (val) => {
        setCurrentTab(val)
        navigate(`/app/account/settings/${val}`)
    }

    const userId = useSelector(state => state.auth.user.userId)
    const token = useSelector((state) => state.auth.session.token)

    const fetchData = async () => {
        const response = await apiGetAccountSettingData({userId}, token)
        setData(response)
    }

    useEffect(() => {
        setCurrentTab(path)
        if (isEmpty(data)) {
            fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <AdaptableCard>
                <Tabs value={currentTab} onChange={(val) => onTabChange(val)}>
                    <TabList>
                        {Object.keys(settingsMenu).map((key) => (
                            <TabNav key={key} value={key}>
                                {settingsMenu[key].label}
                            </TabNav>
                        ))}
                    </TabList>
                </Tabs>
                <div className="px-4 py-6">
                    <Suspense fallback={<></>}>
                        {currentTab === 'profile' && (
                            <Profile data={data} userId={userId} />
                        )}
                         {currentTab === 'password' && (
                            <Password data={data} userId={userId}/>
                        )}
                        {/*
                        {currentTab === 'notification' && (
                            <NotificationSetting data={data.notification} />
                        )}
                        {currentTab === 'integration' && <Integration />}
                        {currentTab === 'billing' && <Billing />} */}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default Settings

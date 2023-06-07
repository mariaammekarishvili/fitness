import React, { useEffect, useState } from 'react'
import { Container } from 'components/shared'
import reducer from './store'
import { injectReducer } from 'store/index'
import { Timeline } from 'components/ui'
import { useSelector } from 'react-redux'
import { fetchUserSale } from 'services/Sales'
injectReducer('accountActivityLog', reducer)

const ActivityLog = () => {
    const userId = useSelector(state => state.auth.user.userId)
    const token = useSelector((state) => state.auth.session.token)

    const [list, setList] = useState()

    useEffect(() => {

        const fetchData = async () => {
            const data = await fetchUserSale({ userId }, token);
            if (data) {
                setList(data)
            }
        };
        fetchData();
    }, [userId]);

    console.log(list);

    return (
        <Container>
            <div style={{ borderBottom: 'solid gray 1px', padding: '20px' }}>
                <Timeline>
                    <Timeline.Item>Breakfast - 09:00</Timeline.Item>
                    <Timeline.Item>Lunch - 12:30</Timeline.Item>
                    <Timeline.Item>Dinner - 7:00</Timeline.Item>
                </Timeline>
            </div>

        </Container>
    )
}

export default ActivityLog

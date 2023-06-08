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

    const DateComponent = ({ incomeDate }) => {
        const formattedDate = new Date(incomeDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        });

        return <>{formattedDate}</>
    };


    if (!list) return <h3>თქვენი გაყიდვები ვერ მოიძებნა</h3>
    return (
        <>

            {list.map((item, index) => (
                <div key={index} className=" py-4 px-6 text-[17px] bg-gray-100 rounded-lg shadow-lg p-6 mb-[30px]">
                    <h3>#{index+1}</h3>
                    <div className="mb-4 flex border-b border-gray-200 w-[80%] py-4 border-b border-gray-200 w-[80%] py-4">
                        <div className="w-1/2 font-bold">თარიღი</div>
                        <DateComponent incomeDate={item?.createdAt} />
                    </div>
                    <div className="mb-4 flex border-b border-gray-200 w-[80%] py-4">
                        <div className="w-1/2 font-bold">მომხმარებელი</div>
                        <div>{item.customer?.firstname} {item?.customer?.lastname} - პ/ნ: {item?.customer?.idCard}
                            <br /> მეილი: {item.customer?.mail || "-"}
                            <br /> დაბადების თარიღი: <DateComponent incomeDate={item?.customer?.birthday} />
                        </div>

                    </div>
                    <div className="mb-4 flex border-b border-gray-200 w-[80%] py-4">
                        <div className="w-1/2 font-bold">ბარათის ID</div>
                        <div>{item?.turniketCode}</div>
                    </div>
                    <div className="mb-4 flex border-b border-gray-200 w-[80%] py-4">
                        <div className="w-1/2 font-bold">ტრენერი</div>
                        <div>{item?.trainer?.firstname} {item?.trainer?.lastname} - პ/ნ: {item?.trainer?.idCard}
                            <br /> მეილი: {item.trainer?.mail || "-"}
                            <br /> დაბადების თარიღი: <DateComponent incomeDate={item?.trainer?.birthday} />
                        </div>
                    </div>
                    <div className="mb-4 flex border-b border-gray-200 w-[80%] py-4">
                        <div className="w-1/2 font-bold">ტრენერის ღირებულება</div>
                        <div>{item?.trainerPrice} ₾</div>
                    </div>
                    <div className="mb-4 flex border-b border-gray-200 w-[80%] py-4">
                        <div className="w-1/2 font-bold">აბონიმენტი</div>
                        <div>
                            {item?.aboniment?.name}
                            <br /> საშეღავათო პერიოდი: {item?.aboniment?.countStartsDays}
                            <br /> შესვლის რაოდენობა: {item?.aboniment?.maxEntries}
                        </div>
                    </div>
                    <div className="mb-4 flex border-b border-gray-200 w-[80%] py-4">
                        <div className="w-1/2 font-bold">აბონიმენტის ღირებულება</div>
                        <div>{item?.aboniment?.price} ₾</div>
                    </div>
                    <div className="mb-4 flex border-b border-gray-200 w-[80%] py-4">
                        <div className="w-1/2 font-bold">საარჯიშო ჯგუფები</div>
                        <div>
                            {item?.workouts.map((workout, index) => (
                                <div key={index}>
                                    {workout}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4 flex border-b border-gray-200 w-[80%] py-4">
                        <div className="w-1/2 font-bold">საარჯიშო ჯგუფების სრული ღირებულება</div>
                        <div>
                            {item?.workoutPrice}₾
                        </div>
                    </div>
                    <div className="mb-4 flex w-[80%] py-4">
                        <div className="w-1/2 font-bold">სრული ღირებულება</div>
                        <div className='text-green-500'>{item?.totalPrice}₾</div>
                    </div>
                </div>
            ))}


        </>
    )
}

export default ActivityLog

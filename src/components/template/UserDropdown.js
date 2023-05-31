import React from 'react'
import { Avatar, Dropdown } from 'components/ui'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import useAuth from 'utils/hooks/useAuth'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineUser, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi'
import { FiActivity } from 'react-icons/fi'

const dropdownItemList = [
    {
        label: 'პირადი ინფორმაცია',
        path: '/app/account/settings/profile',
        icon: <HiOutlineUser />,
    },
    // {
    //     label: 'Account Setting',
    //     path: '/app/account/settings/profile',
    //     icon: <HiOutlineCog />,
    // },
    // {
    //     label: 'Activity Log',
    //     path: '/app/account/activity-log',
    //     icon: <FiActivity />,
    // },
]

export const UserDropdown = ({ className }) => {
    const { avatar, authority, email } = useSelector(
        (state) => state.auth.user
    )

    const { signOut } = useAuth()

    const signOutAc = () => {
        localStorage.removeItem('admin');
        window.location.reload();
    }

    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
            <Avatar size={32} shape="circle" src={'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX25634105.jpg'} />
            <div className="hidden md:block">
                <div className="text-xs capitalize">
                    {authority[0] || 'guest'}
                </div>
                <div className="font-bold">{email}</div>
            </div>
        </div>
    )

    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <div className="py-2 px-3 flex items-center gap-2">
                        <Avatar shape="circle" src={'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX25634105.jpg'} />
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                {email}
                            </div>
                            <div className="text-xs">{email}</div>
                        </div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                {dropdownItemList.map((item) => (
                    <Dropdown.Item
                        eventKey={item.label}
                        key={item.label}
                        className="mb-1"
                    >
                        <Link
                            className="flex gap-2 items-center"
                            to={item.path}
                        >
                            <span className="text-xl opacity-50">
                                {item.icon}
                            </span>
                            <span>{item.label}</span>
                        </Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Item variant="divider" />
                <Dropdown.Item
                    onClick={signOutAc}
                    eventKey="Sign Out"
                    className="gap-2"
                >
                    <span className="text-xl opacity-50">
                        <HiOutlineLogout />
                    </span>
                    <span>გასვლა</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

export default withHeaderItem(UserDropdown)

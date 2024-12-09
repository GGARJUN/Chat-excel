import SideNavBar from '@/app/(routes)/_components/SideBar'
import React from 'react'
import Dashboard from './page'

function DashboardLayout() {
    return (
        <div>
            <div className=" md:w-72  w-full fixed">
                <SideNavBar />
            </div>
            <div className="md:ml-64 "><Dashboard/></div>
        </div>
    )
}

export default DashboardLayout

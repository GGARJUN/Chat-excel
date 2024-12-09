import SideNavBar from '@/app/(routes)/_components/SideBar'
import React from 'react'
import Dashboard from './page'

function DashboardLayout({ children }) {
    return (
        <div>
            <div className=" md:w-72 h-screen fixed">
                <SideNavBar />
            </div>
            <div className="md:ml-72"><Dashboard/></div>
        </div>
    )
}

export default DashboardLayout

import AdminHead from '@/components/adminDashboard/AdminHead'
import Layout from '@/components/Layout'
import React from 'react'

const AdminLayout = ({ children }) => {
    return (
        <div>
            <AdminHead />
            {children}
        </div>

    )
}

export default AdminLayout
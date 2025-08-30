import React from 'react'
import ExploreSearch from '@/components/singleton/ExploreSearch'

function Layout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            {/* Header with Search */}
            <ExploreSearch />
            
            {/* Main content - don't hide when modal is present */}
            {/* <div className="relative"> */}
                {children}
                {/* Modal renders on top */}
                {modal}
            {/* </div> */}
        </div>
    )
}

export default Layout
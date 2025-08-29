import React from 'react'
import ExploreSearch from '@/components/singleton/ExploreSearch'

function layout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            {/* Header with Search */}
            <ExploreSearch />
            {modal}
            {children}
        </div>
    )
}

export default layout
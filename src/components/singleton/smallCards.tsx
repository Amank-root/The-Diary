import React from 'react'
import { CardContent, CardHeader, CardTitle, Card } from '@/components/ui/card'

interface SmallCardsProps {
  title: string
  icon?: React.ReactNode
  mainContent: string
  subContent?: string
}

function SmallCards({title, icon, mainContent, subContent} : SmallCardsProps) {
  return (
    <>
        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mainContent}</div>
            <p className="text-xs text-muted-foreground">
              {subContent}
            </p>
          </CardContent>
        </Card>
    </>
  )
}

export default SmallCards
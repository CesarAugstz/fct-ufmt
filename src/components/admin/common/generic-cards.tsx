'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Eye, Trash2 } from 'lucide-react'
import { ReactNode } from 'react'
import LoadingSpinner from '@/components/common/loading-spinner'

interface BaseItem {
  id: string
  title: string
  createdAt: Date
}

interface GenericCardsProps<T extends BaseItem> {
  items: T[]
  loading?: boolean
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
  onView?: (item: T) => void
  renderHeaderRightSection?: (item: T) => ReactNode
  renderBadges?: (item: T) => ReactNode
  renderContent?: (item: T) => ReactNode
  renderTitle?: (item: T) => string | ReactNode
  renderSubtitle?: (item: T) => string | ReactNode
  renderActions?: (item: T) => ReactNode
  emptyMessage?: string
  showDefaultEditAction?: boolean
  showDefaultViewAction?: boolean
  showDefaultDeleteAction?: boolean
}

export default function GenericCards<T extends BaseItem>({
  items,
  loading,
  onDelete,
  onEdit,
  onView,
  renderHeaderRightSection,
  renderBadges,
  renderContent,
  renderTitle,
  renderSubtitle,
  renderActions,
  emptyMessage = 'Nenhum item encontrado.',
  showDefaultEditAction = true,
  showDefaultViewAction = false,
  showDefaultDeleteAction = true,
}: GenericCardsProps<T>) {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => (
        <Card key={item.id} className="group hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 space-y-1">
                <CardTitle className="text-sm font-medium line-clamp-2">
                  {renderTitle ? renderTitle(item) : item.title}
                </CardTitle>
                {renderSubtitle && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {renderSubtitle(item)}
                  </div>
                )}
              </div>
              {renderHeaderRightSection && (
                <div className="flex-shrink-0">
                  {renderHeaderRightSection(item)}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {renderContent && renderContent(item)}

            {renderBadges && (
              <div className="flex items-center justify-between">
                {renderBadges(item)}
              </div>
            )}

            <div className="flex items-center gap-1 pt-2">
              {renderActions ? (
                renderActions(item)
              ) : (
                <>
                  {onEdit && showDefaultEditAction && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(item.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  )}
                  {onView && showDefaultViewAction && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(item)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  )}
                  {onDelete && showDefaultDeleteAction && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(item.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

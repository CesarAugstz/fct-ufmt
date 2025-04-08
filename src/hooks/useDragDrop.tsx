'use client'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

export function useDragDrop<T extends { id: string }>(
  items: T[],
  setItems: (items: T[]) => void,
) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id)
      const newIndex = items.findIndex(item => item.id === over.id)

      const reorderedItems = arrayMove(items, oldIndex, newIndex)

      const updatedItems = reorderedItems.map((item, index) => ({
        ...item,
        order: index,
      }))

      setItems(updatedItems)
    }
  }

  function DndContextComponent({ children }: { children: React.ReactNode }) {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {children}
        </SortableContext>
      </DndContext>
    )
  }

  return {
    sensors,
    handleDragEnd,
    DndContextComponent,
  }
}

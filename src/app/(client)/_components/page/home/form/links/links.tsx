import { 
  Active,
  DndContext, 
  KeyboardSensor, 
  PointerSensor, 
  useDroppable, 
  useSensor, 
  useSensors} from "@dnd-kit/core";
import { 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { useHomeForm } from "../hook";
import { FormLink } from "./link";


const Links = () =>{
  const { setNodeRef } = useDroppable({ id: "links" })
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const [activeTaskId, setActiveTaskId] = useState<null | Active>(null);
  const { fields } = useHomeForm()

  const renderLinks = () => {
    const mappedLinks = fields?.map((field, index) => (
      <FormLink 
        key={ field.id }
        index={ index } />
    ))

    return mappedLinks
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActiveTaskId(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = fields?.findIndex(({ id }) => id === active.id);
          const overIndex = fields?.findIndex(({ id }) => id === over.id);
        }
        setActiveTaskId(null);
      }}
      onDragCancel={() => {
        setActiveTaskId(null);
      }}>
      <SortableContext
        items={ fields?? [] }
        strategy={ verticalListSortingStrategy }>
        <div ref={ setNodeRef }>
          { renderLinks() }
        </div>
      </SortableContext>
    </DndContext>
  )
}


export default Links
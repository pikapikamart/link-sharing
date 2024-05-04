import { 
  DndContext, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors} from "@dnd-kit/core"
import { 
  SortableContext, 
  sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { 
  useHomeForm, 
  useHomeFormContext } from "../hook"
import { FormLink } from "./link"


const Links = () =>{
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const { fields } = useHomeForm()
  const context = useHomeFormContext()

  const renderLinks = () => {
    const mappedLinks = fields?.map((field, index) => (
      <FormLink 
        id={ field.id }
        key={ field.id }
        index={ index } />
    ))

    return mappedLinks
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = fields?.findIndex(({ id }) => id === active.id)
          const overIndex = fields?.findIndex(({ id }) => id === over.id)

          if ( activeIndex===undefined || overIndex===undefined ) return
 
          context?.fields.move(activeIndex, overIndex)
        }
      }}>
      <SortableContext items={ fields?? [] }>
        <div>
          { renderLinks() }
        </div>
      </SortableContext>
    </DndContext>
  )
}


export default Links
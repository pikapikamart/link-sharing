import { 
  CSSProperties, 
  createContext, 
  useMemo } from "react";
import Link, { LinkProps } from "./link"
import { DraggableSyntheticListeners } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


type FormLinkProps = {
  id: string
} & LinkProps

type Context =  {
  attributes: Record<string, any>
  listeners: DraggableSyntheticListeners
  ref(node: HTMLElement | null): void
}

export const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {}
});

const FormLink = (props: FormLinkProps) =>{
  const { id, index} = props
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition
  };

  return (
    <SortableItemContext.Provider value={ context }>
      <div 
        className="SortableItem"
        ref={ setNodeRef }
        style={ style }>
        <Link index={ index } />
      </div>
    </SortableItemContext.Provider>
  )
}


export { FormLink }
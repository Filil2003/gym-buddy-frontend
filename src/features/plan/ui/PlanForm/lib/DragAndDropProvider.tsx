import {
  createStrictContext,
  useStrictContext
} from '#shared/lib/react/hooks/useStrictContext.ts';
import {
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
  useState
} from 'react';
import type { Board } from '../types.ts';

interface Props {
  onDrop: (data: DropData) => void;
  children: ReactNode;
}

interface DragAndDrop {
  draggedElement: DropData['draggedElement'] | null;
  setDraggedElement: Dispatch<SetStateAction<DropData['draggedElement'] | null>>;
  onDrop: (targetElement: DropData['targetElement']) => void;
}

export interface DropData {
  draggedElement: DragData & { ref: RefObject<HTMLElement> };
  targetElement: DragData;
}

export interface DragData {
  board: Board;
  index: number;
}

const DragAndDropContext = createStrictContext<DragAndDrop>();

export function DragAndDropProvider({ onDrop, children }: Props) {
  const [draggedElement, setDraggedElement] = useState<DropData['draggedElement'] | null>(null);

  const handleOnDrop = (targetElement: DropData['targetElement']): void => {
    if (!draggedElement) return;
    onDrop({
      draggedElement,
      targetElement
    });
    setDraggedElement(null);
  };

  return (
    <DragAndDropContext.Provider
      value={{ draggedElement, setDraggedElement, onDrop: handleOnDrop }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
}

export function useDragAndDropContext() {
  return useStrictContext(DragAndDropContext);
}

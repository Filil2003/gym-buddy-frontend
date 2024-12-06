import { type CSSProperties, useState } from 'react';
import { useDragAndDropContext } from '../lib/DragAndDropProvider.tsx';

interface Props {
  onDrop: () => void;
}

export function DropAria({ onDrop }: Props) {
  const [show, setShow] = useState(false);
  const { draggedElement } = useDragAndDropContext();

  const style: CSSProperties = {
    minHeight: 0,
    height: draggedElement ? `${draggedElement?.ref?.current?.offsetHeight}px` : 0,
    border: `1px dashed ${show ? '#1677ff' : '#d9d9d9'}`,
    transition: 'all 0.2s ease-in-out',
    opacity: draggedElement ? 1 : 0,
  };

  return (
    <section
      style={style}
      onDrop={(): void => {
        onDrop();
        setShow(false);
      }}
      onDragOver={(event): void => event.preventDefault()}
      onDragEnter={(): void => setShow(true)}
      onDragLeave={(): void => setShow(false)}
    />
  );
}

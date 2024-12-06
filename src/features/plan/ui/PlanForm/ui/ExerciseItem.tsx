import { type Exercise, ExerciseImage } from '#entities/exercise';
import { DragOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { useRef } from 'react';
import { useDragAndDropContext } from '../lib/DragAndDropProvider.tsx';
import type { Board } from '../types.ts';
import cssClasses from './ExerciseItem.module.css';

interface Props {
  exercise: Exercise;
  board: Board;
  index: number;
}

export function ExerciseItem({ exercise, board, index }: Props) {
  const { setDraggedElement } = useDragAndDropContext();
  const draggedElementRef = useRef<HTMLDivElement>(null);

  return (
    <List.Item
      ref={draggedElementRef}
      className={cssClasses['ExerciseItem']}
      draggable={true}
      onDragStart={(): void =>
        setDraggedElement({ board, index, ref: draggedElementRef })
      }
      onDragEnd={(): void => setDraggedElement(null)}
    >
      <List.Item.Meta
        avatar={
          <ExerciseImage src={exercise.imageFileName} alt={exercise.name} />
        }
        title={exercise.name}
        description={
          <div
            style={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
          >
            {exercise.description}
          </div>
        }
      />
      <DragOutlined />
    </List.Item>
  );
}

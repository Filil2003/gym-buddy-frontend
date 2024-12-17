import type { Exercise } from '#entities/exercise';
import { Flex, List, Typography } from 'antd';
import { Fragment } from 'react';
import { useDragAndDropContext } from '../lib/DragAndDropProvider.tsx';
import type { Board } from '../types.ts';
import { DropAria } from './DropAria.tsx';
import { ExerciseItem } from './ExerciseItem.tsx';

interface Props {
  board: Board;
}

export function ExerciseList({ board }: Props) {
  const { onDrop } = useDragAndDropContext();

  return (
    <Flex
      vertical={true}
      style={{ flex: '1 1 0' }}
    >
      <Typography.Text><strong>{board.title}</strong></Typography.Text>
      <List>
        <DropAria
          onDrop={(): void =>
            onDrop({
              board,
              index: 0
            })
          }
        />
        {board.exercises.map((exercise: Exercise, index: number) => (
          <Fragment key={exercise.id}>
            <ExerciseItem exercise={exercise} board={board} index={index} />
            <DropAria
              onDrop={(): void =>
                onDrop({
                  board,
                  index: index + 1
                })
              }
            />
          </Fragment>
        ))}
      </List>
    </Flex>
  );
}

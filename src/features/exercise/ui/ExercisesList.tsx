import {
  type Exercise,
  type QueryParams,
  useExerciseStore
} from '#entities/exercise';
import { SearchBar } from '#features/exercise/ui/components/SearchBar.tsx';
import { useUrlStorage } from '#shared/lib/react/hooks/useUrlStorage.ts';
import { List, Row, Typography } from 'antd';
import { CreateButton } from './components/CreateButton.tsx';
import { EditButton } from './components/EditButton.tsx';
import { ExerciseImage } from './components/ExerciseImage.tsx';
import { RemoveButton } from './components/RemoveButton.tsx';

export function ExercisesList() {
  const filteredExercises: Exercise[] = useExerciseStore(
    (state) => state.getFilteredExercises
  )();

  const { queryParams, setQueryParams } = useExerciseStore((state) => state);
  useUrlStorage<QueryParams>(queryParams, setQueryParams);

  return (
    <>
      <Row justify="space-between" align="middle">
        <Typography.Title level={1}>Exercises</Typography.Title>
        <CreateButton />
      </Row>

      <SearchBar />

      <List
        itemLayout="horizontal"
        dataSource={filteredExercises}
        renderItem={(exercise: Exercise) => (
          <List.Item
            actions={[
              <EditButton key="edit" id={exercise.id} />,
              <RemoveButton key="remove" id={exercise.id} />
            ]}
          >
            <List.Item.Meta
              avatar={
                <ExerciseImage
                  src={exercise.imageFileName}
                  alt={exercise.name}
                />
              }
              title={exercise.name}
              description={exercise.description}
            />
          </List.Item>
        )}
      />
    </>
  );
}

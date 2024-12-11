import { useWorkoutStore, type Workout } from '#entities/workout';
import { useModal } from '#shared/lib/react/hooks/useModal';
import { Button, Card, Divider, List, Row, Typography } from 'antd';
import { WorkoutStartModal } from './WorkoutStartModal.tsx';

export function WorkoutsList() {
  const { isOpen, open, close } = useModal();
  const workouts: Workout[] = useWorkoutStore((state) => state.workouts);

  const groupedWorkouts = workouts.reduce<Record<string, Workout[]>>(
    (acc, workout) => {
      const date = new Date(workout.startedAt).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      if (!acc[date]) acc[date] = [];
      acc[date].push(workout);
      return acc;
    },
    {}
  );

  const groupedWorkoutsArray = Object.entries(groupedWorkouts);

  return (
    <>
      <Row justify="space-between" align="middle">
        <Typography.Title level={1}>Тренировки</Typography.Title>
        <Button type="primary" onClick={open}>
          Начать тренировку
        </Button>
      </Row>

      {groupedWorkoutsArray.map(([date, workoutsForDate]) => (
        <div key={date}>
          <Divider orientation="left">{date}</Divider>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={workoutsForDate}
            renderItem={(workout) => {
              const startedAt = new Date(workout.startedAt);
              const finishedAt = new Date(workout.finishedAt);
              const startTime = startedAt.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
              });
              const endTime = finishedAt.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
              });

              const durationMinutes = Math.floor(
                (finishedAt.getTime() - startedAt.getTime()) / (1000 * 60)
              );
              const durationHours = Math.floor(durationMinutes / 60);
              const duration =
                durationHours > 0
                  ? `${durationHours} ч ${durationMinutes % 60} мин`
                  : `${durationMinutes} мин`;

              return (
                <List.Item>
                  <Card>
                    <Typography.Title level={3}>
                      {workout.planTittle}
                    </Typography.Title>
                    <Typography.Paragraph>
                      <strong>Начало:</strong> {startTime} <br />
                      <strong>Конец:</strong> {endTime} <br />
                      <strong>Продолжительность:</strong> {duration}
                    </Typography.Paragraph>
                    <Typography.Title level={4}>Упражнения:</Typography.Title>
                    <div>
                      {workout.exercises.map((exercise, exerciseIndex) => (
                        <div
                          key={`${workout.id}-${exerciseIndex}`}
                          style={{
                            padding: '10px',
                            backgroundColor:
                              exerciseIndex % 2 === 0 ? '#f9f9f9' : '#e6e6e6',
                            borderRadius: '4px',
                            marginBottom: '8px'
                          }}
                        >
                          <Typography.Title level={5}>
                            {exercise.name}{' '}
                            {exercise.sets.length > 0 ? '' : '(Пропущено)'}
                          </Typography.Title>
                          <div style={{ marginTop: '8px' }}>
                            {exercise.sets.map((set, index) => (
                              <Typography.Text
                                key={`${workout.id}-${exerciseIndex}-${index}`}
                                style={{ display: 'block' }}
                              >
                                {index + 1} × {set.reps} × {set.weight} кг
                              </Typography.Text>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </List.Item>
              );
            }}
          />
        </div>
      ))}
      <WorkoutStartModal isOpen={isOpen} onClose={close} />
    </>
  );
}

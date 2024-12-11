import { type Plan, usePlanStore } from '#entities/plan';
import { create, useWorkoutStore, type Workout } from '#entities/workout';
import { sendApiRequest } from '#shared/lib/api-client';
import { Button, Card, InputNumber, Space, Typography } from 'antd';
import { useEffect } from 'react';
import {
  type NavigateFunction,
  useNavigate,
  useParams
} from 'react-router-dom';
import { useWorkoutProgressStore } from '../model/store.ts';

export function WorkoutProgressForm() {
  const { id } = useParams();
  const getPlan = usePlanStore((state) => state.getPlan);
  const addWorkout = useWorkoutStore((state) => state.addWorkout);
  const plan = getPlan(id as string) as Plan;
  const navigate: NavigateFunction = useNavigate();

  const {
    startedAt,
    exercises,
    step,
    totalSteps,
    nextStep,
    prevStep,
    initializeProgress,
    updateSet
  } = useWorkoutProgressStore();

  useEffect(() => {
    initializeProgress(plan);
  }, [plan, initializeProgress]);

  const currentExercise = exercises[step - 1];

  const handleAddSet = () => {
    if (currentExercise) {
      updateSet(currentExercise.sets.length, 0, 0);
    }
  };

  const handleSetChange = (setIndex: number, reps: number, weight: number) => {
    if (currentExercise) {
      updateSet(setIndex, reps, weight);
    }
  };

  const onFinish = async (): Promise<void> => {
    const data = {
      workoutPlanTittle: plan.name,
      startedAt,
      finishedAt: new Date().toISOString(),
      exercises
    };
    const [_, result] = await sendApiRequest<Workout>(create(data));
    if (result) addWorkout(result);

    navigate('/workouts');
  };

  return (
    <div>
      <Typography.Title level={2}>
        Прогресс тренировки "{plan.name}"
      </Typography.Title>

      {currentExercise && (
        <Card>
          <Typography.Title level={3}>{currentExercise.name}</Typography.Title>
          <Typography.Paragraph>
            {currentExercise.description}
          </Typography.Paragraph>

          <div>
            {currentExercise.sets.map((set, index) => (
              <Space
                key={`${Date.now()}-${Math.random()}`}
                align="center"
                style={{ display: 'flex', marginBottom: 10 }}
              >
                <InputNumber
                  controls={false}
                  min={0}
                  max={99}
                  size={'small'}
                  value={set.weight}
                  onChange={(value) =>
                    handleSetChange(index, set.reps, value ?? 0)
                  }
                />{' '}
                кг x
                <InputNumber
                  controls={false}
                  min={0}
                  max={99}
                  size={'small'}
                  value={set.reps}
                  onChange={(value) =>
                    handleSetChange(index, value ?? 0, set.weight)
                  }
                />{' '}
                повторения
              </Space>
            ))}

            <Button
              onClick={handleAddSet}
              type="dashed"
              style={{ marginTop: 10 }}
            >
              Добавить подход
            </Button>
          </div>

          <Space style={{ marginTop: 20 }}>
            <Button onClick={prevStep} disabled={step === 1}>
              Назад
            </Button>
            {step === totalSteps ? (
              <Button onClick={onFinish} type="primary" htmlType="submit">
                Завершить
              </Button>
            ) : (
              <Button onClick={nextStep} htmlType="button">
                Вперёд
              </Button>
            )}
          </Space>
        </Card>
      )}
    </div>
  );
}

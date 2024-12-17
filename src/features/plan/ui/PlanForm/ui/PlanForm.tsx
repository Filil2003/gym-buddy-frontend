import type { Exercise } from '#entities/exercise';
import {
  create,
  type CreatePlanData,
  getOne,
  type Plan,
  update,
  usePlanStore
} from '#entities/plan';
import { useApiClient } from '#shared/lib/api-client';
import { useAppearanceDelay } from '#shared/lib/react/hooks/useAppearanceDelay.ts';
import { Button, Flex, Form, Input, message } from 'antd';
import { useEffect } from 'react';
import {
  type NavigateFunction,
  useNavigate,
  useParams
} from 'react-router-dom';
import { RedirectButton } from '../../components/RedirectButton.tsx';
import { useExercises } from '../hooks/useExercises.ts';
import {
  DragAndDropProvider,
  type DropData
} from '../lib/DragAndDropProvider.tsx';
import type { Board } from '../types.ts';
import { ExerciseList } from './ExerciseList.tsx';

export function PlanForm() {
  const { addPlan, updatePlan } = usePlanStore();
  const [[selected, setSelected], [available, setAvailable]] = useExercises();

  const boards: Board[] = [
    {
      title: 'Избранные',
      exercises: selected,
      setExercises: setSelected
    },
    {
      title: 'Доступные',
      exercises: available,
      setExercises: setAvailable
    }
  ] as const;

  const [sendRequest, isFetching] = useApiClient();
  const isDelayedFetching: boolean = useAppearanceDelay(isFetching);
  const navigate: NavigateFunction = useNavigate();

  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect((): void => {
    if (id) {
      sendRequest<Plan>(getOne(id)).then(([error, data]) => {
        if (error && error.name !== 'AbortError')
          return message.error(error?.message);

        if (data) {
          form.setFieldsValue(data);
          setSelected(data.exercises);
        }

        setAvailable((prev) =>
          prev.filter(
            ({ id }) =>
              !data?.exercises.find(({ id: exerciseId }) => exerciseId === id)
          )
        );
      });
    }
  }, [id, form, sendRequest, setSelected, setAvailable]);

  const onDrop = ({ draggedElement, targetElement }: DropData) => {
    const exercise = draggedElement.board.exercises[
      draggedElement.index
    ] as Exercise;

    if (draggedElement.board.title === targetElement.board.title) {
      draggedElement.board.setExercises((prev) => {
        const updated = [...prev];
        updated.splice(draggedElement.index, 1);
        updated.splice(targetElement.index, 0, exercise);
        return updated;
      });
      return;
    }

    draggedElement.board.setExercises((prev) => {
      const updated = [...prev];
      updated.splice(draggedElement.index, 1);
      return updated;
    });

    targetElement.board.setExercises((prev) => {
      const updated = [...prev];
      updated.splice(targetElement.index, 0, exercise);
      return updated;
    });
  };

  const onFinish = async ({ name }: CreatePlanData) => {
    const planData: CreatePlanData = {
      name,
      exercises: selected.map((exercise) => exercise.id)
    };

    const [error, data] = id
      ? await sendRequest<Plan>(update(id, planData))
      : await sendRequest<Plan>(create(planData));

    if (error) {
      if (error.name === 'AbortError') return;
      message.error('Что-то пошло не так');
      return;
    }

    if (!data) return;

    if (id) {
      updatePlan(id, data);
    } else {
      addPlan(data);
    }

    navigate('/plans');
  };

  return (
    <DragAndDropProvider onDrop={onDrop}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        disabled={isDelayedFetching}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Name Field */}
        <Form.Item
          label="Название"
          name="name"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите название плана!'
            }
          ]}
        >
          <Input placeholder="Введите название упражнения" />
        </Form.Item>

        {/* Exercises Field */}
        <Form.Item label="Упражнения">
          <Flex gap={24}>
            {boards.map((board: Board) => (
              <ExerciseList key={board.title} board={board} />
            ))}
          </Flex>
        </Form.Item>

        {/* Buttons */}
        <Form.Item style={{ marginTop: 'auto' }}>
          <Flex gap={'1em'}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isDelayedFetching}
            >
              {id ? 'Изменить' : 'Создать'}
            </Button>
            <RedirectButton to={'/plans'}>Отменить</RedirectButton>
          </Flex>
        </Form.Item>
      </Form>
    </DragAndDropProvider>
  );
}

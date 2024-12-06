import { remove, useExerciseStore } from '#entities/exercise';
import { useApiClient } from '#shared/lib/api-client';
import { message } from 'antd';
import { type NavigateFunction, useNavigate } from 'react-router-dom';

export function useRemoveExercise(id: string) {
  const removeExercise = useExerciseStore((state) => state.removeExercise);
  const [sendRequest, isFetching] = useApiClient();
  const navigate: NavigateFunction = useNavigate();

  const sendRemoveRequest: () => Promise<void> = async () => {
    const [error] = await sendRequest(remove(id));
    if (error) {
      message.error(error.message);
      console.log(error);
      return;
    }

    removeExercise(id);
    navigate('/exercises');
  };

  return [sendRemoveRequest, isFetching] as const;
}

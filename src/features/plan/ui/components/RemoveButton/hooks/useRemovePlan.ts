import { remove, usePlanStore } from '#entities/plan';
import { useApiClient } from '#shared/lib/api-client';
import { message } from 'antd';
import { type NavigateFunction, useNavigate } from 'react-router-dom';

export function useRemovePlan(id: string) {
  const removePlan = usePlanStore((state) => state.removePlan);
  const [sendRequest, isFetching] = useApiClient();
  const navigate: NavigateFunction = useNavigate();

  const sendRemoveRequest: () => Promise<void> = async () => {
    const [error] = await sendRequest(remove(id));
    if (error) {
      message.error(error.message);
      return;
    }

    removePlan(id);
    navigate('/plans');
  };

  return [sendRemoveRequest, isFetching] as const;
}

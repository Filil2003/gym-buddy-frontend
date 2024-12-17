import { type Plan, usePlanStore } from '#entities/plan';
import { Modal, Select, Typography } from 'antd';
import { useState } from 'react';
import { type NavigateFunction, useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function WorkoutStartModal({ isOpen, onClose }: Props) {
  const [planId, setPlanId] = useState<string | null>(null);
  const plans: Plan[] = usePlanStore((state) => state.plans);
  const navigate: NavigateFunction = useNavigate();

  const handleOk = (): void => {
    if (planId) {
      navigate(`/workout/progress/${planId}`);
      onClose();
    }
  };

  return (
    <Modal
      title="Выберите план"
      open={isOpen}
      cancelText={'Отмена'}
      onCancel={() => {
        setPlanId(null);
        onClose();
      }}
      onOk={handleOk}
      okText="Начать тренировку"
      okButtonProps={{ disabled: !planId }}
    >
      <Typography.Paragraph>
        Выберите план тренировки, чтобы начать:
      </Typography.Paragraph>
      <Select
        style={{ width: '100%' }}
        placeholder="Выберите план"
        value={planId}
        onChange={(value): void => setPlanId(value)}
      >
        {plans.map((plan: Plan) => (
          <Select.Option key={plan.id} value={plan.id} disabled={plan.exercises.length === 0}>
            {plan.name} {plan.exercises.length === 0 ? '(Нет упражнений)' : ''}
          </Select.Option>
        ))}
      </Select>
    </Modal>
  );
}

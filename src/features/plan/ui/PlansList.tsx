import { type Plan, usePlanStore } from '#entities/plan';
import { List, Row, Typography } from 'antd';
import { CreateButton } from './components/CreateButton.tsx';
import { EditButton } from './components/EditButton.tsx';
import { RemoveButton } from './components/RemoveButton/index.ts';

export function PlansList() {
  const plans: Plan[] = usePlanStore((state) => state.plans);

  return (
    <>
      <Row justify="space-between" align="middle">
        <Typography.Title level={1}>Планы тренировки</Typography.Title>
        <CreateButton />
      </Row>

      <List
        itemLayout="horizontal"
        dataSource={plans}
        renderItem={(plan: Plan) => (
          <List.Item
            actions={[
              <EditButton key="edit" id={plan.id} />,
              <RemoveButton key="remove" id={plan.id} />
            ]}
          >
            <List.Item.Meta
              title={plan.name}
              description={`${plan.exercises.length} упражнения`}
            />
          </List.Item>
        )}
      />
    </>
  );
}

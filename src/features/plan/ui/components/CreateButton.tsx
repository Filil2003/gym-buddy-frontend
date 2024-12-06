import { Button } from 'antd';
import { Link } from 'react-router-dom';

export function CreateButton() {
  return (
    <Link to={'/plans/create'}>
      <Button type="primary">
        Create
      </Button>
    </Link>
  );
}

import { Button } from 'antd';
import { Link } from 'react-router-dom';

export function CreateButton() {
  return (
    <Link to={'/exercises/create'}>
      <Button type="primary">
        Create
      </Button>
    </Link>
  );
}

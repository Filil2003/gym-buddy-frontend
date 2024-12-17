import { HttpStatusCode, HttpStatusMessage } from '#shared/enums/http';
import { Button, Flex, Result } from 'antd';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <Flex justify={'center'} align={'center'} style={{ height: '100%' }}>
    <Result
      status={HttpStatusCode.NotFound}
      title={`${HttpStatusCode.NotFound} ${HttpStatusMessage.NotFound}`}
      subTitle="К сожалению, страница, которую вы посетили, не существует."
      extra={
        <Link to="/">
          <Button type="primary">Вернуться на главную</Button>
        </Link>
      }
    />
  </Flex>
);

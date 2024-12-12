import { HttpStatusCode } from '#shared/enums/http';
import { Button, Flex, Result } from 'antd';

export const ErrorPage = () => (
  <Flex justify={'center'} align={'center'} style={{ height: '100%' }}>
    <Result
      status={HttpStatusCode.InternalServerError}
      title={'Ой! Что-то пошло не так'}
      subTitle="Попробуйте перезагрузить страницу или вернитесь позже."
      extra={
        <Button type="primary" onClick={() => window.location.reload()}>
          Перезагрузить страницу
        </Button>
      }
    />
  </Flex>
);

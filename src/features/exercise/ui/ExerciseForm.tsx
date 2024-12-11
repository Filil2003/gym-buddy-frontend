import {
  create,
  type CreateExerciseData,
  type Exercise,
  getOne,
  update,
  useExerciseStore
} from '#entities/exercise';
import { useApiClient } from '#shared/lib/api-client';
import { useAppearanceDelay } from '#shared/lib/react/hooks/useAppearanceDelay.ts';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, message, Upload } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RemoveButton } from './components/RemoveButton/index.ts';

export const ExerciseForm = () => {
  const [form] = Form.useForm();
  const { addExercise, updateExercise } = useExerciseStore((state) => state);
  const navigate = useNavigate();
  const { id } = useParams();
  const [sendRequest, isFetching] = useApiClient();
  const isDelayedFetching: boolean = useAppearanceDelay(isFetching);

  useEffect((): void => {
    if (id) {
      sendRequest<Exercise>(getOne(id)).then(([error, data]) => {
        if (error && error.name !== 'AbortError') message.error(error?.message);
        else form.setFieldsValue(data);
      });
    }
  }, [id, form, sendRequest]);

  const onFinish = async (values: CreateExerciseData) => {
    const formData = {
      name: values.name,
      description: values.description,
      image: values.image,
      note: values.note
    };

    const [error, body] = id
      ? await sendRequest<Partial<Exercise>>(update(id, formData))
      : await sendRequest<Exercise>(create(formData));

    if (error) {
      if (error.name === 'AbortError') return;
      message.error('Ошибка при сохранении');
      return;
    }

    if (body) {
      id ? updateExercise(id, body) : addExercise(body as Exercise);
    }

    navigate('/exercises');
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      disabled={isDelayedFetching}
    >
      {/* Name Field */}
      <Form.Item
        label="Название"
        name="name"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите название упражнения!'
          }
        ]}
      >
        <Input placeholder="Введите название упражнения" />
      </Form.Item>

      {/* Description Field */}
      <Form.Item label="Описание" name="description">
        <Input.TextArea
          rows={4}
          placeholder="Добавьте краткое описание упражнения"
        />
      </Form.Item>

      {/* Image Upload */}
      <Form.Item label="Изображение" name="image">
        <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Загрузить</Button>
        </Upload>
      </Form.Item>

      {/* Notes Field */}
      <Form.Item label="Заметка" name="note">
        <Input.TextArea
          rows={3}
          placeholder="Добавьте любые дополнительные примечания или инструкции."
        />
      </Form.Item>

      {/* Buttons */}
      <Form.Item>
        <Flex gap={'1em'}>
          <Button type="primary" htmlType="submit" loading={isDelayedFetching}>
            {id ? 'Обновить' : 'Создать'}
          </Button>
          <Button type="default" onClick={() => navigate('/exercises')}>
            Отменить
          </Button>
          {id && (
            <RemoveButton id={id} style={{ marginLeft: 'auto' }}>
              Удалить
            </RemoveButton>
          )}
        </Flex>
      </Form.Item>
    </Form>
  );
};

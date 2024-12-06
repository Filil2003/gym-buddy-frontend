import {
  create,
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

  const onFinish = async (values: Exercise) => {
    const [error] = id
      ? await sendRequest(update(id, values))
      : await sendRequest(create(values));

    if (error) {
      if (error.name === 'AbortError') return;
      message.error('Something went wrong');
      return;
    }

    if (id) {
      updateExercise(id, values);
    } else {
      addExercise(values);
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
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input the name of the exercise!'
          }
        ]}
      >
        <Input placeholder="Enter exercise name" />
      </Form.Item>

      {/* Description Field */}
      <Form.Item label="Description" name="description">
        <Input.TextArea
          rows={4}
          placeholder="Add a brief description of the exercise"
        />
      </Form.Item>

      {/* Image Upload */}
      <Form.Item label="Image" name="image">
        <Upload
          action="/upload"
          listType="picture"
          maxCount={1}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      {/* Notes Field */}
      <Form.Item label="Notes" name="note">
        <Input.TextArea
          rows={3}
          placeholder="Add any additional notes or instructions"
        />
      </Form.Item>

      {/* Buttons */}
      <Form.Item>
        <Flex gap={'1em'}>
          <Button type="primary" htmlType="submit" loading={isDelayedFetching}>
            {id ? 'Update' : 'Create'}
          </Button>
          <Button type="default" onClick={() => navigate('/exercises')}>
            Cancel
          </Button>
          {id && (
            <RemoveButton id={id} style={{ marginLeft: 'auto' }}>
              Remove
            </RemoveButton>
          )}
        </Flex>
      </Form.Item>
    </Form>
  );
};

import { Image } from 'antd';
import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof Image>;

export const ExerciseImage = ({ src, alt, ...props }: Props) => (
  <Image
    src={src || '/icons/placeholder.svg'}
    alt={alt}
    width={50}
    height={50}
    preview={false}
    style={{
      objectFit: 'cover',
      borderRadius: '50%'
    }}
    {...props}
  />
);

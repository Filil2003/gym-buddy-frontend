import { Image } from 'antd';
import type { SyntheticEvent } from 'react';

interface Props {
  fileName?: string;
  alt: string;
}

const apiUrl: string = import.meta.env.VITE_API_URL;

export const ExerciseImage = ({ fileName, alt }: Props) => (
  <Image
    src={fileName ? `${apiUrl}/uploads/${fileName}` : '/icons/placeholder.svg'}
    alt={alt}
    width={50}
    height={50}
    preview={false}
    style={{
      objectFit: 'cover',
      borderRadius: '50%'
    }}
    onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
      const target = e.target as HTMLImageElement;
      target.onerror = null;
      target.src = '/icons/placeholder.svg';
    }}
  />
);

import { Alert } from 'antd';
import { useLayoutEffect, useState } from 'react';

export const Banner = () => {
  const [ isClosed, setIsClosed ] = useState(true);

  useLayoutEffect(() => {
    const bannerClosed = localStorage.getItem('bannerClosed');
    if (bannerClosed) setIsClosed(false);
  }, []);

  const handleClose = () => {
    localStorage.setItem('bannerClosed', 'true');
  };

  if (!isClosed) return null;

  return (
    <Alert
      message="👋 Привет! Это мой учебный проект. Не судите строго: что-то работает, а что-то… делает вид, что работает. 😊"
      description="О всех найденных ошибках пишите на бумаге 📝, а потом сожгите её 🔥 в новогоднюю ночь 🎄, загадав желание, чтобы всё исправилось ✨. Спасибо, что заглянули!"
      type="success"
      closable={true}
      afterClose={handleClose}
      style={{
        position: 'fixed',
        width: '100%',
        zIndex: 1000
      }}
    />
  );
};

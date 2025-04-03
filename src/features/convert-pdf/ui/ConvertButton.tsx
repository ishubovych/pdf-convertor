import { memo } from 'react';
import { STYLES } from './styles';
import { ConvertButtonProps } from '../model/types';

export const ConvertButton = memo(({ loading, isPending, progress, disabled }: ConvertButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={STYLES.button}
    >
      {loading ? (
        <>
          <span className={STYLES.spinner} />
          Завантаження {progress}%
        </>
      ) : isPending ? (
        <>
          <span className={STYLES.processingIcon}>🌀</span> Обробка...
        </>
      ) : (
        'Конвертувати в PDF'
      )}
    </button>
  );
});

ConvertButton.displayName = 'ConvertButton'; 
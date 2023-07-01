import { memo, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/func';
import { combinations } from '../../lib/codes/combinations.ts';
import { codeItems } from '../../lib/codes/codes.ts';
import cls from './Codes.module.scss';

interface CodesProps {
  className?: string;
}

const keyToCodeIdxMap: Record<string, number> = {
  KeyQ: 0,
  KeyW: 1,
  KeyE: 2,
  KeyR: 3,
  KeyT: 4,
  KeyY: 5,
};

export const Codes = memo((props: CodesProps) => {
  const { className } = props;
  const [code, setCode] = useState([0, 0, 0, 0, 0, 0]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const codeIdx = keyToCodeIdxMap[event.code];

    if (codeIdx !== undefined) {
      setCode((pv) => {
        const newCode = [...pv];
        newCode[codeIdx] = (newCode[codeIdx] + 1) % 9;

        return newCode;
      });
    }
  }, []);

  useEffect(() => {
    const combination = combinations[code.join('')];

    if (combination) {
      new Audio(combination).play();
    }
  }, [code]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={classNames(cls.codes, [className])}>
      {code.map((i, idx) => (
        <img key={idx} className={cls.code} src={codeItems[i]} alt="versus code" />
      ))}
    </div>
  );
});

import { ReactNode } from 'react';
import cls from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
}

export const Page = (props: PageProps) => {
  const { className, children } = props;

  return (
    <div className={cls.page}>
      <div className={className}>{children}</div>
    </div>
  );
};

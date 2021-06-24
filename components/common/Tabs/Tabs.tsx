import React from 'react';
import cn from 'classnames';
import cls from './Tabs.module.scss';

type TabType = {
  id: string;
  text: string;
};

type Props = {
  tabs: TabType[];
  activeTab: string;
  onClick: (id: string) => void;
};

export const Tabs: React.FC<Props> = ({ tabs, activeTab, onClick }) => {
  return (
    <ul className={cls.tabs}>
      {tabs.map((tab) => (
        <li key={tab.id}>
          <button
            type="button"
            className={cn(cls.tab, { [cls.tab_active]: tab.id === activeTab })}
            onClick={() => onClick(tab.id)}
          >
            {tab.text}
          </button>
        </li>
      ))}
    </ul>
  );
};

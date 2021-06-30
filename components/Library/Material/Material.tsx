import React from 'react';

interface PropsI {
  materialId: number;
}

export const Material: React.FC<PropsI> = ({ materialId }) => {
  return <div>material #{materialId}</div>;
};

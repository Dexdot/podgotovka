import React from 'react';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(
  () => import('@/components/common/TextEditor/TextEditor'),
  { ssr: false }
);

const TestPage: React.FC = () => {
  return <TextEditor data={{ blocks: [] }} />;
};

export default TestPage;

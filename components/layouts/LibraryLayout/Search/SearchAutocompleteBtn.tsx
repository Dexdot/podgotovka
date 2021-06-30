import React from 'react';

import { HighlightText } from '@/components/common/HighlightText/HighlighText';

interface PropsI {
  href: string;
  value: string;
  search: string;
}

export const SearchAutocompleteBtn = React.forwardRef(
  ({ href, value, search }: PropsI, ref: any) => {
    return (
      <a href={href} ref={ref}>
        <HighlightText search={search} value={value} />
      </a>
    );
  }
);

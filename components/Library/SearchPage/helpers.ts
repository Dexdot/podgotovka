/* eslint-disable no-restricted-syntax */

const getFragment = (block: string, search: string): string => {
  const indexOfSearch = block.indexOf(search);
  const indexFrom = Math.max(indexOfSearch - 30, 0);
  const indexTo = Math.min(indexOfSearch + 30, block.length);

  return block.substr(indexFrom, indexTo - indexFrom);
};

export const getDescription = (json: string, search: string): string => {
  if (json) {
    const res: string[] = [];
    const data = JSON.parse(json);

    for (const item of data) {
      switch (item.type) {
        case 'paragraph':
        case 'header':
          res.push(getFragment(item.data.text, search));
          break;
        case 'table':
          item.data.content.map((row: string[]) => {
            row.map((cell: string) => {
              res.push(getFragment(cell, search));
              return cell;
            });
            return row;
          });
          break;
        case 'list':
          item.data.items.map((li: string) => {
            res.push(getFragment(li, search));
            return li;
          });
          break;
        case 'checklist':
          item.data.items.map((li: { text: string }) => {
            res.push(getFragment(li.text, search));
            return li;
          });
          break;
        case 'quote':
          res.push(getFragment(item.data.text, search));
          res.push(getFragment(item.data.caption, search));
          break;
        case 'warning':
          res.push(getFragment(item.data.message, search));
          res.push(getFragment(item.data.title, search));
          break;
        case 'code':
          res.push(getFragment(item.data.code, search));
          break;
        case 'raw':
          res.push(getFragment(item.data.html, search));
          break;
        case 'attaches':
          res.push(getFragment(item.data.title, search));
          break;
        default:
          break;
      }
    }

    return res.filter((item) => item.trim() !== '').join(' ... ');
  }
  return '';
};

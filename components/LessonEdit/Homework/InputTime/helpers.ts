import { DropdownType } from '@/components/common/Dropdown/Dropdown';
import { secondsToHm } from '@/utils/date';

const tmp = new Array(24).fill(0);

export const times: DropdownType[] = tmp.map((_, i) => {
  const min = (i + 1) * 15;
  const sec = min * 60;
  const item = { id: `${min}`, text: secondsToHm(sec) };
  return item;
});

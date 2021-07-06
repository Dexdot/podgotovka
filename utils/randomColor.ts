export function randomColor(id: number): string {
  const colors = [
    '#56CCF2',
    '#BB6BD9',
    '#6FCF97',
    '#F2C94C',
    '#967CBA',
    '#FF9960',
    '#566FF2',
    '#FF5733',
    '#FF89C9',
    '#56F2DF',
    '#F38460',
    '#939ED6',
    '#F271A0',
    '#2ABF93',
    '#FF9C9C',
    '#6EC1F0',
    '#3B4244'
  ];
  const i = id % (colors.length - 1);
  return colors[i];
}

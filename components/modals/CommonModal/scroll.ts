let top = 0;
let lock = false;

const disable = () => {
  if (lock) return;
  lock = true;

  top = window.pageYOffset;

  const body = document.querySelector('body') as HTMLElement;
  body.style.top = `-${top}px`;
  body.classList.add('no-scroll');
};

const enable = () => {
  if (!lock) return;
  lock = false;

  const body = document.querySelector('body') as HTMLElement;
  body.style.top = '';
  body.classList.remove('no-scroll');

  window.scrollTo(0, top);
};

export const scroll = { disable, enable };

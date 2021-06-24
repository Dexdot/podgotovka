import React from 'react';

export function SubjectIcon(): JSX.Element {
  return (
    <svg
      width="20"
      height="26"
      viewBox="0 0 20 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.4754 15.9018V3.56165C19.4754 2.75931 19.1529 1.98984 18.579 1.4225C18.005 0.855165 17.2266 0.536438 16.4149 0.536438C15.6032 0.536438 14.8247 0.855165 14.2508 1.4225C13.6768 1.98984 13.3544 2.75931 13.3544 3.56165V6.82152C12.7778 6.54491 12.1272 6.45646 11.4964 6.56892C10.8656 6.68138 10.2873 6.98895 9.84474 7.44727C9.39974 6.98645 8.8175 6.67812 8.18286 6.56722C7.54821 6.45632 6.89432 6.54864 6.31646 6.83073V3.67208C6.31646 2.84412 5.98372 2.05006 5.39143 1.46461C4.79915 0.879148 3.99584 0.550241 3.15823 0.550241C2.32062 0.550241 1.51731 0.879148 0.925023 1.46461C0.33274 2.05006 0 2.84412 0 3.67208V15.9041C0 15.9317 0 15.9593 0 15.9869C0.0395221 18.5136 1.08271 20.9237 2.90437 22.6967C4.72602 24.4698 7.18 25.4636 9.73652 25.4636C12.293 25.4636 14.747 24.4698 16.5687 22.6967C18.3903 20.9237 19.4335 18.5136 19.473 15.9869C19.473 15.9593 19.473 15.9317 19.473 15.9064L19.4754 15.9018ZM12.0418 8.21105C12.3706 8.21117 12.688 8.33077 12.9334 8.5471C13.1789 8.76343 13.3353 9.0614 13.373 9.38433V12.0092V15.0828C13.3806 15.2613 13.3515 15.4394 13.2876 15.6066C13.2237 15.7737 13.1262 15.9263 13.0011 16.0552C12.876 16.1842 12.7258 16.2868 12.5595 16.3569C12.3933 16.427 12.2144 16.4631 12.0336 16.4631C11.8529 16.4631 11.674 16.427 11.5077 16.3569C11.3415 16.2868 11.1913 16.1842 11.0662 16.0552C10.941 15.9263 10.8436 15.7737 10.7797 15.6066C10.7158 15.4394 10.6867 15.2613 10.6942 15.0828V9.52926C10.6948 9.17862 10.836 8.84251 11.0869 8.59457C11.3377 8.34662 11.6777 8.20706 12.0325 8.20645L12.0418 8.21105ZM7.65702 8.20645C8.01175 8.20706 8.35178 8.34662 8.60262 8.59457C8.85345 8.84251 8.99464 9.17862 8.99525 9.52926V12.9157H6.3281V9.52926C6.32871 9.17822 6.47022 8.84176 6.72156 8.59375C6.9729 8.34574 7.31352 8.20645 7.66866 8.20645H7.65702ZM2.15514 2.61843C2.36072 2.41617 2.62287 2.27939 2.90781 2.22572C3.19274 2.17205 3.48741 2.20396 3.75383 2.31732C4.02026 2.43068 4.24624 2.62031 4.40266 2.86177C4.55908 3.10323 4.63876 3.38545 4.63145 3.67208V9.31991C4.63145 9.34292 4.63145 9.36362 4.63145 9.38663C4.63145 9.40963 4.63145 9.47635 4.63145 9.52236V12.9088H1.70828V3.67208C1.70756 3.4765 1.74676 3.28279 1.82354 3.10254C1.90032 2.92228 2.0131 2.75919 2.15514 2.62303V2.61843ZM9.74467 23.8386C7.62698 23.8478 5.59207 23.0263 4.08636 21.5544C2.58065 20.0824 1.72709 18.0801 1.71294 15.9869C1.71526 15.9593 1.71526 15.9316 1.71294 15.9041V14.5974H8.75786C8.63082 14.9812 8.41576 15.3307 8.12948 15.6188C7.64669 16.0943 7.00193 16.3748 6.32111 16.4056H5.47395V18.0827H6.24897C6.4817 18.1425 7.93165 18.5819 7.93165 20.213H9.6283C9.64057 19.698 9.54334 19.1861 9.34289 18.7106C9.14243 18.235 8.84322 17.8064 8.46462 17.4523C8.77689 17.2677 9.06395 17.0443 9.31876 16.7875C9.36298 16.7438 9.40487 16.6978 9.44676 16.6517C9.78926 17.2148 10.3098 17.6507 10.9279 17.8921C11.546 18.1335 12.2274 18.167 12.8667 17.9874C13.506 17.8078 14.0677 17.4251 14.4651 16.8985C14.8624 16.3718 15.0732 15.7305 15.065 15.0736V9.52926C15.065 9.45334 15.065 9.37742 15.065 9.29921L15.0441 3.54785C15.0404 3.37051 15.0724 3.19422 15.1385 3.02928C15.2045 2.86435 15.3031 2.71408 15.4286 2.58727C15.5541 2.46046 15.7039 2.35965 15.8692 2.29074C16.0346 2.22183 16.2122 2.18619 16.3916 2.18593C16.7572 2.18593 17.1079 2.32934 17.3667 2.58469C17.6254 2.84003 17.7711 3.18643 17.7717 3.54785V15.888C17.7717 15.9133 17.7717 15.9409 17.7717 15.9685C17.7576 18.0613 16.9043 20.0632 15.3991 21.5351C13.8939 23.007 11.8596 23.8288 9.74234 23.8202"
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="-9.73768"
          y1="13"
          x2="14.449"
          y2="31.8969"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C48AFF" />
          <stop offset="1" stopColor="#AA65F0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

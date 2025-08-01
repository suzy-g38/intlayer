import { FC, SVGProps } from 'react';

export const AntropicLogo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    height="24"
    width="24"
    {...props}
  >
    <path
      fill="currentColor"
      d="m13.788825 3.932 6.43325 16.136075h3.5279L17.316725 3.932H13.788825Z"
      strokeWidth="0.25"
    />
    <path
      fill="currentColor"
      d="m6.325375 13.682775 2.20125 -5.67065 2.201275 5.67065H6.325375ZM6.68225 3.932 0.25 20.068075h3.596525l1.3155 -3.3886h6.729425l1.315275 3.3886h3.59655L10.371 3.932H6.68225Z"
      strokeWidth="0.25"
    />
  </svg>
);

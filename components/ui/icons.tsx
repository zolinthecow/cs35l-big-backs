import React from 'react';
import Image from 'next/image';

export const IconMute: React.FC<{ color?: string, size?: number }> = ({ color = '#000000', size = 50 }) => (
    <svg
      height={size}
      width={size}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <line fill="none" stroke={color} stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" x1="32" x2="42" y1="20" y2="30" />
      <line fill="none" stroke={color} stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" x1="42" x2="32" y1="20" y2="30" />
      <rect fill="none" height="50" width="50" />
      <rect fill="none" height="50" width="50" />
      <path d="M10,33H3  c-1.103,0-2-0.898-2-2V19c0-1.102,0.897-2,2-2h7" fill="none" stroke={color} stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2.08" />
      <path d="M9.604,32.43  C9.256,32.129,9,31.391,9,30.754V19.247c0-0.637,0.256-1.388,0.604-1.689L22.274,4.926C23.905,3.27,26,3.898,26,6.327v36.988  c0,2.614-1.896,3.604-3.785,1.686L9.604,32.43z" fill="none" stroke={color} stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.9797" />
    </svg>
);

export const IconAdd: React.FC<{color?: string, size?: number}> =({ color = '#000000', size = 50}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill= {color}
    width= {size}
    height= {size}
  >
    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/>
  </svg>
);

export const IconFire: React.FC = () => (
    <Image src="/icons/iconfire.png" alt="Like Icon" width={24} height={24} />
);

export const IconHeart: React.FC = () => (
    <Image src="/icons/iconheart.png" alt="Like Icon" width={24} height={24} />
);

export const IconHands: React.FC = () => (
    <Image src="/icons/iconhands.webp" alt="Like Icon" width={24} height={24} />
);

export const IconLove: React.FC = () => (
    <Image src="/icons/IconHeartEyes.png" alt="Like Icon" width={24} height={24} />
);

export const IconArrowDown: React.FC<{ color?: string, size?: number }> = ({ color = '#000000', size = 50 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill={color}
        width={size}
        height={size}
    >
    <polygon points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 " />
  </svg>
);


export const IconSend: React.FC<{color?: string, size?: number}> = ({ color = '#000000', size = 50 }) => (
    <svg
      fill="none"
      height={size}
      viewBox="0 0 48 48"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" fill="#fff" fillOpacity="0.01" />
      <g stroke={color} strokeLinejoin="round" strokeWidth="4">
        <path d="M43 5L29.7 43 22.1 25.9 5 18.3z" />
        <path d="M43 5L22.1 25.9" strokeLinecap="round" />
      </g>
    </svg>
  );


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
      <line fill="none" stroke={color} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" x1="32" x2="42" y1="20" y2="30" />
      <line fill="none" stroke={color} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" x1="42" x2="32" y1="20" y2="30" />
      <rect fill="none" height="50" width="50" />
      <rect fill="none" height="50" width="50" />
      <path d="M10,33H3  c-1.103,0-2-0.898-2-2V19c0-1.102,0.897-2,2-2h7" fill="none" stroke={color} strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.08" />
      <path d="M9.604,32.43  C9.256,32.129,9,31.391,9,30.754V19.247c0-0.637,0.256-1.388,0.604-1.689L22.274,4.926C23.905,3.27,26,3.898,26,6.327v36.988  c0,2.614-1.896,3.604-3.785,1.686L9.604,32.43z" fill="none" stroke={color} strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.9797" />
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


  export const BirdIcon: React.FC<{color?: string, size?: number}> = ({ color = '#000000', size = 50 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 7h.01" />
        <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
        <path d="m20 7 2 .5-2 .5" />
        <path d="M10 18v3" />
        <path d="M14 17.75V21" />
        <path d="M7 18a6 6 0 0 0 3.84-10.61" />
    </svg>
);

  
export const CalendarIcon: React.FC<{color?: string, size?: number}> = ({ color = '#000000', size = 50 }) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width= {size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke= {color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    >
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
    </svg>
);
  
  
export const ClubIcon: React.FC<{color?: string, size?: number}> = ({ color = '#000000', size = 50 }) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke= {color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    >
    <path d="M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z" />
    <path d="M12 17.66L12 22" />
    </svg>
);
  
  
export const FlagIcon: React.FC<{color?: string, size?: number}> = ({ color = '#000000', size = 50 }) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    >
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
);
  
  
export const SearchIcon: React.FC<{color?: string, size?: number}> = ({ color = '#000000', size = 50 }) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke= {color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
    </svg>
);
  
  
export const ShoppingBasketIcon: React.FC<{color?: string, size?: number}> = ({ color = '#000000', size = 50 }) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width= {size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke= {color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    >
    <path d="m15 11-1 9" />
    <path d="m19 11-4-7" />
    <path d="M2 11h20" />
    <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
    <path d="M4.5 15.5h15" />
    <path d="m5 11 4-7" />
    <path d="m9 11 1 9" />
    </svg>
);
  
  
export const TrophyIcon: React.FC<{color?: string, size?: number}> = ({ color = '#000000', size = 50 }) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
);
  
  
  export const TurtleIcon: React.FC<{color?: string, size?: number}> = ({ color = '#000000', size = 50 }) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height= {size}
    viewBox="0 0 24 24"
    fill="none"
    stroke= {color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    >
    <path d="m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z" />
    <path d="M4.82 7.9 8 10" />
    <path d="M15.18 7.9 12 10" />
    <path d="M16.93 10H20a2 2 0 0 1 0 4H2" />
    </svg>
);


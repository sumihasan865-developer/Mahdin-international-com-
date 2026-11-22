import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
}

export default function Logo({ className = '', size = '100%' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background / Base shadows or subtle glows if necessary */}
      
      {/* GEAR STRUCTURE */}
      <g id="gear-container">
        {/* Gear Teeth Base Calculations (Centered at 50, 50 with radius 36)
            We define trapezoidal teeth pointing outwards. Each tooth is rotated around (50, 50).
            Alternating colors: 
            0° (top) = Blue, 60° (top-right) = Blue, 120° (bottom-right) = Orange,
            180° (bottom) = Orange, 240° (bottom-left) = Blue, 300° (top-left) = Orange.
        */}
        
        {/* TOOTH 0: Top (0°) - Blue */}
        <path
          d="M 45,6 L 55,6 L 59,22 L 41,22 Z"
          fill="#1d4ed8" /* Solid rich blue */
          transform="rotate(0, 50, 50)"
        />
        
        {/* TOOTH 1: Top-Right (60°) - Blue */}
        <path
          d="M 45,6 L 55,6 L 59,22 L 41,22 Z"
          fill="#1d4ed8"
          transform="rotate(60, 50, 50)"
        />
        
        {/* TOOTH 2: Bottom-Right (120°) - Orange */}
        <path
          d="M 45,6 L 55,6 L 59,22 L 41,22 Z"
          fill="#ea580c" /* Solid industrial orange */
          transform="rotate(120, 50, 50)"
        />
        
        {/* TOOTH 3: Bottom (180°) - Orange */}
        <path
          d="M 45,6 L 55,6 L 59,22 L 41,22 Z"
          fill="#ea580c"
          transform="rotate(180, 50, 50)"
        />
        
        {/* TOOTH 4: Bottom-Left (240°) - Blue */}
        <path
          d="M 45,6 L 55,6 L 59,22 L 41,22 Z"
          fill="#1d4ed8"
          transform="rotate(240, 50, 50)"
        />
        
        {/* TOOTH 5: Top-Left (300°) - Orange */}
        <path
          d="M 45,6 L 55,6 L 59,22 L 41,22 Z"
          fill="#ea580c"
          transform="rotate(300, 50, 50)"
        />

        {/* DYNAMIC SWOOSHES / INNER GEAR RING */}
        {/* These crescent paths resemble the circular outer flow of the gear ring */}
        
        {/* Blue Crescent Swoosh - curves around top-right, right and bottom-left side */}
        <path
          d="M 23,23 C 35,11 65,11 77,23 C 89,35 89,65 77,77 C 73,81 67,83 62,84 C 64,81 66,76 66,71 C 74,63 74,37 66,29 C 58,21 42,21 34,29 C 29,34 27,41 27,48 C 23,43 21,34 23,23 Z"
          fill="#1d4ed8"
        />

        {/* Orange Crescent Swoosh - curves around bottom-left, bottom, and top-right side */}
        <path
          d="M 77,77 C 65,89 35,89 23,77 C 11,65 11,35 23,23 C 27,19 33,17 38,16 C 36,19 34,24 34,29 C 26,37 26,63 34,71 C 42,79 58,79 66,71 C 71,66 73,59 73,52 C 77,57 79,66 77,77 Z"
          fill="#ea580c"
        />
      </g>

      {/* INNER CENTRAL CIRCLE - White background base */}
      <circle cx="50" cy="50" r="30" fill="#ffffff" />

      {/* "mi" BRAND CALLIGRAPHY */}
      <g id="mi-lettering" transform="translate(1, -0.5)">
        {/* Stylized custom cursive brush strokes for "m" */}
        {/* First arch of 'm' */}
        <path
          d="M 32,53 C 31,43 32,38 35,37 C 37,36 39.5,38 39.5,43 C 39.5,49 40.5,53 41,56 C 41.5,58 40.5,59 40,59 C 39,59 38,55 37,50"
          fill="none"
          stroke="#16a34a" /* Elegant emerald/kelly green */
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Second arch of 'm' */}
        <path
          d="M 39,45 C 41,38 43,36 45,36 C 47.5,36 49,39 49,44 C 49,50 50,54 50.5,58 C 51,59.5 49.5,60 49,60 C 48,60 47,56 46,50"
          fill="none"
          stroke="#16a34a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Third segment linking to 'i' */}
        <path
          d="M 48.5,46 C 50.5,39 52.5,37 54.5,37 C 56.5,37 57.5,40 57,44 C 55.5,53 58,56 61.5,56 C 64,56 67.5,50 71.5,42"
          fill="none"
          stroke="#16a34a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Cursive 'i' stem and loop */}
        <path
          d="M 59.5,34 C 61.5,32 63.5,31 64,31 C 64.5,31 64.5,33 63.5,37 C 62,43 62,50 63,54 C 63.5,56 62.5,57 61.5,57 C 60.5,57 59.5,54 59.5,50 C 59.5,44 59,38 59.5,34 Z"
          fill="#16a34a"
        />

        {/* Underline swoosh connecting characters gracefully */}
        <path
          d="M 34,51 C 41,57 53,58 64,54"
          fill="none"
          stroke="#16a34a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Orange Crescent Dot for 'i' (dynamic brush tip) */}
        <path
          d="M 62,24 C 64.5,23.5 67.5,25 69,27 C 67,28.5 64,28 62,26.5 C 61,25.8 61,24.5 62,24 Z"
          fill="#ea580c"
        />
      </g>
    </svg>
  );
}

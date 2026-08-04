import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

/** App icon / favicon — sprout mark on fresh green */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#3CA345',
          borderRadius: 8,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 20V11"
            stroke="#1F3D1A"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M12 12C12 12 8 11 7 7C11 7 12 12 12 12Z"
            fill="#EAF5E2"
            stroke="#1F3D1A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 14C12 14 16 13 17 9C13 9 12 14 12 14Z"
            fill="#FAF7EF"
            stroke="#1F3D1A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  )
}

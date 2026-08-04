import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AgriChain — empowering farmers through blockchain'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px',
          background: 'linear-gradient(145deg, #FAF7EF 0%, #EAF5E2 100%)',
          color: '#1F3D1A',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: '#3CA345',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1F3D1A',
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            A
          </div>
          <span style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.02em' }}>AgriChain</span>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 300,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            textTransform: 'lowercase',
            maxWidth: 900,
          }}
        >
          empowering farmers through blockchain
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 24,
            color: '#5A6B52',
            maxWidth: 720,
            lineHeight: 1.4,
          }}
        >
          Fair, direct harvest trade on Base — transparent prices, no middleman.
        </div>
      </div>
    ),
    { ...size }
  )
}

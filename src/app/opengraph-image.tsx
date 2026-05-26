import { ImageResponse } from 'next/og';

// Next.js convention: this file is rendered at build time and auto-wired as
// both the og:image and twitter:image for every page under /app. The hashed
// URL means social platforms re-crawl when the image actually changes.

export const runtime = 'edge';
export const alt =
  'Zwe Thuta — Frontend-first Full-Stack Developer · Cinematic portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px 88px',
          color: '#f6f6f7',
          background:
            'linear-gradient(135deg, #02030a 0%, #050506 55%, #1a1208 100%)',
          position: 'relative',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        {/* atmospheric warm glow — Interstellar accent */}
        <div
          style={{
            position: 'absolute',
            right: -180,
            top: -180,
            width: 640,
            height: 640,
            borderRadius: '50%',
            background:
              'radial-gradient(closest-side, rgba(243,217,177,0.22), transparent)',
          }}
        />
        {/* cool counter glow — bottom-left */}
        <div
          style={{
            position: 'absolute',
            left: -160,
            bottom: -200,
            width: 540,
            height: 540,
            borderRadius: '50%',
            background:
              'radial-gradient(closest-side, rgba(91,141,239,0.18), transparent)',
          }}
        />

        {/* eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            fontSize: 20,
            letterSpacing: '0.45em',
            color: '#9a9ba2',
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: 64,
              height: 1,
              background: '#d4a373',
            }}
          />
          Portfolio · 2025 Edition
        </div>

        {/* headline block — pushed to the bottom of the frame */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: 110,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              fontStyle: 'italic',
            }}
          >
            Zwe Thuta
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 40,
              lineHeight: 1.15,
              color: '#c2c3c7',
              maxWidth: 920,
              letterSpacing: '-0.01em',
            }}
          >
            Frontend-first full-stack developer crafting cinematic,
            performance-obsessed web experiences.
          </div>
        </div>

        {/* footer rail */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 28,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 18,
            letterSpacing: '0.32em',
            color: '#6f7079',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#6ee7b7',
                boxShadow: '0 0 16px rgba(110,231,183,0.9)',
              }}
            />
            zwethutaminthein.com
          </div>
          <div>Yangon · Myanmar</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

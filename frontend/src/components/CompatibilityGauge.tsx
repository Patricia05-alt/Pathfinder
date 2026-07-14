import { useEffect, useState } from 'react'
import './CompatibilityGauge.css'

interface CompatibilityGaugeProps {
  /** 0–100 */
  value: number
  label: string
  sublabel?: string
  /** Any CSS color for the progress arc. */
  color?: string
  size?: number
}

// Animated radial gauge that fills from 0 to `value` on mount / value change.
const CompatibilityGauge = ({
  value,
  label,
  sublabel,
  color = 'var(--accent)',
  size = 172,
}: CompatibilityGaugeProps) => {
  const clamped = Math.max(0, Math.min(100, value))
  const stroke = 14
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const duration = 1000
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(clamped * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [clamped])

  const offset = circumference * (1 - progress / 100)
  const center = size / 2

  return (
    <div className="gauge" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="gauge-svg"
        role="img"
        aria-label={`${label}: ${Math.round(clamped)} percent`}
      >
        <circle
          className="gauge-track"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          className="gauge-fill"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="gauge-center">
        <span className="gauge-value" style={{ color }}>
          {Math.round(progress)}
          <span className="gauge-pct">%</span>
        </span>
        <span className="gauge-label">{label}</span>
        {sublabel && <span className="gauge-sub">{sublabel}</span>}
      </div>
    </div>
  )
}

export default CompatibilityGauge

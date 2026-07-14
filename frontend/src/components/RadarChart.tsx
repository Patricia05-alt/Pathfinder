import { useEffect, useState } from 'react'
import './RadarChart.css'

export interface RadarAxis {
  label: string
  /** 0–100 */
  value: number
}

interface RadarChartProps {
  data: RadarAxis[]
  size?: number
  color?: string
}

// Dependency-free animated radar / spider chart.
const RadarChart = ({ data, size = 280, color = 'var(--accent)' }: RadarChartProps) => {
  const center = size / 2
  const labelPad = 52
  const radius = size / 2 - labelPad
  const count = data.length
  const rings = [0.25, 0.5, 0.75, 1]

  const [t, setT] = useState(0)

  useEffect(() => {
    let raf = 0
    const duration = 900
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setT(1 - Math.pow(1 - p, 3))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [data])

  const angleAt = (i: number) => (-90 + (360 / count) * i) * (Math.PI / 180)
  const pointAt = (i: number, r: number) => ({
    x: center + r * Math.cos(angleAt(i)),
    y: center + r * Math.sin(angleAt(i)),
  })

  const ringPoints = (fraction: number) =>
    data.map((_, i) => {
      const p = pointAt(i, radius * fraction)
      return `${p.x},${p.y}`
    }).join(' ')

  const dataVertices = data.map((axis, i) => pointAt(i, radius * (axis.value / 100) * t))
  const dataPolygon = dataVertices.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <svg
      className="radar"
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Compatibility breakdown radar chart"
    >
      {rings.map((fraction) => (
        <polygon key={fraction} className="radar-ring" points={ringPoints(fraction)} />
      ))}

      {data.map((_, i) => {
        const p = pointAt(i, radius)
        return <line key={i} className="radar-axis" x1={center} y1={center} x2={p.x} y2={p.y} />
      })}

      <polygon
        className="radar-area"
        points={dataPolygon}
        style={{ fill: color, stroke: color }}
      />

      {dataVertices.map((p, i) => (
        <circle key={i} className="radar-dot" cx={p.x} cy={p.y} r={4} style={{ fill: color }}>
          <title>{`${data[i].label}: ${data[i].value}%`}</title>
        </circle>
      ))}

      {data.map((axis, i) => {
        const p = pointAt(i, radius + 22)
        const cos = Math.cos(angleAt(i))
        const sin = Math.sin(angleAt(i))
        const anchor = Math.abs(cos) < 0.3 ? 'middle' : cos > 0 ? 'start' : 'end'
        const baseline = Math.abs(sin) < 0.3 ? 'middle' : sin > 0 ? 'hanging' : 'auto'
        return (
          <text
            key={axis.label}
            x={p.x}
            y={p.y}
            className="radar-label"
            textAnchor={anchor}
            dominantBaseline={baseline}
          >
            <tspan className="radar-label-name">{axis.label}</tspan>
            <tspan x={p.x} dy="1.15em" className="radar-label-value">{axis.value}%</tspan>
          </text>
        )
      })}
    </svg>
  )
}

export default RadarChart

import {
  AreaChart as ReAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { CHART_COLORS } from './chart-colors'
import type { ChartDataPoint } from '@/entities/analytics/model/types'

interface AreaChartProps {
  data: ChartDataPoint[]
  areas?: { key: 'value' | 'value2'; name: string; color?: string }[]
  height?: number
  stacked?: boolean
}

export function AreaChart({
  data,
  areas = [{ key: 'value', name: 'Значение' }],
  height = 300,
  stacked = false,
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReAreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <defs>
          {areas.map((area, i) => {
            const color = area.color ?? (i === 0 ? CHART_COLORS.primary : CHART_COLORS.secondary)
            return (
              <linearGradient key={area.key} id={`gradient-${area.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            )
          })}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: CHART_COLORS.muted }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => v.slice(5)}
        />
        <YAxis
          tick={{ fontSize: 12, fill: CHART_COLORS.muted }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            background: 'hsl(var(--popover))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            color: 'hsl(var(--popover-foreground))',
            fontSize: 12,
          }}
          formatter={(v, name) => [v, name]}
          labelFormatter={(l) => `Дата: ${l}`}
        />
        {areas.length > 1 && (
          <Legend wrapperStyle={{ fontSize: 12, color: CHART_COLORS.muted }} />
        )}
        {areas.map((area, i) => {
          const color = area.color ?? (i === 0 ? CHART_COLORS.primary : CHART_COLORS.secondary)
          return (
            <Area
              key={area.key}
              type="monotone"
              dataKey={area.key}
              name={area.name}
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${area.key})`}
              stackId={stacked ? 'stack' : undefined}
            />
          )
        })}
      </ReAreaChart>
    </ResponsiveContainer>
  )
}

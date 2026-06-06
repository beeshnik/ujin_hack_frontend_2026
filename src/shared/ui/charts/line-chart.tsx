import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { CHART_COLORS } from './chart-colors'
import type { ChartDataPoint } from '@/entities/analytics/model/types'

interface LineChartProps {
  data: ChartDataPoint[]
  lines?: { key: 'value' | 'value2'; name: string; color?: string }[]
  height?: number
}

export function LineChart({
  data,
  lines = [{ key: 'value', name: 'Значение' }],
  height = 300,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
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
        {lines.length > 1 && (
          <Legend wrapperStyle={{ fontSize: 12, color: CHART_COLORS.muted }} />
        )}
        {lines.map((line, i) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            name={line.name}
            stroke={line.color ?? (i === 0 ? CHART_COLORS.primary : CHART_COLORS.secondary)}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  )
}

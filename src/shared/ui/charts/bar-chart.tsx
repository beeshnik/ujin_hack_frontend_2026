import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { CHART_COLORS } from './chart-colors'
import type { ChartDataPoint } from '@/entities/analytics/model/types'

interface BarChartProps {
  data: ChartDataPoint[]
  bars?: { key: 'value' | 'value2'; name: string; color?: string }[]
  height?: number
  stacked?: boolean
}

export function BarChart({
  data,
  bars = [{ key: 'value', name: 'Значение' }],
  height = 300,
  stacked = false,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
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
          cursor={{ fill: 'hsl(var(--muted))' }}
          formatter={(v, name) => [v, name]}
          labelFormatter={(l) => `Дата: ${l}`}
        />
        {bars.length > 1 && (
          <Legend wrapperStyle={{ fontSize: 12, color: CHART_COLORS.muted }} />
        )}
        {bars.map((bar, i) => (
          <Bar
            key={bar.key}
            dataKey={bar.key}
            name={bar.name}
            fill={bar.color ?? (i === 0 ? CHART_COLORS.primary : CHART_COLORS.secondary)}
            radius={[4, 4, 0, 0]}
            stackId={stacked ? 'stack' : undefined}
          />
        ))}
      </ReBarChart>
    </ResponsiveContainer>
  )
}

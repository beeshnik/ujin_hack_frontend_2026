import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { PIE_COLORS } from './chart-colors'
import type { PieDataPoint } from '@/entities/analytics/model/types'

interface DonutChartProps {
  data: PieDataPoint[]
  height?: number
  innerRadius?: number
  outerRadius?: number
}

export function DonutChart({
  data,
  height = 300,
  innerRadius = 60,
  outerRadius = 100,
}: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RePieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={3}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={PIE_COLORS[index % PIE_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: 'hsl(var(--popover))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            color: 'hsl(var(--popover-foreground))',
            fontSize: 12,
          }}
          formatter={(value: number, name) => [
            `${value} (${total > 0 ? ((value / total) * 100).toFixed(1) : 0}%)`,
            name,
          ]}
        />
        <Legend
          wrapperStyle={{ fontSize: 12 }}
          formatter={(value) => (
            <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>
          )}
        />
      </RePieChart>
    </ResponsiveContainer>
  )
}

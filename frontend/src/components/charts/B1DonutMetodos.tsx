import { useRef } from 'react'
import * as echarts from 'echarts'
import { useInViewChart } from '../../hooks/useInViewChart'

interface MethodData {
  method: string
  frequency: number
  percentage: number
}

interface B1DonutMetodosProps {
  data: MethodData[]
}

const METHOD_COLORS: Record<string, string> = {
  Underground: '#c1d65b',
  Surface: '#6ec6a0',
  'Surface/Underground': '#d4e57d',
  Unknown: '#846248',
}

const METHOD_LABELS: Record<string, string> = {
  Underground: 'Underground',
  Surface: 'Surface',
  'Surface/Underground': 'Surface / Underground',
  Unknown: 'Unknown',
}

export default function B1DonutMetodos({ data }: B1DonutMetodosProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useInViewChart(chartRef, () => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const total = data.reduce((sum, d) => sum + d.frequency, 0)

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(10, 10, 10, 0.92)',
        borderColor: 'rgba(160, 160, 160, 0.12)',
        borderWidth: 1,
        textStyle: {
          color: '#f1f5f9',
          fontSize: 13,
          fontFamily: 'Roboto Condensed, sans-serif',
        },
        formatter: (params: any) => {
          const label = METHOD_LABELS[params.name] || params.name
          return `
            <div style="padding: 4px 2px;">
              <div style="font-size: 14px; font-weight: 700; margin-bottom: 6px; color: ${params.color};">
                ${label}
              </div>
              <div style="display: flex; justify-content: space-between; gap: 18px;">
                <span style="color: #a0a0a0;">Frequency</span>
                <span style="font-weight: 600; color: #fff;">${params.data.frequency.toLocaleString('es-PE')}</span>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 18px;">
                <span style="color: #a0a0a0;">Percentage</span>
                <span style="font-weight: 600; color: #fff;">${params.data.percentage}%</span>
              </div>
            </div>
          `
        },
      },
      legend: {
        orient: 'horizontal',
        top: 12,
        left: 'center',
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 20,
        textStyle: {
          color: '#a0a0a0',
          fontSize: 12,
          fontFamily: 'Roboto Condensed, sans-serif',
        },
        formatter: (name: string) => METHOD_LABELS[name] || name,
      },
      series: [
        {
          name: 'Extraction Methods',
          type: 'pie',
          radius: ['48%', '75%'],
          center: ['50%', '55%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 6,
            borderColor: '#0a0a0a',
            borderWidth: 3,
          },
          label: {
            show: true,
            position: 'center',
            formatter: () =>
              [`{total|${total.toLocaleString('es-PE')}}`, '{label|mining sites}'].join('\n'),
            rich: {
              total: {
                fontSize: 32,
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 40,
                fontFamily: 'Roboto Condensed, sans-serif',
              },
              label: {
                fontSize: 12,
                color: '#707070',
                fontFamily: 'Roboto Condensed, sans-serif',
              },
            },
          },
          emphasis: {
            focus: 'self',
            label: {
              show: true,
              formatter: (params: any) => {
                const label = METHOD_LABELS[params.name] || params.name
                return [`{pct|${params.data.percentage}%}`, `{name|${label}}`].join('\n')
              },
              rich: {
                pct: {
                  fontSize: 30,
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 38,
                  fontFamily: 'Roboto Condensed, sans-serif',
                },
                name: {
                  fontSize: 12,
                  color: '#a0a0a0',
                  fontFamily: 'Roboto Condensed, sans-serif',
                },
              },
            },
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.4)',
            },
          },
          blur: {
            label: {
              show: false,
            },
          },
          labelLine: {
            show: false,
          },
          data: data.map((d) => ({
            value: d.frequency,
            name: d.method,
            frequency: d.frequency,
            percentage: d.percentage,
            itemStyle: {
              color: METHOD_COLORS[d.method] || '#3d3d3d',
            },
          })),
          animationType: 'expansion',
          animationEasing: 'cubicOut',
          animationDuration: 1400,
        },
      ],
    }

    chart.setOption(option)

    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.dispose()
    }
  })

  return <div ref={chartRef} style={{ width: '100%', height: '420px' }} />
}

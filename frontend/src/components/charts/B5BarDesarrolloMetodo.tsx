import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface B5DatosItem {
  dev_stat_label: string
  Underground: number
  Surface: number
  'Surface/Underground': number
  Unknown: number
}

interface B5EstadoDesarrolloData {
  metadata: {
    analysis: string
    total_registros: number
    estados_desarrollo: string[]
    metodos: string[]
  }
  datos: B5DatosItem[]
}

interface B5BarDesarrolloMetodoProps {
  data: B5EstadoDesarrolloData
}

const METHOD_COLORS: Record<string, string> = {
  Underground: '#c1d65b',
  Surface: '#6ec6a0',
  'Surface/Underground': '#d4e57d',
  Unknown: '#846248',
}

const METHOD_LABELS: Record<string, string> = {
  Underground: 'Subterráneo',
  Surface: 'Superficie',
  'Surface/Underground': 'Sup. / Subt.',
  Unknown: 'Desconocido',
}

const DEV_LABELS: Record<string, string> = {
  Producer: 'Productor',
  'Past Producer': 'Ex-Productor',
  Prospect: 'Prospecto',
  Occurrence: 'Ocurrencia',
  Otros: 'Otros',
}

const METHOD_KEYS = ['Underground', 'Surface', 'Surface/Underground', 'Unknown'] as const

export default function B5BarDesarrolloMetodo({ data }: B5BarDesarrolloMetodoProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const items = data.datos
    const devStates = items.map((d) => DEV_LABELS[d.dev_stat_label] || d.dev_stat_label)

    const series: echarts.SeriesOption[] = METHOD_KEYS.map((method, methodIdx) => ({
      name: METHOD_LABELS[method] || method,
      type: 'bar' as const,
      stack: 'total',
      barWidth: '55%',
      label: {
        show: true,
        position: 'inside' as const,
        color: methodIdx <= 2 ? '#000000' : '#f1f5f9',
        fontSize: 11,
        fontWeight: 600 as const,
        fontFamily: 'Roboto Condensed, sans-serif',
        formatter: (params: any) => {
          return params.value >= 15 ? `${params.value}` : ''
        },
      },
      itemStyle: {
        color: METHOD_COLORS[method] || '#3d3d3d',
        borderRadius:
          methodIdx === 0
            ? [4, 0, 0, 4]
            : methodIdx === METHOD_KEYS.length - 1
              ? [0, 4, 4, 0]
              : [0, 0, 0, 0],
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
        },
      },
      data: items.map((d) => d[method as keyof B5DatosItem] as number),
    }))

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(10, 10, 10, 0.92)',
        borderColor: 'rgba(160, 160, 160, 0.12)',
        borderWidth: 1,
        textStyle: {
          color: '#f1f5f9',
          fontSize: 13,
          fontFamily: 'Roboto Condensed, sans-serif',
        },
        formatter: (params: any) => {
          const idx = params[0].dataIndex
          const item = items[idx]
          const devLabel = DEV_LABELS[item.dev_stat_label] || item.dev_stat_label
          const total = METHOD_KEYS.reduce(
            (sum, k) => sum + (item[k as keyof B5DatosItem] as number),
            0,
          )

          let html = `
            <div style="padding: 4px 2px;">
              <div style="font-size: 14px; font-weight: 700; margin-bottom: 4px; color: #c1d65b;">
                ${devLabel}
              </div>
              <div style="font-size: 11px; color: #707070; margin-bottom: 8px;">
                Total: ${total} registros
              </div>
          `
          for (const p of params) {
            const pct = total > 0 ? ((p.value / total) * 100).toFixed(1) : '0'
            html += `
              <div style="display: flex; justify-content: space-between; gap: 18px; align-items: center;">
                <span style="display: flex; align-items: center; gap: 6px;">
                  <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${p.color};"></span>
                  <span style="color: #a0a0a0;">${p.seriesName}</span>
                </span>
                <span style="font-weight: 600; color: #fff;">${p.value} <span style="color: #707070; font-weight: 400;">(${pct}%)</span></span>
              </div>
            `
          }
          html += '</div>'
          return html
        },
      },
      legend: {
        top: '0',
        left: 'center',
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 24,
        textStyle: {
          color: '#a0a0a0',
          fontSize: 12,
          fontFamily: 'Roboto Condensed, sans-serif',
        },
      },
      grid: {
        left: '110px',
        right: '24px',
        top: '40px',
        bottom: '16px',
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          color: '#707070',
          fontSize: 11,
          fontFamily: 'Roboto Condensed, sans-serif',
        },
        splitLine: {
          lineStyle: { color: 'rgba(255, 255, 255, 0.04)' },
        },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'category',
        data: devStates,
        axisLabel: {
          color: '#a0a0a0',
          fontSize: 11,
          fontFamily: 'Roboto Condensed, sans-serif',
        },
        axisLine: { lineStyle: { color: '#262626' } },
        axisTick: { show: false },
      },
      series,
    }

    chart.setOption(option)

    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.dispose()
    }
  }, [data])

  return <div ref={chartRef} style={{ width: '100%', height: '420px' }} />
}

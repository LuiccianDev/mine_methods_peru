import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface B4FreqItem {
  method: string
  Grande: number
  Mediano: number
  Pequeño: number
  'Sin dato': number
}

interface B4GraficaData {
  metadata: {
    analysis: string
    total_registros: number
    metodos: string[]
    escalas: string[]
  }
  frecuencia_absoluta: B4FreqItem[]
  proporcion_porcentual: B4FreqItem[]
}

interface B4StackedMetodoEscalaProps {
  data: B4GraficaData
}

const SCALE_COLORS: Record<string, string> = {
  Grande: '#c1d65b',
  Mediano: '#6ec6a0',
  Pequeño: '#3d8b6e',
  'Sin dato': '#846248',
}

const SCALE_LABELS: Record<string, string> = {
  Grande: 'Grande',
  Mediano: 'Mediana',
  Pequeño: 'Pequeña',
  'Sin dato': 'Sin dato',
}

const METHOD_LABELS: Record<string, string> = {
  Underground: 'Subterráneo',
  Surface: 'Superficie',
  'Surface/Underground': 'Sup. / Subt.',
}

const SCALE_KEYS = ['Grande', 'Mediano', 'Pequeño', 'Sin dato'] as const

export default function B4StackedMetodoEscala({ data }: B4StackedMetodoEscalaProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const items = data.frecuencia_absoluta
    const methods = items.map((d) => METHOD_LABELS[d.method] || d.method)

    const series: echarts.SeriesOption[] = SCALE_KEYS.map((scale, scaleIdx) => ({
      name: SCALE_LABELS[scale] || scale,
      type: 'bar' as const,
      stack: 'total',
      barWidth: '55%',
      label: {
        show: true,
        position: 'inside' as const,
        color: scaleIdx === 2 || scaleIdx === 3 ? '#f1f5f9' : '#000000',
        fontSize: 11,
        fontWeight: 600 as const,
        fontFamily: 'Roboto Condensed, sans-serif',
        formatter: (params: any) => {
          return params.value >= 5 ? `${params.value}` : ''
        },
      },
      itemStyle: {
        color: SCALE_COLORS[scale] || '#3d3d3d',
        borderRadius:
          scaleIdx === 0
            ? [4, 0, 0, 4]
            : scaleIdx === SCALE_KEYS.length - 1
              ? [0, 4, 4, 0]
              : [0, 0, 0, 0],
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
        },
      },
      data: items.map((d) => d[scale as keyof B4FreqItem] as number),
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
          const methodName = METHOD_LABELS[item.method] || item.method
          const total = SCALE_KEYS.reduce(
            (sum, k) => sum + (item[k as keyof B4FreqItem] as number),
            0,
          )

          let html = `
            <div style="padding: 4px 2px;">
              <div style="font-size: 14px; font-weight: 700; margin-bottom: 4px; color: #c1d65b;">
                ${methodName}
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
        data: methods,
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

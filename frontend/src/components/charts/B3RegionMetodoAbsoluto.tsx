import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface RegionAbsolutoItem {
  region: string
  total_known_sites: number
  methods_counts: Record<string, number>
  dominant_method: string
  dominant_count: number
}

interface B3RegionMetodoAbsolutoProps {
  data: RegionAbsolutoItem[]
}

const METHOD_COLORS: Record<string, string> = {
  Underground: '#c1d65b',
  Surface: '#6ec6a0',
  'Surface/Underground': '#d4e57d',
}

const METHOD_LABELS: Record<string, string> = {
  Underground: 'Subterráneo',
  Surface: 'Superficie',
  'Surface/Underground': 'Sup. / Subt.',
}

const METHOD_KEYS = ['Underground', 'Surface', 'Surface/Underground']

export default function B3RegionMetodoAbsoluto({ data }: B3RegionMetodoAbsolutoProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const sorted = [...data].sort((a, b) => a.total_known_sites - b.total_known_sites)
    const regions = sorted.map((d) => d.region)

    const series: echarts.SeriesOption[] = METHOD_KEYS.map((method, methodIdx) => ({
      name: METHOD_LABELS[method] || method,
      type: 'bar' as const,
      stack: 'total',
      barWidth: '55%',
      label: {
        show: true,
        position: 'inside' as const,
        color: '#000000',
        fontSize: 10,
        fontWeight: 600 as const,
        fontFamily: 'Roboto Condensed, sans-serif',
        formatter: (params: any) => {
          return params.value >= 5 ? `${params.value}` : ''
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
      data: sorted.map((d) => d.methods_counts[method] || 0),
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
          const regionIdx = params[0].dataIndex
          const region = sorted[regionIdx]
          const total = region.total_known_sites
          let html = `
            <div style="padding: 4px 2px;">
              <div style="font-size: 14px; font-weight: 700; margin-bottom: 4px; color: #c1d65b;">
                ${region.region}
              </div>
              <div style="font-size: 11px; color: #707070; margin-bottom: 8px;">
                Total: ${total} sitios conocidos
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
        data: regions,
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

  return <div ref={chartRef} style={{ width: '100%', height: '520px' }} />
}

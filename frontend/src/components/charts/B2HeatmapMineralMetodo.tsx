import { useRef } from 'react'
import * as echarts from 'echarts'
import { useInViewChart } from '../../hooks/useInViewChart'

interface B2HeatmapData {
  minerals: string[]
  methods: string[]
  values: number[][]
}

interface B2HeatmapMineralMetodoProps {
  data: B2HeatmapData
}

const METHOD_LABELS: Record<string, string> = {
  Underground: 'Underground',
  Surface: 'Surface',
  'Surface/Underground': 'Surf. / Undergr.',
  Unknown: 'Unknown',
}

const MINERAL_LABELS: Record<string, string> = {
  Copper: 'Copper',
  Silver: 'Silver',
  Lead: 'Lead',
  Zinc: 'Zinc',
  Gold: 'Gold',
  Desconocido: 'Unknown',
  Antimony: 'Antimony',
  Iron: 'Iron',
  Bentonite: 'Bentonite',
  Limestone: 'Limestone',
}

export default function B2HeatmapMineralMetodo({ data }: B2HeatmapMineralMetodoProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useInViewChart(chartRef, () => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const yLabels = data.minerals.map((m) => MINERAL_LABELS[m] || m)
    const xLabels = data.methods.map((m) => METHOD_LABELS[m] || m)

    const heatmapData: [number, number, number][] = []
    for (let i = 0; i < data.minerals.length; i++) {
      for (let j = 0; j < data.methods.length; j++) {
        heatmapData.push([j, i, data.values[i][j]])
      }
    }

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: {
        position: 'top',
        backgroundColor: 'rgba(10, 10, 10, 0.92)',
        borderColor: 'rgba(160, 160, 160, 0.12)',
        borderWidth: 1,
        textStyle: {
          color: '#f1f5f9',
          fontSize: 13,
          fontFamily: 'Roboto Condensed, sans-serif',
        },
        formatter: (params: any) => {
          const mineral = data.minerals[params.value[1]]
          const method = data.methods[params.value[0]]
          const val = params.value[2]
          return `
            <div style="padding: 4px 2px;">
              <div style="font-size: 14px; font-weight: 700; margin-bottom: 6px; color: #c1d65b;">
                ${MINERAL_LABELS[mineral] || mineral}
              </div>
              <div style="display: flex; justify-content: space-between; gap: 18px;">
                <span style="color: #a0a0a0;">Method</span>
                <span style="font-weight: 600; color: #fff;">${METHOD_LABELS[method] || method}</span>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 18px;">
                <span style="color: #a0a0a0;">Percentage</span>
                <span style="font-weight: 600; color: #fff;">${val}%</span>
              </div>
            </div>
          `
        },
      },
      grid: {
        left: '100px',
        right: '24px',
        top: '10px',
        bottom: '70px',
      },
      xAxis: {
        type: 'category',
        data: xLabels,
        position: 'bottom',
        splitArea: { show: false },
        axisLabel: {
          color: '#a0a0a0',
          fontSize: 11,
          fontFamily: 'Roboto Condensed, sans-serif',
        },
        axisLine: { lineStyle: { color: '#262626' } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'category',
        data: yLabels,
        splitArea: { show: false },
        axisLabel: {
          color: '#a0a0a0',
          fontSize: 11,
          fontFamily: 'Roboto Condensed, sans-serif',
        },
        axisLine: { lineStyle: { color: '#262626' } },
        axisTick: { show: false },
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '0',
        inRange: {
          color: ['#1a1a1a', '#3d2e1f', '#846248', '#a67d5c', '#c1d65b', '#d4e57d'],
        },
        textStyle: {
          color: '#707070',
          fontSize: 11,
          fontFamily: 'Roboto Condensed, sans-serif',
        },
        itemWidth: 16,
        itemHeight: 140,
      },
      series: [
        {
          name: 'Mineral vs Method',
          type: 'heatmap',
          data: heatmapData,
          label: {
            show: true,
            color: '#ffffff',
            fontSize: 11,
            fontWeight: 600,
            fontFamily: 'Roboto Condensed, sans-serif',
            formatter: (params: any) => `${params.value[2]}%`,
          },
          itemStyle: {
            borderRadius: 4,
            borderColor: '#0a0a0a',
            borderWidth: 2,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 12,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              borderColor: '#c1d65b',
              borderWidth: 2,
            },
          },
          animation: true,
          animationDuration: 1400,
          animationEasing: 'cubicOut',
          animationDelay: (idx: number) => idx * 18,
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

  return <div ref={chartRef} style={{ width: '100%', height: '480px' }} />
}

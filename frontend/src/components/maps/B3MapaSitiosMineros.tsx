import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'

interface FeatureProperties {
  site_name: string
  state: string
  mineral_principal: string
  work_type: string
}

interface GeoJSONFeature {
  type: 'Feature'
  properties: FeatureProperties
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
}

interface GeoJSONData {
  type: 'FeatureCollection'
  features: GeoJSONFeature[]
}

interface B3MapaSitiosMineroProps {
  data: GeoJSONData
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
  'Surface/Underground': 'Surf. / Undergr.',
  Unknown: 'Unknown',
}

const LEGEND_ITEMS = [
  { key: 'Underground', label: 'Underground', color: '#c1d65b' },
  { key: 'Surface', label: 'Surface', color: '#6ec6a0' },
  { key: 'Surface/Underground', label: 'Surf. / Undergr.', color: '#d4e57d' },
  { key: 'Unknown', label: 'Unknown', color: '#846248' },
]

function MapLegend() {
  const map = useMap()

  useEffect(() => {
    const L = (window as any).L
    if (!L) return

    const legend = L.control({ position: 'bottomright' })

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'leaflet-legend')
      div.style.cssText =
        'background: rgba(10, 10, 10, 0.92); padding: 12px 16px; border-radius: 10px; border: 1px solid rgba(160, 160, 160, 0.12); backdrop-filter: blur(12px); font-family: Roboto Condensed, sans-serif;'

      let html =
        '<div style="font-size: 11px; font-weight: 600; color: #707070; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Method</div>'
      for (const item of LEGEND_ITEMS) {
        html += `
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${item.color}; flex-shrink: 0;"></span>
            <span style="font-size: 12px; color: #a0a0a0;">${item.label}</span>
          </div>
        `
      }
      div.innerHTML = html
      return div
    }

    legend.addTo(map)

    return () => {
      legend.remove()
    }
  }, [map])

  return null
}

export default function B3MapaSitiosMineros({ data }: B3MapaSitiosMineroProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div
        style={{
          width: '100%',
          height: '520px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#707070',
          fontFamily: 'Roboto Condensed, sans-serif',
        }}
      >
        Loading map…
      </div>
    )
  }

  return (
    <MapContainer
      center={[-12.0, -75.0]}
      zoom={6}
      style={{ width: '100%', height: '520px', borderRadius: '12px' }}
      scrollWheelZoom={true}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {data.features.map((feature, idx) => {
        const [lng, lat] = feature.geometry.coordinates
        const color = METHOD_COLORS[feature.properties.work_type] || '#846248'
        return (
          <CircleMarker
            key={idx}
            center={[lat, lng]}
            radius={6}
            pathOptions={{
              fillColor: color,
              fillOpacity: 0.85,
              color: 'rgba(255, 255, 255, 0.3)',
              weight: 1,
            }}
          >
            <Popup>
              <div
                style={{
                  fontFamily: 'Roboto Condensed, sans-serif',
                  padding: '4px 2px',
                  minWidth: '180px',
                }}
              >
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: '6px',
                  }}
                >
                  {feature.properties.site_name}
                </div>
                <div style={{ fontSize: '12px', color: '#555', lineHeight: '1.6' }}>
                  <div><strong>Region:</strong> {feature.properties.state}</div>
                  <div><strong>Mineral:</strong> {feature.properties.mineral_principal}</div>
                  <div>
                    <strong>Method:</strong>{' '}
                    {METHOD_LABELS[feature.properties.work_type] || feature.properties.work_type}
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
      <MapLegend />
    </MapContainer>
  )
}

import React from 'react';
import {createRoot} from 'react-dom/client';
import {Map} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import DeckGL from '@deck.gl/react';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import Constants from '../../../../Global';

import styles from './HeatMap.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json'; // eslint-disable-line

const dummyData = [
  [106.7718039069555,-6.187533326939228,10],
  [107.04033810569236, -6.347780084374379, 1],
  [107.04033810569236, -6.347780084374379, 1],
  [107.04033810569236, -6.347780084374379, 1],
  [107.04033810569236, -6.347780084374379, 1],
  [104.78747111875404, -4.104423927840299, 1],
  [114.86064797420137, 0.46771882452337576,10],
]

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

export default function HeatMap({
  data = dummyData,
  intensity = 1,
  threshold = 0.03,
  radiusPixels = 30,
  mapStyle = MAP_STYLE,
  initialZoom = 3.5,
  colorVariable = "",
  height, 
}) {
  const layers = [
    new HeatmapLayer({
      data,
      id: 'heatmp-layer',
      pickable: true,
      getPosition: d => [d[0], d[1]],
      getWeight: d => d[2],
      radiusPixels,
      intensity,
      threshold,
      colorRange: [[90, 219, 50, 126], [208, 255, 54, 126], [255,255,178, 126], [254,217,118, 126], [254,178,76, 126], [253,141,60, 126], [240,59,32, 126], [189,0,38, 190]],
    })
  ];

  const [colorMaxthreshold, setColorMaxThreshold] = useState(0);
  const [colorMinthreshold, setColorMinThreshold] = useState(Infinity);

  useEffect(() => {
    let maxColor = 0;
    let minColor = Infinity;
    for (let i = 0; i < data.length; i++) {
      if (data[i][2] > maxColor) {
        maxColor = data[i][2];
      } 
      if (data[i][2] < minColor) {
        minColor = data[i][2];
      } 
    }
    setColorMaxThreshold(maxColor);
    setColorMinThreshold(minColor);
  }, [data])

  return (
    <div>
      <div style={{height: `${height}px`}}>
        <DeckGL initialViewState={{...Constants.mapInitialCoordinate, zoom: initialZoom}} 
                controller={true} 
                layers={layers}
                style={{height: height}}
        >
          <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} preventStyleDiffing={true} />
        </DeckGL>
      </div>
      <div className={styles.legendContainer}>
        <div className={styles.legendColomn}>
          <div className={styles.legendTitle}>
            {colorVariable}
          </div>
          <div className={styles.legendRow}>
              <div className={styles.legendMinMax}>
                {Constants.formatNumber(colorMinthreshold, true, 'IDR')}
              </div>
              <div className={styles.legendColor} style={{backgroundImage: `linear-gradient(to right, rgb(90, 219, 50, 126), rgb(208, 255, 54, 126), rgb(255,255,178, 126), rgb(254,217,118, 126), rgb(254,178,76, 126), rgb(253,141,60, 126), rgb(240,59,32, 126), rgb(189,0,38, 190))`}}></div>
              <div className={styles.legendMinMax}>
                {Constants.formatNumber(colorMaxthreshold, true, 'IDR')}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
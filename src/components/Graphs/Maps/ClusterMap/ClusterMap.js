import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Map} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import DeckGL from '@deck.gl/react';
import {MapView} from '@deck.gl/core';
import {IconLayer} from '@deck.gl/layers';

import IconClusterLayer from './icon-cluster-layer';
import Constants from '../../../../Global';

import atlas from './icon/cluster.png';
import atlasJSON from './icon/location-icon-mapping.json';
import DummyDatas from '../../../../Dummies';
import { useEffect } from 'react';

import styles from './ClusterMap.module.css';

const color = [50, 140, 255, 50];

const sizeVariable = "Total Revenue";
const colorVariable = "Avg. Order Value";

// Source data CSV
const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/icon/meteorites.json'; // eslint-disable-line

const MAP_VIEW = new MapView({repeat: true});
const INITIAL_VIEW_STATE = {
  longitude: -35,
  latitude: 36.7,
  zoom: 1.8,
  maxZoom: 20,
  pitch: 0,
  bearing: 0
};

const MAP_STYLE = Constants.mapStyle

function renderTooltip(info) {
  const {object, x, y} = info;
  console.log("info tooltip:", info)

  if (info.objects) {

    return (
      <div className={styles.tooltipInteractive} style={{left: x, top: y}}>
        {info.objects.map(({e}) => {
          console.log("info object: ", e)
          return (
            <div >
              <h5>{e}</h5>
              <h5>{sizeVariable}: {e[sizeVariable]}</h5>
            </div>
          );
        })}
      </div>
    );
  }

  if (!object) {
    return null;
  }

  return object.cluster ? (
    <div className={styles.tooltipInteractive} style={{left: x, top: y}}>
      {object.point_count} records
    </div>
  ) : (
    <div className={styles.tooltipInteractive} style={{left: x, top: y}}>
      {object.name} 
      <br/>
      {sizeVariable}: {Constants.formatNumber(object[sizeVariable], true, 'IDR')}
      <br/>
      {colorVariable}: {Constants.formatNumber(object[colorVariable], true, 'IDR')}
    </div>
  );
}

/* eslint-disable react/no-deprecated */
export default function ClusterMap({
  // data = DATA_URL,
  data = DummyDatas.Geographic.cluster,
  iconMapping = atlasJSON,
  iconAtlas = atlas,
  showCluster = true,
  mapStyle = MAP_STYLE,
  initialZoom = 3.5,
  height,
}) {
  const [hoverInfo, setHoverInfo] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [sizeMaxthreshold, setSizeMaxThreshold] = useState(0);
  const [sizeMinthreshold, setSizeMinThreshold] = useState(Infinity);
  const [colorMaxthreshold, setColorMaxThreshold] = useState(0);
  const [colorMinthreshold, setColorMinThreshold] = useState(Infinity);


  useEffect(() => {
    let maxSize = 0;
    let minSize = Infinity;
    let maxColor = 0;
    let minColor = Infinity;
    for (let i = 0; i < data.length; i++) {
      if (data[i][sizeVariable] > maxSize) {
        maxSize = data[i][sizeVariable];
      } 
      if (data[i][sizeVariable] < minSize) {
        minSize = data[i][sizeVariable]
      }
      
      if (data[i][colorVariable] > maxColor) {
        maxColor = data[i][colorVariable];
      } 
      if (data[i][colorVariable] < minColor) {
        minColor = data[i][colorVariable];
      } 
    }
    
    setSizeMaxThreshold(maxSize);
    setSizeMinThreshold(minSize);
    setColorMaxThreshold(maxColor);
    setColorMinThreshold(minColor);
  }, [data])

  useEffect(() => {
    if (colorMaxthreshold > 0 && sizeMaxthreshold > 0) {
      setDataLoaded(true);
    }
  }, [colorMaxthreshold, sizeMaxthreshold])

  const hideTooltip = () => {
    setHoverInfo({});
  };
  const expandTooltip = info => {
    if (info.picked && showCluster) {
      setHoverInfo(info);
    } else {
      setHoverInfo({});
    }
  };

  const layerProps = {
    data,
    pickable: true,
    getPosition: d => d.coordinates,
    iconAtlas,
    iconMapping,
    onHover: !hoverInfo.objects && setHoverInfo
  };

  // const layer = showCluster
  //   ? new IconClusterLayer({...layerProps, id: 'icon-cluster', sizeScale: 40})
  //   : new IconLayer({
  //       ...layerProps,
  //       id: 'icon',
  //       getIcon: d => 'marker',
  //       sizeUnits: 'meters',
  //       sizeScale: 2000,
  //       sizeMinPixels: 6
  //     });

  const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

  const layer = new IconLayer({
      id: 'icon-layer',
      data,
      pickable: true,
      // iconAtlas and iconMapping are required
      // getIcon: return a string
      // iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconAtlas,
      iconMapping: ICON_MAPPING,
      getIcon: d => 'marker',
      sizeScale: 15,
      getPosition: d => d.coordinates,
      getSize: d => (d[sizeVariable]/sizeMaxthreshold) * 3,
      getColor: d => {
        let x = (d[colorVariable]/colorMaxthreshold);
        return [x *  color[0],(x) * color[1], x* color[2], (x) * color[3] + 70]
      },
      // getSize: d =>  5,
      // getColor: d => {return [0, 140, 255, 200]},
      
      pickable: true,
      onHover: !hoverInfo.objects && setHoverInfo
  });    

    
    return (
      <div className={styles}>
        <div style={{height: `${height}px`}}>
          {dataLoaded? 
            <DeckGL
              layers={[layer]}
              views={MAP_VIEW}
              initialViewState={{...Constants.mapInitialCoordinate, zoom: initialZoom}}
              controller={{dragRotate: false}}
              onViewStateChange={hideTooltip}
              onClick={expandTooltip}
              style={{height: `${height}px`, width: `calc(100% - 20px)`, marginLeft: '10px', marginTop: '10px', borderRadius: '5px', overflow: 'hidden'}}
            >
              <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} preventStyleDiffing={true} />

              {renderTooltip(hoverInfo)}
            </DeckGL>
            :null
          }
        </div>

        <div className={styles.legendContainer}>
          {/* size */}
          <div className={styles.legendColomn}>
            <div className={styles.legendTitle}>
              {sizeVariable}
            </div>
            <div className={styles.legendRow}>
              <div className={styles.legendMinMax}>
                {Constants.formatNumber(sizeMinthreshold, true, 'IDR')}
              </div>
              <div className={styles.legendSize} style={{height: "5px", width: "5px"}}></div>
              <div className={styles.legendSize} style={{height: "10px", width: "10px"}}></div>
              <div className={styles.legendSize} style={{height: "20px", width: "20px"}}></div>
              <div className={styles.legendMinMax}>
                {Constants.formatNumber(sizeMaxthreshold, true, 'IDR')}
              </div>
            </div>
          </div>

          {/* color */}
          <div className={styles.legendColomn}>
            <div className={styles.legendTitle}>
              {colorVariable}
            </div>
            <div className={styles.legendRow}>
              <div className={styles.legendMinMax}>
                {Constants.formatNumber(colorMinthreshold, true, 'IDR')}
              </div>
              <div className={styles.legendColor} style={{backgroundImage: `linear-gradient(to right, rgb(0,0,0, 50), rgb(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] + 50}))`}}></div>
              <div className={styles.legendMinMax}>
                {Constants.formatNumber(colorMaxthreshold, true, 'IDR')}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

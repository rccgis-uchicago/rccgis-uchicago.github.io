import * as Cesium from 'cesium';

export function createGISLayer(data: any) {
  return new Cesium.GeoJsonDataSource({
    clampToGround: true,
    stroke: Cesium.Color.BLUE,
    fill: Cesium.Color.BLUE.withAlpha(0.3),
    strokeWidth: 3
  });
}

export function loadGeoJSON(viewer: Cesium.Viewer, url: string) {
  return Cesium.GeoJsonDataSource.load(url, {
    stroke: Cesium.Color.YELLOW,
    fill: Cesium.Color.YELLOW.withAlpha(0.3),
    strokeWidth: 3
  });
}
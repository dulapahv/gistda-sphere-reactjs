import { useRef } from 'react';

import { SphereMap } from './map';

export default function App() {
  const mapRef = useRef();
  const sphereRef = useRef();

  const mapKey = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

  function onMapLoad() {
    if (!mapRef.current) return;

    mapRef.current.Layers.setBase(sphereRef.current.Layers.STREETS);
  }

  function setLocationZoom() {
    if (!mapRef.current) return;

    // https://api.sphere.gistda.or.th/map/doc.html#mapRef.current.goTo
    mapRef.current.goTo({
      center: { lon: 100.510847, lat: 13.743757 },
      zoom: 14,
    });

    document.getElementById('status').innerHTML =
      'Status: Location and Zoom set to lon: 100.510847, lat: 13.743757, zoom: 14';
  }

  function changeLanguage() {
    if (!mapRef.current) return;

    // https://api.sphere.gistda.or.th/map/doc.html#LayerCollection.language
    mapRef.current.language('en');

    document.getElementById(
      'status'
    ).innerHTML = `Status: Language changed to ${mapRef.current.language()}`;
  }

  function changeTheme() {
    if (!mapRef.current) return;

    // https://api.sphere.gistda.or.th/map/doc.html#Filter
    // https://api.sphere.gistda.or.th/map/doc.html#mapRef.current.enableFilter
    mapRef.current.enableFilter(sphereRef.current.Filter.Dark);

    document.getElementById(
      'status'
    ).innerHTML = `Status: Theme changed to ${mapRef.current.enableFilter()}`;
  }

  return (
    <div style={{ height: '80vh' }}>
      <button onClick={setLocationZoom}>Set Location and Zoom</button>
      <button onClick={changeLanguage}>Change to English</button>
      <button onClick={changeTheme}>Change to Dark</button>
      <p id='status'>Status: </p>

      <div style={{ height: '100%', width: '100%' }}>
        <SphereMap
          id='sphere-map'
          mapKey={mapKey}
          callback={onMapLoad}
          mapRef={mapRef}
          sphereRef={sphereRef}
        />
      </div>
    </div>
  );
}

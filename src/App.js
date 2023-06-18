import React from 'react';

import { map, Map } from './map';

const setLocationZoom = () => {
  // https://api.sphere.gistda.or.th/map/doc.html#Map.goTo
  map.goTo({ center: { lon: 100.510847, lat: 13.743757 }, zoom: 14 });

  document.getElementById('status').innerHTML =
    'Status: Location and Zoom set to lon: 100.510847, lat: 13.743757, zoom: 14';
};

const changeLanguage = () => {
  // https://api.sphere.gistda.or.th/map/doc.html#LayerCollection.language
  map.language('en');

  document.getElementById(
    'status'
  ).innerHTML = `Status: Language changed to ${map.language()}`;
};

const App = () => {
  return (
    <div style={{ height: '80vh' }}>
      <button onClick={setLocationZoom}>Set Location and Zoom</button>
      <button onClick={changeLanguage}>Change to English</button>
      <p id='status'>Status: </p>

      <Map />
    </div>
  );
};

export default App;

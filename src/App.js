import React from 'react';

import { map, Map, sphere } from './map';

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

const changeTheme = () => {
  // https://api.sphere.gistda.or.th/map/doc.html#Filter
  // https://api.sphere.gistda.or.th/map/doc.html#Map.enableFilter
  map.enableFilter(sphere.Filter.Dark);

  document.getElementById(
    'status'
  ).innerHTML = `Status: Theme changed to ${map.enableFilter()}`;
};

export default function app() {
  return (
    <div style={{ height: '80vh' }}>
      <button onClick={setLocationZoom}>Set Location and Zoom</button>
      <button onClick={changeLanguage}>Change to English</button>
      <button onClick={changeTheme}>Change to Dark</button>
      <p id='status'>Status: </p>

      <Map />
    </div>
  );
}

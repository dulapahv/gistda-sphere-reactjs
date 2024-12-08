import { useRef, useState, useCallback } from 'react';

import { SphereMap } from './sphere-map';

const SPHERE_MAP_KEY =
  import.meta.env.VITE_SPHERE_MAP_KEY || 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

const App = () => {
  const mapRef = useRef();
  const sphereRef = useRef();

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const onMapLoad = useCallback(() => {
    if (!mapRef.current) return;

    mapRef.current.Layers.setBase(sphereRef.current.Layers.STREETS);

    mapRef.current.Event.bind(
      sphereRef.current.EventName.OverlayDrop,
      function (e) {
        console.log(e.location());
      }
    );
  }, []);

  const setLocationZoom = () => {
    if (!mapRef.current) return;

    // https://api.sphere.gistda.or.th/map/doc.html#mapRef.current.goTo
    mapRef.current.goTo({
      center: { lon: 100.510847, lat: 13.743757 },
      zoom: 14,
    });

    document.getElementById('status').innerHTML =
      'Status: Location and Zoom set to lon: 100.510847, lat: 13.743757, zoom: 14';
  };

  const changeLanguage = () => {
    if (!mapRef.current) return;

    // https://api.sphere.gistda.or.th/map/doc.html#LayerCollection.language
    mapRef.current.language('en');

    document.getElementById(
      'status'
    ).innerHTML = `Status: Language changed to ${mapRef.current.language()}`;
  };

  const changeTheme = () => {
    if (!mapRef.current) return;

    // https://api.sphere.gistda.or.th/map/doc.html#Filter
    // https://api.sphere.gistda.or.th/map/doc.html#mapRef.current.enableFilter
    mapRef.current.enableFilter(sphereRef.current.Filter.Dark);

    document.getElementById(
      'status'
    ).innerHTML = `Status: Theme changed to ${mapRef.current.enableFilter()}`;
  };

  const addMarker = () => {
    // https://sphere.gistda.or.th/docs/js/marker
    // https://api.sphere.gistda.or.th/map/doc.html#Marker
    const marker = new sphereRef.current.Marker(
      { lon: 100.56, lat: 13.74 },
      { draggable: true }
    );
    mapRef.current.Overlays.add(marker);

    document.getElementById('status').innerHTML =
      'Status: Marker added at lon: 100.56, lat: 13.74';
  };

  const searchKeyword = () => {
    // https://sphere.gistda.or.th/docs/web-service/search
    const searchUrl = `https://api.sphere.gistda.or.th/services/search/search?keyword=${search}&key=${mapKey}`;
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.data);
      });
  };

  const goToSearchResult = (result) => {
    // go to location
    mapRef.current.goTo({
      center: { lon: result.lon, lat: result.lat },
      zoom: 14,
    });

    // add marker
    const marker = new sphereRef.current.Marker(
      {
        lon: result.lon,
        lat: result.lat,
      },
      { draggable: true }
    );
    mapRef.current.Overlays.add(marker);

    document.getElementById(
      'status'
    ).innerHTML = `Status: Go to ${result.name} and add marker at lon: ${result.lon}, lat: ${result.lat}`;
  };

  return (
    <div style={{ height: '80vh' }}>
      <div>
        <button onClick={setLocationZoom}>Set Location and Zoom</button>
        <button onClick={changeLanguage}>Change to English</button>
        <button onClick={changeTheme}>Change to Dark</button>
        <button onClick={addMarker}>Add Marker</button>
      </div>
      <div>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search... (e.g. กรุงเทพ)'
        />
        <button onClick={searchKeyword}>Search</button>
      </div>
      <p>Search Result:</p>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <button onClick={() => goToSearchResult(result)}>
              {result.name}
            </button>
          </li>
        ))}
      </ul>
      <p id='status'>Status: </p>

      <div style={{ height: '100%', width: '100%' }}>
        <SphereMap
          id='sphere-map'
          mapKey={SPHERE_MAP_KEY}
          callback={onMapLoad}
          mapRef={mapRef}
          sphereRef={sphereRef}
        />
      </div>
    </div>
  );
};

export default App;

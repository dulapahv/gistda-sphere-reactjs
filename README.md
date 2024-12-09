# GISTDA sphere map component for ReactJS + demo

> [Live Preview](https://stackblitz.com/~/github.com/dulapahv/gistda-sphere-reactjs)

1. Replace `SPHERE_MAP_KEY` value in `./src/App.jsx` with your own API key (get one [here](https://sphere.gistda.or.th/)).

    ```jsx
    const SPHERE_MAP_KEY =
      import.meta.env.VITE_SPHERE_MAP_KEY || 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    ```

2. Call `<SphereMap />` and pass in props.

    ```jsx
    import { SphereMap } from './sphere-map';

    <div style={{ height: '100%', width: '100%' }}>
      <SphereMap
        id='sphere-map'
        mapKey={mapKey}
        callback={onMapLoad}
        mapRef={mapRef}
        sphereRef={sphereRef}
      />
    </div>
    ```

3. Use `mapRef` ref to interact with map, for example:

    ```jsx
    mapRef.goTo({ center: { lon: 100.510847, lat: 13.743757 }, zoom: 14 });
    ```

For more example usage, see `./src/App.jsx`.

- [GISTDA sphere API Demo](https://sphere.gistda.or.th/docs/js/createmap/)
- [GISTDA sphere API Reference](https://api.sphere.gistda.or.th/map/doc.html)

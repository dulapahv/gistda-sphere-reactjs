# GISTDA sphere map component for ReactJS + demo

- [API Demo](https://sphere.gistda.or.th/docs/js/createmap/)
- [GISTDA sphere API Reference](https://api.sphere.gistda.or.th/map/doc.html)

> Modified from [longdo-map-demo-reactjs](https://github.com/MetamediaTechnology/longdo-map-demo-reactjs)

1. Replace `mapKey` value in `./src/map/Map.jsx` with your own API key (get one [here](https://sphere.gistda.or.th/)).

    ```jsx
    const mapKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
    ```

2. Import map component (Map) and instance (map).

    ```jsx
    import { map, Map } from "./map";
    ```

3. Call `<Map />` and you should see the map, for example:

    ```jsx
    import React from "react";

    import { map, Map } from "./map";

    const App = () => {
      return (
        <div style={{ height: "80vh" }}>
          <Map />
        </div>
      );
    };
    ```

4. Use `map` instance to use sphere API, for example:

    ```jsx
    map.goTo({ center: { lon: 100.510847, lat: 13.743757 }, zoom: 14 });
    ```

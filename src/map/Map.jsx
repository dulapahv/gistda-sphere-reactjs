import React, { Component } from "react";

import { map, sphere, SphereMap } from "./SphereMap";

export { map };

class Map extends Component {
  initMap() {
    // To set default map layer, change "STREETS" to any other layer (i.e. sphere.Layers.TRAFFIC).
    // See https://api.sphere.gistda.or.th/map/doc.html#Layers for available layers
    if (map) map.Layers.setBase(sphere.Layers.STREETS);
  }

  render() {
    // Replace this with your own API key: https://sphere.gistda.or.th/
    const mapKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <SphereMap id="sphere-map" mapKey={mapKey} callback={this.initMap} />
      </div>
    );
  }
}

export default Map;

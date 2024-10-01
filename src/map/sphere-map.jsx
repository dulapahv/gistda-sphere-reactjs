import { useEffect, memo } from 'react';

export const SphereMap = memo(function SphereMap({
  mapKey,
  id,
  callback,
  mapRef,
  sphereRef,
}) {
  useEffect(() => {
    const existingScript = document.getElementById('sphereMapScript');

    function initMap() {
      if (!window.sphere) return;

      sphereRef.current = window.sphere;
      mapRef.current = new window.sphere.Map({
        placeholder: document.getElementById(id),
      });

      mapRef.current.Event.bind(sphereRef.current.EventName.Ready, function () {
        callback();
      });
    }

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://api.sphere.gistda.or.th/map/?key=${mapKey}`;
      script.async = true;
      script.id = 'sphereMapScript';
      document.body.appendChild(script);

      script.onload = () => {
        try {
          initMap();
        } catch {}
      };

      return () => {
        document.body.removeChild(script);
      };
    } else {
      initMap();
    }
  }, [mapKey, id, callback, mapRef, sphereRef]);

  return <div id={id} style={{ width: '100%', height: '100%' }} />;
});

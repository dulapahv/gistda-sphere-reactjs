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
          if (callback) callback();
        } catch {}
      };

      return () => {
        document.body.removeChild(script);
      };
    } else {
      initMap();
      if (callback) callback();
    }
  }, [mapKey, id, callback, mapRef, sphereRef]);

  return <div id={id} style={{ width: '100%', height: '100%' }} />;
});

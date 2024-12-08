import { useEffect, memo, useCallback } from 'react';
import PropTypes from 'prop-types';

const SPHERE_API_URL = 'https://api.sphere.gistda.or.th/map/';
const SCRIPT_ID = 'sphereMapScript';

/**
 * Custom hook to load and initialize the Sphere Map script
 * @param {string} mapKey - API key for Sphere Map
 * @returns {boolean} - Whether the script has loaded
 */
const useSphereScript = (mapKey) => {
  return useCallback(() => {
    return new Promise((resolve, reject) => {
      const existingScript = document.getElementById(SCRIPT_ID);

      if (existingScript) {
        resolve(window.sphere);
        return;
      }

      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = `${SPHERE_API_URL}?key=${mapKey}`;
      script.async = true;

      script.onload = () => resolve(window.sphere);
      script.onerror = (error) =>
        reject(new Error(`Failed to load Sphere Map script: ${error.message}`));

      document.body.appendChild(script);
    });
  }, [mapKey]);
};

/**
 * SphereMap Component
 * A wrapper component for the Sphere Map integration
 */
const SphereMap = memo(function SphereMap({
  mapKey,
  id,
  onMapReady,
  mapRef,
  sphereRef,
  className,
  style = { width: '100%', height: '100%' },
}) {
  const loadScript = useSphereScript(mapKey);

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      try {
        const sphere = await loadScript();

        if (!isMounted) return;

        // Store sphere reference
        if (sphereRef) {
          sphereRef.current = sphere;
        }

        // Initialize map
        const map = new sphere.Map({
          placeholder: document.getElementById(id),
        });

        // Store map reference
        if (mapRef) {
          mapRef.current = map;
        }

        // Bind ready event
        map.Event.bind(sphere.EventName.Ready, () => {
          if (onMapReady) {
            onMapReady(map, sphere);
          }
        });
      } catch (error) {
        console.error('Error initializing Sphere Map:', error);
      }
    };

    initializeMap();

    // Cleanup function
    return () => {
      isMounted = false;

      // Clean up map instance if needed
      if (mapRef?.current) {
        mapRef.current = null;
      }

      if (sphereRef?.current) {
        sphereRef.current = null;
      }

      // Remove script tag if component is unmounted
      const scriptTag = document.getElementById(SCRIPT_ID);
      if (scriptTag) {
        document.body.removeChild(scriptTag);
      }
    };
  }, [id, mapKey, onMapReady, mapRef, sphereRef, loadScript]);

  return <div id={id} className={className} style={style} />;
});

SphereMap.propTypes = {
  /** API key for Sphere Map */
  mapKey: PropTypes.string.isRequired,
  /** Unique identifier for the map container */
  id: PropTypes.string.isRequired,
  /** Callback function called when map is ready */
  onMapReady: PropTypes.func,
  /** Ref object to store map instance */
  mapRef: PropTypes.object,
  /** Ref object to store sphere instance */
  sphereRef: PropTypes.object,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Inline styles for the container */
  style: PropTypes.object,
};

export { SphereMap };

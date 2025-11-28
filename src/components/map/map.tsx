import { JSX, useEffect, useRef } from "react";
import L, { Map as LeafletMap, LayerGroup } from "leaflet";
import { FullOffer } from "../../types/offer";

type MapProps = {
  city: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  offers: FullOffer[];
  className: string; 
};

function Map({ city, offers, className }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<LeafletMap | null>(null);
  const markersRef = useRef<LayerGroup | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && mapInstance.current === null) {
      mapInstance.current = L.map(mapRef.current, {
        center: [city.latitude, city.longitude],
        zoom: city.zoom,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstance.current);

      markersRef.current = L.layerGroup().addTo(mapInstance.current);
    }
  }, [city]);

  useEffect(() => {
    if (!mapInstance.current || !markersRef.current) {
      return;
    }

    markersRef.current.clearLayers();

    offers.forEach((offer) => {
      const { latitude, longitude } = offer.location;

      L.marker({
        lat: latitude,
        lng: longitude,
      }).addTo(markersRef.current as LayerGroup);
    });
  }, [offers]);

  return <section className={`${className} map`} ref={mapRef}></section>;
}

export { Map };

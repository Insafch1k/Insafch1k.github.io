import { JSX, useEffect, useRef } from 'react';
import L, { Map as LeafletMap, LayerGroup, Marker } from 'leaflet';
import { CityOffer } from '../../types/offer';

type OfferWithLocation = {
  id: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

type MapProps = {
  city: CityOffer['location'];
  offers: OfferWithLocation[];
  className: string;
  selectedOfferId?: string;
};

const defaultIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const activeIcon = L.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function Map({ city, offers, className, selectedOfferId }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<LeafletMap | null>(null);
  const markersRef = useRef<LayerGroup | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && mapInstance.current === null) {
      mapInstance.current = L.map(mapRef.current, {
        center: [city.latitude, city.longitude],
        zoom: city.zoom,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance.current);

      markersRef.current = L.layerGroup().addTo(mapInstance.current);
    }
  }, [city]);

  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setView([city.latitude, city.longitude], city.zoom);
    }
  }, [city]);

  useEffect(() => {
    if (!mapInstance.current || !markersRef.current) {
      return;
    }

    markersRef.current.clearLayers();

    offers.forEach((offer) => {
      const { latitude, longitude } = offer.location;
      const markerIcon = offer.id === selectedOfferId ? activeIcon : defaultIcon;

      const marker: Marker = L.marker(
        {
          lat: latitude,
          lng: longitude,
        },
        {
          icon: markerIcon,
        },
      );

      marker.addTo(markersRef.current as LayerGroup);
    });
  }, [offers, city, selectedOfferId]);

  return <section className={`${className} map`} ref={mapRef}></section>;
}

export { Map };

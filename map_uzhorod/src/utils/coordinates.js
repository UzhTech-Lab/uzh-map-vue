export const validateCoordinates = (lat, lng, defaultLat = 48.621, defaultLng = 22.295) => {
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return { lat: defaultLat, lng: defaultLng, valid: false };
  }

  if (isNaN(lat) || isNaN(lng)) {
    return { lat: defaultLat, lng: defaultLng, valid: false };
  }

  const ukraineBounds = {
    minLat: 44.0,
    maxLat: 53.0,
    minLng: 20.0,
    maxLng: 50.0
  };

  const valid = (
    lat >= ukraineBounds.minLat &&
    lat <= ukraineBounds.maxLat &&
    lng >= ukraineBounds.minLng &&
    lng <= ukraineBounds.maxLng
  );

  if (!valid) {
    console.warn(`Coordinates out of Ukraine bounds: lat=${lat}, lng=${lng}, using default`);
    return { lat: defaultLat, lng: defaultLng, valid: false };
  }

  return { lat, lng, valid: true };
};

export const fixCoordinates = (coords) => {
  if (!coords || !coords.latitude || !coords.longitude) {
    return { latitude: 48.621, longitude: 22.295 };
  }

  const validated = validateCoordinates(coords.latitude, coords.longitude);
  return {
    latitude: validated.lat,
    longitude: validated.lng
  };
};


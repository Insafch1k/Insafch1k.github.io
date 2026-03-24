const cityCoordinates = {
    Paris: { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
    Cologne: { latitude: 50.9375, longitude: 6.9603, zoom: 13 },
    Brussels: { latitude: 50.8503, longitude: 4.3517, zoom: 13 },
    Amsterdam: { latitude: 52.3676, longitude: 4.9041, zoom: 13 },
    Hamburg: { latitude: 53.5511, longitude: 9.9937, zoom: 13 },
    Dusseldorf: { latitude: 51.2277, longitude: 6.7735, zoom: 13 }
  };
  
  const getBaseUrl = () => `${process.env.HOST}:${process.env.PORT || 5000}`;
  
  const adaptOfferToClient = (offer, options = {}) => {
    const baseUrl = getBaseUrl();
    const cityLocation = cityCoordinates[offer.city];
    let previewImage = offer.previewImage;
    
    if (previewImage && !previewImage.startsWith('http')) {
      previewImage = `${baseUrl}${previewImage.startsWith('/') ? '' : '/'}${previewImage}`;
    }
  
    return {
      id: String(offer.id),
      title: offer.title,
      type: offer.type,
      price: offer.price,
      city: {
        name: offer.city,
        location: cityLocation
      },
      location: offer.latitude && offer.longitude ? {
        latitude: offer.latitude,
        longitude: offer.longitude,
        zoom: 8
      } : { latitude: 0, longitude: 0, zoom: 8 },
      isFavorite: Boolean(options.isFavorite),
      isPremium: offer.isPremium,
      rating: parseFloat(offer.rating),
      previewImage
    };
  };
  
  const adaptFullOfferToClient = (offer, options = {}) => {
    const baseUrl = getBaseUrl();
    const baseOffer = adaptOfferToClient(offer, options);
    
    let images = [];
    if (offer.photos && Array.isArray(offer.photos)) {
      images = offer.photos.map(photo => {
        if (photo && !photo.startsWith('http')) {
          return `${baseUrl}${photo.startsWith('/') ? '' : '/'}${photo}`;
        }
        return photo;
      });
    }
  
    return {
      ...baseOffer,
      description: offer.description,
      bedrooms: offer.rooms,
      goods: offer.features,
      host: {
        name: offer.author ? offer.author.username : 'Unknown',
        avatarUrl: offer.author && offer.author.avatar 
          ? `${baseUrl}${offer.author.avatar.startsWith('/') ? '' : '/'}${offer.author.avatar}` 
          : '',
        isPro: offer.author ? (offer.author.userType === 'pro') : false
      },
      images,
      maxAdults: offer.guests
    };
  };
  
  export { adaptOfferToClient, adaptFullOfferToClient };
  
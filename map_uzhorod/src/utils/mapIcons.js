import L from 'leaflet';

const createCustomIcon = (color, iconName) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <i class="fas fa-${iconName}" style="
          color: white;
          transform: rotate(45deg);
          font-size: 14px;
        "></i>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

export const mapIcons = {
  hospital: createCustomIcon('#dc2626', 'hospital'),
  church: createCustomIcon('#f59e0b', 'church'),
  school: createCustomIcon('#3b82f6', 'graduation-cap'),
  university: createCustomIcon('#2563eb', 'university'),
  restaurant: createCustomIcon('#f97316', 'utensils'),
  cafe: createCustomIcon('#ea580c', 'coffee'),
  park: createCustomIcon('#22c55e', 'tree'),
  shopping: createCustomIcon('#06b6d4', 'shopping-bag'),
  library: createCustomIcon('#a855f7', 'book'),
  sports: createCustomIcon('#eab308', 'dumbbell'),
  hotel: createCustomIcon('#f59e0b', 'bed'),
  theater: createCustomIcon('#9333ea', 'theater-masks'),
  museum: createCustomIcon('#0ea5e9', 'landmark'),
  government: createCustomIcon('#1e40af', 'building'),
  market: createCustomIcon('#14b8a6', 'store'),
  bridge: createCustomIcon('#64748b', 'bridge'),
  castle: createCustomIcon('#7c3aed', 'chess-rook'),
  monument: createCustomIcon('#dc2626', 'monument'),
  sakura: createCustomIcon('#ec4899', 'seedling'),
  linden: createCustomIcon('#84cc16', 'leaf'),
  square: createCustomIcon('#6366f1', 'square'),
  default: createCustomIcon('#6b7280', 'map-marker-alt')
};

export const getIconByType = (type) => {
  if (!type) return mapIcons.default;
  
  const typeLower = type.toLowerCase();
  
  const iconMap = {
    hospital: mapIcons.hospital,
    'medical facility': mapIcons.hospital,
    clinic: mapIcons.hospital,
    
    church: mapIcons.church,
    'religious site': mapIcons.church,
    cathedral: mapIcons.church,
    temple: mapIcons.church,
    
    school: mapIcons.school,
    'educational institution': mapIcons.school,
    
    university: mapIcons.university,
    college: mapIcons.university,
    
    restaurant: mapIcons.restaurant,
    'dining': mapIcons.restaurant,
    
    cafe: mapIcons.cafe,
    coffee: mapIcons.cafe,
    
    park: mapIcons.park,
    'green space': mapIcons.park,
    
    shopping: mapIcons.shopping,
    'retail': mapIcons.shopping,
    'shopping center': mapIcons.shopping,
    'shopping mall': mapIcons.shopping,
    
    library: mapIcons.library,
    bookstore: mapIcons.library,
    
    sports: mapIcons.sports,
    'sports facility': mapIcons.sports,
    stadium: mapIcons.sports,
    gym: mapIcons.sports,
    
    hotel: mapIcons.hotel,
    accommodation: mapIcons.hotel,
    
    theater: mapIcons.theater,
    'entertainment venue': mapIcons.theater,
    
    museum: mapIcons.museum,
    'cultural institution': mapIcons.museum,
    
    government: mapIcons.government,
    'government building': mapIcons.government,
    
    market: mapIcons.market,
    
    bridge: mapIcons.bridge,
    
    castle: mapIcons.castle,
    fortress: mapIcons.castle,
    
    monument: mapIcons.monument,
    'historical site': mapIcons.monument,
    
    sakura: mapIcons.sakura,
    
    linden: mapIcons.linden,
    
    square: mapIcons.square,
    plaza: mapIcons.square
  };
  
  return iconMap[typeLower] || mapIcons.default;
};


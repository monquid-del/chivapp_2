export interface CarSeat {
  id: 'front_left' | 'front_right' | 'rear_left' | 'rear_center' | 'rear_right';
  label: string;
  isDriver?: boolean;
  occupant?: {
    name: string;
    roleOrCompany: string;
    avatar: string;
  };
  isAvailable: boolean;
}

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  ridesCount: number;
  carModel: string;
  carColor: string;
  licensePlate: string;
  carImage: string;
  about: string;
  proximityMinutes: number;
  pickupTime: string;
  dropoffTime: string;
  price: number; // 0 for Free
  pointsEarned: number;
  departureLocation: string;
  destinationLocation: string;
  verified: boolean;
  tags: string[];
  preferences: {
    quiet: boolean;
    smoking: boolean;
    pets: boolean;
  };
  seats?: CarSeat[];
  trunkCapacity?: string;
  driverRoleOrCompany?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  points: number;
  co2SavedKg: number;
  ridesThisMonth: number;
  isVerified: boolean;
  verificationSteps: {
    govId: boolean;
    selfie: boolean;
    profile: boolean;
  };
}

export interface RidePreferences {
  maxDetourMinutes: number;
  gender: 'Any' | 'Women only';
  quietRide: 'Preferred' | 'Chatty' | 'Any';
  pets: 'Okay' | 'No pets';
}

export interface RidePlan {
  origin: string;
  destination: string;
  travelTimeType: 'Now' | 'Schedule' | 'Recurring';
  scheduledDate?: string;
  preferences: RidePreferences;
}

export interface ActiveRide {
  driver: Driver;
  status: 'pickup_soon' | 'arrived_pickup' | 'in_transit' | 'approaching' | 'completed';
  progressPercent: number;
  etaMinutes: number;
  pickupAddress: string;
  destinationAddress: string;
  startTime: string;
  durationMinutes: number;
  distanceKm: number;
}

export interface RewardItem {
  id: string;
  title: string;
  subtitle: string;
  pointsCost: number;
  iconType: 'ride' | 'discount' | 'cafe' | 'event';
  claimed: boolean;
}

export interface LisbonNeighborhood {
  id: string;
  name: string;
  activeCarpools: number;
  members: number;
  image: string;
}

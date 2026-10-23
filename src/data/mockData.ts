import { Driver, RewardItem, UserProfile } from '../types';
import onboardingHero from '../assets/images/chiva_onboarding_hero_1792668441394.jpg';
import arrivalHero from '../assets/images/chiva_arrival_celebration_1792668441272.jpg';
import toyotaCorolla from '../assets/images/chiva_toyota_corolla_1792668441667.jpg';
import driverRafael from '../assets/images/chiva_driver_rafael_1792668441527.jpg';

export const ASSETS = {
  onboardingHero,
  arrivalHero,
  toyotaCorolla,
  driverRafael,
};

export const INITIAL_USER: UserProfile = {
  name: 'Sofia Martins',
  email: 'sofia.martins@lisboa.pt',
  phone: '+351 912 345 678',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  points: 320,
  co2SavedKg: 14.2,
  ridesThisMonth: 12,
  isVerified: true,
  verificationSteps: {
    govId: true,
    selfie: true,
    profile: true,
  },
};

export const MOCK_DRIVERS: Driver[] = [
  {
    id: 'driver-rafael',
    name: 'Rafael S.',
    avatar: ASSETS.driverRafael,
    rating: 4.9,
    ridesCount: 120,
    carModel: 'Toyota Corolla',
    carColor: 'White',
    licensePlate: 'XX - 12 - AB',
    carImage: ASSETS.toyotaCorolla,
    about: 'Work near Marquês. Regular route. Open to friendly conversations or quiet rides.',
    proximityMinutes: 5,
    pickupTime: '5:35 PM',
    dropoffTime: '6:00 PM',
    price: 0, // Free as shown in image
    pointsEarned: 30,
    departureLocation: 'Alfama (5:35 PM)',
    destinationLocation: 'Marquês de Pombal (6:00 PM)',
    verified: true,
    tags: ['Carpool often', 'Clean car', 'Friendly'],
    preferences: {
      quiet: true,
      smoking: false,
      pets: true,
    },
    driverRoleOrCompany: 'Amazon AWS',
    trunkCapacity: '2 Bags',
    seats: [
      {
        id: 'front_left',
        label: 'Driver',
        isDriver: true,
        isAvailable: false,
        occupant: {
          name: 'Rafael S.',
          roleOrCompany: 'Amazon AWS',
          avatar: ASSETS.driverRafael,
        },
      },
      {
        id: 'front_right',
        label: 'Front Right',
        isAvailable: false,
        occupant: {
          name: 'David Morales',
          roleOrCompany: 'Globant',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        },
      },
      {
        id: 'rear_left',
        label: 'Rear Left',
        isAvailable: true,
      },
      {
        id: 'rear_center',
        label: 'Center',
        isAvailable: true,
      },
      {
        id: 'rear_right',
        label: 'Rear Right',
        isAvailable: false,
        occupant: {
          name: 'Valeria',
          roleOrCompany: 'Mercado Libre',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        },
      },
    ],
  },
  {
    id: 'driver-ines',
    name: 'Inês M.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    rating: 4.8,
    ridesCount: 86,
    carModel: 'Renault Zoe E-Tech',
    carColor: 'Pastel Blue',
    licensePlate: '44 - TZ - 91',
    carImage: ASSETS.toyotaCorolla,
    about: 'Commuting daily from Santa Apolónia to Saldanha. Clean 100% electric vehicle.',
    proximityMinutes: 8,
    pickupTime: '5:40 PM',
    dropoffTime: '6:05 PM',
    price: 2,
    pointsEarned: 20,
    departureLocation: 'Santa Apolónia (5:40 PM)',
    destinationLocation: 'Marquês de Pombal (6:05 PM)',
    verified: true,
    tags: ['100% Electric', 'Eco Driver', 'Music lover'],
    preferences: {
      quiet: false,
      smoking: false,
      pets: true,
    },
  },
  {
    id: 'driver-joao',
    name: 'João P.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 4.7,
    ridesCount: 54,
    carModel: 'Volkswagen Golf',
    carColor: 'Silver',
    licensePlate: '82 - GH - 15',
    carImage: ASSETS.toyotaCorolla,
    about: 'Architect working in Lisbon center. Happy to carpool and share music or good conversation.',
    proximityMinutes: 10,
    pickupTime: '5:40 PM',
    dropoffTime: '6:10 PM',
    price: 2,
    pointsEarned: 20,
    departureLocation: 'Alfama (5:40 PM)',
    destinationLocation: 'Marquês de Pombal (6:10 PM)',
    verified: true,
    tags: ['Reliable', 'Great conversations', 'On time'],
    preferences: {
      quiet: false,
      smoking: false,
      pets: false,
    },
  },
];

export const MOCK_REWARDS: RewardItem[] = [
  {
    id: 'rew-free-ride',
    title: 'Free rides',
    subtitle: 'Full urban carpool voucher',
    pointsCost: 500,
    iconType: 'ride',
    claimed: false,
  },
  {
    id: 'rew-transit',
    title: 'Partner discounts',
    subtitle: 'Metropolitano de Lisboa pass',
    pointsCost: 300,
    iconType: 'discount',
    claimed: false,
  },
  {
    id: 'rew-cafe',
    title: 'Local cafes 10% off',
    subtitle: 'Pastéis de Belém & Alfama roasters',
    pointsCost: 150,
    iconType: 'cafe',
    claimed: false,
  },
  {
    id: 'rew-event',
    title: 'Community events',
    subtitle: 'VIP pass to Green City Fest Lisbon',
    pointsCost: 200,
    iconType: 'event',
    claimed: false,
  },
];

export const LISBON_POPULAR_PLACES = [
  { name: 'Alfama, Lisbon', area: 'Historic District / Miradouro de Santa Luzia' },
  { name: 'Marquês de Pombal', area: 'Avenida da Liberdade / Central Hub' },
  { name: 'Santa Apolónia', area: 'Train & Metro Station' },
  { name: 'Baixa-Chiado', area: 'Downtown Lisbon' },
  { name: 'Saldanha', area: 'Financial & Business District' },
  { name: 'Cais do Sodré', area: 'Riverside Hub' },
  { name: 'Parque das Nações', area: 'Modern Waterfront District' },
  { name: 'Belém', area: 'Cultural Riverside Area' },
];

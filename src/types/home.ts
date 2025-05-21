export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  wind: string;
  humidity: string;
  rain: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
}

export interface UserCardData {
  id: string;
  name: string;
  occupation: string;
  image: string;
}

export interface BookingCardData {
  id: string;
  user: UserCardData;
  date: string; // ISO string
  time: string; // ISO string or formatted
}

export interface UserBookingCardProps {
  data: BookingCardData;
  onPressDetails?: () => void;
}

export interface PlantDetails {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  careInstructions: {
    watering: string;
    sunlight: string;
    temperature: string;
  };
  features: string[];
}

export interface PlantDetailsState {
  selectedPlant: PlantDetails | null;
  setSelectedPlant: (plant: PlantDetails | null) => void;
}

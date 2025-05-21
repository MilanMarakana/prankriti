import {create} from 'zustand';
import {WeatherData, Task, PlantDetailsState} from '../types/home';

interface HomeState extends PlantDetailsState {
  weather: WeatherData;
  todayTasks: Task[];
  upcomingTasks: Task[];
  setWeather: (weather: WeatherData) => void;
  setTodayTasks: (tasks: Task[]) => void;
  setUpcomingTasks: (tasks: Task[]) => void;
}

export const useHomeStore = create<HomeState>(set => ({
  weather: {
    city: 'Surat',
    temperature: 24,
    description: 'Mostly clear',
    wind: '10 m/s',
    humidity: '98%',
    rain: '100%',
  },
  todayTasks: [],
  upcomingTasks: [
    {
      id: '1',
      title: 'Cacti',
      description: 'Turn on grow light for 4 hours',
    },
    {
      id: '2',
      title: 'Tail boi',
      description: '300 - 350 ML Water Need',
    },
    {
      id: '3',
      title: 'Golden Green',
      description: 'Change water of the flower pot',
    },
    {
      id: '4',
      title: 'Golden Green',
      description: 'Make 8° higher temperatures in room',
    },
  ],
  selectedPlant: null,
  setWeather: weather => set({weather}),
  setTodayTasks: tasks => set({todayTasks: tasks}),
  setUpcomingTasks: tasks => set({upcomingTasks: tasks}),
  setSelectedPlant: plant => set({selectedPlant: plant}),
}));

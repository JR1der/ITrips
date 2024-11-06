import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Destination } from '../pages/CreateTripPage/CreateTripPage.tsx';

interface Trip {
  name: string;
  description: string;
  destinations: Destination[];
}

export const useTrip = (id: string): [Trip | null, boolean, boolean] => {
  const [trip, setTrip] = useState(null);
  const api = import.meta.env.REACT_APP_API_URL;

  const { isLoading, isError } = useQuery({
    queryKey: ['trip', id],
    queryFn: async () => {
      try {
        const res = await fetch(`${api}/trip/get/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch destination: ${res.statusText}`);
        }
        const tripData = await res.json();
        setTrip(tripData);
        return tripData;
      } catch (error) {
        console.error(
          `An error occurred while fetching the destination: ${error}`
        );
      }
    },
  });

  return [trip, isLoading, isError];
};

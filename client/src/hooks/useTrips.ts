import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface Destination {
  _id: string;
  name: string;
}

interface Trip {
  _id?: string;
  userId?: string;
  name: string;
  description: string;
  destinations: Destination[];
}

export const useTrips = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const queryClient = useQueryClient();
  const [trip, setTrip] = useState<Trip | null>(null);

  // Fetch all trips
  const {
    data: trips = [],
    isLoading: isFetchingTrips,
    isError: hasFetchError,
  } = useQuery<Trip[]>({
    queryKey: ["trips"],
    queryFn: async () => {
      const response = await axios.get(`${BACKEND_URL}/trips`);
      console.log(response);
      return response.data;
    },
  });

  // Fetch a specific trip by ID
  const fetchTripById = async (id: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/trips/${id}`);
      setTrip(response.data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(`Error fetching trip: ${error}`);
      return null;
    }
  };

  // Mutation for creating a new trip
  const {
    mutate: createTrip,
    isLoading: isCreating,
    isError: hasCreateError,
  } = useMutation({
    mutationFn: async (newTrip: Omit<Trip, "_id">) => {
      const response = await axios.post(`${BACKEND_URL}/trips`, newTrip);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["trips"]),
  });

  // Mutation for updating a trip
  const {
    mutate: updateTrip,
    isLoading: isUpdating,
    isError: hasUpdateError,
  } = useMutation({
    mutationFn: async (updatedTrip: Trip) => {
      const response = await axios.put(
        `${BACKEND_URL}/trips/${updatedTrip._id}`,
        updatedTrip
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["trips"]);
      if (trip && updatedTrip._id === trip._id) {
        setTrip(updatedTrip);
      }
    },
  });

  // Mutation for deleting a trip
  const {
    mutate: deleteTrip,
    isLoading: isDeleting,
    isError: hasDeleteError,
  } = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${BACKEND_URL}/trips/${id}`);
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries(["trips"]),
  });

  return {
    trips,
    trip,
    isFetchingTrips,
    hasFetchError,
    fetchTripById,
    createTrip,
    isCreating,
    hasCreateError,
    updateTrip,
    isUpdating,
    hasUpdateError,
    deleteTrip,
    isDeleting,
    hasDeleteError,
  };
};

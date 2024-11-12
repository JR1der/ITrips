import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface Destination {
  _id: string;
  name: string;
  userId: string;
  description?: string;
  activities?: string[];
}

export const useDestinations = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const queryClient = useQueryClient();
  const [destination, setDestination] = useState<Destination | null>(null);

  // Fetch all destinations
  const {
    data: destinations = [],
    isLoading: isFetchingDestinations,
    isError: hasFetchDestError,
  } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const response = await axios.get(`${BACKEND_URL}/destinations`);
      console.log(response);
      return response.data;
    },
  });

  // Fetch a specific destination by ID
  const fetchDestinationById = async (id: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/destinations/${id}`);
      setDestination(response.data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(`Error fetching destination: ${error}`);
      return null;
    }
  };

  // Mutation for creating a destination
  const {
    mutate: createDestination,
    status: isCreating,
    isError: hasCreateError,
  } = useMutation<Destination, Error, Omit<Destination, '_id'>>({
    mutationFn: async (newDestination: Omit<Destination, '_id'>) => {
      const response = await axios.post(
        `${BACKEND_URL}/destinations/create`,
        newDestination
      );
      return response.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['destinations'] }),
  });

  // Mutation for updating a destination
  const {
    mutate: updateDestination,
    status: isUpdating,
    isError: hasUpdateError,
  } = useMutation<Destination, Error, Destination>({
    mutationFn: async (updatedDestination: Destination) => {
      const response = await axios.put(
        `${BACKEND_URL}/destinations/update/${updatedDestination._id}`,
        updatedDestination
      );
      return response.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['destinations'] }),
  });

  // Mutation for deleting a destination
  const {
    mutate: deleteDestination,
    status: isDeleting,
    isError: hasDeleteError,
  } = useMutation<string, Error, { id: string; userId: string }>({
    mutationFn: async ({ id, userId }) => {
      await axios.delete(`${BACKEND_URL}/destinations/delete/${id}`, {
        data: { userId },
      });
      return id;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['destinations'] }),
  });

  return {
    destinations,
    destination,
    isFetchingDestinations,
    hasFetchDestError,
    createDestination,
    isCreating,
    hasCreateError,
    updateDestination,
    isUpdating,
    hasUpdateError,
    deleteDestination,
    isDeleting,
    hasDeleteError,
    fetchDestinationById,
  };
};

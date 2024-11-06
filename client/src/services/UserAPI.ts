import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type UpdateData<T extends string> = {
  [K in T]?: string | number | boolean;
};

export const updateUser = async <T extends string>(
  userId: string,
  data: UpdateData<T>
) => {
  try {
    const response = await axios.patch(BACKEND_URL + `/users/${userId}`, data);
    console.info('User updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const getUserData = async (userId: string, token: string) => {
  try {
    console.log(userId);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(BACKEND_URL + '/users/' + userId, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('Error loading user:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await axios.delete(BACKEND_URL + `/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

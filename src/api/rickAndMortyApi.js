import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api/character/";

export const fetchCharacters = async (status) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        status: status,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};

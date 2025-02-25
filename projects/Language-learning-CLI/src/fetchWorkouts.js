import axios from 'axios';
import chalk from 'chalk';

const BASE_URL = 'https://wger.de/api/v2';

export const fetchExercises = async (muscleId, equipmentId) => {
  try {
    const response = await axios.get(`${BASE_URL}/exercise/`, {
      params: {
        muscles: muscleId,
        equipment: equipmentId,
        language: 2, // English
        limit: 10, 
      },
    });

    if (!response.data.results.length) {
      throw new Error('No exercises found with these filters.');
    }

    return response.data.results;
  } catch (error) {
    console.error(chalk.red('Error fetching workouts:', error.message));
    process.exit(1);
  }
};
import axios from "axios";

// Function to validate the word using a dictionary API
export const validateWord = async (word) => {
  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    return true;
  } catch (error) {
    console.log("error: ", error);
    return false;
  }
};

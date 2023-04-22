import axios from 'axios';

export const getRateRequest = async (date: string) => {
  const URL = `https://www.cbr.ru/scripts/XML_daily_eng.asp?date_req=${date}`;

  try {
    const { data } = await axios(URL);
    return { data, ok: true };
  } catch (error) {
    return { error, ok: false };
  }
};

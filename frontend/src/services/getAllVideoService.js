import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllVideos = async () => {
	try {
		const res = await axios.get(`${BASE_URL}/api/getAll`);

		return res.data.result;
	} catch (err) {
		console.error('Greška prilikom dohvatanja videa:', err);
		return [];
	}
};

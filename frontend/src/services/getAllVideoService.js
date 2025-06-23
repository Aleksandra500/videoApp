import axios from 'axios';

export const getAllVideos = async() => {
	try {
		const res = await axios.get('http://localhost:5000/api/getAll');
		if (res.data.status === 200) {
			return res;
		}
      console.log(res);
      
      return res
      
		
	} catch (err) {
	   return err
	}
};

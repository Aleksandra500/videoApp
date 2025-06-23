import React, { useState } from 'react';
import CardComponent from './CardComponent';
import { useEffect } from 'react';
import { getAllVideos } from '../src/services/getAllVideoService';
import { FiLoader } from "react-icons/fi";
import './allVideo.css'
function AllVideosComponent() {
  const [videos, setVideos] = useState([])
  const [loader, setLoader] = useState(false)

   useEffect(() => {
    const fetchVideo = async () => {
      setLoader(true);
      try {
        const res = await getAllVideos();
        console.log('res:', res);

        if (res.status === 200 && Array.isArray(res.data.result)) {
          setVideos(res.data.result);
        } else {
          console.log('Trenutno nemate video listu za prikazivanje');
        }

      } catch (err) {
        console.error('Greška pri dohvatanju videa:', err);
      } finally {
        setLoader(false);
      }
    };

    fetchVideo();
  }, []);



	return (
		<div className='container'>
      {console.log(videos)
      }
      {loader && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <FiLoader size={32} className="spinner" />
        </div>
      )}
		

			<CardComponent videos={videos}/>
		</div>
	);
}

export default AllVideosComponent;

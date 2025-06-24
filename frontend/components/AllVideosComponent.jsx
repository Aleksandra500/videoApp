import React, { useState, useEffect } from 'react';
import CardComponent from './CardComponent';
import { getAllVideos } from '../src/services/getAllVideoService';
import { FiLoader } from "react-icons/fi";
import './allVideo.css';

function AllVideosComponent({ onSelect }) {
  const [videos, setVideos] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoader(true);
      try {
        const res = await getAllVideos();

        if (res.status === 200 && Array.isArray(res.data.result)) {
          setVideos(res.data.result);
          if (res.data.result.length > 0 && onSelect) {
            onSelect(res.data.result[0].id);
          }
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
  }, [onSelect]);

  return (
    <div className='container'>
      {loader && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <FiLoader size={32} className="spinner" />
        </div>
      )}
      <CardComponent videos={videos} onSelect={onSelect} />
    </div>
  );
}

export default AllVideosComponent;

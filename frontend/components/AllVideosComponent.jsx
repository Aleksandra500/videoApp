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
        const videoList = await getAllVideos(); // OVO MORA BITI ARRAY

        console.log("Video list:", videoList);

        if (Array.isArray(videoList) && videoList.length > 0) {
          setVideos(videoList);

          // automatski izaberi prvi video
          if (onSelect) {
            const fileName = videoList[0].filepath.split('/')[1];
            onSelect(fileName);
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
  }, []);

  return (
    <div className='all-videos-container'>
      {loader && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <FiLoader size={32} className="spinner" />
        </div>
      )}
      <CardComponent
  videos={videos}
  onSelect={(video) => {
    const fileName = video.filepath.split('/')[1];
    onSelect(fileName); // ovo je tvoj VideoPlayer setSelectedVideo
  }}
/>
    </div>
  );
}

export default AllVideosComponent;

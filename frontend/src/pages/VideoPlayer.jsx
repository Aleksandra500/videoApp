import { useState } from 'react'
import AllVideosComponent from '../../components/AllVideosComponent'
import './videoPlayer.css'

function VideoPlayer() {
  const [selectedVideo, setSelectedVideo] = useState('');

  return (
    <div className='video-container'>
      {console.log(selectedVideo, 'selected video')}
      <h1 className='video-title'>Watch Video</h1>
      <div className='video'>
        <div>
          {selectedVideo ? (
            <video key={selectedVideo} className='video-player' controls autoPlay>
              <source src={`http://localhost:5000/api/stream/${selectedVideo}`} type="video/mp4" />
              Your browser does not support the video tag
            </video>
          ) : (
            <p>Loading video...</p>
          )}
        </div>
        <div className='all-videos'>
          <AllVideosComponent onSelect={setSelectedVideo} />
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;

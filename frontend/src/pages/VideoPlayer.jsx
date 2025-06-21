
import AllVideosComponent from '../../components/AllVideosComponent'
import './videoPlayer.css'


function VideoPlayer() {
  return (
    <div className='video-container'>
        <h1 className='video-title'>Watch Video</h1>
        <div className='video'>
           <div>
          <video className='video-player' controls>
          <source src="http://localhost:5000/api/stream" type="video/mp4" />
          Your browser does not support the video tag
          </video>
        </div>
        <div className='all-videos'>
          <AllVideosComponent/>
        </div>
        </div>
       
    </div>
  )
}

export default VideoPlayer
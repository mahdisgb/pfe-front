import { useEffect } from "react";
type VideoPlayerProps={
    url:string
}
export const VideoPlayer = ({url}:VideoPlayerProps)=>{
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '../playerjs.js';
        script.async = true;
        document.body.appendChild(script);
    
        script.onload = () => {
          // Main player
          const mainPlayer = new window.Playerjs({
            id: 'main-player',
            file: url,
            width: '100%',
            height: '100%',
            autoplay: true,
            muted: true,
            controls:true
          });
    
          // Instructor player
          const instructorPlayer = new window.Playerjs({
            id: 'player',
            file: '/simplescreenrecorder-2025-04-14_22.37.48.mkv',
            width: '100%',
            height: '100%',
            autoplay: true,
            muted: true
          });
        };
    
        return () => {
          document.body.removeChild(script);
        };
      }, [url]);
      return  <div className="absolute inset-0">
      <div id="main-player"></div>
    </div>
}
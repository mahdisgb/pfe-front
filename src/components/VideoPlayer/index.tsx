import { useTranslation } from '@refinedev/core';
import { Spin } from 'antd';

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const { translate: t } = useTranslation();

  return (
    <div className="relative w-full aspect-video bg-black">
      {!src ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spin tip={t('videoPlayer.loading')} />
        </div>
      ) : (
        <video
          src={src}
          poster={poster}
          controls
          className="w-full h-full"
        />
      )}
    </div>
  );
}; 
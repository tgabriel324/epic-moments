import { ARViewSettings, ARTrackingState, ARVideoState } from "@/types/ar";
import { VideoControls } from "../controls/VideoControls";
import { TransformControls } from "../controls/TransformControls";
import { TrackingFeedback } from "../tracking/TrackingFeedback";

interface AROverlayProps {
  settings: ARViewSettings;
  tracking: ARTrackingState;
  videoState: ARVideoState;
  scale: number;
  onPlayPause: () => void;
  onScaleChange: (value: number[]) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotationReset: () => void;
}

export const AROverlay = ({
  settings,
  tracking,
  videoState,
  scale,
  onPlayPause,
  onScaleChange,
  onZoomIn,
  onZoomOut,
  onRotationReset
}: AROverlayProps) => {
  return (
    <div id="ar-overlay" className="absolute inset-0 pointer-events-none">
      {/* Logo */}
      {settings.landing_page_logo_url && (
        <div className="absolute top-4 left-4 right-4">
          <img 
            src={settings.landing_page_logo_url} 
            alt="Logo"
            className="h-12 object-contain"
          />
        </div>
      )}
      
      {/* Tracking Feedback */}
      <TrackingFeedback tracking={tracking} />
      
      {/* Controls */}
      <div className="absolute bottom-24 left-4 right-4 pointer-events-auto">
        <div className="bg-black/50 p-4 rounded-lg backdrop-blur-sm space-y-4">
          <VideoControls 
            videoState={videoState}
            onPlayPause={onPlayPause}
          />
          
          <TransformControls 
            scale={scale}
            onScaleChange={onScaleChange}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            onRotationReset={onRotationReset}
          />
        </div>
      </div>
      
      {/* Description */}
      <div className="absolute bottom-4 left-4 right-4">
        <div 
          className="bg-black/50 p-4 rounded-lg backdrop-blur-sm"
          style={{ color: settings.landing_page_primary_color }}
        >
          <p className="text-sm">
            {settings.landing_page_description}
          </p>
        </div>
      </div>
    </div>
  );
};
"use client";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("./ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-orange-600 font-bold text-sm font-jetbrains-mono">
      Loading 3D Experience...
    </div>
  )
});

export default function ModelView({
  url = "/models/animator.glb",
  videoUrl = "/videos/Animater.mp4",
  useVideoTexture = true,
  startAnimation,
  staticMode,
  onModelLoad
}) {
  return (
    <div className="w-full h-full relative bg-transparent flex items-center justify-center">
      <ModelViewer
        url={url}
        videoUrl={useVideoTexture ? videoUrl : null}
        width="100%"
        height="100%"
        enableMouseParallax={false}
        enableHoverRotation={false}
        enableManualRotation={true}
        enableManualZoom={false}
        showScreenshotButton={false}
        defaultRotationX={0}
        defaultRotationY={0}
        defaultZoom={76}
        minZoomDistance={76}
        maxZoomDistance={76}
        ambientIntensity={0.6}
        keyLightIntensity={0.8}
        fillLightIntensity={0.6}
        rimLightIntensity={0.7}
        fadeIn={false}
        onModelLoaded={onModelLoad}
      />
    </div>
  );
}
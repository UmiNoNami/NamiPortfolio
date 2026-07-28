export default function GrainOverlay() {
  return (
    <div className="grain" aria-hidden="true">
      <svg width="100%" height="100%">
        <filter id="grainFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainFilter)" />
      </svg>
    </div>
  );
}

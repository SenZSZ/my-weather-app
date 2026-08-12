// Signature motif: three contour lines echo the isobars on a synoptic
// pressure chart, used wherever the UI needs to mark a boundary.
export default function IsobarDivider({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 16"
      preserveAspectRatio="none"
      className={`h-4 w-full ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 8 C 40 2, 80 2, 120 8 S 200 14, 240 8 S 320 2, 400 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.9"
      />
      <path
        d="M0 11.5 C 40 6.5, 80 6.5, 120 11.5 S 200 16.5, 240 11.5 S 320 6.5, 400 11.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
      <path
        d="M0 4.5 C 40 -0.5, 80 -0.5, 120 4.5 S 200 9.5, 240 4.5 S 320 -0.5, 400 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.25"
      />
    </svg>
  );
}

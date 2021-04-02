function VolumeDownIcon({ height, width }) {
  return (
    <svg
      className="icon icon-volume-down"
      height={height}
      width={width}
      version="1.1"
      viewBox="0 0 4.2319 4.7577"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(-150.96 -26.236)">
        <g transform="matrix(.26458 0 0 .26458 150.44 25.442)">
          <path
            class="primary"
            d="m6.59 16h-3.59a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h3.59l4.7-4.7a1 1 0 0 1 1.71 0.7v16a1 1 0 0 1-1.7 0.7l-4.72-4.7z"
          />
          <path
            class="secondary"
            d="m14.83 9.17a1 1 0 1 1 1.41-1.41 6 6 0 0 1 0 8.48 1 1 0 0 1-1.41-1.41 4 4 0 0 0 0-5.66z"
          />
        </g>
      </g>
    </svg>
  );
}

export default VolumeDownIcon;

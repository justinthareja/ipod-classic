function PauseIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="icon icon-pause"
    >
      <circle cx="12" cy="12" r="10" className="primary" />
      <path
        className="secondary"
        d="M9 8h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zm5 0h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
      />
    </svg>
  );
}

export default PauseIcon;

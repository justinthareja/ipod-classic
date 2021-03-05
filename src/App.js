import './App.css';

function App() {
  return (
    <div className="ipod">
      <div className="screen-container">
        <div className="screen">
          <div className="screen-header">
            <div className="header-icon">
              {/* Status */}
            </div>
            <div className="title">iPod</div>
            <div className="header-icon">
              <svg
                className="icon battery"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  className="primary"
                  d="M20 9h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v1zM4 8v8h14V8H4z"
                />
                <rect width="6" height="4" x="6" y="10" className="secondary" />
              </svg>
            </div>
          </div>
          <div className="screen-content">
            <ul className="screen-menu">
              <li className="menu-item is-active">
                <span>Playlists</span>
                <svg
                  className="icon cheveron-right"
                  viewBox="0 0 5.8859 9.8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="primary"
                    d="m0.2 8.2a1 1 0 0 0 1.4 1.4l4-4a1 1 0 0 0 0-1.4l-4-4a1 1 0 0 0-1.4 1.4l3.29 3.3-3.3 3.3z"
                  />
                </svg>
              </li>
              <li className="menu-item">
                <span>Browse</span>
                <svg
                  className="icon cheveron-right"
                  viewBox="0 0 5.8859 9.8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="primary"
                    d="m0.2 8.2a1 1 0 0 0 1.4 1.4l4-4a1 1 0 0 0 0-1.4l-4-4a1 1 0 0 0-1.4 1.4l3.29 3.3-3.3 3.3z"
                  />
                </svg>
              </li>
              <li className="menu-item">
                <span>Extras</span>
                <svg
                  className="icon cheveron-right"
                  viewBox="0 0 5.8859 9.8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="primary"
                    d="m0.2 8.2a1 1 0 0 0 1.4 1.4l4-4a1 1 0 0 0 0-1.4l-4-4a1 1 0 0 0-1.4 1.4l3.29 3.3-3.3 3.3z"
                  />
                </svg>
              </li>
              <li className="menu-item">
                <span>Settings</span>
                <svg
                  className="icon cheveron-right"
                  viewBox="0 0 5.8859 9.8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="primary"
                    d="m0.2 8.2a1 1 0 0 0 1.4 1.4l4-4a1 1 0 0 0 0-1.4l-4-4a1 1 0 0 0-1.4 1.4l3.29 3.3-3.3 3.3z"
                  />
                </svg>
              </li>
              <li className="menu-item">
                <span>Backlight</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="controls">
        <div className="control">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon rewind"
            viewBox="0 0 100 125"
          >
            <g>
              <polygon
                points="90.25,30.239 73.322,40.451 56.025,50 73.322,59.557 90.242,69.761 89.864,50  "
              />
              <polygon
                points="56.025,30.239 39.101,40.451 22.107,49.83 22.107,30.239 10.25,30.239 10.25,69.761 22.107,69.761 22.107,50.17    39.101,59.553 56.025,69.761 55.639,50  "
              />
            </g>
          </svg>
        </div>
        <div className="control">MENU</div>
        <div className="control">
          <svg
            className="icon playpause"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 125"
          >
            <polygon points="4.948,21.713 53.945,50.002 4.948,78.286 " />
            <rect x="53.945" y="21.713" width="15.478" height="56.573" />
            <rect x="80.77" y="21.713" width="15.48" height="56.573" />
          </svg>
        </div>
        <div className="control">
          <svg
            className="icon fast-forward"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 125"
          >
            <g>
              <polygon
                points="10.25,69.761 27.178,59.549 44.475,50 27.178,40.443 10.258,30.239 10.636,50  "
              />
              <polygon
                points="44.475,69.761 61.399,59.549 78.393,50.169 78.393,69.761 90.25,69.761 90.25,30.239 78.393,30.239 78.393,49.83    61.399,40.447 44.475,30.239 44.861,50  "
              />
            </g>
          </svg>
        </div>
      </div>
      <div className="wheel">
        <div className="wheel-inner"></div>
      </div>
    </div>
  );
}

export default App;

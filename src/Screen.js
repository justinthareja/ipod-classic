function Screen(props) {
    return (
      <div className="screen-container">
        <div className="screen">
          <div className="screen-header">
            <div className="header-icon">{/* Status */}</div>
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
    );
}

export default Screen;
// Sidebar.tsx
import React from 'react';
import './Sidebar.css';

interface SidebarProps {
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar }) => {
    return (
        <div className='sidebar open'>
          <ul className="sidebar-nav">
              <li className="sidebar-item">
                  Sprint time:
                  <input type='number' value={25} />
              </li>
              <li className="sidebar-item">
                  Short rest time:
                  <input type='number' value={5} />
              </li>
              <li className="sidebar-item">
                  Long rest time:
                  <input type='number' value={15} />
              </li>
              <li className="sidebar-item">
                  Number of pomodoros/rest:
                  <input type='number' value={4} />
              </li>
              <li className="sidebar-item">
                  Number of long cycles / day (optional):
                  <input type='number' value={4} />
              </li>
              <button className="close-button" onClick={toggleSidebar}>
                Quit without saving
              </button>
              <button className="close-button" onClick={toggleSidebar}>
                Save and quit
              </button>
          </ul>
        </div>
    );
};

export default Sidebar;
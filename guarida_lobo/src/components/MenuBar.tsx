import { useState } from 'react';
import './MenuBar.css';

interface MenuItemProps {
  label: string;
  items: string[];
}

const MenuItem: React.FC<MenuItemProps> = ({ label, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="menu-item"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="menu-label">{label}</button>
      <ul className={`dropdown ${open ? 'show' : ''}`}>
        {items.map((item, index) => (
          <li key={index} className="dropdown-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const MenuBar: React.FC = () => (
  <div className="menu-bar">
    <MenuItem label="MARVEL" items={['Spider-Man', 'Iron Man', 'Thor', 'Black Widow']} />
    <MenuItem label="DC" items={['Batman', 'Superman', 'Wonder Woman', 'The Flash']} />
    <MenuItem label="Image Comics" items={['Spawn', 'Invincible', 'The Walking Dead']} />
    <MenuItem label="Dark Horse" items={['Hellboy', 'Sin City', 'Buffy']} />
    <MenuItem label="IDW Publishing" items={['Transformers', 'TMNT', 'Star Trek']} />
  </div>
);

export default MenuBar;

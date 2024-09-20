import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';

import {themeState} from '../recoil/aotms/themeState';
import moonIcon from '../assets/moon.svg';
import sunIcon from '../assets/sun.svg';

const ThemeToggler = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [iconRotation, setIconRotation] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleThemeSwitch = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setIconRotation(prevRotation => prevRotation + 360);
  };

  return (
    <div className="mr-2 flex items-start justify-end max-lg:mr-5 max-lg:flex-1">
    {/* <div className='bg-slate-200 h-8 w-8 rounded-full flex items-center justify-center'> */}
        <img
            src={theme === 'dark' ? sunIcon : moonIcon}
            alt="ThemeToggler"
            width={27}
            height={27}
            onClick={handleThemeSwitch}
            style={{
            transform: `rotate(${iconRotation}deg)`,
            transition: 'transform 0.5s ease-in-out',
            }}
            className="align-top transition-transform duration-500 lg:text-black"
        />
    {/* </div> */}
    </div>
  );
};

export default ThemeToggler;

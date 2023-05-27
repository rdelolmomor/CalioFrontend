import { useContext } from 'react';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import whiteLogo from '../../../../resources/logos/LogoBlanco.png';
import blackLogo from '../../../../resources/logos/LogoNegro.png';

function Logo({ className }) {
  const { theme } = useContext(ThemeContext);
  const logo = theme.darkMode ? whiteLogo : blackLogo;

  return <img src={logo} alt='Logotipo de Calio' className={className} />;
}

export default Logo;

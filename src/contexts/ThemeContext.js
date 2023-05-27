import { createContext, useState } from 'react';
import useThemes from '../hooks/useThemes';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { lightTheme, darkTheme } from '../app/themes';

export const ThemeContext = createContext({
	darkMode: false,
	changeTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
	const theme = useThemes();

	const [primaryColor,setPrimaryColor] = useState(window.localStorage.getItem('Color') || '#ff7900');

	return (
		<ThemeContext.Provider value={{theme, primaryColor, setPrimaryColor}}>
			<MuiThemeProvider theme={theme.darkMode ? darkTheme(primaryColor) : lightTheme(primaryColor)}>
				{children}
			</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};

/**
 * Generates a theme palette dynamically based on theme customization.
 * @param {JsonObject} theme Theme customization object
 */
export default function themePalette(theme) {
    const isDark = theme?.customization?.isDarkMode;
    
    // Utility function to dynamically select color based on mode
    const getColor = (lightKey, darkKey) => isDark ? theme.colors?.[darkKey] : theme.colors?.[lightKey];

    return {
        mode: theme?.customization?.navType,
        transparent: theme.colors?.transparent,
        common: {
            black: theme.colors?.darkPaper,
            dark: theme.colors?.darkPrimaryMain
        },
        primary: {
            light: getColor('primaryLight', 'darkPrimaryLight'),
            main: theme.colors?.primaryMain,
            dark: getColor('primaryDark', 'darkPrimaryDark'),
            200: getColor('primary200', 'darkPrimary200'),
            800: getColor('primary800', 'darkPrimary800')
        },
        secondary: {
            light: getColor('secondaryLight', 'darkSecondaryLight'),
            main: getColor('secondaryMain', 'darkSecondaryMain'),
            dark: getColor('secondaryDark', 'darkSecondaryDark'),
            200: theme.colors?.secondary200,
            800: theme.colors?.secondary800
        },
        error: createColorObject('error'),
        warning: createColorObject('warning'),
        success: createColorObject('success', true),
        orange: createColorObject('orange'),
        teal: createColorObject('teal'),
        grey: {
            50: theme.colors?.grey50,
            100: theme.colors?.grey100,
            200: theme.colors?.grey200,
            300: theme.colors?.grey300,
            500: theme.darkTextSecondary,
            600: theme.heading,
            700: theme.darkTextPrimary,
            900: theme.textDark
        },
        dark: {
            light: theme.colors?.darkTextPrimary,
            main: theme.colors?.darkLevel1,
            dark: theme.colors?.darkLevel2,
            800: theme.colors?.darkBackground,
            900: theme.colors?.darkPaper
        },
        text: {
            primary: theme.darkTextPrimary,
            secondary: theme.darkTextSecondary,
            dark: theme.textDark,
            hint: theme.colors?.grey100
        },
        background: {
            paper: theme.paper,
            default: theme.backgroundDefault
        },
        card: {
            main: getColor('paper', 'darkPrimaryMain'),
            light: getColor('paper', 'darkPrimary200'),
            hover: getColor('paper', 'darkPrimary800')
        },
        asyncSelect: {
            main: getColor('grey50', 'darkPrimary800')
        },
        timeMessage: {
            main: getColor('grey200', 'darkLevel2')
        },
        canvasHeader: {
            deployLight: theme.colors?.primaryLight,
            deployDark: theme.colors?.primaryDark,
            saveLight: theme.colors?.secondaryLight,
            saveDark: theme.colors?.secondaryDark,
            settingsLight: theme.colors?.grey300,
            settingsDark: theme.colors?.grey700
        },
        codeEditor: {
            main: getColor('primaryLight', 'darkPrimary800')
        },
        nodeToolTip: {
            background: getColor('paper', 'darkPrimary800'),
            color: isDark ? theme.colors?.paper : 'rgba(0, 0, 0, 0.87)'
        }
    };

    // Helper function to dynamically create color objects
    function createColorObject(color, include200 = false) {
        return {
            light: theme.colors?.[`${color}Light`],
            main: theme.colors?.[`${color}Main`],
            dark: theme.colors?.[`${color}Dark`],
            ...(include200 && { 200: theme.colors?.[`${color}200`] }) // Optional 200 value
        };
    }
}

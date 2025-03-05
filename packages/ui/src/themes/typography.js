/**
 * Typography used in theme with modern font choices
 * @param {JsonObject} theme Theme customization object
 */

export default function themeTypography(theme) {
    const isDark = theme?.customization?.isDarkMode;

    return {
        fontFamily: theme?.customization?.fontFamily || '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h6: createTypography('0.75rem', 500, theme.heading),
        h5: createTypography('0.875rem', 500, theme.heading),
        h4: createTypography('1rem', 600, theme.heading),
        h3: createTypography('1.25rem', 600, theme.heading),
        h2: createTypography('1.5rem', 700, theme.heading),
        h1: createTypography('2.125rem', 700, theme.heading),
        subtitle1: createTypography('0.875rem', 500, theme.textDark, 1.5),
        subtitle2: createTypography('0.75rem', 400, theme.darkTextSecondary, 1.4),
        caption: createTypography('0.75rem', 400, theme.darkTextSecondary, 1.3),
        body1: createTypography('0.875rem', 400, theme.darkTextPrimary, 1.5),
        body2: createTypography('0.875rem', 400, theme.darkTextPrimary, 1.6, '0em'),
        button: {
            textTransform: 'capitalize',
            fontWeight: 600,
            fontSize: '0.875rem',
            letterSpacing: '0.5px'
        },
        customInput: {
            marginTop: 1,
            marginBottom: 1,
            '& > label': {
                top: 23,
                left: 0,
                color: theme.grey500,
                fontSize: '0.85rem',
                '&[data-shrink="false"]': { top: 5 }
            },
            '& > div > input': {
                padding: '28px 14px 10px !important',
                fontSize: '0.9rem'
            },
            '& legend': { display: 'none' },
            '& fieldset': { top: 0 }
        },
        mainContent: {
            backgroundColor: isDark ? theme.darkPaper : theme.background,
            width: '100%',
            minHeight: 'calc(100vh - 75px)',
            flexGrow: 1,
            padding: '24px',
            marginTop: '75px',
            marginRight: '20px',
            borderRadius: `${theme?.customization?.borderRadius}px`
        },
        menuCaption: createTypography('0.875rem', 500, theme.heading, 1.4, '0.5px'),
        subMenuCaption: createTypography('0.6875rem', 500, theme.darkTextSecondary, 1.3),
        commonAvatar: {
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
                boxShadow: isDark ? '0px 4px 12px rgba(255, 255, 255, 0.1)' : '0px 4px 12px rgba(0, 0, 0, 0.1)'
            }
        },
        smallAvatar: avatarSize('22px', '1rem'),
        mediumAvatar: avatarSize('34px', '1.2rem'),
        largeAvatar: avatarSize('44px', '1.5rem')
    };

    // Utility function to define typography properties
    function createTypography(size, weight, color, lineHeight = 1.3, letterSpacing = '0em') {
        return { fontSize: size, fontWeight: weight, color, lineHeight: `${lineHeight}em`, letterSpacing };
    }

    // Utility function for avatar sizes
    function avatarSize(size, fontSize) {
        return { width: size, height: size, fontSize };
    }
}

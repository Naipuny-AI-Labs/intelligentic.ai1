/**
 * Typography used in theme with a modern and user-friendly style
 * @param {JsonObject} theme theme customization object
 */

export default function themeTypography(theme) {
    return {
        fontFamily: theme?.customization?.fontFamily || '"Inter", "Poppins", "Roboto", sans-serif',
        h6: {
            fontWeight: 600,
            color: theme.heading,
            fontSize: '0.875rem' // Increased for better readability
        },
        h5: {
            fontSize: '1rem',
            color: theme.heading,
            fontWeight: 600
        },
        h4: {
            fontSize: '1.125rem',
            color: theme.heading,
            fontWeight: 600
        },
        h3: {
            fontSize: '1.5rem',
            color: theme.heading,
            fontWeight: 700
        },
        h2: {
            fontSize: '1.75rem',
            color: theme.heading,
            fontWeight: 700
        },
        h1: {
            fontSize: '2.25rem',
            color: theme.heading,
            fontWeight: 800 // Stronger emphasis
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
            color: theme.textDark
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            color: theme.darkTextSecondary
        },
        caption: {
            fontSize: '0.75rem',
            color: theme.darkTextSecondary,
            fontWeight: 400
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: '1.5em'
        },
        body2: {
            letterSpacing: '0.02em',
            fontWeight: 400,
            lineHeight: '1.6em',
            color: theme.darkTextPrimary
        },
        button: {
            textTransform: 'capitalize',
            fontWeight: 600,
            fontSize: '0.9rem'
        },
        customInput: {
            marginTop: 1,
            marginBottom: 1,
            '& > label': {
                top: 20,
                left: 0,
                color: theme.grey500,
                '&[data-shrink="false"]': {
                    top: 6
                }
            },
            '& > div > input': {
                padding: '28px 14px 12px !important',
                fontSize: '1rem'
            },
            '& legend': {
                display: 'none'
            },
            '& fieldset': {
                top: 0
            }
        },
        mainContent: {
            backgroundColor: theme.background,
            width: '100%',
            minHeight: 'calc(100vh - 75px)',
            flexGrow: 1,
            padding: '24px',
            marginTop: '75px',
            marginRight: '20px',
            borderRadius: `${theme?.customization?.borderRadius || 12}px`
        },
        menuCaption: {
            fontSize: '1rem',
            fontWeight: 600,
            color: theme.heading,
            padding: '8px',
            textTransform: 'capitalize',
            marginTop: '12px'
        },
        subMenuCaption: {
            fontSize: '0.75rem',
            fontWeight: 500,
            color: theme.darkTextSecondary,
            textTransform: 'capitalize'
        },
        commonAvatar: {
            cursor: 'pointer',
            borderRadius: '10px'
        },
        smallAvatar: {
            width: '26px',
            height: '26px',
            fontSize: '1rem'
        },
        mediumAvatar: {
            width: '36px',
            height: '36px',
            fontSize: '1.25rem'
        },
        largeAvatar: {
            width: '48px',
            height: '48px',
            fontSize: '1.6rem'
        }
    }
}

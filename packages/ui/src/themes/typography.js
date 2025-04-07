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
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
        },
        h5: {
            fontSize: { xs: '0.875rem', sm: '1rem' },
            color: theme.heading,
            fontWeight: 600
        },
        h4: {
            fontSize: { xs: '1rem', sm: '1.125rem' },
            color: theme.heading,
            fontWeight: 600
        },
        h3: {
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            color: theme.heading,
            fontWeight: 700
        },
        h2: {
            fontSize: { xs: '1.5rem', sm: '1.75rem' },
            color: theme.heading,
            fontWeight: 700
        },
        h1: {
            fontSize: { xs: '1.75rem', sm: '2.25rem' },
            color: theme.heading,
            fontWeight: 800
        },
        subtitle1: {
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: 500,
            color: theme.textDark
        },
        subtitle2: {
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            fontWeight: 400,
            color: theme.darkTextSecondary
        },
        caption: {
            fontSize: { xs: '0.625rem', sm: '0.75rem' },
            color: theme.darkTextSecondary,
            fontWeight: 400
        },
        body1: {
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: 400,
            lineHeight: '1.5em'
        },
        body2: {
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            letterSpacing: '0.02em',
            fontWeight: 400,
            lineHeight: '1.6em',
            color: theme.darkTextPrimary
        },
        button: {
            textTransform: 'capitalize',
            fontWeight: 600,
            fontSize: { xs: '0.8rem', sm: '0.9rem' }
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
                fontSize: { xs: '0.875rem', sm: '1rem' }
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
            padding: { xs: '16px', sm: '24px' },
            marginTop: '75px',
            marginRight: { xs: '10px', sm: '20px' },
            borderRadius: `${theme?.customization?.borderRadius || 12}px`
        },
        menuCaption: {
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: 600,
            color: theme.heading,
            padding: '8px',
            textTransform: 'capitalize',
            marginTop: '12px'
        },
        subMenuCaption: {
            fontSize: { xs: '0.625rem', sm: '0.75rem' },
            fontWeight: 500,
            color: theme.darkTextSecondary,
            textTransform: 'capitalize'
        },
        commonAvatar: {
            cursor: 'pointer',
            borderRadius: '10px'
        },
        smallAvatar: {
            width: { xs: '22px', sm: '26px' },
            height: { xs: '22px', sm: '26px' },
            fontSize: { xs: '0.875rem', sm: '1rem' }
        },
        mediumAvatar: {
            width: { xs: '30px', sm: '36px' },
            height: { xs: '30px', sm: '36px' },
            fontSize: { xs: '1rem', sm: '1.25rem' }
        },
        largeAvatar: {
            width: { xs: '40px', sm: '48px' },
            height: { xs: '40px', sm: '48px' },
            fontSize: { xs: '1.4rem', sm: '1.6rem' }
        }
    }
}

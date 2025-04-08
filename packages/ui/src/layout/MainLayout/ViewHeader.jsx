import PropTypes from 'prop-types'
import { useRef } from 'react'

// material-ui
import { IconButton, Box, Toolbar, Typography, alpha } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { StyledFab } from '@/ui-component/button/StyledFab'

// icons
import { IconSearch, IconArrowLeft, IconEdit } from '@tabler/icons-react'

import useSearchShortcut from '@/hooks/useSearchShortcut'
import { getOS } from '@/utils/genericHelper'

const os = getOS()
const isMac = os === 'macos'
const isDesktop = isMac || os === 'windows' || os === 'linux'
const keyboardShortcut = isMac ? '[ ⌘ + F ]' : '[ Ctrl + F ]'

const ViewHeader = ({
    children,
    filters = null,
    onSearchChange,
    search,
    searchPlaceholder = 'Search',
    title,
    description,
    isBackButton,
    onBack,
    isEditButton,
    onEdit
}) => {
    const theme = useTheme()
    const searchInputRef = useRef()
    useSearchShortcut(searchInputRef)

    return (
        <Box
            sx={{
                flexGrow: 1,
                py: 2,
                width: '100%',
                maxWidth: '100vw',
                overflow: 'hidden',
                backdropFilter: 'blur(6px)',
                backgroundColor: alpha(theme.palette.background.default, 0.8)
            }}
        >
            <Toolbar
                disableGutters
                sx={{
                    px: 2,
                    py: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    gap: 3
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        flex: 1,
                        minWidth: 0
                    }}
                >
                    {isBackButton && (
                        <StyledFab
                            size='small'
                            color='secondary'
                            aria-label='back'
                            title='Back'
                            onClick={onBack}
                            sx={{
                                mr: 1,
                                boxShadow: theme.shadows[2],
                                '&:hover': {
                                    boxShadow: theme.shadows[4]
                                }
                            }}
                        >
                            <IconArrowLeft />
                        </StyledFab>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            minWidth: 0,
                            flex: 1
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: '1.75rem', sm: '2.25rem' },
                                fontWeight: 700,
                                lineHeight: 1.1,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                maxWidth: '100%',
                                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                            variant='h1'
                        >
                            {title}
                        </Typography>
                        {description && (
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color: 'text.secondary',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    maxWidth: '100%',
                                    letterSpacing: '0.02em'
                                }}
                            >
                                {description}
                            </Typography>
                        )}
                    </Box>
                    {isEditButton && (
                        <IconButton
                            color='secondary'
                            title='Edit'
                            onClick={onEdit}
                            sx={{
                                ml: 'auto',
                                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.secondary.main, 0.2)
                                }
                            }}
                        >
                            <IconEdit />
                        </IconButton>
                    )}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        flexShrink: 0
                    }}
                >
                    {search && (
                        <Box
                            sx={{
                                width: { xs: '200px', sm: '300px' },
                                height: 42,
                                display: { xs: 'none', sm: 'flex' },
                                borderRadius: 3,
                                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                                '&:hover': {
                                    borderColor: alpha(theme.palette.divider, 0.4)
                                },
                                '&:focus-within': {
                                    borderColor: theme.palette.primary.main,
                                    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                                },
                                alignItems: 'center',
                                px: 1.5,
                                gap: 1
                            }}
                        >
                            <IconSearch style={{ color: theme.palette.text.secondary, width: 18, height: 18 }} />
                            <input
                                ref={searchInputRef}
                                type='search'
                                placeholder={`${searchPlaceholder} ${isDesktop ? keyboardShortcut : ''}`}
                                onChange={onSearchChange}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    background: 'transparent',
                                    outline: 'none',
                                    fontSize: '0.875rem',
                                    color: theme.palette.text.primary
                                }}
                            />
                        </Box>
                    )}
                    {filters}
                    {children}
                </Box>
            </Toolbar>
        </Box>
    )
}

ViewHeader.propTypes = {
    children: PropTypes.node,
    filters: PropTypes.node,
    onSearchChange: PropTypes.func,
    search: PropTypes.bool,
    searchPlaceholder: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    isBackButton: PropTypes.bool,
    onBack: PropTypes.func,
    isEditButton: PropTypes.bool,
    onEdit: PropTypes.func
}

export default ViewHeader

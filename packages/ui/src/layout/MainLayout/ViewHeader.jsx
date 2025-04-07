import PropTypes from 'prop-types'
import { useRef } from 'react'

// material-ui
import { IconButton, Box, OutlinedInput, Toolbar, Typography } from '@mui/material'
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
                py: 1,
                width: '100%',
                maxWidth: '100vw',
                overflow: 'hidden'
            }}
        >
            <Toolbar
                disableGutters
                sx={{
                    px: 0,
                    py: 0.5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    gap: 2
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
                        <StyledFab size='small' color='secondary' aria-label='back' title='Back' onClick={onBack} sx={{ mr: 1 }}>
                            <IconArrowLeft />
                        </StyledFab>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                            minWidth: 0,
                            flex: 1
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: '1.5rem', sm: '2rem' },
                                fontWeight: 600,
                                lineHeight: 1.2,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                maxWidth: '100%'
                            }}
                            variant='h1'
                        >
                            {title}
                        </Typography>
                        {description && (
                            <Typography
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: 'text.secondary',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    maxWidth: '100%'
                                }}
                            >
                                {description}
                            </Typography>
                        )}
                    </Box>
                    {isEditButton && (
                        <IconButton color='secondary' title='Edit' onClick={onEdit} sx={{ ml: 'auto' }}>
                            <IconEdit />
                        </IconButton>
                    )}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        flexShrink: 0
                    }}
                >
                    {search && (
                        <OutlinedInput
                            inputRef={searchInputRef}
                            size='small'
                            sx={{
                                width: { xs: '200px', sm: '300px' },
                                height: 40,
                                display: { xs: 'none', sm: 'flex' },
                                borderRadius: 2,
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderRadius: 2
                                }
                            }}
                            variant='outlined'
                            placeholder={`${searchPlaceholder} ${isDesktop ? keyboardShortcut : ''}`}
                            onChange={onSearchChange}
                            startAdornment={
                                <Box
                                    sx={{
                                        color: theme.palette.grey[400],
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mr: 1
                                    }}
                                >
                                    <IconSearch style={{ color: 'inherit', width: 16, height: 16 }} />
                                </Box>
                            }
                            type='search'
                        />
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

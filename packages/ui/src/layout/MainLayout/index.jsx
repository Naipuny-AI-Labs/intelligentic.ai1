import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

// material-ui
import { styled, useTheme, alpha } from '@mui/material/styles'
import { AppBar, Box, Chip, Container, CssBaseline, Toolbar, useMediaQuery } from '@mui/material'
import config from '@/config'
// project imports
import Header from './Header'
import { headerHeight } from '@/store/constant'
import { SET_MENU } from '@/store/actions'
import menuItem from '@/menu-items'
// styles
const Main = styled('main')(({ theme }) => ({
    ...theme.typography.mainContent,
    backgroundColor: alpha(theme.palette.background.default, 0.8)
}))

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme()
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'))
    const [tabValue, setTabValue] = useState(0)
    const navigate = useNavigate()
    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened)
    const dispatch = useDispatch()
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened })
    }
    useEffect(() => {
        const currentPath = window.location.pathname
        const currentItem = menuItem.items[0].children.findIndex((item) => `${config.basename}${item.url}` === currentPath)
        if (currentItem !== -1) {
            setTabValue(currentItem)
        }
    }, [])

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
        const selectedItem = menuItem.items[0].children[newValue]
        navigate(`${config.basename}${selectedItem.url}`)
    }
    // Set initial tab value based on current path

    useEffect(() => {
        setTimeout(() => dispatch({ type: SET_MENU, opened: !matchDownMd }), 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position='fixed'
                color='inherit'
                elevation={0}
                sx={{
                    bgcolor: alpha(theme.palette.background.default, 0.8),
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar sx={{ height: `${headerHeight}px` }}>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>

            {/* drawer */}
            {/* Modern Tabs section */}

            {/* main content */}
            <Main theme={theme}>
                <Container>
                    <Box sx={{ width: '100%', overflowX: 'auto', py: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', p: 1 }}>
                            {menuItem.items[0].children.map((item, index) => (
                                <Chip
                                    key={item.id}
                                    label={item.title}
                                    icon={item.icon && <item.icon stroke={1.5} size='1rem' />}
                                    onClick={(e) => handleTabChange(e, index)}
                                    variant={tabValue === index ? 'filled' : 'outlined'}
                                    sx={{
                                        borderRadius: 2,
                                        borderColor:
                                            tabValue === index
                                                ? theme.palette.mode === 'dark'
                                                    ? theme.palette.common.white
                                                    : theme.palette.primary.main
                                                : 'divider',
                                        backgroundColor:
                                            tabValue === index
                                                ? theme.palette.mode === 'dark'
                                                    ? theme.palette.common.white
                                                    : theme.palette.primary.main
                                                : theme.palette.success,
                                        color:
                                            tabValue === index
                                                ? theme.palette.common.white
                                                : theme.palette.mode === 'dark'
                                                ? theme.palette.common.white
                                                : theme.palette.primary.main,
                                        '&:hover': {
                                            backgroundColor:
                                                theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main,
                                            borderColor:
                                                theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main
                                        },
                                        '& .MuiChip-icon': {
                                            color:
                                                tabValue === index
                                                    ? theme.palette.common.white
                                                    : theme.palette.mode === 'dark'
                                                    ? theme.palette.common.white
                                                    : theme.palette.primary.main
                                        }
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Outlet />
                </Container>
            </Main>
        </Box>
    )
}

export default MainLayout

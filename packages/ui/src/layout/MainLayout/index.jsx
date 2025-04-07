import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

// material-ui
import { styled, useTheme } from '@mui/material/styles'
import { AppBar, Box, Container, CssBaseline, Tab, Tabs, Toolbar, useMediaQuery } from '@mui/material'
import config from '@/config'
// project imports
import Header from './Header'
import { headerHeight } from '@/store/constant'
import { SET_MENU } from '@/store/actions'
import menuItem from '@/menu-items'
// styles
const Main = styled('main')(({ theme }) => ({
    ...theme.typography.mainContent
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
                    bgcolor: theme.palette.background.default,
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
                    <Box sx={{ width: '100%', overflowX: 'auto' }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            textColor='inherit'
                            indicatorColor='secondary'
                            variant='scrollable'
                            scrollButtons='auto'
                            sx={{
                                '& .MuiTabs-indicator': {
                                    height: 2,
                                    borderRadius: '2px 2px 0 0'
                                },
                                '& .MuiTab-root': {
                                    minWidth: 60,
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    letterSpacing: '0.025em',
                                    padding: '8px 12px',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        color: theme.palette.secondary.main,
                                        backgroundColor: theme.palette.action.hover
                                    },
                                    '&.Mui-selected': {
                                        color: theme.palette.secondary.main,
                                        fontWeight: 600
                                    }
                                }
                            }}
                        >
                            {menuItem.items[0].children.map((item) => (
                                <Tab
                                    key={item.id}
                                    label={item.title}
                                    icon={item.icon && <item.icon stroke={1.5} size='1rem' />}
                                    iconPosition='start'
                                />
                            ))}
                        </Tabs>
                    </Box>
                    <Outlet />
                </Container>
            </Main>
        </Box>
    )
}

export default MainLayout

import { useState } from 'react'
import { Box, Drawer, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// project imports
import Sidebar from '../MainLayout/Sidebar'

// ==============================|| SETTINGS LAYOUT ||============================== //

const Settings = () => {
    const theme = useTheme()
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))
    const [drawerOpen, setDrawerOpen] = useState(!matchDownMd)

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant={matchDownMd ? 'temporary' : 'persistent'}
                anchor='left'
                open={drawerOpen}
                onClose={handleDrawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 250,
                        background: theme.palette.background.default,
                        borderRight: 'none',
                        [theme.breakpoints.up('md')]: {
                            top: '64px'
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
            >
                <Sidebar handleDrawerToggle={handleDrawerToggle} />
            </Drawer>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: `calc(100% - ${drawerOpen ? 250 : 0}px)`,
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen
                    })
                }}
            >
                {/* <MainLayout /> */}
            </Box>
        </Box>
    )
}

export default Settings

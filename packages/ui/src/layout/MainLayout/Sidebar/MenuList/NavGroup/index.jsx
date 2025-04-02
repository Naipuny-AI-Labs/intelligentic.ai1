import PropTypes from 'prop-types'
import { useMemo } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Divider, List, Typography, Box } from '@mui/material'

// project imports
import NavItem from '../NavItem'
import NavCollapse from '../NavCollapse'

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
    const theme = useTheme()

    // menu list collapse & items
    const items = useMemo(
        () =>
            item.children?.map((menu) => {
                switch (menu.type) {
                    case 'collapse':
                        return <NavCollapse key={menu.id} menu={menu} level={1} />
                    case 'item':
                        return <NavItem key={menu.id} item={menu} level={1} navType='MENU' />
                    default:
                        return (
                            <Typography key={menu.id} variant='h6' color='error' align='center'>
                                Menu Items Error
                            </Typography>
                        )
                }
            }),
        [item.children]
    )

    return (
        <Box
            sx={{
                overflow: 'hidden',
                mb: 2
            }}
        >
            <List
                subheader={
                    item.title && (
                        <Box
                            sx={{
                                px: 2,
                                py: 1.5,
                                backgroundColor: theme.palette.primary.light,
                                color: theme.palette.primary.contrastText
                            }}
                        >
                            <Typography variant='subtitle1' fontWeight='medium'>
                                {item.title}
                            </Typography>
                            {item.caption && (
                                <Typography variant='caption' color='textSecondary'>
                                    {item.caption}
                                </Typography>
                            )}
                        </Box>
                    )
                }
                sx={{
                    py: 1,
                    '& .MuiListItemButton-root': {
                        borderRadius: 1,
                        mx: 1,
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover
                        }
                    }
                }}
            >
                {items}
            </List>

            {/* group divider */}
            <Divider
                sx={{
                    borderColor: theme.palette.divider,
                    mx: 2
                }}
            />
        </Box>
    )
}

NavGroup.propTypes = {
    item: PropTypes.object
}

export default NavGroup

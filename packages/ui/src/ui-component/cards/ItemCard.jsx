import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

// material-ui
import { styled } from '@mui/material/styles'
import { Box, Grid, Typography, useTheme, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

// project imports
import MainCard from '@/ui-component/cards/MainCard'
import { IconEye } from '@tabler/icons-react'

const CardWrapper = styled(MainCard)(({ theme }) => ({
    background: theme.palette.card.main,
    color: theme.darkTextPrimary,
    border: '1px solid',
    borderColor: theme.palette.divider,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    height: '100%',
    minHeight: '200px',
    width: '100%',
    borderRadius: '12px',
    overflowWrap: 'break-word',
    whiteSpace: 'pre-line',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.2s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    }
}))

const ImageContainer = styled(Box)(({ theme }) => ({
    height: '120px',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s ease'
    },
    '&:hover img': {
        transform: 'scale(1.05)'
    }
}))

const ActionBar = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 1,
    padding: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper
}))

const ItemCard = ({ data, images, onClick, pagination }) => {
    const theme = useTheme()
    const customization = useSelector((state) => state.customization)

    // List of icons next to title/name
    const actionIcons = [
        {
            icon: IconEye,
            handler: onClick,
            title: 'View'
        }
    ]

    return (
        <CardWrapper content={false}>
            {images?.[0] && (
                <ImageContainer>
                    <img src={images[0]} alt={data.templateName || data.name} />
                </ImageContainer>
            )}
            <Box sx={{ p: 2, flexGrow: 1 }} onClick={onClick}>
                <Grid container direction='column' spacing={1.5}>
                    <Grid item>
                        <Box display='flex' alignItems='center'>
                            {(data.iconSrc || data.color) && (
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '8px',
                                        background: data.iconSrc ? `url(${data.iconSrc})` : data.color,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        mr: 1.5,
                                        flexShrink: 0
                                    }}
                                />
                            )}
                            <Typography
                                variant='h5'
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '1.2rem',
                                    lineHeight: 1.2,
                                    color: theme.palette.primary.main,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    pr: 1
                                }}
                            >
                                {data.templateName || data.name}
                            </Typography>
                        </Box>
                    </Grid>
                    {data.description && (
                        <Grid item>
                            <Typography
                                variant='body2'
                                sx={{
                                    color: theme.palette.text.secondary,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    fontSize: '1rem'
                                }}
                            >
                                {data.description}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <ActionBar sx={{ bgcolor: theme.palette.secondary }}>
                <Box
                    display='flex'
                    alignItems='center'
                    gap={1.5}
                    flex={1}
                    ml={3}
                    sx={{
                        position: 'relative',
                        '&:hover': {
                            '& .MuiAvatar-root': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }
                        }
                    }}
                >
                    {images && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'start',
                                gap: 1
                            }}
                        >
                            {images.slice(0, images.length > 4 ? 4 : images.length).map((img) => (
                                <Box
                                    key={img}
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: '50%',
                                        backgroundColor: customization.isDarkMode ? theme.palette.common.white : 'transparent'
                                    }}
                                >
                                    <img
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            padding: 5,
                                            objectFit: 'contain',
                                            border: '1px solid black',
                                            borderRadius: '30px'
                                        }}
                                        alt=''
                                        src={img}
                                    />
                                </Box>
                            ))}
                            {images.length > 4 && (
                                <Typography
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        fontSize: '.9rem',
                                        fontWeight: 200
                                    }}
                                >
                                    + {images.length - 4} More
                                </Typography>
                            )}
                        </Box>
                    )}
                </Box>
                <Box display='flex' gap={0.5}>
                    {actionIcons.map(({ icon: Icon, handler, title }, index) => (
                        <IconButton key={index} size='small' onClick={handler} title={title} sx={{ p: 1 }}>
                            <Icon size={18} />
                        </IconButton>
                    ))}
                </Box>
            </ActionBar>
            {pagination && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 2,
                        borderTop: `1px solid ${theme.palette.divider}`
                    }}
                >
                    <IconButton onClick={pagination.onPrevious} disabled={!pagination.hasPrevious} size='small'>
                        <ChevronLeft />
                    </IconButton>
                    <Typography variant='body2' sx={{ mx: 2 }}>
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </Typography>
                    <IconButton onClick={pagination.onNext} disabled={!pagination.hasNext} size='small'>
                        <ChevronRight />
                    </IconButton>
                </Box>
            )}
        </CardWrapper>
    )
}

ItemCard.propTypes = {
    data: PropTypes.object,
    images: PropTypes.array,
    onClick: PropTypes.func,
    pagination: PropTypes.shape({
        currentPage: PropTypes.number.isRequired,
        totalPages: PropTypes.number.isRequired,
        hasPrevious: PropTypes.bool.isRequired,
        hasNext: PropTypes.bool.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onNext: PropTypes.func.isRequired
    })
}

export default ItemCard

import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { styled } from '@mui/material/styles'
import {
    Box,
    Chip,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import FlowListMenu from '../button/FlowListMenu'
import { Link } from 'react-router-dom'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderColor: theme.palette.divider,
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.text.primary,
        fontWeight: 600,
        backgroundColor: theme.palette.background.paper
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        height: 72,
        color: theme.palette.text.secondary
    }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    },
    '&:last-child td, &:last-child th': {
        border: 0
    }
}))

const getLocalStorageKeyName = (name, isAgentCanvas) => {
    return (isAgentCanvas ? 'agentcanvas' : 'chatflowcanvas') + '_' + name
}

export const FlowListTable = ({ data, images, isLoading, filterFunction, updateFlowsApi, setError, isAgentCanvas }) => {
    const theme = useTheme()
    const customization = useSelector((state) => state.customization)

    const localStorageKeyOrder = getLocalStorageKeyName('order', isAgentCanvas)
    const localStorageKeyOrderBy = getLocalStorageKeyName('orderBy', isAgentCanvas)

    const [order, setOrder] = useState(localStorage.getItem(localStorageKeyOrder) || 'desc')
    const [orderBy, setOrderBy] = useState(localStorage.getItem(localStorageKeyOrderBy) || 'updatedDate')

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc'
        const newOrder = isAsc ? 'desc' : 'asc'
        setOrder(newOrder)
        setOrderBy(property)
        localStorage.setItem(localStorageKeyOrder, newOrder)
        localStorage.setItem(localStorageKeyOrderBy, property)
    }

    const sortedData = data
        ? [...data].sort((a, b) => {
              if (orderBy === 'name') {
                  return order === 'asc' ? (a.name || '').localeCompare(b.name || '') : (b.name || '').localeCompare(a.name || '')
              } else if (orderBy === 'updatedDate') {
                  return order === 'asc'
                      ? new Date(a.updatedDate) - new Date(b.updatedDate)
                      : new Date(b.updatedDate) - new Date(a.updatedDate)
              }
              return 0
          })
        : []

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: 2,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
                border: `1px solid ${theme.palette.divider}`
            }}
        >
            <Table sx={{ minWidth: 800 }} size='medium' aria-label='flow table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell style={{ width: '20%' }}>
                            <TableSortLabel
                                active={orderBy === 'name'}
                                direction={order}
                                onClick={() => handleRequestSort('name')}
                                sx={{ color: 'inherit' }}
                            >
                                Name
                            </TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell style={{ width: '25%' }}>Category</StyledTableCell>
                        <StyledTableCell style={{ width: '30%' }}>Nodes</StyledTableCell>
                        <StyledTableCell style={{ width: '15%' }}>
                            <TableSortLabel
                                active={orderBy === 'updatedDate'}
                                direction={order}
                                onClick={() => handleRequestSort('updatedDate')}
                                sx={{ color: 'inherit' }}
                            >
                                Last Modified
                            </TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell style={{ width: '10%' }}>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading
                        ? [0, 1].map((index) => (
                              <StyledTableRow key={index}>
                                  {[0, 1, 2, 3, 4].map((colIndex) => (
                                      <StyledTableCell key={colIndex}>
                                          <Skeleton variant='text' animation='wave' />
                                      </StyledTableCell>
                                  ))}
                              </StyledTableRow>
                          ))
                        : sortedData.filter(filterFunction).map((row) => (
                              <StyledTableRow key={row.id} hover>
                                  <StyledTableCell>
                                      <Tooltip title={row.templateName || row.name}>
                                          <Typography
                                              component={Link}
                                              to={`/${isAgentCanvas ? 'agentcanvas' : 'canvas'}/${row.id}`}
                                              sx={{
                                                  display: '-webkit-box',
                                                  fontSize: 14,
                                                  fontWeight: 500,
                                                  WebkitLineClamp: 2,
                                                  WebkitBoxOrient: 'vertical',
                                                  textOverflow: 'ellipsis',
                                                  overflow: 'hidden',
                                                  color: theme.palette.primary.main,
                                                  textDecoration: 'none',
                                                  '&:hover': {
                                                      textDecoration: 'underline'
                                                  }
                                              }}
                                          >
                                              {row.templateName || row.name}
                                          </Typography>
                                      </Tooltip>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                          {row.category?.split(';').map((tag) => (
                                              <Chip
                                                  key={tag}
                                                  label={tag}
                                                  size='small'
                                                  sx={{
                                                      backgroundColor: theme.palette.action.selected,
                                                      color: theme.palette.text.secondary
                                                  }}
                                              />
                                          ))}
                                      </Box>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                          {images[row.id]?.slice(0, 5).map((img) => (
                                              <Box
                                                  key={img}
                                                  sx={{
                                                      width: 32,
                                                      height: 32,
                                                      borderRadius: '50%',
                                                      border: `1px solid ${theme.palette.divider}`,
                                                      overflow: 'hidden',
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                      backgroundColor: theme.palette.background.paper
                                                  }}
                                              >
                                                  <img
                                                      style={{
                                                          width: '80%',
                                                          height: '80%',
                                                          objectFit: 'contain'
                                                      }}
                                                      alt=''
                                                      src={img}
                                                  />
                                              </Box>
                                          ))}
                                          {images[row.id]?.length > 5 && (
                                              <Typography variant='caption' color='text.secondary'>
                                                  +{images[row.id].length - 5}
                                              </Typography>
                                          )}
                                      </Box>
                                  </StyledTableCell>
                                  <StyledTableCell>{moment(row.updatedDate).format('MMM D, YYYY')}</StyledTableCell>
                                  <StyledTableCell>
                                      <FlowListMenu
                                          isAgentCanvas={isAgentCanvas}
                                          chatflow={row}
                                          setError={setError}
                                          updateFlowsApi={updateFlowsApi}
                                      />
                                  </StyledTableCell>
                              </StyledTableRow>
                          ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

FlowListTable.propTypes = {
    data: PropTypes.array,
    images: PropTypes.object,
    isLoading: PropTypes.bool,
    filterFunction: PropTypes.func,
    updateFlowsApi: PropTypes.object,
    setError: PropTypes.func,
    isAgentCanvas: PropTypes.bool
}

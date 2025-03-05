export default function componentStyleOverrides(theme) {
    const {
        colors,
        customization: { isDarkMode, borderRadius } = {},
        menuSelected,
        menuSelectedBack,
        darkTextPrimary,
        darkTextSecondary,
        textDark,
        divider,
        paper
    } = theme;

    const bgColor = colors?.grey50;
    const scrollbarThumbColor = isDarkMode ? colors?.grey500 : colors?.grey300;
    const scrollbarTrackColor = isDarkMode ? colors?.darkPrimaryMain : paper;
    const inputBackground = isDarkMode ? colors?.darkPrimary800 : bgColor;

    return {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${scrollbarThumbColor} ${scrollbarTrackColor}`,
                    '&::-webkit-scrollbar': { width: 12, height: 12, backgroundColor: scrollbarTrackColor },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: scrollbarThumbColor,
                        minHeight: 24,
                        border: `3px solid ${scrollbarTrackColor}`,
                        '&:hover, &:active, &:focus': { backgroundColor: isDarkMode ? colors?.darkPrimary200 : colors?.grey500 }
                    },
                    '&::-webkit-scrollbar-corner': { backgroundColor: scrollbarTrackColor }
                }
            }
        },
        MuiButton: { styleOverrides: { root: { fontWeight: 500, borderRadius: '4px' } } },
        MuiSvgIcon: { styleOverrides: { root: { color: isDarkMode ? paper : 'inherit', background: isDarkMode ? colors?.darkPrimaryLight : 'inherit' } } },
        MuiPaper: {
            defaultProps: { elevation: 0 },
            styleOverrides: { root: { backgroundImage: 'none' }, rounded: { borderRadius: `${borderRadius}px` } }
        },
        MuiCardHeader: { styleOverrides: { root: { color: textDark, padding: '24px' }, title: { fontSize: '1.125rem' } } },
        MuiCardContent: { styleOverrides: { root: { padding: '24px' } } },
        MuiCardActions: { styleOverrides: { root: { padding: '24px' } } },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    color: darkTextPrimary,
                    padding: '10px',
                    '&.Mui-selected, &:hover': {
                        color: menuSelected,
                        backgroundColor: menuSelectedBack,
                        '& .MuiListItemIcon-root': { color: menuSelected }
                    }
                }
            }
        },
        MuiListItemIcon: { styleOverrides: { root: { color: darkTextPrimary, minWidth: '36px' } } },
        MuiListItemText: { styleOverrides: { primary: { color: textDark } } },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: textDark,
                    '&::placeholder': { color: darkTextSecondary, fontSize: '0.875rem' },
                    '&.Mui-disabled': { WebkitTextFillColor: isDarkMode ? colors?.grey500 : darkTextSecondary }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: inputBackground,
                    borderRadius: `${borderRadius}px`,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: colors?.grey400 },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colors?.primaryLight },
                    '&.MuiInputBase-multiline': { padding: 1 }
                },
                input: {
                    fontWeight: 500,
                    background: inputBackground,
                    padding: '15.5px 14px',
                    borderRadius: `${borderRadius}px`,
                    '&.MuiInputBase-inputSizeSmall': { padding: '10px 14px', '&.MuiInputBase-inputAdornedStart': { paddingLeft: 0 } }
                },
                inputAdornedStart: { paddingLeft: 4 },
                notchedOutline: { borderRadius: `${borderRadius}px` }
            }
        },
        MuiSlider: {
            styleOverrides: {
                root: { '&.Mui-disabled': { color: colors?.grey300 } },
                mark: { backgroundColor: paper, width: '4px' },
                valueLabel: { color: colors?.primaryLight }
            }
        },
        MuiDivider: { styleOverrides: { root: { borderColor: divider, opacity: 1 } } },
        MuiAvatar: { styleOverrides: { root: { color: colors?.primaryDark, background: colors?.primary200 } } },
        MuiChip: { styleOverrides: { root: { '&.MuiChip-deletable .MuiChip-deleteIcon': { color: 'inherit' } } } },
        MuiTooltip: { styleOverrides: { tooltip: { color: isDarkMode ? paper : paper, background: colors?.grey700 } } },
        MuiAutocomplete: { styleOverrides: { option: { '&:hover': { background: isDarkMode ? '#233345 !important' : '' } } } }
    };
}
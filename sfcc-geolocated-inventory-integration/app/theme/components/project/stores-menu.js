const StoresMenuTheme = {
    baseStyle: {
        headerWrapper: {
            backgroundColor: '#1B96FF',
            padding: '5px'
        },
        headerMenuButton: {
            color: 'white',
            width: 'fit-content',
            mr: 'auto',
            padding: '10px',
            alignItems: 'center',
            _hover: {
                cursor: 'pointer',
                borderRadius: '8px',
                backgroundColor: 'blue.600'
            }
        },
        drawerCloseButton: {
            width: '24px',
            height: '24px',
            display: { base: 'inline-flex', lg: 'none'}
        },
        storeSelectButtonBox: {
            ml: 'auto',
            mt: 'auto',
            mb: 'auto',
            width: '20%'
        },
        storeSelectedButtonBox: {
            ml: 'auto',
            mt: 'auto',
            mb: 'auto'
        },
        storeSelectedButton: {
            backgroundColor: 'green.500',
            pointerEvents: 'none'
        },
        storeItemFlex: {
            mt: '20px',
            mb: '20px'
        },
        storeInfoBox: {
            fontSize: '16',
            width: '80%'
        },
        storeAddressItem: {
            _hover: {
                color: '#1B96FF',
            }
        }
    },
    parts: ['storeSelectButton']
}

export default StoresMenuTheme
const config = {
    /**
     * Base URL for the application (used at build time)
     * - Don't add '/' at the end for breadcrumbs.
     * - Use an empty string ('') instead of only '/'.
     */
    basename: '',

    /**
     * Default landing page path after login.
     */
    defaultPath: '/chatflows',

    /**
     * Font family used in the UI.
     */
    fontFamily: `Poppins`,

    /**
     * Global border radius for UI components.
     */
    borderRadius: 12,

    /**
     * Theme settings
     */
    theme: {
        mode: 'light', // Options: 'light' | 'dark' | 'system'
        primaryColor: '#007bff',
        secondaryColor: '#6c757d'
    },

    /**
     * API Configuration
     */
    api: {
        baseUrl: 'https://api.intelligentic.ai', // Change this based on environment
        timeout: 5000 // Request timeout in milliseconds
    }
}

export default config

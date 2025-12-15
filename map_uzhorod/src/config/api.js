const getApiUrl = () => {
  if (process.env.VUE_APP_API_URL) {
    console.log('[API Config] Using VUE_APP_API_URL:', process.env.VUE_APP_API_URL);
    return process.env.VUE_APP_API_URL;
  }
  
  const renderBackendUrl = 'https://uzh-map-vue.onrender.com/api/v1';
  
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    
    console.log('[API Config] Hostname:', hostname, 'isLocalhost:', isLocalhost);
    
    if (isLocalhost) {
      console.log('[API Config] Using local proxy:', '/api/v1');
      return '/api/v1';
    }
    
    console.log('[API Config] Using Render backend:', renderBackendUrl);
    return renderBackendUrl;
  }
  
  if (process.env.NODE_ENV === 'production') {
    console.log('[API Config] Production mode, using Render backend:', renderBackendUrl);
    return renderBackendUrl;
  }
  
  console.log('[API Config] Development mode, using local proxy:', '/api/v1');
  return '/api/v1';
};

export const API_URL = getApiUrl();

export default {
  API_URL
};


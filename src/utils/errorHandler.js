export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.message || 'An error occurred';

    switch (status) {
      case 400:
        return { message: 'Invalid request. Please check your input.' };
      case 401:
        localStorage.removeItem('token');
        window.location.href = '/login';
        return { message: 'Your session has expired. Please login again.' };
      case 403:
        return { message: 'You do not have permission to perform this action.' };
      case 404:
        return { message: 'The requested resource was not found.' };
      case 500:
        return { message: 'Server error. Please try again later.' };
      default:
        return { message };
    }
  } else if (error.request) {
    // Request made but no response
    return { message: 'Network error. Please check your connection.' };
  } else {
    // Error in request setup
    return { message: error.message || 'An unexpected error occurred.' };
  }
};

export const showErrorToast = (error) => {
  const { message } = handleApiError(error);
  // Integrate with your toast library here
  console.error(message);
  return message;
};
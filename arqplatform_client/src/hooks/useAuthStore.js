

export const checkAuthToken = async () => {

    const token = localStorage.getItem('token');
    if(!token) return dispatch(logout());

  

}
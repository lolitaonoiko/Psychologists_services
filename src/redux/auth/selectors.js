export const selectUser = state => state.auth.user;
export const selectIsLoading = state => state.auth.isLoading;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectLoginModal = state => state.auth.modals.loginModal;
export const selectRegisterModal = state => state.auth.modals.registerModal;

export const selectAppointmentModal = state => state.auth.modals.appointmentModal;

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	status: 'checking', //'checking','not-authenticated', 'authenticated'
	uid_master: null,
	uid: null,
	name: null,
	lastname: null,
	email: null,
	password: null,
	photoUrl: null,
	errorMessage: null,
	successMessage: "",
	authView: "login",
	authModal: false
}

export const  authSlice = createSlice({
	name: 'auth',
	initialState,

	reducers: {
		login: (state, { payload }) => {
			state.status = "authenticated",
			state.uid_master = payload.uid_master;
			state.uid = payload.uid;
			state.name = payload.name;
			state.lastname = payload.lastname;
			state.email = payload.email;
			state.password = "";
			state.photoUrl = null;
			state.errorMessage = null;
			state.successMessage = "";
			
		},

		logout: (state,payload ) => {
			state.status = "not-authenticate",
			state.authModal = false,
			state.uid_master = null,
			state.uid = null,
			state.name = null,
			state.lastname = null,
			state.email = null,
			state.password = ""
			state.photoUrl = null
			state.errorMessage = payload?.errorMessage
		},

		updatePerfil: (state, { payload }) => {
			state.successMessage =  payload.successMessage
		},

		checkingCredentials: (state) => {
			state.status = "checking";
		},

		loginFail: (state) => {
			state.status = "not-authenticate",
			state.authModal = false
		},

		setAuthView: (state, { payload }) => {
			state.authView = payload.authView;
		},

		setAuthModal: (state, { payload }) => {
			state.authModal = payload.authModal;
		}
	},
})

export const {
	login,
	logout,
	checkingCredentials,
	setAuthView,
	setAuthModal,
	loginFail,
	updatePerfil } = authSlice.actions;

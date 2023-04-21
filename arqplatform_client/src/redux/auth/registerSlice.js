import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	status: "checking", //'cheking','not-register, 'register'
	uid: null,
	name: null,
	lastname: null,
	email: null,
	password: null,
	photoUrl: null,
	errorMessage: null
}

export const  registerSlice = createSlice({
	name: "register",
	initialState,

	reducers: {
		created: (state,{ payload }) =>{
			state.status = "register", //'cheking','not-register, 'register'
			state.uid = payload.uid,
			state.name = payload.name,
			state.lastname = payload.lastname,
			state.email = payload.email,
			state.password = null
			state.photoUrl = null
			state.errorMessage = null
		},

		notCreated: (state,{ payload }) => {
			state.status = "not-register",
			state.uid = null,
			state.name = null,
			state.lastname = null,
			state.email = null,
			state.password = null
			state.photoUrl = null
			state.errorMessage = payload?.errorMessage
		},

		checkingData: (state) => {
			state.status = "checking";
		}
	},
})

export const { created,notCreated,checkingData  } =  registerSlice.actions;
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'not-planes',
  planes : []
}

export const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    getPlanes:(state, action) =>{
      state.status = 'get-planes',
      state.planes = action.payload
    }
  }
});

export const { getPlanes } = planSlice.actions;
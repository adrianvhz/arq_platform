import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSaving: false,
    messageSaved: "",
  };

export const  templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {

    updatePerfil: (state, action) => {
   
        state.isSaving = false;
        state.notes = state.notes.map( (note) => {
          if(note.id === action.payload.id){
            return action.payload
          }
          return note;
        })
  
        //mostrar mensaje de acutualizacion
        state.messageSaved = `${action.payload.title}, actualizada correctamente`
  
      },
  },
})

export const { increment,decrement,incrementbydos  } =  templateSlice.actions
import { createSlice} from '@reduxjs/toolkit';
import { createSelector } from 'reselect';


let lastId= 0;
const slice=createSlice({
    name: 'users',
    initialState: {listedUsers:[]},
    reducers:{
       // action => action handler

       userAdded: (state, action) => {
        state.listedUsers.push({
            id: ++lastId,
            name: action.payload.name,
            registered: false
        })},
        userRegistered: (state, action) => {
            const index = state.listedUsers.findIndex((user) => user.id === action.payload.id);
            state.listedUsers[index].registered = true;
          },
            userRemoved: (state, action) => {
            return state.listedUsers.filter((user) => user.id !== action.payload.id);
          }

       


      
    }
});

// Selector
export const getUnresolvedProjectsSelector = createSelector(
    (state) => state.entities.users.listedUsers,
    (listedUsers) => listedUsers.filter((user) => !user.registered)
  );

export const { userAdded, userRegistered, userRemoved } = slice.actions;
export default slice.reducer;
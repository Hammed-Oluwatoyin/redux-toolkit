import { createSlice} from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
let lastId= 0;
const slice=createSlice({
    name: 'projects',
    initialState: {listedProjects:[]},
    reducers:{
       // action => action handler

       projectAdded: (state, action) => {
        state.listedProjects.push({
            id: ++lastId,
            name: action.payload.name,
            finished: false
        })},
        projectFinished: (state, action) => {
            const index = state.listedProjects.findIndex((bug) => bug.id === action.payload.id);
            state.listedProjects[index].finished = true;
          },
            projectRemoved: (state, action) => {
            return state.listedProjects.filter((bug) => bug.id !== action.payload.id);
          }

       


      
    }
});



// Selector
export const getUnresolvedProjectsSelector = createSelector(
    (state) => state.entities.projects.listedProjects,
    (listedProjects) => listedProjects.filter((project) => !project.finished)
  );

export const { projectAdded, projectFinished, projectRemoved } = slice.actions;
export default slice.reducer;

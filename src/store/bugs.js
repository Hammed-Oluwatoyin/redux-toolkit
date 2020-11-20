import { createSlice } from '@reduxjs/toolkit';
//import moment from 'moment';
 import { createSelector } from 'reselect';
//import { apiCallBegan } from './api';




 let lastId = 0;



const slice = createSlice({
  name: 'bugs',
  initialState: {
    listedBugs: [],
   // loading: false,
   // lastFetch: null,
  },
  reducers:{ 
      bugAdded: (bugs, action) => {
        const {description} = action.payload;
    bugs.listedBugs.push({
      id: ++lastId,
      description,
      resolved: false
    });
  },
     bugResolved: (bugs, action) => {
    const index = bugs.listedBugs.findIndex((bug) => bug.id === action.payload.id);
    bugs.listedBugs[index].resolved = true;
  },
    bugRemoved: (bugs, action) => {
    return bugs.listedBugs.filter((bug) => bug.id !== action.payload.id);
  },
  /* 
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
    */
    bugAssignedToUser: (bugs, action) => {
      const {  bugId, userId } = action.payload;
      const index = bugs.listedBugs.findIndex((bug) => bug.id === bugId);
      bugs.listedBugs[index].userId = userId;
    },
   
  },
});

 export  const {
 // bugsReceived,
  bugAssignedToUser,
  bugAdded,
  bugResolved,
  bugRemoved,
  //bugsRequested,
 // bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
/* const url = '/bugs';

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: 'post',
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: `${url}/${id}`,
    method: 'patch',
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: `${url}/${bugId}`,
    method: 'patch',
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  });
  */

// Selector
export const getUnresolvedBugsSelector = createSelector(
  (state) => state.entities.bugs.listedBugs,
  (listedBugs) => listedBugs.filter((bug) => !bug.resolved)
);

export const getBugsByUserSelector = (userId) =>
  createSelector(
    (state) => state.entities.bugs.listedBugs,
    (listedbugs) => listedbugs.filter((bug) => bug.userId === userId)
  );
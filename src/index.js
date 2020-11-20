
import reportWebVitals from './reportWebVitals';
import {bugAdded, bugResolved, getUnresolvedBugsSelector, getBugsByUserSelector,bugAssignedToUser }  from './store/bugs'
import {projectAdded, projectFinished, getUnresolvedProjectsSelector} from './store/projects'
import {userAdded, userRegistered }  from './store/users'


import configureStore from './store/configureStore'


const store = configureStore();

 store.subscribe(() => {
   console.log('Store changed!');
 });

store.dispatch(bugAdded({description : 'First Bug'}));
store.dispatch(bugAdded({description : 'Second Bug'}));
store.dispatch(bugAdded({description : 'Third Bug'}));
store.dispatch(bugAssignedToUser({bugId:1 , userId: 1}))
store.dispatch(bugResolved({id: 1}));

console.log(getUnresolvedBugsSelector(store.getState()))
console.log(getBugsByUserSelector(1)(store.getState()))


store.dispatch(projectAdded({name  : 'First Project '}));
store.dispatch(projectAdded({name  : 'Second Project '}));
store.dispatch(projectAdded({name  : 'Third  Project'}));
store.dispatch(projectFinished({id: 3}));

console.log(getUnresolvedProjectsSelector(store.getState()))


store.dispatch(userAdded({name  : 'First User '}));
store.dispatch(userAdded({name  : 'Second User '}));
store.dispatch(userAdded({name  : 'Third  User'}));
store.dispatch(userRegistered({id: 3}));

  console.log(store.getState());







// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

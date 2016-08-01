# Plants and Animals poc

#### Starting the project locally
To start the project locally. Run `npm install` and `npm start`.

## To Use Redux Devtools:
1. Install [RemoteDev chrome app](https://chrome.google.com/webstore/detail/remotedev/faicmgpfiaijcedapokpbdejaodbelph?hl=en)
2. Start RemoteDev, click settings button at the bottom and select 'use custom (local) server'
3. In a terminal, run `npm run debug` to start local remoteDev server
4. Start app with `npm start`. There is also a RemoteDev tab in developer console

##### Keeping Pull Request Up-To-Date With Develop
* Any time a Pull Request is merged, update any Pull Requests that you currently have open
* First do:
  * ```git checkout develop```
  * ```git pull``` (should always be a fast-forward)
  * ```git checkout my-feature-branch```
* Then do:
* Option 1 (best to integrate small change set; one time merge conflict resolution)
  * ```git merge no-ff develop```
  * resolve merge conflicts, if any exist
* Option 2 (best to integrate large change set; resolve merge conflicts as each commit is applied)
  * ```git rebase -i develop```
  * Edit git to-do list that opens in editor, or just exit
  * Resolve merge conflicts, if any exist
  * ```git rebase --continue```, repeat previous step and this one until all commits applied/conflicts resolved
* ```git push to update``` PR

#### Project Resources: Redux Store
* [Intro to Redux store](http://redux.js.org/docs/basics/Store.html)
* Refer to [Redux API](http://redux.js.org/docs/api/index.html) for documentation on createStore, compose, combineReducers, applyMiddleWare APIs
* __Redux Store add-ons:__
* [remote-redux-devtools](https://github.com/zalmoxisus/remote-redux-devtools) to add redux devtools extension (see section 'To Use Redux Devtools' above)
* [redux-thunk](https://github.com/gaearon/redux-thunk) allows for asynchronous actions, by dispatching functions or promises as actions to redux store
* [react-router](https://github.com/reactjs/react-router) and [react-router-redux](https://github.com/reactjs/react-router-redux) to change routes via actions and save routing information in the redux store

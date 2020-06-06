import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import List from './components/List';
import Detail from './components/Detail';
import Create from './components/Create';

const Routes = () => {
	return (
		<BrowserRouter>
			<Route component={List} path="/" exact />
			<Route component={Detail} path="/detail" />
			<Route component={Create} path="/create" />
		</BrowserRouter>
	)
}

export default Routes;
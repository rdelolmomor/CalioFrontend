import { useMemo } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Box from '@material-ui/core/Box';
import PrivateRoute from './components/PrivateRoute';
import { rootStyles } from './js/styles';
import Notifier from './components/Notifier';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ChatBox from './components/ChatBox';

function App() {
  const { root } = rootStyles();
  const snackbarPosition = useMemo(() => ({ horizontal: 'right', vertical: 'top' }), []);

  return (
    <Router>
      <Box className={root}>
        <Navbar />
        <Switch>
          <PrivateRoute path='/calio/chat' component={ChatBox} />
          <Route exact path='/calio/' component={Home} />
        </Switch>
        <SnackbarProvider anchorOrigin={snackbarPosition} preventDuplicate>
          <Notifier />
        </SnackbarProvider>
      </Box>
    </Router>
  );
}

export default App;

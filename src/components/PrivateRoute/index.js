import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../features/auth/authSlice';

const HOME = '/calio/';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useSelector(getIsAuthenticated);
  
  return (
    <Route
      {...rest}
      render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to={HOME} />)}
    />
  );
}

export default PrivateRoute;

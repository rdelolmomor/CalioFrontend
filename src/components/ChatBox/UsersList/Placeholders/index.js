import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const UserLabel = ({ label }) => (
  <>
    <ListSubheader>{label}</ListSubheader>
    <Divider />
  </>
);

const NoResultsPlaceholder = () => (
  <>
    <Divider />
    <ListItem>
      <ListItemText primary='No hay resultados' />
    </ListItem>
    <Divider />
  </>
);

const NoUsersConnectedPlaceholder = () => (
  <ListItem>
    <ListItemText primary='Ningún usuario conectado' />
  </ListItem>
);

export { UserLabel, NoResultsPlaceholder, NoUsersConnectedPlaceholder };

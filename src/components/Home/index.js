import Login from './Login';
import HomeBox from './HomeBox';
import Card from '@material-ui/core/Card';
import { homeStyles } from '../../js/styles';

function Home() {
  const { root, loginContainer, homeBoxContainer, avatar, logo } = homeStyles();

  return (
    <Card elevation={0} raised className={root}>
      <HomeBox className={homeBoxContainer} avatarClassName={avatar} />
      <Login className={loginContainer} logoClassName={logo} />
    </Card>
  );
}

export default Home;

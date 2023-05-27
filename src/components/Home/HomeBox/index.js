import useRandomAvatar from './useRandomAvatar';
import Box from '@material-ui/core/Box';
import Avatar from 'avataaars';

function HomeBox({ className, avatarClassName }) {
  const avatar = useRandomAvatar();

  return (
    <Box className={className}>
      <Box className={avatarClassName}>
        <Avatar {...avatar} avatarStyle='Transparent' />
      </Box>
    </Box>
  );
}

export default HomeBox;

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { defaultAvatar } from '../../../js/avatars';
import Avataaar from 'avataaars';

const avatarPlaceholderStyle = {
  minWidth: 56,
  height: 56,
  marginRight: 16,
  borderRadius: '50%',
  backgroundColor: '#cecece75',
};

function Avatar({ className, avatar, isScrolling = false }) {
  const finalAvatar = avatar === 'Default' ? defaultAvatar : avatar;

  return isScrolling ? (
    <div className='avatar-placeholder' style={avatarPlaceholderStyle} />
  ) : (
    <ListItemAvatar className={className}>
      <Avataaar {...finalAvatar} avatarStyle={'Transparent'} />
    </ListItemAvatar>
  );
}

export default Avatar;

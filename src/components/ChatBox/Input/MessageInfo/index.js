import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Cancel from '@material-ui/icons/Cancel';
import Online from '@material-ui/icons/AlternateEmail';
import Label from '@material-ui/icons/Label';

function MessageInfo({ mention, removeMention, labels, removeLabel, className }) {
  if (!mention && labels.length === 0) return null;

  return (
    <Box className={className}>
      {mention && (
        <Chip
          color='secondary'
          label={mention.name}
          onDelete={removeMention}
          deleteIcon={<Cancel />}
          icon={<Online />}
        />
      )}
      {labels.map(label => (
        <Chip
          key={label.tag}
          label={label.name}
          onClick={() => {}}
          onDelete={() => removeLabel(label)}
          deleteIcon={<Cancel />}
          icon={<Label />}
        />
      ))}
    </Box>
  );
}
export default MessageInfo;

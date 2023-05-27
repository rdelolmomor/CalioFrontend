import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

function ScrollButton(props) {
  const { anchored, onClick, className } = props;

  return (
    <Grow in={!anchored}>
      <Tooltip title="Ir abajo" placement="top" arrow>
        <IconButton color="primary" className={className} onClick={onClick}>
          <ArrowDropDown />
        </IconButton>
      </Tooltip>
    </Grow>
  );
}

export default ScrollButton;

import React from 'react';
import Grow from '@material-ui/core/Grow';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const titles = {
  online: '@Online',
  labels: '#Etiquetas',
};

function ExtraBox({
  type,
  active,
  search,
  content,
  onClick,
  containerStyle,
  subheaderStyle,
  close,
}) {
  function getFilteredContent() {
    const filteredContent = search
      ? content.filter(elem => elem.name.toLowerCase().includes(search.toLowerCase()))
      : content;
    return filteredContent.length !== 0 ? (
      filteredContent.map(elem => (
        <ListItem
          key={elem.login || elem.tag}
          onClick={() => onClick(type, elem)}
          component='li'
          button
        >
          <ListItemText primary={elem.name} />
        </ListItem>
      ))
    ) : (
      <ListItem component='li'>
        <ListItemText primary='Ningún resultado' />
      </ListItem>
    );
  }

  if (!active) return null;

  return (
    <ClickAwayListener onClickAway={close}>
      <Grow in={active} className={containerStyle} component={Box}>
        <List
          disablePadding
          subheader={
            <ListSubheader className={subheaderStyle} color='primary'>
              {titles[type]}
            </ListSubheader>
          }
        >
          {getFilteredContent()}
        </List>
      </Grow>
    </ClickAwayListener>
  );
}

export default React.memo(ExtraBox);

import { useState, forwardRef, useImperativeHandle } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

//TODO: Terminar

const LabelsDialog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(true);
  const [message /* setMessage */] = useState({
    messageId: null,
    labels: Array.from(Array(10), () => ({
      name: 'Una etiqueta',
      tag: '#UNAETIQUETAPUESTA',
    })),
  });
  const open = () => setVisible(true);
  const close = () => setVisible(false);

  function onRemoveLabel() {}

  function discardChanges() {
    setVisible(false);
  }
  function applyChanges() {
    setVisible(false);
  }

  useImperativeHandle(ref, () => ({ open }));

  return (
    <Dialog
      open={visible}
      onClose={close}
      scroll='paper'
      aria-labelledby='dialogo-etiquetas-titulo'
      maxWidth='xs'
      // fullWidth
    >
      <DialogTitle id='dialogo-etiquetas-titulo'>Etiquetas</DialogTitle>
      <DialogContent dividers>
        <List dense>
          {message.labels.map((label, index) => (
            <ListItem key={index}>
              <ListItemText primary={label.name} secondary={label.tag} />
              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label='delete' onClick={() => onRemoveLabel(label.tag)}>
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <DialogActions>
          <Button onClick={discardChanges}>Cerrar</Button>
          <Button onClick={applyChanges} color='primary'>
            Guardar
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
});

export default LabelsDialog;

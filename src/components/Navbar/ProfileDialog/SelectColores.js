import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, FormControl, ListItemText, Select } from '@material-ui/core';

const useEstilos = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft:'0px',
    marginTop: '15',
    width: '86%',
  },
}));

const colores = [
  { nombre: 'Love Orange', color: '#ff7900', background: '#fff' },
  { nombre: 'Arctic Blue', color: '#76949F', background: '#fff' },
  { nombre: 'Celebi Green', color: '#50be87', background: '#fff' },
  { nombre: 'Salmon Pink', color: '#F4989C', background: '#000' },
  { nombre: 'Blue Bell', color: '#999AC6', background: '#fff' },
  { nombre: 'Indian Red', color: '#CD5C5C', background: '#000' },
];

function SelectColores({ primaryColor, setPrimaryColor }) {
  const estilos = useEstilos();
  const selectBullet = codigo => (
    <div
      style={{
        width: '26px',
        height: '26px',
        borderRadius: '50%',
        backgroundColor: codigo,
        marginRight: '16px',
      }}
    />
  );

  const onColorChange = event => {
    console.log('Color: ',event.target.value);
    window.localStorage.setItem('Color', event.target.value);
    setPrimaryColor(event.target.value);
  };

  return (
    <FormControl required variant="outlined" className={estilos.formControl}>
      <InputLabel htmlFor="select-colores">Tema personalizado</InputLabel>
      <Select
        name="COLOR"
        label="Color de los botones"
        id="select-colores"
        value={primaryColor}
        onChange={onColorChange}
        className={estilos.select}
        renderValue={selected => {
          const codigo = colores.filter(c => c.color === selected)[0];
          return (
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px' }}>
              {selectBullet(codigo.color)}
              <span style={{ textTransform: 'capitalize' }}>{codigo.nombre}</span>
            </div>
          );
        }}
      >
        {colores.map(({ nombre, color }) => (
          <MenuItem key={nombre} value={color}>
            {selectBullet(color)}
            <ListItemText primary={nombre} className={estilos.optionItem} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectColores;
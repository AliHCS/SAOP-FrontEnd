import { VISTAS } from './TiposDeVistas';

describe('VISTAS', () => {
  it('debería tener una vista de RADIO con id 1 y nombre "Juego de radios"', () => {
    expect(VISTAS.RADIO).toEqual({ id: 1, name: 'Juego de radios' });
  });

  it('debería tener una vista de COMBOBOX con id 2 y nombre "Combo de selección"', () => {
    expect(VISTAS.COMBOBOX).toEqual({ id: 2, name: 'Combo de selección' });
  });
});
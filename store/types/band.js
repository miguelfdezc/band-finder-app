export const BandActionTypes = {
  CREATE_BAND: 'CREATE_BAND',
  CREATE_BAND_SUCCESS: 'CREATE_BAND_SUCCESS',
};

export const BandDefaultState = () => ({
  band: {
    usuario: '',
    nombre: '',
    descripcion: '',
    nivel: 'principiante',
    fechaFundacion: new Date(),
    ubicacion: {},
    ciudad: '',
    generos: [],
    imagenPerfil: '',
    imagenFondo: '',
    actuaciones: 0,
    valoracion: 0.0,
    fans: 0,
  },
});

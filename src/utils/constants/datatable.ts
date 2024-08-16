export const DEFAULT_OPTIONS:any = {
    responsive: false,
    select: false,
    language: {
        search: 'Buscar',
        searching: false,
        paging: false,
        searchPlaceholder: 'Teclea tu búsqueda',
        zeroRecords: 'No se encontraron registros.',
        emptyTable: 'No hay datos para mostrar.',
        paginate: {
            first: 'Primera',
            next: 'Siguiente',
            previous: 'Anterior',
            last: 'Última'
        },
        //info: 'Mostrando del _START_ al _END_ de _TOTAL_ registros. ',
        info: '',
        lengthMenu: 'Mostrar _MENU_ registros',
        infoFiltered: '(filtrado de un total de _MAX_ registros).',
        infoEmpty: 'Mostrando 0 de 0 registros.',
        loadingRecords: 'Cargando...',
        select: {
            rows: {
                _: "%d registros seleccionados.",
                0: "",
                1: "1 registro seleccionado."
            }
        }
    },
   // dom: '<"row mb-5 botonera"<"col-sm-12 col-md-12 mb-4"B>><"row"<"col-sm-12 col-md-6 registros"l><"col-sm-12 col-md-6"f>><"row"<"col-sm-12"tr>><"row"<"col-sm-12"i>><"row"<"col-sm-12"p>>',
   dom: '', 
   buttons: [],
}
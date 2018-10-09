window.loader = {        
    _success(library) {
        console.log(`La librería ${library} se ha cargado correctamente.`);
    },
    _error(library, error) {
        console.log(`
            La librería ${library} no se ha podido cargar.
            Mensaje: ${error.message}.
        `);
    },
    async load(library, callback = this._success) {
        console.log('Holi');
        callback();
    },
    async loadAll(libraries, callback) {
        console.log('Holis');
    },
};
function load() {
    window.loader = {
        _start(library) {
            console.log(`Starting loading ${library}`);
        },   
        _success(library) {
            console.log(`The library ${library} loaded correctly.`);
        },
        _error(library, error) {
            console.log(`
                The library ${library} has not being loaded.
                Error message: ${error.message}.
            `);
        },
        async load(library, callback) {
            this._start(library);
            return await fetch(library)
                .then(response => {
                    let error;
                    if (response.ok) {
                        const contentType = response.headers.get('Content-Type') || '';
                    
                        if (contentType.includes('application/javascript')) {
                            this._success(library);
                            if (!!callback && typeof callback === 'function') callback();
                            return Promise.resolve(response.body);
                        }
                    
                        throw new Error('Invalid content type: ' + contentType);
                    }
                
                    if (response.status == 404) {
                        throw new Error('Page not found: ' + url);
                    }

                    throw new Error('HTTP error: ' + response.status);
                }).catch(error => {
                    this._error(library, error);
                    return Promise.reject(error);
                });
        },
        async loadAll(libraries, callback) {
            const callbackCall = () => {
                console.log('All libraries have been loaded');
                if (!!callback && typeof callback === 'function') callback();
            };
            let fnCalls = libraries.map(library => () => this.load(library));
            fnCalls.push(callbackCall);
            fnCalls.reduce(async (promise, fn, index, array) => {
                return promise.then(response => {
                    if (response == false) return false;
                    return fn();
                }).catch(() => false);
            }, Promise.resolve());
            
        },
    };

    const event = new Event('loader.loaded');
    window.dispatchEvent(event);
}
window.onload = load;
# javascript_library_loader

This library manages the asynchronous loading of Javascript modules.

It loads a module into the window object that can be called from the browser console.

# Loads a single module and executes the callback one the loading is finished

# or throws an error

window.loader.load('url_of_the_module', callback());

# Loads several modules following the order given in the array, in case any of

# them is dependent of the previous ones, throwing an error and stopping the flux

# in case of one of the modules not loading, and executes the callback once all the

# modules have been loaded

window.loader.loadAll(array_of_modules[], callback());

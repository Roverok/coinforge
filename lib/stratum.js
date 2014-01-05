module.exports = function(methods) {
    /* --- Stratum Sub-Handlers --- */
    methods.stratum_subscribe = function(req, deferred, socket) {
        deferred.resolve([methods.uuid.v4().replace('-', ''), '08000002', 4]);
    };

    methods.stratum_authorize_worker = function(req, deferred, socket) {
        deferred.resolve([true]);
        socket.set_difficulty([1]);
        this.send_work(socket);
    };

    methods.stratum_submit_share = function(req, deferred, socket) {
        deferred.resolve([true]); // <<<<<<< TODO
    };

    methods.stratum_get_transactions = function(req, deferred, socket) {
        deferred.reject(methods.stratum.Server.errors.METHOD_NOT_FOUND);
    };

    methods.stratum_mining_error = function(error, socket) {
        console.log('Mining error: ' + error);
    };

    /* --- Main Stratum Handler --- */
    methods.stratum = function(req, deferred, socket) {
        switch (req.method) {
        case 'subscribe':
            this.stratum_subscribe(req, deferred, socket);
            break;
        case 'authorize':
            this.stratum_authorize_worker(req, deferred, socket);
            break;
        case 'submit':
            this.stratum_submit_share(req, deferred, socket);
            break;
        case 'get_transactions':
            this.stratum_get_transactions(req, deferred, socket);
            break;
        default:
            deferred.reject(methods.stratum.Server.errors.METHOD_NOT_FOUND);
        }
    };

    /* --- RPC Sub-Handlers --- */
    methods.rpc_get_connections = function(name, args, connection, deferred) {
        deferred.reject(methods.stratum.Server.errors.METHOD_NOT_FOUND);
    };

    methods.rpc_update_block = function(name, args, connection, deferred) {},

    /* --- Main RPC Handler --- */
    methods.rpc = function(name, args, connection, deferred) {
        switch (name) {
        case 'mining.connections':
            this.rpc_get_connections(name, args, connection, deferred);
            break;
        case 'mining.update_block':
            this.rpc_update_block(name, args, connection, deferred);
            break;
        }
    };
};
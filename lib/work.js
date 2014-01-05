module.exports = function(methods) {
    methods.get_work = function() {
        // Sample Work
        var job_id = 'bf';
        var previous_hash = '00000000d48a84c146910cfff0c9fd37052ec4c220e083a37ec9a09964e77d2d';
        var coinbase1 = '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff20020862062f503253482f04b8864e5008';
        var coinbase2 = '072f736c7573682f000000000100f2052a010000001976a914d23fcdf86f7e756a64a7a9688ef9903327048ed988ac00000000';
        var branches = ['61e90d4998b4a30d5a939e7e8b9a77d0b6abae6d30e827d00a45b57052cc6812'];
        var block_version = '00000002';
        var nbit = 'ffff001d';
        var ntime = 'e8dc3c50';
        var clean = false;

        return [job_id, previous_hash, coinbase1, coinbase2, branches, block_version, nbit, ntime, clean];
    };

    methods.send_work = function(socket) {
        socket.notify(this.get_work());
    };
};
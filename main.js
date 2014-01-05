/** CoinForge - A Node.js multi-cryptocurrency mining pool. | Copyright (c) Bardi Harborow 2013 | GPLv3 */
var methods = {};
methods.stratum = require('stratum');
methods.uuid = require('uuid');

require('lib/work.js')(methods);
require('lib/stratum.js')(methods);
module.exports = require('es5class').define('CoinForge', methods);
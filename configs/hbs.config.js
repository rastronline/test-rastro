const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));
require('../helpers/admin.helpers')(hbs);
require('../helpers/guest.helpers')(hbs);
require('../helpers/owner.helpers')(hbs);
require('../helpers/favorite.helpers')(hbs);
require('../helpers/notOwner.helpers')(hbs);
require('../helpers/bidLeader.helpers')(hbs);
require('../helpers/existBuyer.helpers')(hbs);
require('../helpers/navPathActive.helpers')(hbs);
require('../helpers/notPhotos.helpers')(hbs);
require('../helpers/publication.helpers')(hbs);




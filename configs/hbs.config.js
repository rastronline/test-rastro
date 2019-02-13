const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));
require('../helpers/user.helpers')(hbs);
require('../helpers/owner.helpers')(hbs);
require('../helpers/favorite.helpers')(hbs);
require('../helpers/sold.helpers')(hbs);


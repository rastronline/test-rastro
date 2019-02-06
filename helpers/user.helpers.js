/* module.exports = (hbs) => {
  hbs.registerHelper('get_book_rating_state', (book) => {
      if (book.rating >= 8) {
          return 'success';
      } else if (book.rating >= 5) {
          return 'warning';
      } else {
          return 'danger';
      }
  });
}
 */
module.exports = (hbs) => {
  hbs.registerHelper('get_book_rating_state', (hobbies) => {
      if (book.rating >= 8) {
          return 'success';
      } else if (book.rating >= 5) {
          return 'warning';
      } else {
          return 'danger';
      }
  });
}
/**
 * Handlebar helpers
 */
Handlebars.registerHelper('teaser', function (options) {
  return new Handlebars.SafeString(
    '<span>' + options.fn(this).replace(/<(?:.|\n)*?>/gm, '').substring(0, 25) + '...' + '</span>'
  );
});
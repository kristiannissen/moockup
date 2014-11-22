yepnope ({
  load: ["fixtures/monty_python.js",
    "config.js",
    "//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js",
    "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js",
    "//cdnjs.cloudflare.com/ajax/libs/pagedown/1.0/Markdown.Converter.js",
    "//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0-rc.3/handlebars.min.js",
    "js/plugins.js"
  ],
  complete: function () {
    jQuery(function () {
      var data = fixtures;
      jQuery.get("templates/templates.html", function ( response ) {
        jQuery('[data-items]').mookup({
          "fixtures": data,
          "templates": response,
          "annotations": config
        });
      });
    });
  }
});
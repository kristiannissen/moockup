/* jQuery Plugin */
;(function ( $, window, document, undefined ) {
  /**
   * #TODO: mulighed for at angive billed ration
   * #TODO: -simple markup i JSON data-
   * #TODO: mulighed for at tilføje data via public metode eller decorator
   * #TODO: Annotation eller konfigurations data i json
   * #TODO: Add cache to reduce requests to placehold.it
   * 
   **/
  var pluginName = "mookup",
    defaults = {
      "items": 10,
      "view": null,
      "fixtures": [],
      "templates": "",
      "annotations": {}
    };
  
  function Plugin ( element, options ) {
    this.element = $(element);
    this.options = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;

    // Call init
    this.init();
  }
  
  Plugin.prototype = {
    init: function () {
      this.options.items = parseInt(this.element.attr('data-items'));
      this.options.template = this.element.attr('data-template');
      this.options.ratio = this.element.attr('data-image-ratio') ? this.element.attr('data-image-ratio') : "16:9";

      var annotation = this.element.attr('data-annotation') ? this.element.attr('data-annotation') : null;
      var fixtures = this.prepareFixtures( this.options.fixtures, this.element );
      var annotations = this.options.annotations;

      this.render( this.element, this.getTemplate( this.options.templates, this.options.template ), fixtures.slice(0, this.options.items));

      if (annotation) {
        var annon = _.where(this.options.annotations, {"element": annotation});

        $('<div/>').attr('id', annotation)
          .css({position: 'absolute', background: 'rgba(0, 0, 0, 1)', color: 'rgba(255, 255, 255, 1)', padding: '1rem'})
          .hide()
          .addClass('tooltip')
          .prependTo( this.element );
        
        var self = this.element;

        $('#' + annotation).html(_.first(annon).text);

        self.mouseenter(function (evnt) {
          $('.tooltip', self).show();
        })
        .mouseleave(function () {
          $('.tooltip', self).hide();
        });
      }

    },
    render: function ( element, template, fixtures ) {
      var converter = new Markdown.Converter();

      _.each(fixtures, function(item) {
        item.body = converter.makeHtml(item.body);
      });

      var template = Handlebars.compile(template);
      var markup = template({items: fixtures});

      element.html(markup.trim());
    },
    getRatio: function () {
      var ratio = this.options.ratio.split(":");
      return [parseInt(_.first(ratio)), parseInt(_.last(ratio))];
    },
    getTemplate: function ( templates, template ) {
      var markup = $(templates).filter("#"+ template);
      
      return markup.html();
    },
    // FIXME: rands is no longer used, images are managed in templates
    prepareFixtures: function ( data, element ) {
      var rands = _.shuffle(_.range(Math.floor(Math.random() * data.length))), 
        ratio = [element.width(), Math.round((element.width() / _.first(this.getRatio())) * _.last(this.getRatio()))],
        image = 'http://placehold.it/' + _.first(ratio) + 'x' + _.last(ratio);

      _.each(data, function (item, indx) {
        data[indx].image = image;
      });

      return _.shuffle(data);
    }
  };
  
  $.fn[pluginName] = function ( options ) {
    return this.each ( function () {
      if ( !$.data( this, "plugin_"+ pluginName ) ) {
        $.data( this, "plugin_"+ pluginName, new Plugin( this, options ));
      }
    });
  }
  
})( jQuery, window, document );
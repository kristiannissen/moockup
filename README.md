# Moock Up
Is intended to be a stupidly simple in-the-browser prototyping kit. You create simple HTML files, you add all the wonderful CSS frameworks you love to play with. At the bottom of each HTML file you include 2 JS script tags, one calling YepNope the other one calling the moock up plugin like so and you are good to go! Happy playing

See the sample.html file how to include the JS files required
 <script src="//cdnjs.cloudflare.com/ajax/libs/yepnope/1.5.4/yepnope.min.js"></script>
 <script src="js/mookup-loader.js"></script>

## Templates
Moock Up uses Handlebars for templating which means you can easily display data as you like and you can add your own helper functions to manipulate the dummy data added by Moock UP.

Example Handlebar template

 <script id="tmpl-list" type="text/x-handlebars-template">
 <ul>
   {{#each items}}
   <li>{{{title}}}</li>
   {{/each}}
 </ul>
 </script>

### Handlebars Helpers
One Handlebar Helper has been added to show what you can do. This helper cuts the text to show a truncated summary below and image

 Handlebars.registerHelper('teaser', function (options) {
   return new Handlebars.SafeString(
     '<span>' + options.fn(this).replace(/<(?:.|\n)*?>/gm, '').substring(0, 25) + '...' + '</span>'
   );
 });

## Formatting text
In order to show as realistic data as possible, you can make use of Markdown formating

## How to use?
All you have to do in order to have Moock Up generate data for you is to add a few simple HTML 5 data-* attributes.

Example
 <div data-items="1" data-template="tmpl-teaser" data-image-ratio="4:3"></div>

- data-items
- data-template
- data-image-ratio
- data-annotation (experimental)

_data-items_
Using the data-item attribute tells Moock Up the number of items you want to show. Say you have a design where a list containing 3 links. You can have Moock Up generate 3 items for you simply by adding data-items="3" in a say div tag.

_data-template_
Is used to tell Moock Up what Handlebar template to use when displaying the items you need. You can add dummy imates using http://placehold.it 

_data-image-ratio_
By default Moock Up used a 16:9 ratio for images, you can change this using the data-image-ratio attribute and simply specify 4:3 as the ratio.
Moock Up automatically creates images using http://placehold.it fitting into the required container.
/**
 * [moment: the moment module]
 * @type {[type]}
 */

const moment = require('moment');
const debug = require('debug')('gitbook-plugin-signature');
/**
 * [main module]
 * @type {Object}
 */

module.exports = {
    // Extend templating blocks
    blocks: {
        // Author will be able to write "{% title %}World{% endtitle %}"
        title: {
            process: function(block) {
                return "Hello " + block.body;
            }
        }
    },

    // Extend templating filters
    filters: {
        dateFormat: function(d, format, utc) {
            return moment(d).utcOffset(parseInt(utc)).format(format);
        },

        copyright: function(organization) {
            const copyright = '<br><br><br><font color=\"gray\">Copyright © ' + organization + '<br>All rights reserved.</font>';
            return '\n\n\n\n\n\n\n' + '<center>' + copyright + '</center>';
        },
        signature: function (key) {
            const signature = this.config.get('pluginsConfig')['gitbook-plugin-signature'].signature[key];
            return signature;
        },
        s: function (key) {
            const signature = this.config.get('pluginsConfig')['gitbook-plugin-signature'].signature[key];
            return signature;
        }


    },

    // Hook process during build
    hooks: {
        // For all the hooks, this represent the current generator

        // This is called before the book is generated
        "init": function() {
            console.log("generating signature......");
        },

        // This is called after the book generation
        "finish": function() {
            console.log("signature generated!");
        },

        "page:before": function(page) {
            const defaultOption = {
                'format': 'YYYY/MM/DD',
                'utcOffset': '8'
            };
            var color = 'gray';

            // autoTimeStamp
            if (this.config.get('pluginsConfig')['gitbook-plugin-signature'].autoTimeStamp) {
                var author = this.config.get('author');
                var timeStampFormat = defaultOption.format;

                // if (this.config.options.pluginsConfig['gitbook-plugin-signature'].autoTimeStamp.author){
                //   author = this.config.options.pluginsConfig['gitbook-plugin-signature'].autoTimeStamp.author;
                // }
                if (this.config.get('pluginsConfig')['gitbook-plugin-signature'].autoTimeStamp.timeStampFormat) {
                    timeStampFormat = this.config.get('pluginsConfig')['gitbook-plugin-signature'].autoTimeStamp.timeStampFormat;
                }
                if (this.config.get('pluginsConfig')['gitbook-plugin-signature'].autoTimeStamp.color) {
                    color = this.config.get('pluginsConfig')['gitbook-plugin-signature'].autoTimeStamp.color;
                }

                const colorLeft = ' <font color=\"' + color + '\">';
                var autolastModified = colorLeft + 'last modified by ' + author;
                const autoTimeStamp = '{{ file.mtime | dateFormat("' + timeStampFormat + '", ' + defaultOption.utcOffset + ') }}</font>';

                if (page.content.indexOf('{% set author') != -1) {
                    author = '{{author}}';
                    autolastModified = colorLeft + 'last modified by ' + author;
                    page.content = page.content.slice(0, (page.content.indexOf('%}\n')+2))
                                    + autolastModified + ', ' + autoTimeStamp + '\n\n'
                                    + page.content.slice(page.content.indexOf('%}\n')+2);
                }else{
                  page.content = autolastModified + ', ' + autoTimeStamp + '\n\n' + page.content;
                }
            }

            // auto copyright
            if (this.config.get('pluginsConfig')['gitbook-plugin-signature'].autoCopyright) {
                var owner = this.config.get('author');
                const year = '{{ file.mtime | dateFormat("' + 'YYYY' + '", ' + defaultOption.utcOffset + ') }}';
                var centerLeft, centerRight = '';

                if (this.config.get('pluginsConfig')['gitbook-plugin-signature'].autoCopyright.owner) {
                    owner = this.config.get('pluginsConfig')['gitbook-plugin-signature'].autoCopyright.owner;
                }
                if (this.config.get('pluginsConfig')['gitbook-plugin-signature'].autoCopyright.center) {
                    centerLeft = '<center>';
                    centerRight = '</center>';
                }
                if (this.config.get('pluginsConfig')['gitbook-plugin-signature'].autoCopyright.color) {
                    color = this.config.get('pluginsConfig')['gitbook-plugin-signature'].autoCopyright.color;
                }

                const colorLeft = ' <font color=\"' + color + '\">';

                page.content = page.content + '\n\n\n\n<br><br>' + centerLeft + colorLeft + 'Copyright © ' + year + ' ' + owner + '.' + '<br>All rights reserved.</font>' + centerRight;
            }
            return page;
        }
    }
};

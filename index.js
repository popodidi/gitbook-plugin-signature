/**
 * [moment: the moment module]
 * @type {[type]}
 */

const moment = require('moment');
const debug = require('debug')('gitbook-plugin-signature-footer');
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
        // Author will be able to write "{{ 'test'|myFilter }}"
        created: function(name) {
            return "<font color=\"gray\">created by " + name + "</font><br>"; //+ moment(file.mtime ).utcOffset(parseInt(defaultOption.utcOffset)).format(defaultOption.format);
        },
        lastModified: function(name) {
            return "<font color=\"gray\">last modified by " + name + "</font><br>";
        },

        copyright: function(organization) {
            const copyright = '<br><br><br><font color=\"gray\">Copyright © ' + organization + '<br>All rights reserved.</font>';
            return '\n\n\n\n\n\n\n' + '<center>' + copyright + '</center>';
        },


    },

    // Hook process during build
    hooks: {
        // For all the hooks, this represent the current generator

        // This is called before the book is generated
        "init": function() {
            console.log("init!");
        },

        // This is called after the book generation
        "finish": function() {
            console.log("finish!");
        },

        "page:before": function(page) {
            const defaultOption = {
                'format': 'YYYY/MM/DD HH:mm:ss',
                'utcOffset': '8'
            };
            const timeStamp = ' <font color=\"gray\">{{ file.mtime | dateFormat("' + defaultOption.format + '", ' + defaultOption.utcOffset + ') }}</font><br><br>';
            page.content = page.content.replace('**lastModifiedTimestamp**', timeStamp);
            return page;
        }
    }
};

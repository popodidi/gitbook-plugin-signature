/**
 * [moment: the moment module]
 * @type {[type]}
 */
"use strict";
const moment = require('moment');
const debug = require('debug')('gitbook-plugin-signature');
const _ = require('lodash');
const GitCommandLine = require('git-command-line');
/**
 * [main module]
 * @type {Object}
 */

function formatSignature(key) {
  return this.config.get('pluginsConfig')['gitbook-plugin-signature'].signature[key];
}

module.exports = {
    // Extend templating filters
    filters: {
        dateFormat: function (d, format, utc) {
            return moment(d).utcOffset(parseInt(utc)).format(format);
        },

        copyright: function (organization) {
            const copyright = '<br><br><br><span style="color:grey">Copyright © ' + organization + '<br>All rights reserved.</span>';
            return '\n\n\n\n\n\n\n' + '<span style="text-align: center">' + copyright + '</span>';
        },
        signature: formatSignature,
        s: formatSignature
    },

    // Hook process during build
    hooks: {
        // For all the hooks, this represent the current generator

        // This is called before the book is generated
        "init": function () {
            console.log("generating signature......");
        },

        // This is called after the book generation
        "finish": function () {
            console.log("signature generated!");
        },

        "page:before": function (page) {
            const defaultOption = {
                'format': 'YYYY/MM/DD',
                'utcOffset': '8'
            };
            var color = 'gray';

            // autoTimeStamp
            // var author = this.config.get('author');
            var book = this;

            var Git = new GitCommandLine('/tmp/gitTemp');
            return Git.log([page.path], []).then(function (log) {
                const res = log.res;
                return _.get(_.split(_.get(_.split(res, '\nAuthor: ', 2), '[1]'), ' <', 1), ['0']);
            }).then(function (author) {
                if (book.config.get('pluginsConfig')['gitbook-plugin-signature'].autoTimeStamp) {
                    var timeStampFormat = defaultOption.format;

                    if (book.config.get('pluginsConfig')['gitbook-plugin-signature'].autoTimeStamp.timeStampFormat) {
                        timeStampFormat = book.config.get('pluginsConfig')['gitbook-plugin-signature'].autoTimeStamp.timeStampFormat;
                    }
                    if (book.config.get('pluginsConfig')['gitbook-plugin-signature'].autoTimeStamp.color) {
                        color = book.config.get('pluginsConfig')['gitbook-plugin-signature'].autoTimeStamp.color;
                    }

                    const colorLeft = ' <font color=\"' + color + '\">';
                    var autolastModified = colorLeft + 'last modified by ' + author;
                    const autoTimeStamp = '{{ file.mtime | dateFormat("' + timeStampFormat + '", ' + defaultOption.utcOffset + ') }}</font>';

                    if (page.content.indexOf('{% set author') != -1) {
                        author = '{{author}}';
                        autolastModified = colorLeft + 'last modified by ' + author;
                        page.content = page.content.slice(0, (page.content.indexOf('%}\n') + 2))
                            + autolastModified + ', ' + autoTimeStamp + '\n\n'
                            + page.content.slice(page.content.indexOf('%}\n') + 2);
                    } else {
                        page.content = autolastModified + ', ' + autoTimeStamp + '\n\n' + page.content;
                    }
                }
                return page;
            }).then(function (page) {
                // auto copyright
                if (book.config.get('pluginsConfig')['gitbook-plugin-signature'].autoCopyright) {
                    var owner = book.config.get('author');
                    const year = '{{ file.mtime | dateFormat("' + 'YYYY' + '", ' + defaultOption.utcOffset + ') }}';
                    var centerLeft, centerRight = '';

                    if (book.config.get('pluginsConfig')['gitbook-plugin-signature'].autoCopyright.owner) {
                        owner = book.config.get('pluginsConfig')['gitbook-plugin-signature'].autoCopyright.owner;
                    }
                    if (book.config.get('pluginsConfig')['gitbook-plugin-signature'].autoCopyright.center) {
                        centerLeft = '<center>';
                        centerRight = '</center>';
                    }
                    if (book.config.get('pluginsConfig')['gitbook-plugin-signature'].autoCopyright.color) {
                        color = book.config.get('pluginsConfig')['gitbook-plugin-signature'].autoCopyright.color;
                    }

                    const colorLeft = ' <font color=\"' + color + '\">';

                    page.content = page.content + '\n\n\n\n<br><br>' + centerLeft + colorLeft + 'Copyright © ' + year + ' ' + owner + '.' + '<br>All rights reserved.</font>' + centerRight;
                }
                return page;
            }).fail(function (err) {
                console.error(err);
                return page;
            });

        }
    }
};

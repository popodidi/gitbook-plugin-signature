module.exports = {
    // Extend website resources and html
    website: {
        assets: "./book",
        js: [
            "test.js"
        ],
        css: [
            "test.css"
        ],
        html: {
            "html:start": function() {
                return "<!-- Start book " + this.options.title + " -->"
            },
            "html:end": function() {
                return "<!-- End of book " + this.options.title + " -->"
            },

            "head:start": "<!-- head:start -->",
            "head:end": "<!-- head:end -->",

            "body:start": "<!-- body:start -->",
            "body:end": "<!-- body:end -->"
        }
    },

    // Extend ebook resources and html
    website: {
        assets: "./book",
        js: [
            "test.js"
        ],
        css: [
            "test.css"
        ],
        html: {
            "html:start": function() {
                return "<!-- Start book " + this.options.title + " -->"
            },
            "html:end": function() {
                return "<!-- End of book " + this.options.title + " -->"
            },

            "head:start": "<!-- head:start -->",
            "head:end": "<!-- head:end -->",

            "body:start": "<!-- body:start -->",
            "body:end": "<!-- body:end -->"
        }
    },

    // Extend templating blocks
    blocks: {
        // Author will be able to write "{% myTag %}World{% endMyTag %}"
        myTag: {
            process: function(blk) {
                return "Hello " + blk.body;
            }
        }
    },

    // Extend templating filters
    filters: {
        // Author will be able to write "{{ 'test'|myFilter }}"
        hello: function(name) {
            return 'Hello '+name;
        }
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
        }

            "page": function(page) {
            var text2 = "Chang, Hao"
            page.content = page.content.concat("<br> ", text2);
            return page;
        }
    }
};

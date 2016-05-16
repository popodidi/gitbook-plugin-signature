# gitbook-plugin-signature

This is a plugin for automatically adding timestamp and copyright terms at the top and the bottom of every article. For now, it is using body font and you can specify the color, copyright owner and author of each article.

Feel free to create issues for any discussion.

## Example

### `.md` file

```
{% set author = "Hao" %}
# Title of the Article

content
.
.
```

### Output

> last modified by Hao, 2016/05/05 05:05:05

> # Title of the Article

> content<br>
> .<br>
> .<br>
> .<br>
> <br>
> <br>

> <center>Copyright © 2016 Hao.<br>All rights reserved.</center>

## Usage

### book.json

I am not sure why it goes wrong when you don't specify the url. However, it still works with this setting as we put specific url

```json
"plugins": ["gitbook-plugin-signature@git+https://github.com/popodidi/gitbook-plugin-signature.git"]
```

```json
"pluginsConfig": {
      "gitbook-plugin-signature":{
          "timeStampFormat" : "YYYY/MM/DD HH:mm:ss",
          "autoTimeStamp":{
            "color":"gray",
            "author":"Hao",
            "timeStampFormat": "YYYY/MM/DD HH:mm:ss"
          },
          "copyright":{
              "color":"gray",
               "owner":"Hao",
               "center":true
           }
      }
  }
```

`autoTimeStamp.author` and `copyright.owner` will be set to `book.author` if not specified.<br>
If you don't want to automatically add copyright, simply drop the part in `pluginsConfig` as follows

```json
"pluginsConfig": {
      "gitbook-plugin-signature":{
          "timeStampFormat" : "YYYY/MM/DD HH:mm:ss",
          "autoTimeStamp":{
            "color":"gray",
            "timeStampFormat": "YYYY/MM/DD HH:mm:ss"
          }
      }
  }
```

Note that I don't put `author` in `autoTimeStamp`. As I mentioned, it will be set to `book.author` automatically.

### Set Author for Each Article

I tend to put settings in `book.json` rather than using filters as in the previous version. Only when you want to set author for each article, add this line of code at the top of the article

```
{% set author = "Hao" %}
# Title of the Article

content
.
.
```

## Deprecated Usage

These methods are deprecated and will be discarded in the next version. So will the `pluginsConfig['gitbook-plugin-signature'].timeStampFormat`, which specifies the format of `**lastModifiedTimestamp**`.

### created/modified

```
{{ 'Hao'|created}}
{{ 'Hao'|lastModified}}
```

### Last Modified Timestamp

```
**lastModifiedTimestamp**
```

### copyright

```
{{ 'Hao'|copyright }}
```

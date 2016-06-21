# gitbook-plugin-signature

This is a plugin for automatically adding timestamp and copyright terms at the top and the bottom of every article. For now, it is using body font and you can specify the color, copyright owner and author of each article.

Feel free to create issues or pull request for any discussion.

## Example

### .md file

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

```json
"plugins": ["signature"]
```

```json
"pluginsConfig": {
      "gitbook-plugin-signature":{
          "autoTimeStamp":{
            "color":"gray",
            "author":"Hao",
            "timeStampFormat": "YYYY/MM/DD HH:mm:ss"
          },
          "autoCopyright":{
             "color":"gray",
             "owner":"Hao",
             "center":true
          },
          "signature":{
            "key": "customized signature"
          }
      }
}
```

`autoTimeStamp.author` and `autoCopyright.owner` will be set to `book.author` if not specified.<br>
If you don't want to automatically add copyright, simply drop the part in `pluginsConfig` as follows

```json
"pluginsConfig": {
      "gitbook-plugin-signature":{
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

### Customize signature

You can set your customized signature content in `book.json` and use it in `.md` files.

#### book.json

```json
"pluginsConfig": {
    "gitbook-plugin-signature":{
        "signature":{
            "key": "customized signature"
        }
    }
}
```

#### .md file

```markdown
{{'key'|signature}}
or the simplified version
{{'key'|s}}
```

---------------------

## Liscence

gitbook-plugin-signature is freely distributable under the terms of the [MIT license](https://github.com/popodidi/gitbook-plugin-signature/blob/master/LICENSE).

---------------------

## Change Log

### 1.4.2

- update `README.md`
- add simplified usage `{{'key'|s}}`

### 1.4.1

- update `package.json`, `README.md` and liscence

### 1.4.0

#### book.json

- add `signature`

#### .md file

- add `{{'key'|signature}}`

### 1.3.0

#### book.json

- remove ~~`"timeStampFormat" : "YYYY/MM/DD HH:mm:ss"`~~
- replace ~~`"copyright"`~~ by `"autoCopyright"`

#### .md file

- remove ~~`{{ 'Hao'|created}}`~~
- remove ~~`{{ 'Hao'|lastModified}}`~~
- remove ~~`**lastModifiedTimestamp**`~~
- remove ~~`{{ 'Hao'|copyright }}`~~
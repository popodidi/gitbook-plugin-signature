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
>
> # Title of the Article
>
> content<br>
> .<br>
> .<br>
> .<br>
> <br>
> <br>
>
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

If you don't want to automatically add timestamp or copyright, simply drop the part in `pluginsConfig`.

### Auto Timestamp
Default author of each article will be set to the last git commiter of the file.<br>

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

#### Set Author for Each Article

You can also set author of article manually.

```
{% set author = "Hao" %}
# Title of the Article

content
.
.
```

### Auto Copyright

```json
"pluginsConfig": {
      "gitbook-plugin-signature":{
          "autoCopyright":{
             "color":"gray",
             "owner":"Hao",
             "center":true
          }
      }
}
```
`autoCoyright.author` will be set to `book.author` if no specified.

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

```
{{'key'|signature}}
```

or the simplified version

```
{{'key'|s}}
```

---------------------

## Liscence

gitbook-plugin-signature is freely distributable under the terms of the [MIT license](https://github.com/popodidi/gitbook-plugin-signature/blob/master/LICENSE).

---------------------

## Change Log

### 1.5.0

Default author of each article is set to the last git committer of the file.
#### book.json
- remove ~~`autoTimeStamp.author`~~

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
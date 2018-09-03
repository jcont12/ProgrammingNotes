#Markdown

Markdown is a lightweight markup language with plain text formatting syntax. It is designed so that it can be converted to HTML and many other formats using a tool by the same name. Markdown is often used to *format readme files*, for writing messages in online discussion forums, and to create rich text using a plain text editor.


##Markdown CheatSheet   [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)


###Headers

There are 2 main different options to create Headers:

```
Through underlining (only works for <h1> and <h2> sizes)

Examples:

Hello World!  (h1)
============  

Hello World!  (h2)
------------

Using pound symbols depending on the number of <h> you want (1-6)
#h1
##h2
###h3
####h4
#####h5
######h6

```

###Emphasis (using bold, italics, etc)

In order to use bold and italics, you use asterisks or underscores.

```

**bold** or __bold__
*italics* or _italics_
~~scratched word~~

```


###Links

```

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")


```


###Horizontal Rule (Line)

Using 3 or more asterisks, underscores or hyphens

```
These
---
are all
***
horizontal lines
___

```

### Lists

You can have ordered or unordered lists. Ordered lists are simply using numbers. Unordered list use single asterisk:

```
1.- Something a
2.- Something b

* Unordered a
* Unordered b
```

###BlockQuotes

BlockQuotes look like an e-mail reply (basically different styled text):

```
> This is a blockquote
> More information on a blockquote

```

###Syntax Highlighting and inline code

One of the coolest tools of markdown is the syntax highlighting feature, which allows you to write blocks of code and specify the language it belongs to and it will format the code accordingly. However this feature is not part of the markdown spec, but still some renderers (like github) have it. 

```

First inline code: basically use a single back tick: `This would look like code`

As to syntax Higlighting (three back ticks and language of preference):

>	```javascript
> 		var s = "JavaScript syntax highlighting";
>		alert(s);
>	```

```



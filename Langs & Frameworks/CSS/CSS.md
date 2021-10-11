#CASCADING STYLE SHEETS (CSS)

### COLLAPSING MARGINS

(https://www.sitepoint.com/collapsing-margins/ "Collapsing Margins").

When the vertical margins of two elements are touching, only the margin of the element with the largest margin value will be honored, while the margin of the element with the smaller margin value will be collapsed to zero.
**Example:** one element has a 25px bottom margin and the element immediately underneath it has a 20px top margin, only the 25px bottom margin will be enforced, and the elements will remain at a distance of 25px from each other. They will not be 45px (25+20) apart, as might be expected.

In the case where one element has a negative margin, the margin values are added together to determine the final value.
**Example:** The bottom margin of an h1 element is a positive number (25px), and the top margin of a p element is a negative number (-20px). In this situation, the two numbers are added together to calculate the final margin: 25px + (-20px) = 5px.

If both are negative, the greater negative value is used. This definition applies to adjacent elements and nested elements.


There are other situations where elements do not have their margins collapsed:
* floated elements
* absolutely positioned elements
* inline-block elements
* elements with overflow set to anything other than visible (They do not collapse margins with their children.)
* cleared elements (They do not collapse their top margins with their parent block’s bottom margin.)
* the root element


### CHAINED SELECTORS

https://stackoverflow.com/questions/3772290/css-selector-that-applies-to-elements-with-two-

If you add two classes to an element separated by a space, you can specifically select this element by chaining the css selectors through dot notation with no spaces in between:

```css
* {
    color: black;
}

.foo.bar {
    color: red;
}
```

```html
<div class="foo">Hello Foo</div>       <!-- Not selected, black text [1] -->
<div class="foo bar">Hello World</div> <!-- Selected, red text [2] -->
<div class="bar">Hello Bar</div>       <!-- Not selected, black text [3] -->
```


### SPAN ELEMENTS

Span elements are inline elements. (for a great example on inline vs block elements: https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements)

A span element for obvious reasons has a display property of **inline**. Inline elements can only modify their spacing (margin/padding) horizontally, not vertically. To do so, you must add the `display: block` property, or in order to NOT loose the inline behavior, the `display:inline-block` property.


### CSS AMPERSAND

https://stackoverflow.com/questions/49401307/what-is-the-meaning-of-ampersand-in-selectors

The ampersand (& icon) In css in a nested element refers to its parent element

```css

//after
.button {
  body.page-about & { }
}

// actions
.button {
  &:visited { }
  &:hover { }
  &:active { }
}

//before
.parent {
  & .child {}
}
```


### DISPLAY CONTENTS

Sometimes because of nested divs/spans, there are elements that have children within children within children. The css value of `display:contents` allows you to "skip" an element so that the styling from the parent skips that element and applies to its children. For example, I was dealing with an "IconDiv" that was simply a colored div that contained an actual Icon within it. Because the Icon itself had a span within a span, the DOM structure of these elements was: IconDiv -> span -> span (where image to display in icon where). I wanted to center the elements within the icon, so I applied `display:flex` and `justify-content: center`, so that the child elements would center on that icon. But these only applied to the first span, so I had to add the same css styling to that child so that I could get its children to be centered. Obviously, creating a ladder of `display:flex` and `justify-content: center` to reach the final children was not optimal, so adding `display:contents` on the first child basically allowed the display and justify css styles to "skip" the first child and apply to this child's children, removing the need for a style ladder.
#Accessibility

There are Web Content and Accessibility Guidelines (WCAG) to follow and that can provide compliant status to companies. The main purpose of them is to make your content more accessible to everyone, especially people with disabilities.

A very helpful tool to assess your web page's accessibility: (Accessibility Insights)[https://accessibilityinsights.io].

###ARIA
Aria stands for Accessible Rich Internet Application. It's a markup that allows tools that provide access to people with disabilities to better understand the use of an html element. A quick example:

```html
<div role="alert">
	"Your progress has been saved"
</div>

// the role tag helps our user know that the text that popped up is an alert
```
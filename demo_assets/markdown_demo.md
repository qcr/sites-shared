# What is our Markdown Stack

We can still do all the standard basics of [CommonMark](https://commonmark.org/), but we extend it with [MDX](https://mdxjs.com/docs/what-is-mdx/). MDX allows us to add React components to our Markdown, and we'll see why that's useful by the end of this demonstration.

Here's some standard Markdown. With your basics like lists:

- item one
- two
- then three

And numbered:

1. With a
2. number
3. and so on

And some code:

```python
import sys

print(sys.path)
```

But there is a price for Markdown's simplicity. You quickly hit its limits when using it to communicate anything more than simple text. We often then end up forced to do one of the following:

- settle for something really ugly with reduced clarity in communication
- paste raw HTML code, hope it works, and fiddle around until something our Markdown engine supports

For example, lets try making a table with some details about a robot in pure Markdown:

| Guiabot     | Forced to have this | and this |
| ----------- | ------------------- | -------- |
| Description | GuiaBot is a robot  |          |

What a mess. Instead, we can communicate our information much more effectively through a JSX component. We can write it directly in our Markdown:

But our Markdown quickly becomes more code than simple text. We could have less code-in-text by instead importing components:

But this still isn't good enough. Replacing a solution with obscure syntax (pasting and tweaking raw HTML) with another obscure syntax (JSX) has changed the problem, not addressed it. The problem, being unable to express technical concepts clearly with a simple syntax, still needs us to put the simple syntax atop our MDX.

We use a mostly [logic-less](https://dev.to/cocoroutine/truth-about-template-engines-3a7) application of [Handlebars](https://handlebarsjs.com/guide/#what-is-handlebars) to create a simply syntax for inserting complex components. For example, the following:

```
{{ component <data> <component_name> }}
```

Will then turn into:

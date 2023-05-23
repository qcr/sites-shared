## What our Markdown Stack supports

We start with a renderer supporting the standard basics of [CommonMark](https://commonmark.org/), but extend it to meet our communication needs.

Current list of supported syntax extensions are:

- [GitHub Flavoured Markdown](https://github.github.com/gfm/) through [remark-gfm](https://github.com/remarkjs/remark-gfm)
- [MathJax](https://www.mathjax.org/) math support through [remark-math and rehype-mathjax](https://github.com/remarkjs/remark-math)
- YAML front matter through [remark-mdx-frontmatter](https://github.com/remcohaszing/remark-mdx-frontmatter)
- custom React components through [MDX](https://mdxjs.com/docs/what-is-mdx/).
- text templating using [HandlebarsJs](https://handlebarsjs.com/).

## Why complicate simple Markdown with all the extra mess?

With MDX and Handlebars text templating we can express powerful, customisable visual structures while still holding onto Markdown's spirit of simplicity. The text below walks through, why we need this and how we realise it.

### What Markdown already has

We all know the standard Markdown basics like lists:

- item one
- two
- then three

And numbered lists:

1. With a
2. number
3. and so on

And code blocks:

```python
import sys

print(sys.path)
```

### Where it all starts to fall down

But there is a price for Markdown's simplicity. You quickly hit its limits when using it to communicate anything more than simple text. We often then end up forced to do one of the following:

- settle for something really ugly with reduced clarity in communication
- paste raw HTML code, hope it works, and fiddle around until we find something our Markdown engine supports

For example, lets try making a table with some details about a robot in pure Markdown:

| Husky       | Forced to have this                                                                                               | and this                           |
| ----------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Description | Husky is a robot that does stuff                                                                                  | ![Robot](/example.jpg)             |
| Features    | Mobile navigation, RGBD camera, Laser, Outdoor operation (good luck getting this into a nicely formatted list...) | and can't merge with above cell... |

### JSX components to the rescue... mostly

Yuck. Instead, we can communicate our information much more effectively through a JSX component. We can write it directly in our Markdown:

```
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'

<TableContainer>
   <Table>
      <colgroup>
         <col width="15%" />
         <col width="35%" />
         <col width="50%" />
      </colgroup>
      <TableHead>
         <TableRow>
            <TableCell align="center" colSpan={3}>Husky</TableCell>
         </TableRow>
      </TableHead>
      <TableBody>
         <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Husky is a robot that does stuff</TableCell>
            <TableCell rowSpan={2}><img src="/example.jpg" /></TableCell>
         </TableRow>
         <TableRow>
            <TableCell>Features</TableCell>
            <TableCell><ul><li>Mobile navigation</li><li>RGBD camera</li><li>Laser</li><li>Outdoor operation</li></ul></TableCell>
         </TableRow>
      </TableBody>
   </Table>
</TableContainer>
```

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'

<TableContainer>
   <Table>
      <colgroup>
         <col width="15%" />
         <col width="35%" />
         <col width="50%" />
      </colgroup>
      <TableHead>
         <TableRow>
            <TableCell align="center" colSpan={3}>Husky</TableCell>
         </TableRow>
      </TableHead>
      <TableBody>
         <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Husky is a robot that does stuff</TableCell>
            <TableCell rowSpan={2}><img src="/example.jpg" /></TableCell>
         </TableRow>
         <TableRow>
            <TableCell>Features</TableCell>
            <TableCell><ul><li>Mobile navigation</li><li>RGBD camera</li><li>Laser</li><li>Outdoor operation</li></ul></TableCell>
         </TableRow>
      </TableBody>
   </Table>
</TableContainer>

But our Markdown quickly becomes more code than simple text. We could have less code-in-text by instead importing components:

```
import RobotTable from './component_demo'

<RobotTable name="Husky" description="Husky is a robot that does stuff" image="/example.jpg" features={["Mobile navigation", "RGBD camera", "Laser", "Outdoor operation"]}/>
```

import RobotTable from './component_demo'

<RobotTable name="Husky" description="Husky is a robot that does stuff" image="/example.jpg" features={["Mobile navigation", "RGBD camera", "Laser", "Outdoor operation"]}/>

But this still isn't good enough. It's still JSX, and anything beyond simple examples becomes messy (looping over data, passing data, linking data). Replacing a solution due to its obscure syntax (pasting and tweaking raw HTML) with another obscure syntax (JSX) has changed the problem, not addressed it. The problem, being unable to express technical concepts clearly with a simple syntax, still needs us to put the simple syntax atop our MDX.

### Returning to simplicity with HandlebarsJs text templating

We use a mostly [logic-less](https://dev.to/cocoroutine/truth-about-template-engines-3a7) application of [Handlebars](https://handlebarsjs.com/guide/#what-is-handlebars) to create a simple syntax for inserting complex components. For example, the following:

<pre><code>&#123;&#123;DemoRobotTable demo_robot&#125;&#125;</code></pre>

Will then turn into:

{{ DemoRobotTable demo_robot }}

Now we're back to the Markdown-like simplicity, but with significantly more expressitivity!

## Testing Third Party Handlebar Helpers
Access to all helpers defined [here](https://github.com/helpers/handlebars-helpers)

Some Data: {{my_field.some_data}}

If Equals Test

{{#eq my_field.some_data "Test"}}
- This should be displayed
{{/eq}}

{{#eq my_field.some_data "test"}}
- This should NOT be displayed
{{/eq}}



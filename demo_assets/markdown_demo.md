# What is our Markdown Stack

We can still do all the standard basics of [CommonMark](https://commonmark.org/), but we extend it with [MDX](https://mdxjs.com/docs/what-is-mdx/). MDX allows us to add React components to our Markdown, and we'll see why that's useful by the end of this demonstration.

We also enable [GitHub Flavoured Markdown](https://github.github.com/gfm/) through an MDX plugin to keep things as familiar as possible to the GitHub README experience.

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
- paste raw HTML code, hope it works, and fiddle around until we find something our Markdown engine supports

For example, lets try making a table with some details about a robot in pure Markdown:

| Husky       | Forced to have this                                                                                               | and this                           |
| ----------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Description | Husky is a robot that does stuff                                                                                  | ![Robot](/example.jpg)             |
| Features    | Mobile navigation, RGBD camera, Laser, Outdoor operation (good luck getting this into a nicely formatted list...) | and can't merge with above cell... |

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

We use a mostly [logic-less](https://dev.to/cocoroutine/truth-about-template-engines-3a7) application of [Handlebars](https://handlebarsjs.com/guide/#what-is-handlebars) to create a simple syntax for inserting complex components. For example, the following:

<pre><code>&#123;&#123;DemoRobotTable demo_robot&#125;&#125;</code></pre>

Will then turn into:

{{ DemoRobotTable demo_robot }}

The list of components available and what data they expect is documented ... TODO.

Here's some dummy examples:

List of features: {{ CsvString demo_robot.features }}

Lowercase robot name: {{ Lowercase demo_robot.name }}

Assignment 4 - Components: Redesigning A2 using React components
---

## The Jim

Dillon McCarthy<br>
GitHub Username: dmccarthy11<br>
https://a4-dillon-mccarthy.herokuapp.com/

For this assignment the greatest change was the design layout and development process.  With React, the HTML and JavaScript are combined into a single file.  I think this new technology hinders the development experience because it is more difficult to work with and there is a steeper learning curve.  Separate files make it clear what language is being used and what syntax should be followed in each file; the downside of this is that there is more code in the end.  With React there is less code, but without any prior experience to using React, the syntax was confusing at first.  Additionally, I found debugging to be slightly difficult because debugger statements can only be placed in certain spots.  For instance, there were some points I wanted to know what was rendering, but my render() function returns HTML which does not support debugger statements, but inside the HTML there are onClick() functions which use JavaScript, but it was not immediately obvious how to debug this.

Nonetheless, with more experience I can see how React would improve the development experience.  The component-based design and reactive programming is more suitable for more advanced applications and grants more capabilities to the designer.

Application Notes:
- To update an entry, the row number is indexed at 1, so 1 responds to the first element in the row.
- To remove an entry, an exact case-sensitive match is required, including any additional spaces included in the input form

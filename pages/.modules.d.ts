declare module '*?raw' {
  const content: string;
  export default content;
}

declare module '*.files' {
  const content: string[];
  export default content;
}

declare module '*.handlebars' {
  const content: string;
  export default content;
}

declare module '*.yaml' {
  const content: {[key: string]: any};
  export default content;
}

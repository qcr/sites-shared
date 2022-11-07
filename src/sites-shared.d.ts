declare module '*.js' {
  const content: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.md' {
  export const matter: {[key: string]: {}};
  const mdx: (props: MDXProps) => JSXElement;
  export default mdx;
}

// Workaround related to: https://github.com/vercel/next.js/issues/29788
// ... should be able to delete at some point in future ...
declare type StaticImageData = {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
};

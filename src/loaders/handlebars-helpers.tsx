import Handlebars, {HelperDeclareSpec} from 'handlebars';

const helpers: HelperDeclareSpec = {
  list: (ctx: string) => {
    const x = new Handlebars.SafeString('<emph>Emphasised text</emph>');
    console.log(x);
    return x;
  },
  /* list: (ctx: string) => 'hello', */
};

export default function addHelpers(hbs: typeof Handlebars) {
  hbs.registerHelper(helpers);
}

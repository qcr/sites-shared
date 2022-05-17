import type {ComponentDeclarations} from '../loaders/handlebars';

import CsvString from './csv_string';
import Lowercase from './lowercase';

const components: ComponentDeclarations = {
  CsvString: {
    substitute: (args) => <CsvString strings={args[0]} />,
    render: (props) => <CsvString {...(props as any)} />,
  },
  Lowercase: {
    substitute: (args) => <Lowercase string={args[0]} />,
    render: (props) => <Lowercase {...(props as any)} />,
  },
};

export default components;

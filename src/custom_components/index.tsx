import type {ComponentDeclarations} from '../loaders/handlebars';

import CsvString from './csv_string';
import Lowercase from './lowercase';

const components: ComponentDeclarations = {
  CsvString: {
    substitute: (data) => <CsvString strings={data} />,
    render: (props) => <CsvString {...(props as any)} />,
  },
  Lowercase: {
    substitute: (data) => <Lowercase string={data} />,
    render: (props) => <Lowercase {...(props as any)} />,
  },
};

export default components;

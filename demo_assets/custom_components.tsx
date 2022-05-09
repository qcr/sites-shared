import {ComponentDeclarations} from 'lib/loaders/handlebars-helpers';

import DemoRobotTable from './component_demo';

const components: ComponentDeclarations = {
  DemoRobotTable: {
    substitute: (data) => <DemoRobotTable {...data} />,
    render: (props) => <DemoRobotTable {...(props as any)} />,
  },
};

export default components;

import {ComponentDeclarations} from 'lib/loaders/handlebars';

import DemoRobotTable from './component_demo';

const components: ComponentDeclarations = {
  DemoRobotTable: {
    substitute: (args) => <DemoRobotTable {...args[0]} />,
    render: (props) => <DemoRobotTable {...(props as any)} />,
  },
};

export default components;

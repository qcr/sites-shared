import {ComponentDeclarations} from 'lib/loaders/handlebars-helpers';

import DemoRobotTable from './component_demo';

const components: ComponentDeclarations = {
  DemoRobotTable: (ctx: any) => <DemoRobotTable {...ctx} />,
};

export default components;

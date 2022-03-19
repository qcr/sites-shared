import {ComponentDeclarations} from 'lib/loaders/handlebars-helpers';

import RobotTable from './component_demo';

const components: ComponentDeclarations = {
  DemoRobotTable: (ctx: any) => <RobotTable {...ctx} />,
};

export default components;

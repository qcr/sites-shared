import {ComponentDeclarations} from 'lib/loaders/handlebars-helpers';

import DemoComponent from './component_demo';

const components: ComponentDeclarations = {
  DemoRobotTable: (ctx: any) => <DemoComponent {...ctx} />,
};

export default components;

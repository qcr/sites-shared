import {ComponentDeclarations} from 'lib/loaders/handlebars-helpers';

import RobotTable from './component_demo';

const components: ComponentDeclarations = {
  RobotTable: (ctx: any) => <RobotTable />,
};

export default components;

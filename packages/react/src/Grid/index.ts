import assign from 'lodash/assign';

import { Grid as GridComponent, GridRoot, GridContent } from './components';

export const Grid = assign(GridComponent, {
  Root: GridRoot,
  Content: GridContent,
});

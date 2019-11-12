
import * as query from "./query";
import * as common from './common'
import * as cookies from './cookie'
const utils = {
  ...query,
  ...common,
  ...cookies
};
export = utils;

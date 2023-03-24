import dayjs from "dayjs";

import "dayjs/locale/zh-cn";

import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";

dayjs.locale("zh-cn");

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
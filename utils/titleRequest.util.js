import {TITLE_REQUEST_LIST} from "@/constants";

export const getRequestLabel = (value) => {
  const item = TITLE_REQUEST_LIST.find(t => t.value === value)
  return item ? item.label : ''
}

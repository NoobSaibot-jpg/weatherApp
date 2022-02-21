import {useTitle} from 'react-use';
import { memo } from 'react';


export default memo(
  function Title(temp) {
    useTitle(temp.temp)
  return null
  }
)

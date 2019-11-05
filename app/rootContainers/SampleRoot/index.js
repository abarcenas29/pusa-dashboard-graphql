import React, { Fragment } from 'react'
import { Switch, Link } from 'react-router-dom'

import RouteWithSubroutes from 'Components/RouteWithSubRoutes'

const SampleRoot = ({routes, match}) => {
  const { isExact } = match
  return (
    <div className='l-d-b'>
      <div>
        This is a Root Page for various pages that share the same base look like dashboard menus.
      </div>
      {
        isExact &&
        <Fragment>
          <div>
            <ul>
              <li><Link to='/sample-root/page1'>Sub Page 1</Link></li>
            </ul>
          </div>
          <p>Show the parent content of the root container</p>
        </Fragment>
      }
      {
        !isExact &&
        <div>
          <Switch>
          {
            (routes.map((r, i) => <RouteWithSubroutes key={i} {...r}  />))
          }
          </Switch>
        </div>
      }
    </div>
  )
}

export default SampleRoot

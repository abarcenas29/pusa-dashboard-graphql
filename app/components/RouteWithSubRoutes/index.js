import React from 'react'
import { Route } from 'react-router-dom'

const RouteWithSubroutes = route => (
  <Route
    path={route.path}
    render={props => {
      if (route.render) {
        return route.render(props)
      }
      return <route.component {...props} routes={route.routes} />
    }}
  />
)

export default RouteWithSubroutes

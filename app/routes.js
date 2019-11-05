import { lazy } from 'react'

const LoadHome = lazy(() => import('Containers/Home' /* webpackChunkName: "Container-Home" */))

const routes = [
  {
    path: '/',
    component: LoadHome,
    exact: true
  }
]

export default routes

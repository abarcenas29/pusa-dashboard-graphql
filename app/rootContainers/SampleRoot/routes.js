import { lazy } from 'react'

const LoadSubPage1 = lazy(() => import('Containers/SubPage1') /* webpackChunkName: "Container-Subpage1" */)

export default [
  {
    path: '/sample-root/page1',
    component: LoadSubPage1
  }
]


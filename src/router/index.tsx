import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import HotVideo from '@/container/Hot'
import Comic from '@/container/Comic'
import Teachnology from '@/container/Teachnology'
import NotFound from '@/container/NotFound'
import AnimatedSwitch from './Animation';

const Routes: React.SFC = () => (
  <AnimatedSwitch>
    <Redirect exact from="/" to="/hot" />
    <Route exact path="/hot" component={HotVideo}></Route>
    <Route exact path="/comic" component={Comic}></Route>
    <Route exact path="/teachnology" component={Teachnology}></Route>
    <Route component={NotFound}></Route>
  </AnimatedSwitch>
)

export default Routes

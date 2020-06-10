import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Switch } from 'react-router-dom'
import '@/style/animation.scss'

const AnimatedSwitch: React.SFC = (props) => {
  const { children } = props
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames={'slide-fade'}
            timeout={300}
          >
            <Switch location={location}>{children}</Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  )
}

export default AnimatedSwitch

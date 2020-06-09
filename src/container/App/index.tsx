import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import TabBar from '@/components/TabBar'
import Routes from '@/router/index.tsx'
import './index.scss'

export default class App extends React.Component {
  render(): React.ReactElement {
    return (
      <div className="entry">
        <Router>
          <Routes />
          <TabBar />
        </Router>
      </div>
    )
  }
}

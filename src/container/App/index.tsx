import * as React from 'react'
import NavBar from '@/components/TabBar'
import './index.scss'
interface IAttrObject {
  name: string
  type: number
  url?: string
}
interface IState {
  list: Array<IAttrObject>
}
export default class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      list: [
        {
          name: '最热',
          type: 1,
        },
        {
          name: '二次元',
          type: 2,
        },
        {
          name: '爱情',
          type: 3,
        },
      ],
    }
  }
  render() {
    return (
      <div className="entry">
        <NavBar list={this.state.list} />
      </div>
    )
  }
}

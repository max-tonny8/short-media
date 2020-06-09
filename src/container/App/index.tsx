import * as React from 'react'
import NavBar from '@/components/NavBar'
import TabBar from '@/components/TabBar'
import './index.scss'
interface IAttrObject {
  name: string
  type: number
  url?: string
}
interface IState {
  list: Array<IAttrObject>
  tabList: Array<IAttrObject>
}
export default class App extends React.Component<{}, IState> {
  public state = {
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
        name: '科技',
        type: 3,
      },
      {
        name: '我',
        type: 4,
      },
    ],
    tabList: [
      {
        name: '关注',
        type: 1,
      },
      {
        name: '推荐',
        type: 2,
      },
    ],
  }
  render(): React.ReactElement {
    return (
      <div className="entry">
        <NavBar tabList={this.state.tabList} />
        <TabBar list={this.state.list} />
      </div>
    )
  }
}

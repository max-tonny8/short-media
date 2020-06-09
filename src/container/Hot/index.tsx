import * as React from 'react'
import './index.scss'
import NavBar from '@/components/NavBar'
interface IAttrObject {
  name: string
  type: number
  url?: string
}
interface IState {
  tabList: Array<IAttrObject>
}
export default class HotVideo extends React.Component<{}, IState> {
  public state = {
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
      <div className="hot-video-wrapper">
        <NavBar tabList={this.state.tabList} />
      </div>
    )
  }
}

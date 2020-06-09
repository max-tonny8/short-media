import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import './index.scss'
interface IAttrObject {
  name: string
  type: number
  pathname: string
  url?: string
}
interface IState {
  activeName: number
  list: Array<IAttrObject>
}
class TabBar extends React.Component<RouteComponentProps, IState> {
  public state = {
    activeName: 1,
    list: [
      {
        name: '最热',
        pathname: '/hot',
        type: 1,
      },
      {
        name: '二次元',
        pathname: '/comic',
        type: 2,
      },
      {
        name: '科技',
        pathname: '/teachnology',
        type: 3,
      },
      {
        name: '我',
        pathname: '/mine',
        type: 4,
      },
    ],
  }
  private updateActiveName(
    event: React.MouseEvent<HTMLLIElement>,
    activeName: number
  ) {
    const pathname: IAttrObject | any = this.state.list.find(
      (item) => item.type === activeName
    )
    this.setState(
      {
        activeName,
      },
      () => {
        this.props.history.push(pathname['pathname'])
      }
    )
  }
  render(): React.ReactNode {
    const lists = this.state.list
    return (
      <ul className="tab-bar-wrapper">
        {lists.map((item, index) => {
          return (
            <li
              className="nav-item"
              onClick={(event) => this.updateActiveName(event, item.type)}
            >
              {item.name}
            </li>
          )
        })}
      </ul>
    )
  }
}
export default withRouter(TabBar)

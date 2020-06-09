import * as React from 'react'
import './index.scss'

type IAttrObject = {
  name: string
  type: number
  url?: string
}
interface IProps {
  tabList: Array<IAttrObject>
}
interface IState {
  activeName: number
}
export default class NavBar extends React.Component<IProps, IState> {
  public state = {
    activeName: 2,
  }
  private updateActiveName(
    event: React.MouseEvent<HTMLLIElement>,
    activeName: number
  ) {
    this.setState({
      activeName,
    })
  }
  render(): React.ReactNode {
    const lists = this.props.tabList
    return (
      <ul className="nav-bar-wrapper">
        {lists.map((item, index) => {
          return (
            <li
              className={`nav-item ${
                item.type === this.state.activeName ? 'active' : ''
              }`}
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

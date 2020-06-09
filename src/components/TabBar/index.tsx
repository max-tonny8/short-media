import * as React from 'react'
import './index.scss'

type IAttrObject = {
  name: string
  type: number
  url?: string
}
interface IProps {
  list: Array<IAttrObject>
}
interface IState {
  activeName: number
}
export default class TabBar extends React.Component<IProps, IState> {
  public state = {
    activeName: 1,
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
    const lists = this.props.list
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

import * as React from 'react'
import './index.scss'
import NavBar from '@/components/NavBar'

import { getVideoList } from '@/api/index.ts'
interface IAttrObject {
  name: string
  type: number
  url?: string
}
interface IState {
  tabList: Array<IAttrObject>
  videoData: {
    videoUrl: string
    imgUrl: string
  }
}
export default class HotVideo extends React.Component<{}, IState> {
  public state: Readonly<IState> = {
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
    videoData: { videoUrl: '', imgUrl: '' },
  }
  public componentDidMount() {
    this.getVideoData()
  }
  private getVideoData(): void {
    getVideoList({ msg: 1 }).then((res) => {
      const data = res.data.match(
        /https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4|jpg))/gi
      )
      const videoData = {
        imgUrl: data[0],
        videoUrl: data[1],
      }
      this.setState({
        videoData: videoData,
      })
    })
  }
  render(): React.ReactElement {
    const { videoUrl, imgUrl } = this.state.videoData
    return (
      <div className="hot-video-wrapper">
        <NavBar tabList={this.state.tabList} />
        <video
          src={videoUrl}
          poster={imgUrl}
          autoPlay
          onEnded={() => this.getVideoData()}
          className="video-player"
        ></video>
      </div>
    )
  }
}

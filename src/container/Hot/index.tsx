import * as React from 'react'
import './index.scss'
import NavBar from '@/components/NavBar'
import VideoItem from '@/components/VideoItem'
import { getVideoList } from '@/api/index.ts'

interface IAttrObject {
  name: string
  type: number
  url?: string
}
interface IVideoAttr {
  videoUrl: string
  imgUrl: string
}
interface IState {
  tabList: Array<IAttrObject>
  videoList: Array<IVideoAttr>
  currentSrc: string
  scrollRef: any
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
    videoList: [],
    currentSrc: '',
    scrollRef: React.createRef(),
  }
  public componentWillMount() {
    this.getVideoData()
  }
  public componentDidMount() {
    let observerVideo = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio === 1) {
            //  设置currentSrc
            const node = entry.target as HTMLImageElement
            console.log(`node is ============> ${JSON.stringify(node.src)}`)
            this.setCurPlaySrc(node.src)
            return
          }
        })
      },
      {
        root: document.getElementById('scrollView'),
        threshold: 1,
      }
    )
    setTimeout(() => {
      document
      .querySelectorAll('.video-player')
      .forEach((video) => observerVideo.observe(video))
    },1000)

    // console.log(document
    //   .querySelectorAll('.video-player'))
    console.log(`执行完毕 interSection observer`)
  }
  private setCurPlaySrc(src: string): void {
    this.setState({
      currentSrc: src,
    })
  }
  private getVideoData(): void {
    getVideoList({ msg: 1 }).then((res) => {
      const data = res.data.match(
        /https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4|jpg))/gi
      )
      const videoList: Array<IVideoAttr> = JSON.parse(
        JSON.stringify(this.state.videoList)
      )
      videoList.push({
        imgUrl: data[0],
        videoUrl: data[1],
      },{
        imgUrl: data[0],
        videoUrl: data[1],
      })
      this.setState({
        videoList: videoList,
      })
    })
  }
  protected translateParent(): void {
    const parent: HTMLDivElement = this.state.scrollRef.current
    const clientHeight: string = parent.getBoundingClientRect().height + 'px'
    console.log('121')
  }
  render(): React.ReactElement {
    const { videoList } = this.state
    return (
      <div className="hot-video-wrapper">
        <NavBar tabList={this.state.tabList} />
        <div
          className="player-wrapper"
          id="scrollView"
          ref={this.state.scrollRef}
        >
          {videoList.map((item, index) => {
            return (
              <VideoItem
                {...item}
                currentSrc={this.state.currentSrc}
                getVideoData={this.getVideoData}
                translateParent={this.translateParent}
                key={item.videoUrl}
              ></VideoItem>
            )
          })}
        </div>
      </div>
    )
  }
}

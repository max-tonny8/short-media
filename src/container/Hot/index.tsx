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
}
export default class HotVideo extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.scrollRef = React.createRef()
  }
  private scrollRef: any
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
            const node = entry.target as HTMLVideoElement
            console.log(`node is ============> ${JSON.stringify(node.src)}`)
            this.setCurPlaySrc(node.src)
            return
          }
          this.setCurPlaySrc('')
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
    }, 1000)
  }
  private setCurPlaySrc(src: string): void {
    this.setState({
      currentSrc: src,
    })
  }
  public getVideoData = () => {
    getVideoList({ msg: 2 }).then((res) => {
      const data = res.data.match(
        /https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4|jpg))/gi
      )
      const videoList: Array<IVideoAttr> = JSON.parse(
        JSON.stringify(this.state.videoList)
      )

      videoList.push({
        imgUrl: data[0],
        videoUrl: data[1],
      })
      this.setState({
        currentSrc: data[1],
        videoList: videoList,
      })
    })
  }
  protected translateParent = () => {
    const parent: HTMLDivElement = this.scrollRef.current
    const clientHeight: string = parent.getBoundingClientRect().height + 'px'
    parent.style.transform = `translateY(0, -${clientHeight}, 0)`
  }
  render(): React.ReactElement {
    const { videoList } = this.state
    return (
      <div className="hot-video-wrapper">
        <NavBar tabList={this.state.tabList} />
        <div className="player-wrapper" id="scrollView" ref={this.scrollRef}>
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

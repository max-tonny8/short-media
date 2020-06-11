import * as React from 'react'
import './index.scss'

interface IProps {
  videoUrl: string
  imgUrl: string
  currentSrc: string
  getVideoData: () => void
  translateParent: () => void
}

export default class VideoItem extends React.Component<IProps, {}> {
  private videoRef: any
  constructor(props: IProps) {
    super(props)
    this.videoRef = React.createRef()
  }
  public componentDidUpdate(nextProps: IProps, nextState: any) {
    console.log(`执行 ${nextProps.currentSrc}`)
    console.log(`-- ${nextProps.videoUrl}}`)
    console.log(`${nextProps.currentSrc == nextProps.videoUrl}`)
    if (nextProps.currentSrc && nextProps.currentSrc === nextProps.videoUrl) {
      this.videoRef.current.play()
    }
  }
  private videoEnd(): void {
    this.props.getVideoData()
    this.props.translateParent()
  }
  render(): React.ReactElement {
    const { videoUrl, imgUrl } = this.props
    return (
      <video
        className="video-player"
        ref={this.videoRef}
        src={videoUrl}
        poster={imgUrl}
        onEnded={() => this.videoEnd()}
      ></video>
    )
  }
}

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
        autoPlay={false}
        ref={this.videoRef}
        src={videoUrl}
        loop={false}
        poster={imgUrl}
        onEnded={() => this.videoEnd()}
      ></video>
    )
  }
}

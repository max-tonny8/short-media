import * as React from 'react'
import notfound from '@/assets/notfound.svg'
import './index.scss'

const NotFound: React.SFC = () => (
  <div className="not-found-wrapper">
    <img src={notfound} className="not-found"/>
    <div className="not-found-tips">未找到匹配的链接哟~</div>
  </div>
)

export default NotFound

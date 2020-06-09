import * as React from 'react'
import notfound from '@/assets/notfound.svg'
import './index.scss'

const NotFound: React.SFC = () => (
  <div className="not-found-wrapper">
    <img src={notfound} className="not-found"/>
    <div className="not-found-tips">二次元</div>
  </div>
)

export default NotFound

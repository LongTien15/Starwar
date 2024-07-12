import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import './loading.style.scss'

export default function Loading() {
  return (
    <div className="loading">
      <Spin
        className="loading__spinner"
        indicator={<LoadingOutlined style={{ fontSize: '40px' }} />}
        size="large"
      />
    </div>
  )
}

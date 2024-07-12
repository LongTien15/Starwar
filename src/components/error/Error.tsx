import { Button } from 'antd'
import './Error.style.scss'

export default function Error() {
  const retry = () => {
    window.location.reload()
  }

  return (
    <div className="wrapper">
      <div className="wrapper__error">
        <p className="wrapper__error__title">
          Something wrong. Please try again
        </p>
        <Button
          onClick={retry}
          className="wrapper__error__button"
          size="large"
          type="primary"
        >
          Retry
        </Button>
      </div>
    </div>
  )
}

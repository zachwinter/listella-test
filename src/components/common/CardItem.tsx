import styles from './CardItem.module.scss'
import cn from 'classnames'

export default ({ children, ...rest }: any) => (
  <div className={cn({ [styles['card-item']]: true, [rest.className || '']: true })}>
    { children }
  </div>
)
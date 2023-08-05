import Toggle from '@/components/common/Toggle';
import styles from './UserMode.module.scss';
import { useGlobalState } from '@/store';
import cn from 'classnames';

export default () => {
  const [userMode, setUserMode] = useGlobalState('user.mode');

  return (
    <div className={styles.mode}>
      <strong
        className={cn({ [styles.active]: userMode === 'BUY' })}
        onClick={() => setUserMode('BUY')}
      >
        Buy
      </strong>

      <Toggle
        value={userMode === 'SELL'}
        update={(e:any) => {
          setUserMode(e ? 'SELL' : 'BUY');
        }}
      />

      <strong
        className={cn({ [styles.active]: userMode === 'SELL' })}
        onClick={() => setUserMode('SELL')}
      >
        Sell
      </strong>
    </div>
  );
};

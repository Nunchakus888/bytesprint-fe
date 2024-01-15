import styles from './index.module.scss';
import Link from 'next/link';
import classNames from 'classnames';
import { Button } from '@chakra-ui/react';

export default function ErrorPage() {
  return (
    <div className={styles['error-page']}>
      <div className={styles.error}>
        <div className={styles.number}>4</div>
        <div className={styles.illustration}>
          <div className={styles.circle}></div>
          <div className={styles.clip}>
            <div className={styles.paper}>
              <div className={styles.face}>
                <div className={styles.eyes}>
                  <div className={classNames(styles.eye, styles['eye-left'])}></div>
                  <div className={classNames(styles.eye, styles['eye-right'])}></div>
                </div>
                <div className={classNames(styles.rosyCheeks, styles['rosyCheeks-left'])}></div>
                <div className={classNames(styles.rosyCheeks, styles['rosyCheeks-right'])}></div>
                <div className={styles.mouth}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.number}>4</div>
      </div>

      <div className={styles.text}>{`Oops. The page you're looking for doesn't exist.`}</div>
      <Link href={'/'}>
        <Button className={classNames('theme-button', 'mt-8')} style={{ width: '200px' }}>
          Back Home
        </Button>
      </Link>
    </div>
  );
}

import { useState } from 'react';
import logo from '@/assets/logo.png';
import styles from './index.module.css';
import EchartsControl from '@/utils/echarts/EcahrtsControl'
export default function IndexPage() {
  const [count, setCount] = useState(1);
  const updateCount = () => setCount((c) => c + 1);
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  return (
    <div className={styles.app}>
      <header>
        <img src={logo} alt="logo" />
        <p>
          Hello ice.js 3
        </p>
      </header>
      <main>
        <button className={styles.button} type="button" onClick={updateCount}>
          👍🏻 {count}
        </button>
        <p>
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Learn React
          </a>
          {' | '}
          <a
            href="https://v3.ice.work/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Learn ice.js
          </a>

          <div style={{ height: 300, width: 400}}>
            <EchartsControl options={option}></EchartsControl>
          </div>
        </p>
      </main>
    </div>
  );
}

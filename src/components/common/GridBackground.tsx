import { useState, forwardRef, useImperativeHandle, type Ref } from 'react';
import styles from './GridBackground.module.scss';
import cn from 'classnames';
import { interpolateRgb } from 'd3-interpolate';

const iCol = interpolateRgb(`rgb(245, 245, 245)`, `rgb(55, 182, 255)`);
const pat = () => 15 + 30 * Math.random();

export default forwardRef(({ active }: any, ref: Ref<any>) => {
  const [pattern, setPattern] = useState(0);
  const gridClasses = cn({
    [styles.grid]: styles.grid,
    [styles.active]: active,
  });

  useImperativeHandle(
    ref,
    () =>
      ({
        setPattern() {
          setPattern(pat());
        },
      } as any),
    []
  );

  return (
    <div className={gridClasses}>
      {new Array(72).fill(0).map((_: any, i: number) => {
        const background = iCol(
          (pattern * Math.sin((i * pattern) / 50) -
            pattern * Math.cos((i / 2.5) * pattern)) /
            (8 * 16)
        );

        const style = {
          background,
        };

        return <div key={i} style={style}></div>;
      })}
    </div>
  );
});

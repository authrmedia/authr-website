'use client';
import { beltImages } from '../data/clients';

export default function Belt() {
  const doubled = [...beltImages, ...beltImages];
  return (
    <div className="belt-wrap">
      <div className="belt-track">
        {doubled.map((src, i) => (
          <div className="belt-cell" key={i}>
            <img src={src} alt="" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

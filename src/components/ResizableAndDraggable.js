import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const ResizableAndDraggable = ({ initialSize, initialPosition, onLayoutChange, scale, children }) => {
  const [rndSize, setRndSize] = useState(initialSize);
  const [rndPosition, setRndPosition] = useState(initialPosition);

  const handleResize = (e, direction, ref, delta, position) => {
    const newSize = {
      width: ref.style.width,
      height: ref.style.height,
    };
    setRndSize(newSize);
  };

  const handleDrag = (e, d) => {
    setRndPosition({ x: d.x, y: d.y });
  };

  return (
    <Rnd
      className='border-[1px] border-white-400 bg-slate-100/50 rounded-md   h-full'
      bounds="parent"
      draggable
      lockAspectRatio={false}
      // onLayoutChange={onLayoutChange}
      onResize={handleResize}
      onDrag={handleDrag}
      resizeHandleStyles={{
        bottomRight: {
          bottom: '20px',
          right: '10px',
          cursor: 'bottom',
          width: '16px',
          height: '16px',
        },
      }}
      size={{
        width: rndSize.width * scale,
        height: rndSize.height * scale,
      }}
      position={rndPosition}
    >
      {children}
    </Rnd>
  );
};

export default ResizableAndDraggable;

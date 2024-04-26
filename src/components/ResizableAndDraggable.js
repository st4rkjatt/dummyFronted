import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const ResizableAndDraggable = ({ initialSize, initialPosition, onLayoutChange, scale, children }) => {
  // State to manage the size of the resizable component
  const [rndSize, setRndSize] = useState(initialSize);

  // State to manage the position of the draggable component
  const [rndPosition, setRndPosition] = useState(initialPosition);

  // Function to handle resizing of the component
  const handleResize = (e, direction, ref, delta, position) => {
    // Update the size state based on the new size
    const newSize = {
      width: ref.style.width,
      height: ref.style.height,
    };
    setRndSize(newSize);
  };

  // Function to handle dragging of the component
  const handleDrag = (e, d) => {
    // Update the position state based on the new position
    setRndPosition({ x: d.x, y: d.y });
  };

  return (
    <Rnd
      className='border-[1px] border-white-400 bg-slate-100/50 rounded-md h-full'
      bounds="parent"
      draggable
      lockAspectRatio={false}
      // onLayoutChange={onLayoutChange} // You can uncomment this if needed
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
        // Adjust size based on the scale factor
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

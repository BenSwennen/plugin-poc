import React, { useRef } from 'react';
import { usePlugin } from './usePlugin';

export function App () {
  const plugin = useRef<HTMLDivElement>(null);

  const { reload } = usePlugin(plugin)

  return (
    <div style={{ padding: "40px" }}>
      <h1>Skedify Plugin</h1>
      <button onClick={reload}>Load</button>
      <div className="skedify-plugin" id="skedify-plugin-wrapper" ref={plugin} />
    </div>
  )
};
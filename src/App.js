import "./App.scss";
import CodeEditor from "./components/CodeEditor";
import StatusBar from "./components/StatusBar";
import TopNav from "./components/TopNav";

import React, {useState} from 'react';
import CodeInterpreter from "./helpers/CodeInterpreter";

let ci = new CodeInterpreter();

export default function App() {
  let isRunning = false;
  const [setupCode, setSetupCode] = useState([
    "size $width $height",
    "framerate auto",
    "define bg #000000",
    "define fg #FFFFFF",
    "define test 100",
    "define test2 400 400"
  ].join("\n"));
  const [frameCode, setFrameCode] = useState([
    "strokecolor fg",
    "backgroundcolor bg",
    "backgroundcolor #232323",
    "line test test test2 test2"
  ].join("\n"));


  const handleRun = () => {
    isRunning=true;
    ci.interpretCode(setupCode);
    const _framefunc = () => {
      if(!isRunning)return;
      ci.interpretCode(frameCode);
      window.requestAnimationFrame(_framefunc);
    };
    _framefunc();
  };

  const handleStop = () => {
    isRunning=false;
  };

  return (
    <div className="App">
      <TopNav onRun={handleRun} onStop={handleStop} onMemdump={()=>{ console.table(ci.memory)}}/>
        <canvas id="canvas"></canvas>
        <div className="codeEditorWrapper">
          <span className="header">Setup:</span>
          <CodeEditor onChange={e=>{setSetupCode(e);}} value={setupCode} />
          <span className="header">Frame:</span>
          <CodeEditor onChange={e=>{setFrameCode(e);}} value={frameCode} />
        </div>
      <StatusBar />
    </div>
  );
}

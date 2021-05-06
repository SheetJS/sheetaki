import './App.css';
import React, { useState } from 'react';
import logo from './assets/logo.png'
import Proxy from './Features/Data/Data';
import Upload from './Features/Upload/Upload';
import Save from './Features/Save/Save'
import ReadWorkbook from './Features/ReadWorkbook/ReadWorkbook';

function App() {
  const [active, setActive] = useState('proxy');

  return (
    <div className="App">
      <div className="headerBar">
        <a href="https://sheetjs.com/"><img src={logo} className="logo" alt="logo" /></a>
        <h2 className="title" style={{paddingTop:"15px"}}>SheetJS Spreadsheet Conversion Service</h2>
      </div>
      <div className="container">
        <div className="bar">
          {active == 'proxy'?
            <div className="barSection" style={{ borderRight: "solid #B5B5B5 1px", background:'#77E2B6' }} onClick={(() => setActive('proxy'))}>
              <h2>Read</h2>
            </div>
            :
            <div className="barSection" style={{ borderRight: "solid #B5B5B5 1px" }} onClick={(() => setActive('proxy'))}>
              <h2>Read</h2>
            </div>
          }
          {active == 'upload'?
            <div className="barSection" style={{ background: '#77E2B6' }} onClick={(() => setActive('upload'))}>
              <h2>Upload</h2>
            </div>
            :
            <div className="barSection" onClick={(() => setActive('upload'))}>
              <h2>Upload</h2>
            </div>
          }
          {active == 'save'?
            <div className="barSection" onClick={(() => setActive('save'))} style={{ borderLeft: "solid #B5B5B5 1px", background: '#77E2B6' }}>
              <h2>Save</h2>
            </div>
            :
            <div className="barSection" onClick={(() => setActive('save'))} style={{ borderLeft: "solid #B5B5B5 1px" }}>
              <h2>Save</h2>
            </div>
          }
        </div>
        <div className="demo">
          {active == 'proxy' &&
            <Proxy />
          }
          {active == 'workbook' &&
            <ReadWorkbook/>
          }
          {active == 'upload'&&
            <Upload/>
          }
          {active == 'save' &&
            <Save/>
          }
        </div>
      </div>
      <footer style={{justifyContent:'left', width:'80%', margin:'auto'}}>
        <b style={{ textAlign: 'left', width: '5018%', margin: 'auto' }}>Source Code:</b>
        <ol style={{ textAlign: 'left', width: '18%', margin:'auto' }}>
          <li style={{padding:'0px'}}>
            <a href="https://github.com/SheetJS/sheetaki">Source code for this service</a>
          </li>
          <li>
            <a href="https://github.com/SheetJS/sheetjs">Source code for the SheetJS spreadsheet library</a>
          </li>
        </ol>
      </footer>
    </div>
  );
}

export default App;

import React from "react";
import { createGlobalStyle } from "styled-components";
import { createPdfFromHtml } from "./logic";

const Global = createGlobalStyle`
  /* paper.css */
  https://github.com/cognitom/paper-css

  /* @page { margin: 0 } */
  #print {
    margin: 0;
    font-family: "IPAexGothic", sans-serif;
  }

  .sheet {
    margin: 0;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    page-break-after: always;
  }
  
  
  /** Paper sizes **/
  #print.A3               .sheet { width: 297mm; height: 419mm }
  #print.A3.landscape     .sheet { width: 420mm; height: 296mm }
  #print.A4               .sheet { width: 210mm; height: 296mm }
  #print.A4.landscape     .sheet { width: 297mm; height: 209mm }
  #print.A5               .sheet { width: 148mm; height: 209mm }
  #print.A5.landscape     .sheet { width: 210mm; height: 147mm }
  #print.letter           .sheet { width: 216mm; height: 279mm }
  #print.letter.landscape .sheet { width: 280mm; height: 215mm }
  #print.legal            .sheet { width: 216mm; height: 356mm }
  #print.legal.landscape  .sheet { width: 357mm; height: 215mm }
  
  /** Padding area **/
  .sheet.padding-10mm { padding: 10mm }
  .sheet.padding-15mm { padding: 15mm }
  .sheet.padding-20mm { padding: 20mm }
  .sheet.padding-25mm { padding: 25mm }
  
  /** For screen preview **/
  @media screen {
    body {
      background: #E0E0E0;
      height: 100%;
    }
    .sheet {
      background: #FFFFFF;
      /*
      */
      padding: 15.0mm;
    }
  }
  
  /** Fix for Chrome issue #273306 **/
  @media print {
    #print.A3.landscape            { width: 420mm }
    #print.A3, #print.A4.landscape { width: 297mm }
    #print.A4, #print.A5.landscape { width: 210mm }
    #print.A5                      { width: 148mm }
    #print.letter, #print.legal    { width: 216mm }
    #print.letter.landscape        { width: 280mm }
    #print.legal.landscape         { width: 357mm }
  }
`;

export class PrintPage extends React.Component {
  printContent;
  render() {
    return (
      <>
        <Global />
        <button style={{ margin: 30, fontSize: 20, borderRadius: 5, padding: 10 }} onClick={this.handleClick}>印刷プレビューを表示</button>
        <div id="print" className="A4">
          <Sheet />
          <div 
          style={{ position: "fixed", top: "200vh" }}
          >
            <div
              ref={el => {
                this.printContent = el;
              }}
            >
              <Sheet />
            </div>
          </div>
        </div>
      </>
    );
  }

  handleClick = () => {
    createPdfFromHtml(this.printContent);
  };
}
const data =
[
  {
    "id": 1,
    "cdcstm": 23232323,
    "nmcstm": "毛利　竹志",
    "postalcode": "150-0001",
    "addr1": "東京都渋谷区神宮前4-24-9"
  },
  {
    "id": 2,
    "cdcstm": 24242424,
    "nmcstm": "毛利　竹志2",
    "postalcode": "150-0001",
    "addr1": "東京都渋谷区神宮前4-24-9"
  },
  // {
  //   "id": 3,
  //   "cdcstm": 25252525,
  //   "nmcstm": "毛利　竹志3",
  //   "postalcode": "150-0001",
  //   "addr1": "東京都渋谷区神宮前4-24-9"
  // },
  // {
  //   "id": 4,
  //   "cdcstm": 26262626,
  //   "nmcstm": "毛利　竹志4",
  //   "postalcode": "150-0001",
  //   "addr1": "東京都渋谷区神宮前4-24-9"
  // }
]

const Sheet = () => {
  return (
    <div className="sheet padding-19.5mm"
    style={{
          display: "flex",
          flexDirection: "row"
    }}>
      {data.map(c => (
        <div style={{
          width: "91.3mm",
          height: "38.5mm",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "#CCCCCC",
          // background: "#C0C0C0",
          padding: "3mm 8mm 3mm 8mm"
        }}>
        {data ? c.postalcode : 'データがありません'}
        <br />
        {data ? c.addr1 : 'データがありません'}
        <br />
        {data ? c.nmcstm : 'データがありません'}
        <br />
        <br />
          <div style={{textAlign: "right", marginRight: "3px"}}>
            {data ? c.cdcstm : 'データがありません'}
          </div>
        </div>
      ))}
    </div>
  );
};

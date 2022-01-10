import {Component} from '@angular/core';
import * as XLSX from 'xlsx';
import * as enLangdata from '../assets/en.json';
import {saveAs} from 'file-saver';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'excelToJson';
  convertedJson: string = '';
  constructor(private httpService: HttpClient) {}
  fileUpload(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      // console.log(event);
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, {type: 'binary'});
      // console.log(workbook);
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_formulae(workbook.Sheets[sheet]);
        let engLangdat = Object.assign({}, enLangdata);
        for (let engdta in engLangdat) {
          const engValue = (engLangdat as any)[engdta];
          for (let dta of data) {
            if (dta.includes(engValue)) {
              let splitdta = dta.split("='");
              if (splitdta[1] === engValue) {
                // console.log(engValue, ":", splitdta[0].replace('A', 'B'));
                let findValue = data.find(x => x.includes(splitdta[0].replace('A', 'B')));
                // console.log(findValue);
                const getValue = findValue?.split("='");
                (engLangdat as any)[engdta] = getValue ? getValue[1] : '';
              }
            }
          }
        }
        const data1 = JSON.stringify(engLangdat)
        const blob = new Blob([data1], {type: 'text/json'});
        saveAs(blob, 'exceltoJson.json');
      })

    }


  }
/**
 * used for language pick from Excel and create json
 * n nested json
 * @param event 
 */
  fileUploadAdvance(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      // console.log(event);
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, {type: 'binary'});
      // console.log(workbook);
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_formulae(workbook.Sheets[sheet]);
        this.httpService.get('assets/en.json').subscribe(res => {
          // console.log("Response::", res);
          let engLangdat = res;
          this.objFilter(data, engLangdat);
          const data1 = JSON.stringify(engLangdat)
          const blob = new Blob([data1], {type: 'text/json'});
          saveAs(blob, 'exceltoJson.json');
        })

      })

    }
  }
  objFilter(data: any[], engLangdat: any) {
    for (let engdta in engLangdat) {
      const engValue = (engLangdat as any)[engdta];
      if (typeof engValue == 'object') {
        this.objFilter(data, engValue);
      } else {
        this.setObjValue(data, engValue, engLangdat, engdta);
      }
    }
  }
  setObjValue(data: any[], engValue: any, engLangdat: any, index: string) {
    for (let dta of data) {
      if (dta.includes(engValue)) {
        let splitdta = dta.split("='");
        if (splitdta[1] === engValue) {
          // console.log(engValue, ":", splitdta[0].replace('A', 'B'));
          let findValue = data.find((x: string | any[]) => x.includes(splitdta[0].replace('A', 'B')));
          const getValue = findValue?.split("='");
          engLangdat[index] = getValue ? getValue[1] : '';
        }
      }
    }
  }
}

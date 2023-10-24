import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chuot-form',
  templateUrl: './chuot-form.component.html',
  styleUrls: ['./chuot-form.component.css']
})
export class ChuotFormComponent {
  selectedImage: any[] = [];
  hinhAnhList: FileList|null=null
  @Output() dataChuot = new EventEmitter<FormData>();
  chuot = {
    tenSP: '',
    moTa1: '',
    moTa2: '',
    moTa3: '',
    soLuong: 0,
    giaTien: 0,
    thongSo: {
      model: '',
      baoHanh: '',
      kieuKetNoi: '',
      camBien: '',
      DPI: ''
    },
    hinhAnh: [],
  };

  getImage(event: any) {
    for (let item of event.target.files) {
      const file: File = item;
      var itemImage = {
        name: file.name,
        size: file.size,
        type: file.type,
      };
      this.hinhAnhList=event.target.files
      this.selectedImage.push(itemImage);
    }
    this.chuot.hinhAnh = this.selectedImage;
    console.log(this.chuot.hinhAnh);
  }
  sendDataToFatherComponent() {
    const chuotForm=new FormData();
    for (let i = 0; i < this.hinhAnhList.length; i++) {
      chuotForm.append('hinhAnh', this.hinhAnhList[i]);
    }
    chuotForm.append('product',JSON.stringify(this.chuot))
    this.dataChuot.emit(chuotForm);
    console.log(this.chuot);
  }
}

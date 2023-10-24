import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-man-hinh-form',
  templateUrl: './man-hinh-form.component.html',
  styleUrls: ['./man-hinh-form.component.css']
})
export class ManHinhFormComponent {
  selectedImage: any[] = [];
  hinhAnhList: FileList|null=null
  @Output() dataManHinh = new EventEmitter<FormData>();
  manhinh = {
    tenSP: '',
    moTa1: '',
    moTa2: '',
    moTa3: '',
    soLuong: 0,
    giaTien: 0,
    thongSo: {
      kichThuoc: '',
      tanSoQuet: '',
      hienThiMauSac: '',
      congHinhAnh: ''
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
      this.selectedImage.push(itemImage);
    }
    this.hinhAnhList=event.target.files
    this.manhinh.hinhAnh = this.selectedImage;
    console.log(this.manhinh.hinhAnh);
  }
  sendDataToFatherComponent() {
    const manHinhForm=new FormData();
    for (let i = 0; i < this.hinhAnhList.length; i++) {
      manHinhForm.append('hinhAnh', this.hinhAnhList[i]);
    }
    manHinhForm.append('product',JSON.stringify(this.manhinh))
    this.dataManHinh.emit(manHinhForm);
    console.log(this.manhinh);
  }
}

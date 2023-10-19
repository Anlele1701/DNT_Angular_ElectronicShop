import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dien-thoai-form',
  templateUrl: './dien-thoai-form.component.html',
  styleUrls: ['./dien-thoai-form.component.css'],
})
export class DienThoaiFormComponent {
  selectedImage: any[] = [];
  @Output() dataDienThoai = new EventEmitter<Object>();
  dienthoai = {
    tenSP: '',
    moTa1: '',
    moTa2: '',
    moTa3: '',
    soLuong: 0,
    giaTien: 0,
    thongSo: {
      manHinh: '',
      cameraTruoc: '',
      cameraSau: '',
      CPU: '',
      boNho: '',
      heDieuHanh: '',
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
    this.dienthoai.hinhAnh = this.selectedImage;
    console.log(this.dienthoai.hinhAnh);
  }
  sendDataToFatherComponent() {
    this.dataDienThoai.emit(this.dienthoai);
    console.log(this.dienthoai);
  }
}

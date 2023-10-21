import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dien-thoai-form',
  templateUrl: './dien-thoai-form.component.html',
  styleUrls: ['./dien-thoai-form.component.css'],
})
export class DienThoaiFormComponent {
  selectedImage: any[] = [];
  hinhAnhList: FileList|null=null
  @Output() dataDienThoai = new EventEmitter<FormData>();
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
    this.hinhAnhList=event.target.files
    this.dienthoai.hinhAnh = this.selectedImage;
    console.log(this.dienthoai.hinhAnh);
  }
  sendDataToFatherComponent() {
    const dienThoaiForm=new FormData();
    for (let i = 0; i < this.dienthoai.hinhAnh.length; i++) {
      dienThoaiForm.append('hinhAnh', this.hinhAnhList[i]);
    }
    dienThoaiForm.append('product',JSON.stringify(this.dienthoai))
    this.dataDienThoai.emit(dienThoaiForm);
    console.log(this.dienthoai);
  }
}

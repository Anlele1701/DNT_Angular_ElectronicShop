import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tai-nghe-form',
  templateUrl: './tai-nghe-form.component.html',
  styleUrls: ['./tai-nghe-form.component.css']
})
export class TaiNgheFormComponent {
  selectedImage: any[] = [];
  hinhAnhList: FileList|null=null
  @Output() dataTaiNghe = new EventEmitter<FormData>();
  tainghe = {
    tenSP: '',
    moTa1: '',
    moTa2: '',
    moTa3: '',
    soLuong: 0,
    giaTien: 0,
    thongSo: {
      chatLieuKhung: '',
      mauSac: '',
      kieuTaiNghe: '',
      kieuKetNoi: '',
      thoiLuongPin: '',
      microphone: '',
      tanSo:'',
      doNhay:''
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
    this.tainghe.hinhAnh = this.selectedImage;
    console.log(this.tainghe.hinhAnh);
  }
  sendDataToFatherComponent() {
    const taiNgheForm=new FormData();
    for (let i = 0; i < this.hinhAnhList.length; i++) {
      taiNgheForm.append('hinhAnh', this.hinhAnhList[i]);
    }
    taiNgheForm.append('product',JSON.stringify(this.tainghe))
    this.dataTaiNghe.emit(taiNgheForm);
    console.log(this.tainghe);
  }
}

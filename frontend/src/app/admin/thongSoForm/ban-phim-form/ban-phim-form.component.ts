import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ban-phim-form',
  templateUrl: './ban-phim-form.component.html',
  styleUrls: ['./ban-phim-form.component.css']
})
export class BanPhimFormComponent {
  selectedImage: any[] = [];
  hinhAnhList: FileList|null=null
  @Output() dataBanPhim = new EventEmitter<FormData>();
  banphim = {
    tenSP: '',
    moTa1: '',
    moTa2: '',
    moTa3: '',
    soLuong: 0,
    giaTien: 0,
    thongSo: {
      tinhTrang: '',
      baoHanh: '',
      switch: '',
      kichThuoc: '',
      trongLuong: ''
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
    this.banphim.hinhAnh = this.selectedImage;
    console.log(this.banphim.hinhAnh);
  }
  sendDataToFatherComponent() {
    const banPhimForm=new FormData();
    for (let i = 0; i < this.hinhAnhList.length; i++) {
      banPhimForm.append('hinhAnh', this.hinhAnhList[i]);
    }
    banPhimForm.append('product',JSON.stringify(this.banphim))
    this.dataBanPhim.emit(banPhimForm);
    console.log(this.banphim);
  }
}

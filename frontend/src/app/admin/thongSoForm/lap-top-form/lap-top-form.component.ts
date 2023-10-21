import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-lap-top-form',
  templateUrl: './lap-top-form.component.html',
  styleUrls: ['./lap-top-form.component.css']
})
export class LapTopFormComponent {
  selectedImage: any[] = [];
  hinhAnhList: FileList|null=null
  @Output() dataLaptop = new EventEmitter<FormData>();
  laptop = {
    tenSP: '',
    moTa1: '',
    moTa2: '',
    moTa3: '',
    soLuong: 0,
    giaTien: 0,
    thongSo: {
      CPU: '',
      manHinh: '',
      Ram: '',
      doHoa: '',
      luuTru: '',
      heDieuHanh: '',
      PIN:'',
      khoiLuong:''
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
    this.laptop.hinhAnh = this.selectedImage;
    console.log(this.laptop.hinhAnh);
  }
  sendDataToFatherComponent() {
    const laptopForm=new FormData();
    for (let i = 0; i < this.hinhAnhList.length; i++) {
      laptopForm.append('hinhAnh', this.hinhAnhList[i]);
    }
    laptopForm.append('product',JSON.stringify(this.laptop))
    this.dataLaptop.emit(laptopForm);
    console.log(this.laptop);
  }
}

var SinhVienService = function () {
    this.themMoi = function (sinhVien) {
        return axios ({
            url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
            method: 'POST',
            data: sinhVien
        });
    }

    this.xoa = function (maSV) {
        return axios ({
            url: 'http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/'+maSV,
            method: 'DELETE'
        });
    }

    this.capnhat = function (sinhVien) {
        return axios ({
            url: 'http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien',
            method: 'PUT',
            data: sinhVien
        });
    }

    this.LayDanhSachSinhVien = function () {
        return axios ({
            url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
            method: 'GET'
        });
    }

    this.layThongTinSinhVien = function (maSV) {
        return axios ({
            url: 'http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/'+maSV,
            method: 'GET'
        });
    }
}
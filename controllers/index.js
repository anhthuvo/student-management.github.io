//Chức năng:
/**
 * 1.Thêm nhân viên mới vào danh sách
 * 2.Hiển thị danh sách nhân viên dưới dạng bảng
 * 3.Xóa nhân viên mới vào danh sách
 * 4.Cập nhật thông tin nhân viên
 * 5.Tìm kiếm nhân viên theo tên hoặc theo mã
 * 6.Validate thông tin
 */

// tạo lớp đối tượng service
var svService = new SinhVienService();

var sinhVienList = [];
var MaSVInput = document.getElementById("MaSV");
var HoTenInput = document.getElementById("HoTen");
var EmailInput = document.getElementById("Email");
var SoDTInput = document.getElementById("SoDT");
var CMNDInput = document.getElementById("CMND");
var DiemToanInput = document.getElementById("DiemToan");
var DiemLyInput = document.getElementById("DiemLy");
var DiemHoaInput = document.getElementById("DiemHoa");

var errorMaSV = document.getElementById("errorMaSV");
var errorHoTen = document.getElementById("errorHoTen");
var errorEmail = document.getElementById("errorEmail");
var errorSoDT = document.getElementById("errorSoDT");
var errorCMND = document.getElementById("errorCMND");
var errorDiemToan = document.getElementById("errorDiemToan");
var errorDiemLy = document.getElementById("errorDiemLy");
var errorDiemHoa = document.getElementById("errorDiemHoa");

var btnThemSinhVien = document.getElementById("btnThemSinhVien");
var btnCapNhatSinhVien = document.getElementById("btnCapNhatSinhVien");
var searchInput = document.getElementById("searchInput");

const LayDanhSachSV = function () {
  sinhVienList = [];
  var promise = svService.LayDanhSachSinhVien();
  promise
    .then(function (res) {
      //console.log("data", res.data);
      for (var i = 0; i < res.data.length; i++) {
        const {
          MaSV,
          HoTen,
          Email,
          SoDT,
          CMND,
          DiemToan,
          DiemLy,
          DiemHoa,
        } = res.data[i];
        var SV = new sinhVien(
          MaSV,
          HoTen,
          Email,
          SoDT,
          CMND,
          DiemToan,
          DiemLy,
          DiemHoa
        );
        sinhVienList.push(SV);
      }

      renderSinhVien();
    })
    .catch(function (error) {
      console.log("error lay danh sach SV", error);
    });
};

const renderSinhVien = function (sinhVienArr = sinhVienList) {
  var htmlContent = "";
  for (var i = 0; i < sinhVienArr.length; i++) {
    const {
      MaSV,
      HoTen,
      Email,
      SoDT,
      CMND,
      DiemToan,
      DiemLy,
      DiemHoa,
    } = sinhVienArr[i];

    htmlContent += `
            <tr> 
              <td>${MaSV}</td> 
              <td>${HoTen}</td> 
              <td>${Email}</td> 
              <td>${SoDT}</td> 
              <td>${CMND}</td>
              <td>${DiemToan}</td>
              <td>${DiemLy}</td>
              <td>${DiemHoa}</td>
              <td>
              <button class="btn btn-danger" id="btnXoa" onclick="xoa('${MaSV}')">Xóa</button>
              </td>
              <td>
              <button class="btn btn-primary" id="btnUpdate" onclick="layThongTin('${MaSV}')" style="width: 90px">Thay đổi</button>
              </td>
            </tr>`;
  }

  document.getElementById("tblSinhVien").innerHTML = htmlContent;
};

const themMoi = function () {
  var MaSV = MaSVInput.value.trim();
  var HoTen = HoTenInput.value.trim();
  var Email = EmailInput.value.trim();
  var SoDT = SoDTInput.value.trim();
  var CMND = CMNDInput.value.trim();
  var DiemToan = DiemToanInput.value.trim();
  var DiemLy = DiemLyInput.value.trim();
  var DiemHoa = DiemHoaInput.value.trim();

  var newSinhVien = new sinhVien(
    MaSV,
    HoTen,
    Email,
    SoDT,
    CMND,
    DiemToan,
    DiemLy,
    DiemHoa
  );

  if (!validate()) return;

  
  var promise = svService.themMoi(newSinhVien);
  promise
    .then(function (res) {
      console.log("data", res.data);
      LayDanhSachSV();

      document.getElementsByClassName("form")[0].reset();
      document.getElementsByClassName("form")[1].reset();
    })
    .catch(function (error) {
      console.log("error", error.response.data);
    });
};

const xoa = function (maSV) {
  var promise = svService.xoa(maSV);

  promise
    .then(function (res) {
      console.log("result", res.data);
      LayDanhSachSV();
    })
    .catch(function () {
      console.log("error delete data", error);
    });
};

const layThongTin = function (maSV) {
  let promise = svService.layThongTinSinhVien(maSV);

  promise
    .then(function (res) {
      console.log("result", res.data);

      let sinhVien = res.data;

      MaSVInput.value = sinhVien.MaSV;
      HoTenInput.value = sinhVien.HoTen;
      EmailInput.value = sinhVien.Email;
      SoDTInput.value = sinhVien.SoDT;
      CMNDInput.value = sinhVien.CMND;
      DiemToanInput.value = sinhVien.DiemToan;
      DiemLyInput.value = sinhVien.DiemLy;
      DiemHoaInput.value = sinhVien.DiemHoa;

      MaSVInput.setAttribute("disabled", "");
      btnThemSinhVien.setAttribute("disabled", "");
    })
    .catch(function () {
      console.log("error get info", error);
    });
};

const capNhat = function () {
  var MaSV = MaSVInput.value.trim();
  var HoTen = HoTenInput.value.trim();
  var Email = EmailInput.value.trim();
  var SoDT = SoDTInput.value.trim();
  var CMND = CMNDInput.value.trim();
  var DiemToan = DiemToanInput.value.trim();
  var DiemLy = DiemLyInput.value.trim();
  var DiemHoa = DiemHoaInput.value.trim();

  var sinhVienCapNhat = new sinhVien(
    MaSV,
    HoTen,
    Email,
    SoDT,
    CMND,
    DiemToan,
    DiemLy,
    DiemHoa
  );

  MaSVInput.removeAttribute("disabled", "");
  btnThemSinhVien.removeAttribute("disabled", "");

  if (!validate()) return;

  var promise = svService.capnhat(sinhVienCapNhat);

  promise
    .then(function (res) {
      console.log("result", res.data);
      LayDanhSachSV();

      document.getElementsByClassName("form")[0].reset();
      document.getElementsByClassName("form")[1].reset();
    })
    .catch(function (error) {
      console.log("error get info", error);
    });
};

const search = function () {
  const result = [];
  var keyword = searchInput.value.toLowerCase();
  keyword = nonAccentVietnamese(keyword);
  for (sinhVien of sinhVienList) {
    var HoTen = nonAccentVietnamese(sinhVien.HoTen);
    var MaSV = nonAccentVietnamese(sinhVien.MaSV);

    if (keyword === MaSV) {
      result.push(sinhVien);
    } else if (HoTen.includes(keyword)) {
      result.push(sinhVien);
    }
  }
  renderSinhVien(result);
};

function nonAccentVietnamese(str) {
  str = str.toLowerCase();
  //     We can also use this instead of from line 11 to line 17
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}

//--------------VALIDATION-----------
const checkRequire = function (value, messContainer) {
  //console.log(value);
  if ( !value.length  && Number.isInteger(Math.round(value)) ) {
    messContainer.innerHTML = "*Vui lòng nhập thông tin";
    return false;
  }
  messContainer.innerHTML = "";
  return true;
};

var checkScore = function (value, messContainer) {
  if (value > 10 || value < 0 || !value) {
    messContainer.innerHTML = "*Nhập điểm từ 0 đến 10";
    return false;
  }

  messContainer.innerHTML = "";
  return true;
};

var checkEmail = function (value, messContainer) {
  const stringPattern = new RegExp(
    "^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$"
  );
  if (!stringPattern.test(value)) {
    messContainer.innerHTML = "*Nhập địa chỉ e-mail hợp lệ";
    return false;
  }
  messContainer.innerHTML = "";
  return true;
};

var checkSoDT = function (value, messContainer) {
  
  const stringPattern = new RegExp(/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/);

  if ( !stringPattern.test(value) ) {
    messContainer.innerHTML = "*Nhập số điện thoại hợp lệ";
    return false;
  }
  messContainer.innerHTML = "";
  return true;
};

var checkHoTen = function (value, messContainer) {
  value = String(value);
  const stringPattern = new RegExp(
    "^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
  );
  if (!stringPattern.test(value)) {
    messContainer.innerHTML = "*Nhập họ tên hợp lệ";
    return false;
  }
  messContainer.innerHTML = "";
  return true;
};

var checkExist = function (value, messContainer) {
  for ( var sinhVien of sinhVienList ) {
    if ( sinhVien.MaSV === value ) {
      messContainer.innerHTML = "*Mã sinh viên đã tồn tại";
    return false;
    }
  }
  messContainer.innerHTML = "";
  return true;
}

var validate = function () {
  var MaSV = MaSVInput.value.trim();
  var HoTen = HoTenInput.value.trim();
  var Email = EmailInput.value.trim();
  var SoDT = SoDTInput.value.trim();
  var CMND = CMNDInput.value.trim();
  var DiemToan = parseFloat(DiemToanInput.value.trim());
  var DiemLy = parseFloat(DiemLyInput.value.trim());
  var DiemHoa = parseFloat(DiemHoaInput.value.trim());

  var isValid = true;

  isValid &=
    checkScore(DiemToan, errorDiemToan) &&
    checkScore(DiemLy, errorDiemLy) &&
    checkScore(DiemHoa, errorDiemHoa);

  isValid &= checkRequire(Email, errorEmail) && checkEmail(Email, errorEmail);

  isValid &= checkRequire(SoDT, errorSoDT) && checkSoDT(SoDT, errorSoDT);

  isValid &= checkRequire(CMND, errorCMND);

  isValid &= checkRequire(HoTen, errorHoTen) && checkHoTen(HoTen, errorHoTen);

  isValid &= checkRequire(MaSV, errorMaSV) && checkExist(MaSV, errorMaSV);

  return isValid;
};
//--------------END-VALIDATION-----------


LayDanhSachSV();
btnThemSinhVien.addEventListener("click", () => themMoi());
btnCapNhatSinhVien.addEventListener("click", () => capNhat());
searchInput.addEventListener("keyup", () => search());

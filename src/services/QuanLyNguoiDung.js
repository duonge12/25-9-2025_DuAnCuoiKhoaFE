import axios from "./axios";

const QuanLyNguoiDung = {
	dangKy: (credential) => {
		return axios.post("QuanLyNguoiDung/DangKy", credential);
	},
	dangNhap: (account) => {
		return axios.post("QuanLyNguoiDung/DangNhap", account);
	},
	thongTinNguoiDung: (accessToken) => {
		return axios.post(
			"QuanLyNguoiDung/ThongTinNguoiDung",
			{},
			{ headers: { Authorization: `Bearer ${accessToken}` } }
		);
	},
};
export default QuanLyNguoiDung;

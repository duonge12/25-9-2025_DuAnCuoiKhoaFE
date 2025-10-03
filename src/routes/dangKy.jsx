import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import QuanLyNguoiDung from "../services/QuanLyNguoiDung";
export const Route = createFileRoute("/dangKy")({
	component: RouteComponent,
});
const initialValues = {
	taiKhoan: "duonge",
	matKhau: "duonge",
	hoTen: "duonge",
	soDT: "0961920378",
	maNhom: "GP01",
	email: "duonge@gmail.com",
};

const validationSchema = object({
	taiKhoan: string()
		.min(5, "tài khoản tối thiểu 6 ký tự")
		.required("Vui lòng nhập tài khoản"),
	matKhau: string()
		.min(5, "Mật khẩu tối thiểu 6 ký tự")
		.required("Vui lòng nhập mật khẩu"),
	hoTen: string()
		.min(5, "Họ tên tối thiểu 6 ký tự")
		.required("Vui lòng nhập họ tên"),
	soDT: string()
		.min(5, "Số điện thoại tối thiểu 6 ký tự")
		.required("Vui lòng nhập số điện thoại"),
	maNhom: string().required("Vui lòng nhập mã nhóm"),
	email: string().email("Email không hợp lệ").required("Vui lòng nhập email"),
});
function RouteComponent() {
	const navigate = useNavigate();
	const fieldStyle = "focus:outline-none border-b-2 text-xl";
	const lableStyle = "text-xl";
	return (
		<div className="flex bg-[#151515] text-[#dadad3] h-screen">
			<div className="hidden lg:block lg:w-1/2"></div>
			<div className="w-full p-3 lg:w-1/2 lg:p-5">
				<div>
					<h1 className="flex justify-center py-6 text-2xl">
						Đăng ký
					</h1>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						validateOnBlur={false}
						validateOnChange={false}
						onSubmit={async (values) => {
							try {
								const resDangKy =
									await QuanLyNguoiDung.dangKy(values);
								console.log("dangKy:", resDangKy.data);
								alert("Đăng ký thành công");
								const { taiKhoan, matKhau } = values;
								const resDangNhap =
									await QuanLyNguoiDung.dangNhap({
										taiKhoan,
										matKhau,
									});

								console.log("dangNhap:", resDangNhap.data);
								const { accessToken } = resDangNhap.data;
								localStorage.setItem(
									"accessToken",
									accessToken
								);
								navigate({ to: "/" });
							} catch (err) {
								const { data } = err.response;
								alert(data);
							}
						}}
					>
						{({ errors }) => (
							<Form className="flex flex-col gap-3">
								<label
									className={lableStyle}
									htmlFor="taiKhoan"
								>
									Tài khoản :
								</label>
								<Field
									className={fieldStyle}
									id="taiKhoan"
									name="taiKhoan"
								/>
								{errors.taiKhoan && (
									<div>{errors.taiKhoan}</div>
								)}
								<label
									className={lableStyle}
									htmlFor="matKhau"
								>
									Mật khẩu :
								</label>
								<Field
									className={fieldStyle}
									id="matKhau"
									name="matKhau"
								/>
								{errors.matKhau && <div>{errors.matKhau}</div>}
								<label
									className={lableStyle}
									htmlFor="hoTen"
								>
									Họ tên :
								</label>
								<Field
									className={fieldStyle}
									id="hoTen"
									name="hoTen"
								/>
								{errors.hoTen && <div>{errors.hoTen}</div>}
								<label
									className={lableStyle}
									htmlFor="soDT"
								>
									Số điện thoại :
								</label>
								<Field
									className={fieldStyle}
									id="soDT"
									name="soDT"
								/>
								{errors.soDT && <div>{errors.soDT}</div>}
								<label
									className={lableStyle}
									htmlFor="email"
								>
									Email :
								</label>
								<Field
									className={fieldStyle}
									id="email"
									name="email"
								/>
								{errors.email && <div>{errors.email}</div>}
								<div className="flex justify-between pt-6">
									<button
										className="cursor-pointer text-xl"
										type="submit"
									>
										Đăng ký
									</button>
									<Link
										className="cursor-pointer text-xl"
										to="/dangNhap"
									>
										Đăng nhập
									</Link>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}

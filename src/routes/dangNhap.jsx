import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Field, Form, Formik } from "formik";
import QuanLyNguoiDung from "../services/QuanLyNguoiDung";

export const Route = createFileRoute("/dangNhap")({
	component: RouteComponent,
});

const initialValues = {
	taiKhoan: "duonge",
	matKhau: "duonge",
};
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
						Đăng Nhập
					</h1>
					<Formik
						initialValues={initialValues}
						onSubmit={async (values) => {
							try {
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
						{() => (
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

								<div className="flex justify-between pt-6">
									<button
										className="cursor-pointer text-xl"
										type="submit"
									>
										Đăng Nhập
									</button>
									<Link
										className="cursor-pointer text-xl"
										to="/dangKy"
									>
										Đăng ký
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

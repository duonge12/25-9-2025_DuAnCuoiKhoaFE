import { useQuery } from "@tanstack/react-query";
import QuanLyNguoiDung from "../services/QuanLyNguoiDung";
import icon from "../assets/icon.png";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

const Header = () => {
	const { data } = useQuery({
		queryKey: ["thongTinNguoiDung"],
		queryFn: async () => {
			if (!localStorage.getItem("accessToken")) return null;
			return await QuanLyNguoiDung.thongTinNguoiDung(
				localStorage.getItem("accessToken")
			);
		},
	});

	useEffect(() => {
		const handleToggleMenu = () => {
			const menuPopUp = document.getElementsByClassName("menu-pop-up")[0];
			menuPopUp.classList.toggle("hidden");
			console.log(menuPopUp);
		};
		document
			.getElementsByClassName("toggle-button")[0]
			.addEventListener("click", handleToggleMenu);
	}, []);
	return (
		<div className="p-2 flex justify-between items-center relative gap-2">
			<div className="flex items-center gap-2">
				<img
					className="w-20 h-20 rounded-full"
					src={icon}
					alt="cybersoft"
				/>
				<div>CYBERSOFT</div>
			</div>

			<div className="hidden items-center gap-2 cursor-pointer border-2 px-2 rounded-md md:flex">
				<div className="w-10 h-10 flex flex-col gap-1.5 p-1 justify-center">
					<div className="bg-black h-[4px] rounded-2xl"></div>
					<div className="bg-black h-[4px] rounded-2xl"></div>
					<div className="bg-black h-[4px] rounded-2xl"></div>
				</div>
				<span>Danh mục khóa học</span>
			</div>
			<input
				className="hidden border-2 rounded-md p-2 flex-1 md:flex"
				type="text"
				placeholder="Tìm khóa học"
			/>
			{data ? (
				<div className="hidden lg:flex">{data.data.hoTen}</div>
			) : (
				<div className="hidden lg:flex">
					<Link
						className="border-2 p-2 rounded-md mr-2"
						to={"/dangKy"}
					>
						Đăng ký
					</Link>
					<Link
						className="border-2 p-2 rounded-md mr-2"
						to={"/dangNhap"}
					>
						Đăng nhập
					</Link>
				</div>
			)}

			<div className="toggle-button w-10 h-10 flex flex-col gap-1.5 border-2 p-1 rounded-md justify-center lg:hidden">
				<div className="bg-black h-[4px] rounded-2xl"></div>
				<div className="bg-black h-[4px] rounded-2xl"></div>
				<div className="bg-black h-[4px] rounded-2xl"></div>
			</div>
			<div className="menu-pop-up border absolute w-full top-[100%] right-0 gap-2 p-2 flex flex-col md:w-fit lg:!hidden">
				<div className="flex items-center gap-2 cursor-pointer border-2 px-2 rounded-md md:hidden">
					<div className="w-10 h-10 flex flex-col gap-1.5 p-1 justify-center">
						<div className="bg-black h-[4px] rounded-2xl"></div>
						<div className="bg-black h-[4px] rounded-2xl"></div>
						<div className="bg-black h-[4px] rounded-2xl"></div>
					</div>
					<span>Danh mục khóa học</span>
				</div>
				<input
					className=" border-2 rounded-md p-2 md:hidden"
					type="text"
					placeholder="Tìm khóa học"
				/>
				{data ? (
					<div>{data.data.hoTen}</div>
				) : (
					<div className="flex justify-between gap-2">
						<Link
							className="border-2 p-2 rounded-md flex-1 whitespace-nowrap"
							to={"/dangKy"}
						>
							Đăng ký
						</Link>
						<Link
							className="border-2 p-2 rounded-md flex-1 whitespace-nowrap"
							to={"/dangNhap"}
						>
							Đăng nhập
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};
export default Header;

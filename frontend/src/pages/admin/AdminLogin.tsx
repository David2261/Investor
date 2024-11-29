import eagleLogin from '../../assets/admin/eagle_login.png';


const AdminLogin = () => {
	return <>
	<div className="w-screen h-screen bg-[#DDE5F4] flex justify-center items-center overflow-auto">
		<div className="flex justify-between items-center bg-white shadow-md rounded pt-4 mt-4 p-6 w-auto">
			{/* Image Section */}
			<div className="flex-shrink-0">
				<img src={eagleLogin} alt="Eagle Login" className="w-[500px] h-[600px] rounded object-cover" />
			</div>

			{/* Login Form Section */}
			<div className="flex flex-col ml-4 w-full px-4 shadow bg-[#F1F1F1]">
				<h1 className="text-2xl uppercase pt-4 mb-6">Вход</h1>
				<div className='justify-center'>
					{/* Email Input */}
					<div className="mb-4">
						<label htmlFor="email" className="block text-gray-700 text-sm mb-2">
						Ваш email
						</label>
						<input
						id="email"
						type="email"
						placeholder="example@email.com"
						className="shadow appearance-none border rounded w-[330px] py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
						/>
					</div>
					
					{/* Password Input */}
					<div className="mb-4">
						<label htmlFor="password" className="block text-gray-700 text-sm mb-2">
						Ваш пароль
						</label>
						<input
						id="password"
						type="password"
						placeholder="********"
						className="shadow appearance-none border rounded w-[330px] py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
						/>
					</div>

					{/* Login Button */}
					<div className="flex items-center justify-center">
						<button
						type="button"
						className="h-[84px] w-[204px] bg-[#5FC8FE] hover:bg-blue-700 uppercase text-2xl text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
						Вход
						</button>
					</div>

					{/* Forgot Password Link */}
					<div className="text-center mt-4">
						<a href="#" className="text-[#A9A9A9]">
						Я забыл пароль
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	</>
}

export default AdminLogin;
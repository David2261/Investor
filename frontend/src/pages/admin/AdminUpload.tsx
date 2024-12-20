import React, { useState, DragEvent  } from 'react';
import { useNavigate, useParams } from "react-router-dom";

interface Params {
	[key: string]: string | undefined;
}

const AdminUpload: React.FC = () => {
	const { apps } = useParams<Params>();
	if (!apps) {
		return <div>Нет приложений</div>;
	}
	const navigate = useNavigate();
	const handleOpenSite = () => {
		navigate('/');
	};

	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			validateFile(selectedFile);
		}
	};

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
	};

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const droppedFile = event.dataTransfer.files?.[0];
		if (droppedFile) {
			validateFile(droppedFile);
		}
	};

	const validateFile = (file: File) => {
		const validTypes = ['application/json', 'text/csv'];
		const isValid = validTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.json');

		if (isValid) {
			setFile(file);
			setError(null);
		} else {
			setFile(null);
			setError('Please upload a valid CSV or JSON file.');
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (file) {
			console.log('Uploaded File:', file);
		}
	};

	return <>
	<div className='flex justify-end pb-6'>
		<button
			onClick={handleOpenSite}
			className='uppercase w-auto h-8 px-2 bg-black text-white rounded-lg'>открыть сайт</button>
	</div>
	<div className='flex flex-col bg-black rounded w-full w-height relative'>
		<div className='relative flex justify-between'>
			<div className='pt-10 pl-7 pb-5 text-white text-xs'>
				<p>Загрузить данные в {apps}</p>
			</div>
		</div>
		<div className='flex border-b-[0.2px] w-11/12 mx-auto'></div>
		<div className='m-6 overflow-y-auto max-h-96'>
			<form onSubmit={handleSubmit}>
				<div
					className="border-2 border-dashed border-gray-300 rounded-md p-4 mb-4 text-center cursor-pointer"
					onDragOver={handleDragOver}
					onDrop={handleDrop}
				>
					{file ? (
						<p className="text-gray-700">{file.name}</p>
					) : (
						<p className="text-gray-500">Drag and drop a file here or click to browse</p>
					)}
					<input
						type="file"
						onChange={handleFileChange}
						className="hidden"
						id="file-upload"
					/>
					<label htmlFor="file-upload" className="text-blue-500 underline cursor-pointer">
						Browse
					</label>
				</div>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				<button
					type="submit"
					className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
				>
					Upload
				</button>
			</form>
		</div>
	</div>
	</>
}

export default AdminUpload;
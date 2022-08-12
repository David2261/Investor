import React, {useState} from 'react'



function Navbar() {
	// Кнопка для нажатия иконки Navbar и новый хук
	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true);

	const handleClick = () => setClick(!click);
	const closeModileMenu = () => setClick(false);

	const showButton = () => {
		if (window.innerWidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	};

	window.addEventListener('resize', showButton);

	return (
		<>
			<nav className="navbar">
				<div className="navbar-container">
					<Link to="/" className="navbar-logo">
						IH <i className="fab fa-typo3" />
					</Link>
					<div className="menu-icon" onClick={handleClick}>
						<i className={click ? 'fas fa-times' : 'fas fa-bars'} />
					</div>
					<ul className={click ? 'nav-menu active' : 'nav-menu'}>
						<li className="nav-item">
							<Link to='/' className='nav-links' onClick={closeModileMenu}>
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link to='/blog' className='nav-links' onClick={closeModileMenu}>
								Blog
							</Link>
						</li>
						<li className="nav-item">
							<Link to='/community' className='nav-links' onClick={closeModileMenu}>
								Community
							</Link>
						</li>
						<li className="nav-item">
							<Link to='/sing-up' className='nav-links' onClick={closeModileMenu}>
								Sing-Up
							</Link>
						</li>
					</ul>
					{button && <Button buttonStyle='btn--outline'>Sign-up</Button>}
				</div>
			</nav>
		</>
	)
}

export default Navbar;

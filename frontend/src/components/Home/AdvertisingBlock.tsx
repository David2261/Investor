import Swal from 'sweetalert2'
import { createRoot } from 'react-dom/client';
import { FaDonate } from "react-icons/fa";
import { PiPatreonLogoFill } from "react-icons/pi";
import { SiKofi } from "react-icons/si";
// Assets
import arrowBlack from '../../assets/icons/arrow_black.svg';


const AdvertisingBlock = () => {
    const adClick = () => {
        Swal.fire({
          title: 'Поддержка проекта',
          html: `
            <div class="flex flex-row justify-between">
              <div class="flex justify-center w-1/2 items-center">
                <p class="text-gray-600">Ваша поддержка — это вклад в честный и независимый инвест-контент.</p>
              </div>
              <div class="w-1/3 flex flex-col mt-6 md:mt-0" id="donation-buttons">
                <!-- React components will be rendered here -->
              </div>
            </div>
          `,
          showConfirmButton: false,
          customClass: {
            popup: 'custom-swal-popup',
          },
          didOpen: () => {
            const container = document.getElementById('donation-buttons');
            if (container) {
              const root = createRoot(container);
              root.render(
                <>
                <div className="flex flex-col space-y-4">
                  <div>
                    <a href="https://www.patreon.com/c/adge_nature" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <button className='text-white bg-black w-full rounded-full px-4 py-2 flex align-center gap-4'>
                        <PiPatreonLogoFill style={{ width: '20px', height: '20px' }} /> Patreon
                    </button>
                    </a>
                  </div>
                  <div>
                    <a href="https://boosty.to/admiralgeneral1703" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <button className='text-[#573a08] bg-[#dfb43c] w-full rounded-full px-4 py-2 flex align-center gap-4'>
                        <FaDonate style={{ width: '20px', height: '20px' }} /> Boosty
                      </button>
                    </a>
                  </div>
                  <div>
                    <a href="https://ko-fi.com/admiralgeneral" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <button className='text-white bg-[#00b4cc] w-full rounded-full px-4 py-2 flex align-center gap-4'>
                        <SiKofi style={{ width: '20px', height: '20px' }} /> Ko-fi
                      </button>
                    </a>
                  </div>
                </div>
                </>
              );
            }
          },
          willClose: () => {
            const container = document.getElementById('donation-buttons');
            if (container) {
              const root = createRoot(container);
              root.unmount();
            }
          },
        });
      };

    return <>
    <div className="pt-4 pl-4">
        <p className="uppercase text-black text-lg">Реклама</p>
    </div>
    <div onClick={adClick} className="pt-4 pl-4">
        <p className="text-black font-bold text-2xl">
            Ваша поддержка — это вклад в честный и независимый инвест-контент.
        </p>
    </div>
    <div className="flex justify-end pr-4">
        <button type="button" onClick={adClick} className="p-2 size-12 rounded-full bg-white text-xl text-black transition-all duration-300 ease-in-out hover:bg-transparent font-bold">
            <img src={arrowBlack} alt="ad-arrow" />
        </button>
    </div>
    </>
}


export default AdvertisingBlock;
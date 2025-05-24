import Swal from 'sweetalert2';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { FaDonate } from 'react-icons/fa';
import { PiPatreonLogoFill } from 'react-icons/pi';
import { SiKofi } from 'react-icons/si';

interface DonationPopupProps {
  title?: string;
  message?: string;
  onClose?: () => void;
}

let donationRoot: ReturnType<typeof createRoot> | null = null;

const DonationPopup: React.FC<DonationPopupProps> = ({
  title = 'Поддержка проекта',
  message = 'Ваша поддержка — это вклад в честный и независимый инвест-контент.',
  onClose,
}) => {
  useEffect(() => {
    Swal.fire({
      title,
      html: `
        <div class="flex flex-row justify-between">
          <div class="flex justify-center w-1/2 items-center">
            <p class="text-gray-600">${message}</p>
          </div>
          <div class="w-1/3 flex flex-col mt-6 md:mt-0" id="donation-buttons"></div>
        </div>
      `,
      showConfirmButton: false,
      customClass: {
        popup: 'custom-swal-popup',
      },
      didOpen: () => {
        const container = document.getElementById('donation-buttons');
        if (container) {
          // Reuse existing root or create a new one if it doesn't exist
          if (!donationRoot) {
            donationRoot = createRoot(container);
          }
          donationRoot.render(
            <div className="flex flex-col space-y-4">
              <a
                href="https://www.patreon.com/c/adge_nature"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <button className="text-white bg-black w-full rounded-full px-4 py-2 flex items-center gap-4">
                  <PiPatreonLogoFill style={{ width: '20px', height: '20px' }} />
                  Patreon
                </button>
              </a>
              <a
                href="https://boosty.to/admiralgeneral1703"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <button className="text-[#573a08] bg-[#dfb43c] w-full rounded-full px-4 py-2 flex items-center gap-4">
                  <FaDonate style={{ width: '20px', height: '20px' }} />
                  Boosty
                </button>
              </a>
              <a
                href="https://ko-fi.com/admiralgeneral"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <button className="text-white bg-[#00b4cc] w-full rounded-full px-4 py-2 flex items-center gap-4">
                  <SiKofi style={{ width: '20px', height: '20px' }} />
                  Ko-fi
                </button>
              </a>
            </div>
          );
        }
      },
      willClose: () => {
        const container = document.getElementById('donation-buttons');
        if (donationRoot && container) {
          donationRoot.unmount();
          donationRoot = null; // Reset root to allow recreation if needed later
        }
        if (onClose) onClose();
      },
    });
  });


  return null; // Component doesn't render anything itself, only triggers popup
};

export default DonationPopup;
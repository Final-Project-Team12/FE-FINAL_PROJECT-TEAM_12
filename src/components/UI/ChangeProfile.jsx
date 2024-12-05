import { useNavigate } from 'react-router-dom';

const ChangeProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full p-4 space-y-4 mt-14 border rounded-lg">
        <div>
          {/* Header section */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-yellow-100 rounded">
                  <img src="../../public/icons/Thumbnail.svg" alt="" />
                </div>
                <span className="text-[12px] font-medium">
                  kdsfjakl
                </span>
              </div>
              <img src="../../public/icons/Neutral button.svg" alt="" />
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-left">
                  <div className="text-[14px] font-bold">
                    jdfs
                  </div>
                  <div className="text-[12px]">sdkjfgad</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-[12px] text-[#8A8A8A]">
                    dsjkff
                  </div>
                  <img src="../../public/icons/Arrow.svg" alt="" />
                  <div className="text-[12px] text-[#8A8A8A]">Direct</div>
                </div>

                <div className="text-left">
                  <div className="text-[14px] font-bold">
                    jsdfka
                  </div>
                  <div className="text-[12px]">sdjkfs</div>
                </div>

                <img
                  src="../../public/icons/icon-park-outline_baggage-delay.svg"
                  alt=""
                />
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-purple-600">
                  skdjfsk
                </div>
                <button
                  className="mt-1 px-6 py-1 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition-colors duration-200"
                >
                  Pilih
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ChangeProfile;

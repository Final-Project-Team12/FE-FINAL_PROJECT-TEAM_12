import React, { useState } from "react";
import { ArrowUpDown, X } from "lucide-react";

const SortTicket = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("termurah");

  const toggleModal = () => setShowModal(!showModal);
  const handleFilterChange = (filter) => setSelectedFilter(filter);
  const applyFilter = () => {
    console.log("Filter yang dipilih:", selectedFilter);
    setShowModal(false);
  };

  const filterOptions = [
    { value: "termurah", label: "Harga - Termurah" },
    { value: "terpendek", label: "Durasi - Terpendek" },
    { value: "awal", label: "Keberangkatan - Paling Awal" },
    { value: "akhir", label: "Keberangkatan - Paling Akhir" },
    { value: "kedatanganAwal", label: "Kedatangan - Paling Awal" },
    { value: "kedatanganAkhir", label: "Kedatangan - Paling Akhir" },
  ];

  const selectedLabel = filterOptions.find(
    (filter) => filter.value === selectedFilter
  )?.label;

  const displayText = selectedLabel?.split(" - ")[1] || "Termurah";

  return (
    <div className="ml-[260px] mr-[212px] mt-[47px] mb-[47px] relative">
      <button
        className="flex absolute right-0 items-center gap-0.5 text-purple-600 py-1 px-3 rounded-3xl border border-purple-600 hover:bg-purple-600 hover:text-white transition-colors text-xs group"
        onClick={toggleModal}
      >
        <ArrowUpDown size={16} className="text-purple-600 group-hover:text-white transition-colors" />
        <i className="fa fa-filter"></i> {displayText}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-[360px] relative animate-[slideUp_0.2s_ease-out]">
            <div className="px-4 pt-4 pb-6 border-b border-gray-200">
              <button
                onClick={toggleModal}
                className="absolute right-1 top-4 text-gray-500 hover:text-gray-700 z-10"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-semibold text-[#4B1979]">
                Urutkan Berdasarkan
              </h3>
            </div>

            <div className="px-4">
              {filterOptions.map((filter) => (
                <div
                  key={filter.value}
                  onClick={() => handleFilterChange(filter.value)}
                  className="cursor-pointer relative border-b border-gray-200"
                >
                  <div
                    className={`py-3 transition-colors ${
                      selectedFilter === filter.value
                        ? "bg-[#4B1979] -mx-4 px-4"
                        : "hover:bg-purple-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3
                          className={`text-base font-semibold ${
                            selectedFilter === filter.value
                              ? "text-white"
                              : "text-black"
                          }`}
                        >
                          {filter.label}
                        </h3>
                      </div>
                      {selectedFilter === filter.value && (
                        <div className="bg-green-400 rounded-full p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="white"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 4.293a1 1 0 010 1.414L8.414 14l-4-4a1 1 0 111.414-1.414L8 11.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 flex justify-end border-t border-gray-200">
              <button
                onClick={applyFilter}
                className="bg-[#4B1979] text-white px-8 py-2 rounded-full text-base font-medium hover:bg-[#3a1161] transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortTicket;

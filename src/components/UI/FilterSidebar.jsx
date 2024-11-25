const FilterSidebar = () => {
  return (
    <div>
      <div className="w-[268px] h-[248px] rounded-[16px] mt-[71px] ms-[260px] shadow-[0_0_10px_rgba(0,0,0,0.1)] flex flex-col p-[24px] bg-white">
        <p className="text-[16px] font-medium">Filter</p>
        <div className="flex items-center justify-between mt-[24px] border-b pb-4">
          <div className="flex items-center gap-2">
            <img src="../../public/icons/fi_box.svg" alt="Transit Icon" />
            <span>Transit</span>
          </div>
          <img
            src="../../public/icons/fi_chevron-right.svg"
            alt="Chevron Right"
          />
        </div>
        <div className="flex items-center justify-between border-b py-4">
          <div className="flex items-center gap-2">
            <img src="../../public/icons/fi_heart.svg" alt="Fasilitas Icon" />
            <span>Fasilitas</span>
          </div>
          <img
            src="../../public/icons/fi_chevron-right.svg"
            alt="Chevron Right"
          />
        </div>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img src="../../public/icons/fi_dollar-sign.svg" alt="Harga Icon" />
            <span>Harga</span>
          </div>
          <img
            src="../../public/icons/fi_chevron-right.svg"
            alt="Chevron Right"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;

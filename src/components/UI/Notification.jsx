const Notification = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotif, setFilteredNotif] = useState(notif);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  const getDotColor = (type) => {
    return type === 'Promosi' ? 'bg-green-600' : 'bg-red-600';
  };

  useEffect(() => {
    const filtered = notif.filter((item) => {
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.type.toLowerCase().includes(searchLower);

      const matchesDateRange = dateRange.startDate && dateRange.endDate
        ? new Date(item.date) >= new Date(dateRange.startDate) &&
          new Date(item.date) <= new Date(dateRange.endDate)
        : true;

      return matchesSearch && matchesDateRange;
    });

    setFilteredNotif(filtered);
  }, [searchQuery, dateRange]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  return (
    <>
      <Navbar />
      <HeaderNotification onSearch={handleSearch} onDateRangeChange={handleDateRangeChange} />
      <div className="w-full flex-col lg:flex-row gap-12 px-4 lg:px-[280px] py-4 min-h-[calc(100vh-84px)] mt-3">
        {filteredNotif.length > 0 ? (
          filteredNotif.map((item, index) => (
            <div key={index}>
              <div className="flex w-full space-x-4">
                <div>
                  <Bell className="bg-purple-400 w-6 h-6 text-white rounded-full p-1 mt-1" />
                </div>
                <div className="w-full">
                  <div className="flex justify-between w-full">
                    <span className="text-slate-500 text-sm">{item.type}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500 text-sm">
                        {item.date}, {item.time}
                      </span>
                      <div className={`rounded-full w-2 h-2 ${getDotColor(item.type)}`}></div>
                    </div>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.description}</p>
                </div>
              </div>
              <hr className="my-4 bg-slate-400" />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Tidak ada notifikasi yang sesuai dengan pencarian Anda.
          </p>
        )}
      </div>
    </>
  );
};

export default Notification;

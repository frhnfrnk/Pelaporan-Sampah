const MyLocationIcon = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 opacity-25 rounded-full animate-ping"></div>
        <div className="relative w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default MyLocationIcon;

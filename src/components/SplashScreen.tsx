const SplashScreen = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="text-center">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-20 w-auto animate-pulse"
        />
        <h1 className="mt-6 text-3xl font-bold text-white">Loading...</h1>
        <div className="mt-4">
          <div className="h-2 w-48 mx-auto bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
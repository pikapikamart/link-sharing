 

const NotFound = () => {

  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center bg-[#1A2238] px-2 text-center">
      <h1 className="text-8xl font-extrabold text-white tracking-widest mb-2 md:text-9xl">404</h1>
      <p className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">Page Not Found</p>
      <p className="text-gray-500">Make sure to properly check the username</p>
    </main>
  )
}


export default NotFound
import { PhoneFrameVector } from "../../../svgs/phoneFrame"


const Preview = () =>{

  return (
    <div className="hidden bg-white rounded-lg relative lg:flex lg:items-center lg:justify-center">
      <div className="relative">
        <PhoneFrameVector />
        <div className="absolute inset-0 pt-16 px-8">
          <div className="flex flex-col items-center mb-14">
            <div className="bg-[#EEEEEE] rounded-full w-24 h-24 mb-6"></div>
            <div className="bg-[#EEEEEE] w-[160px] h-4 rounded-2xl mb-3"></div>
            <div className="bg-[#EEEEEE] w-[72px] h-2 rounded-2xl"></div>
          </div>
          <ul className=" max-h-[300px] overflow-y-auto no-scrollbar">
            <li className="bg-[#EEEEEE] h-11 rounded-lg mb-5"></li>
            <li className="bg-[#EEEEEE] h-11 rounded-lg mb-5"></li>
            <li className="bg-[#EEEEEE] h-11 rounded-lg mb-5"></li>
            <li className="bg-[#EEEEEE] h-11 rounded-lg mb-5"></li>
            <li className="bg-[#EEEEEE] h-11 rounded-lg mb-5"></li>
          </ul>
        </div>
      </div>
    </div>
  )
}


export default Preview
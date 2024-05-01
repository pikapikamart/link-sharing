import { 
  Link, 
  isLink, 
  useLinkStore } from "@/app/(client)/_store/links"
import { PhoneFrameVector } from "../../../svgs/phoneFrame"
import { GithubIcon } from "../../../svgs/github"
import { YoutubeIcon } from "../../../svgs/youtube"
import { LinkedinIcon } from "../../../svgs/linkedin"


const Preview = () =>{
  const { links } = useLinkStore()

  const buildPreviewItemData = (item: Link) =>{
    switch(item.platform) {
      case "github":
        return {
          label: "Github",
          backgroundColor: "#1A1A1A",
          icon: () => <GithubIcon />
        }
      case "youtube":
        return {
          label: "Youtube",
          backgroundColor: "#EE3939",
          icon: () => <YoutubeIcon />
        }
      case "linkedin":
        return {
          label: "Linkedin",
          backgroundColor: "#2D68FF",
          icon: () => <LinkedinIcon />
        }
    }
  }
  
  const renderItem = () =>{
    const mappedItems = Array(links.length<=5? 5 : links.length)
      .fill("")
      .map((item, index) => links[index]? links[index] : item)
      .map((item: (Link | ""), index) => (
        <li
          key={`preview-${ index }-${ isLink(item)? item.platform : "" }`} 
          className="bg-[#EEEEEE] h-11 rounded-lg mb-5"
          style={{
            backgroundColor: isLink(item)? "" : ""
          }}>

        </li>
      ))

  }

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
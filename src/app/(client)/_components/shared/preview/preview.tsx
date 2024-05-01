import { 
  Link, 
  isLink, 
  useLinksStore } from "@/app/(client)/_store/links"
import { GithubIcon } from "../../svgs/github"
import { YoutubeIcon } from "../../svgs/youtube"
import { LinkedinIcon } from "../../svgs/linkedin"
import { FrontendmentorOriginalIcon } from "../../svgs/frontendmentorOriginal"
import { TwitterIcon } from "../../svgs/twitter"
import { FacebookIcon } from "../../svgs/facebook"
import { TwitchIcon } from "../../svgs/twitch"
import { DevtoIcon } from "../../svgs/devto"
import { CodewarsIcon } from "../../svgs/codewars"
import { FreecodecampIcon } from "../../svgs/freecodecamp"
import { GitlabIcon } from "../../svgs/gitlab"
import { HashnodeIcon } from "../../svgs/hashnode"
import { StackoverflowIcon } from "../../svgs/stackoverflow"
import { ArrowRightIcon } from "../../svgs/arrowRight"
import { PhoneFrameVector } from "../../svgs/phoneFrame"


const Preview = () =>{
  const { links } = useLinksStore()

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
      case "frontendmentor":
        return {
          label: "Frontend Mentor",
          backgroundColor: "#FFFFFF",
          color: "#333333",
          icon: () => <FrontendmentorOriginalIcon />
        }
      case "twitter":
        return {
          label: "Twitter",
          backgroundColor: "#43B7E9",
          icon: () => <TwitterIcon />
        }
      case "facebook":
        return {
          label: "Facebook",
          backgroundColor: "#2442AC",
          icon: () => <FacebookIcon />
        }
      case "twitch":
        return {
          label: "Twitch",
          backgroundColor: "#EE3FC8",
          icon: () => <TwitchIcon />
        }
      case "devto":
        return {
          label: "Dev.to",
          backgroundColor: "#333333",
          icon: () => <DevtoIcon />
        }
      case "codewars":
        return {
          label: "Codewars",
          backgroundColor: "#8A1A50",
          icon: () => <CodewarsIcon />
        }
      case "freecodecamp":
        return {
          label: "freeCodeCamp",
          backgroundColor: "#302267",
          icon: () => <FreecodecampIcon />
        }
      case "gitlab":
        return {
          label: "GitLab",
          backgroundColor: "#EB4925",
          icon: () => <GitlabIcon />
        }
      case "hashnode":
        return {
          label: "Hashnode",
          backgroundColor: "#0330D1",
          icon: () => <HashnodeIcon />
        }
      case "stackoverflow":
        return {
          label: "Stack Overflow",
          backgroundColor: "#EC7100",
          icon: () => <StackoverflowIcon />
        }
    }
  }
  
  const renderItems = () =>{
    const mappedItems = Array(links.length<=5? 5 : links.length)
      .fill("")
      .map((item, index) => links[index]? links[index] : item)
      .map((item: (Link | ""), index) => (
        <li
          key={`preview-${ index }-${ isLink(item)? item.platform : "" }`} 
          className="bg-[#EEEEEE] h-11 rounded-lg mb-5 flex items-center px-4"
          style={{
            backgroundColor: isLink(item)? buildPreviewItemData(item)?.backgroundColor : "",
            border: isLink(item)? buildPreviewItemData(item)?.backgroundColor==="#FFFFFF"? "1px solid #D9D9D9" : "" : ""
          }}>
          { isLink(item) && (
            <>
              <div 
                className="mr-2"
                style={{
                  color: buildPreviewItemData(item)?.color?? "white"
                }}>
                  { buildPreviewItemData(item)?.icon() }
              </div>
              <p style={{
                color: buildPreviewItemData(item)?.color?? "white"
              }}>{ buildPreviewItemData(item)?.label }
            </p>
            <a 
              className="block ml-auto"
              style={{
                color: buildPreviewItemData(item)?.color?? "white"
              }}
              href={ item.url }
              target="_blank">
              <ArrowRightIcon />
            </a>
            </>
          ) }
        </li>
      ))

      return mappedItems
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
            { renderItems() }
          </ul>
        </div>
      </div>
    </div>
  )
}


export default Preview
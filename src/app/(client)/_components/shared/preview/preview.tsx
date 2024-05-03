import { 
  Link, 
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
import { useUserStore } from "@/app/(client)/_store/user"
import { 
  motion,
  AnimatePresence } from "framer-motion"
import { PhoneFrameVector } from "../../svgs/phoneFrame"
import { fadeVariant, swiperVariant } from "@/app/(client)/_motion/variants"


const Preview = () =>{
  const user = useUserStore()
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

  const renderItemBackgrounds = () =>{
    const mappedBackground = Array(5)
      .fill("")
      .map((_, index) => (
        <div 
          key={ `background-${ index }` }
          className="bg-[#EEEEEE] h-11 mb-5 rounded-lg" />
      ))

    return mappedBackground
  }
  
  const renderItems = () =>{
    const mappedItems = links.map((item, index) => {
      const previewItem = buildPreviewItemData(item)
    
      return (
        <motion.li
          key={`preview-${ index }-${ item.platform }`} 
          className="h-11 rounded-lg mb-5 flex items-center px-4 relative"
          style={{
            backgroundColor: previewItem.backgroundColor,
            border: previewItem.backgroundColor==="#FFFFFF"? "1px solid #D9D9D9" : ""
          }}
          variants={ swiperVariant }
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: .3,
            delay: index * .3
          }}>
          <>
            <div 
              className="mr-2"
              style={{ color: previewItem.color?? "white" }}>{ previewItem.icon() }
            </div>
            <p style={{ color: previewItem.color?? "white"}}>{ previewItem.label }</p>
            <a 
              className="block ml-auto group
              after:absolute after:inset-0"
              style={{ color: previewItem.color?? "white"}}
              href={ item.url }
              target="_blank">
              <span className="sr-only">{ previewItem.label }</span>
              <div className=" group-hover:translate-x-2 transition-transform">
                <ArrowRightIcon />
              </div>
            </a>
          </>
        </motion.li>
      )
    })

    return mappedItems
  }

  return (
    <div className="hidden bg-white rounded-lg relative lg:flex lg:items-center lg:justify-center">
      <div className="relative">
        <PhoneFrameVector />
        <div className="absolute inset-0 pt-16 px-8">
          <motion.div
            initial="initial"
            animate="animate"
            exit="initial" 
            className="flex flex-col items-center mb-14">
            <AnimatePresence>
              { !!user.image && (
                <motion.div
                  key="profilePicture"
                  variants={ fadeVariant } 
                  className="rounded-full border-4 max-w-max mx-auto border-purple mb-6">
                  <img 
                    className="w-24 h-24 rounded-full object-cover"
                    src={ user.image } 
                    alt={`${ user.firstName?? "" } ${ user.lastName?? "" }`} />
                </motion.div>
              ) }
              { !user.image && (
                <motion.div 
                  key="profilePictureBg"
                  variants={ fadeVariant }
                  className="bg-[#EEEEEE] rounded-full w-24 h-24 mb-6" />
              ) }
              { !!user.firstName && !!user.lastName?
                <motion.p
                  key="profileName"
                  variants={fadeVariant} 
                  className="font-semibold text-dark-grey text-lg mb-2">{ user.firstName } { user.lastName }</motion.p>
                :
                <motion.div
                  key="profileNameBg"
                  variants={fadeVariant} 
                  className="bg-[#EEEEEE] w-[160px] h-4 rounded-2xl mb-3"/>
              }
              { user.email!==""? 
                <motion.p 
                  key="profileEmail"
                  variants={fadeVariant} 
                  className="text-grey text-sm">{ user.email }</motion.p>
                :
                <motion.div 
                  key="profileEmailBg"
                  variants={fadeVariant} 
                  className="bg-[#EEEEEE] w-[72px] h-2 rounded-2xl" />
              }
            </AnimatePresence>
          </motion.div>
          <div className="relative">
            <div className={`transition-opacity ${ links.length >=5? "opacity-0" : "" }`}>
              { renderItemBackgrounds() }
            </div>
            <ul className="absolute top-0 right-0 left-0 max-h-[300px] overflow-y-auto no-scrollbar">
              { renderItems() }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Preview
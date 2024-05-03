import { CodewarsIcon } from "../../_components/svgs/codewars"
import { DevtoIcon } from "../../_components/svgs/devto"
import { FacebookIcon } from "../../_components/svgs/facebook"
import { FreecodecampIcon } from "../../_components/svgs/freecodecamp"
import { FrontendmentorOriginalIcon } from "../../_components/svgs/frontendmentorOriginal"
import { GithubIcon } from "../../_components/svgs/github"
import { GitlabIcon } from "../../_components/svgs/gitlab"
import { HashnodeIcon } from "../../_components/svgs/hashnode"
import { LinkedinIcon } from "../../_components/svgs/linkedin"
import { StackoverflowIcon } from "../../_components/svgs/stackoverflow"
import { TwitchIcon } from "../../_components/svgs/twitch"
import { TwitterIcon } from "../../_components/svgs/twitter"
import { YoutubeIcon } from "../../_components/svgs/youtube"
import { Link } from "../../_store/links"


export const buildPreviewItem = (item: Link) =>{
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
        icon: () => <FrontendmentorOriginalIcon />,
        outlineColor: "#68becd"
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
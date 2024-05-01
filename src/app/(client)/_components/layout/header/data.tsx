import { LinkIcon } from "../../svgs/link";
import { ProfileIcon } from "../../svgs/profile";


export const headerData = [
  {
    href: "/",
    label: "Links",
    icon: () => <LinkIcon />
  },
  {
    href: "/profile",
    label: "Profile",
    icon: () => <ProfileIcon />
  },
]
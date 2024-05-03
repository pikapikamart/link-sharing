import { ArrowRightIcon } from "@/app/(client)/_components/svgs/arrowRight"
import { buildPreviewItem } from "@/app/(client)/_lib/utils/buildPreviewItems"
import { useLinksStore } from "@/app/(client)/_store/links"
import { useUserStore } from "@/app/(client)/_store/user"


const Profile = () =>{
  const user = useUserStore()
  const { links } = useLinksStore()

  const renderLinks = () =>{

    const mappedLinks = links.map((item, index) => {
      const previewItem = buildPreviewItem(item)

      return (
        <li
          key={`preview-${ index }-${ item.platform }`} 
          className="h-11 rounded-lg mb-5 flex items-center px-4 relative md:h-14 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2"
          style={{
            backgroundColor: previewItem.backgroundColor,
            border: previewItem.backgroundColor==="#FFFFFF"? "1px solid #D9D9D9" : "",
            outlineColor: previewItem.backgroundColor
          }}>
          <>
            <div 
              className="mr-2"
              style={{ color: previewItem.color?? "white" }}>{ previewItem.icon() }
            </div>
            <p style={{ color: previewItem.color?? "white"}}>{ previewItem.label }</p>
            <a 
              className="block ml-auto group
              after:absolute after:inset-0 focus:outline-none"
              style={{ color: previewItem.color?? "white"}}
              href={ item.url }
              target="_blank">
              <span className="sr-only">{ previewItem.label }</span>
              <div className="transition-transform group-hover:translate-x-2 group-focus:translate-x-2">
                <ArrowRightIcon />
              </div>
            </a>
          </>
        </li>
      )
    })

    return mappedLinks
  }

  return (
    <div className="max-w-[350px] mx-auto rounded-3xl md:bg-white md:py-11 md:px-14 md:shadow-md">
      <div className="mb-14 text-center"> 
        <div className="rounded-full border-4 max-w-max mx-auto border-purple mb-6">
          { user.image && (
            <img 
              className="w-24 h-24 rounded-full object-cover"
              src={ user.image } 
              alt={`${ user.firstName?? "" } ${ user.lastName?? "" }`} />
          ) }
        </div>
        { (!!user.firstName || !!user.lastName ) && (
            <h1 className="mb-2 leading-[1.25] font-bold text-dark-grey text-[32px] text-center">{ user.firstName?? "" } { user.lastName?? "" }</h1>
          ) }
        <p className="text-grey break-words">{ user.email }</p>
      </div>
      <ul>
        { renderLinks() }
      </ul>
    </div>
  )
}


export default Profile
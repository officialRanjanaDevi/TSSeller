import {
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
  } from "react-share";
  
  function Share({ share, setShare,url }) {
   
    return (
      <div className="bg-black/30 fixed inset-0 z-50 flex items-center justify-center p-4">

        <div className=" relative w-full max-w-2xl max-h-full border">
          {/* <!--MODAL ITEM--> */}
          <div className=" bg-white rounded-lg shadow p-4 ">
            {/* <!--MODAL HEADER--> */}
            <div className="flex justify-between items center border-b border-gray-200 py-3">
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-gray-800">Share</p>
              </div>
  
              <div
                className=" bg-gray-300 hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full"
                onClick={() => {
                  setShare(false);
                }}
              >
                x
              </div>
            </div>
  
            {/* <!--MODAL BODY--> */}
            <div className="my-4">
              <p className="text-sm text-left">Share this link via</p>
  
              <div className="  flex gap-4 p-5 items-center ">
                <FacebookShareButton
                  // {/* Url you want to share */}
                  url={url}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <PinterestShareButton
                  // {/* Url you want to share */}
                  url={url}
                >
                  <PinterestIcon size={32} round />
                </PinterestShareButton>
                <RedditShareButton
                  // {/* Url you want to share */}
                  url={url}
                >
                  <RedditIcon size={32} round />
                </RedditShareButton>
                <WhatsappShareButton
                  // {/* Url you want to share */}
                  url={url}
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <LinkedinShareButton
                  // {/* Url you want to share */}
                  url={url}
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>
  
              <p className="text-sm">Or copy link</p>
              {/* <!--BOX LINK--> */}
              <div className="border-2 border-gray-200 flex justify-between items-center mt-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-gray-500 ml-2"
                >
                  <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
                  <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
                </svg>
  
                <input
                  className="w-full outline-none bg-transparent"
                  type="text"
                  placeholder="link"
                  value={url}
                />
  
                <button className="bg-indigo-500 text-white rounded text-sm py-2 px-5 mr-2 hover:bg-indigo-600">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Share;
  
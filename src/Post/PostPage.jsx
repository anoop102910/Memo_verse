import Image from "../Homepage/Image";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PostPage = () => {
  const {id} = useParams();
  const posts = useSelector(state=>state.posts.posts);
  const post = posts.find(post=>post._id===id);
  const {title,message,_id,image} = post;
  
  return (
    <div className="flex p-24 items-center">
      <div className="w-[60%] pr-4">
        <h1 className="text-2xl font-bold selection:bg-white selection:text-red-400">
          {title}
        </h1>
        <h3 className=" text-gray-600 my-6 selection:bg-white selection:text-yellow-500">
          #Agra #Agra Fort #Agra Pedha #Yamuna
        </h3>

        <p className=" font-bold w-[70%] leading-9 selection:bg-white selection:text-green-500">
         {message}
        </p>
      </div>

      <div className="w-[40%]">
        <Image style="w-full h-auto rounded-3xl tilt" image={image} />
      </div>
    </div>
  );
};

export default PostPage;

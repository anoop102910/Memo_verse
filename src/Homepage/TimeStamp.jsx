import { formatDistanceToNow,parseISO } from "date-fns"

const TimeStamp = ({time,style}) => {
    const timeStamp = parseISO(time);
    const timeAgo = formatDistanceToNow(timeStamp,{addSuffix:true})

  return (
    <>
    <span className={style}>{timeAgo}</span>
    </>
  )
}

export default TimeStamp

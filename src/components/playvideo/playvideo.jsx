import React, { useEffect, useState } from 'react'
import './playvideo.scss'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'

const playvideo = ({videoId}) => {

    const [apiData, setApiData] = useState(null)
    const [channelData, setChannelData] = useState(null)
    const [commentsData, setCommentsData] = useState([])

    const fetchVideoData = async ()=> {
        // Fetching Videos Data
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(videoDetails_url).then(res=>res.json()).then(data=> setApiData(data.items[0]))
    }

    const fetchChannelData = async ()=> {
        // Fetching Channel Data
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
        await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]))

        // Fetching Comment Data
        const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
        await fetch(commentData_url).then(res=>res.json()).then(data=>setCommentsData(data.items))
    }

    useEffect(()=> {
        fetchVideoData()
    },[])

    useEffect(()=> {
        fetchChannelData()
    }, [apiData])



  return (
    <div className="play-video">
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
        <div className="play-video-info">
            <p>{apiData ? value_converter(apiData.statistics.viewCount) + " Views" : "Views Here"} &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "Date Here"}</p>
            <div>
                <span><img src={like} alt="" />{apiData ? value_converter(apiData.statistics.likeCount): "Likes here"}</span>
                <span><img src={dislike} alt="" />{apiData ? value_converter(apiData.statistics.dislikeCount): "Dislikes here"}</span>
                <span><img src={share} alt="" /></span>
                <span><img src={save} alt="" /></span>
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
            <div>
                <p>{apiData ? apiData.snippet.channelTitle: "Channel Name here"}</p>
                <span>{channelData ? value_converter(channelData.statistics.subscriberCount) + " Subscribers": "Subscriber count here"}</span>
            </div>
            <button>Subscribe</button>
        </div>

        <div className="vid-description">
            <p>{apiData ? apiData.snippet.description.slice(0, 250)+ "..." : "Description here"}</p>
            <hr />
            <h4>{apiData ? value_converter(apiData.statistics.commentCount) : "Comment number here"} Comments</h4>
            {commentsData.map((item, index)=> {
                return(
                    <div key={index} className="comment">
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                            <p>{item.snippet.topLevelComment.snippet.textOriginal}</p>
                            <div className="comment-action">
                                <img src={like} alt="" />
                                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="" />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default playvideo
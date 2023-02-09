import './style.css'
import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
const tweetInput = document.getElementById('tweet-input')

document.addEventListener('click', function(e){
    // console.log(e.target.dataset)
    if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    } else if (e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    } else if (e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    } else if (e.target.id === 'tweet-btn'){
        handleTweetClick()
    } else if(e.target.dataset.delete){
        handleDeleteClick(e.target.dataset.delete)
    } else if(e.target.dataset.comment){
        handleCommentClick(e.target.dataset.comment)
    } else {
        console.log(`dataset not present`)
    }
})

function handleLikeClick(tweetId){
    const targetTweetObj = tweetsData.filter((tweet)=>{
        return tweet.uuid === tweetId
    })[0]
    if(targetTweetObj.isLiked){
        targetTweetObj.likes--     
    } else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked;
    render()
}

function handleRetweetClick(tweetId){
    // console.log(tweetId)
    const targetTweetObj = tweetsData.filter((tweet)=>{
        return tweet.uuid === tweetId
    })[0]
    // console.log(targetTweetObj)
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    } else {
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
    render()
}

function handleReplyClick(tweetId){
    document.getElementById(`replies-${tweetId}`).classList.toggle('hidden')
}

function handleTweetClick(){
    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        })
        render()
        tweetInput.value = ''
    }
    
    
    
}

function handleDeleteClick(tweetId){
    let itemIndex = tweetsData.findIndex(tweet=>{
        return tweetId === tweet.uuid
    })
    console.log(itemIndex)
    tweetsData.splice(itemIndex, 1)
    render()
}

function handleCommentClick(tweetId){
    const newComment = document.getElementById(`reply-input-${tweetId}`).value
    tweetsData.forEach((tweet)=>{
        if(tweet.uuid === tweetId){
            tweet.replies.push({
                handle: `@Scrimba`,
                profilePic: `images/scrimbalogo.png`,
                tweetText: newComment,
                uuid:uuidv4()
            })
        }
    })
    document.getElementById(`reply-input-${tweetId}`).value = ''
    render()
}

function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        let repliesHtml = ""
        if(tweet.replies.length > 0){
            tweet.replies.forEach((reply)=>{
                repliesHtml+=`<div class="tweet-reply" data-comment="${reply.uuid}">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
            </div>`
            })
            repliesHtml+=`<div class="tweet-reply">
                            <div class="tweet-inner">
                                <img src="images/scrimbalogo.png" class="profile-pic">
                                <textarea id="reply-input-${tweet.uuid}" placeholder="What's happening?"></textarea>
                                </div>
                                <button id="reply-btn" data-comment="${tweet.uuid}">Reply</button>
                            </div>`
        } else {
            repliesHtml+=`<div class="tweet-reply">
            <div class="tweet-inner">
                <img src="images/scrimbalogo.png" class="profile-pic">
                <textarea id="reply-input-${tweet.uuid}" placeholder="What's happening?"></textarea>
                </div>
                <button id="reply-btn" data-comment="${tweet.uuid}">Reply</button>
            </div>` 
        }
        let heartIconClass = tweet.isLiked ? 'liked' : ''
        let retweetIconClass = tweet.isRetweeted ? 'retweeted' : ''

        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${heartIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-trash"
                    data-delete="${tweet.uuid}"
                    ></i>
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}" data-reply="${tweet.uuid}">
        ${repliesHtml}
    </div>  
</div>
`
   })
   localStorage.setItem('localTweetsData', JSON.stringify(tweetsData))
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()


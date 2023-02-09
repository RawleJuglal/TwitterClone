import{v4 as c}from"https://jspm.dev/uuid";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function a(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=a(i);fetch(i.href,s)}})();const l=localStorage.getItem("localTweetsData")?JSON.parse(localStorage.getItem("localTweetsData")):[{handle:"@TrollBot66756542 💎",profilePic:"images/troll.jpg",likes:27,retweets:10,tweetText:`Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
                Guaranteed return on investment. HMU DMs open!!`,replies:[],isLiked:!1,isRetweeted:!1,uuid:"4b161eee-c0f5-4545-9c4b-8562944223ee"},{handle:"@Elon ✅",profilePic:"images/musk.png",likes:6500,retweets:234,tweetText:"I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀",replies:[{handle:"@TomCruise ✅",profilePic:"images/tcruise.png",tweetText:"Yes! Sign me up! 😎🛩",uuid:"7ef2d1b8-a812-43ae-b690-cde47dc7fb40"},{handle:"@ChuckNorris ✅",profilePic:"images/chucknorris.jpeg",tweetText:"I went last year😴",uuid:"4eb9af6b-d174-4529-8a69-603cd99fa278"}],isLiked:!1,isRetweeted:!1,uuid:"3c23454ee-c0f5-9g9g-9c4b-77835tgs2"},{handle:"@NoobCoder12",profilePic:"images/flower.png",likes:10,retweets:3,tweetText:"Are you a coder if you only know HTML?",replies:[{handle:"@StackOverflower ☣️",profilePic:"images/overflow.png",tweetText:"No. Onviosuly not. Go get a job in McDonald's.",uuid:"1d51a2eb-6404-4a2b-92a3-5d05d7528216"},{handle:"@YummyCoder64",profilePic:"images/love.png",tweetText:"You are wonderful just as you are! ❤️",uuid:"d6517787-cbaa-47c2-9ec7-81a0e251df45"}],isLiked:!1,isRetweeted:!1,uuid:"8hy671sff-c0f5-4545-9c4b-1237gyys45"}],o=document.getElementById("tweet-input");document.addEventListener("click",function(t){t.target.dataset.reply?p(t.target.dataset.reply):t.target.dataset.like?u(t.target.dataset.like):t.target.dataset.retweet?f(t.target.dataset.retweet):t.target.id==="tweet-btn"?g():t.target.dataset.delete?m(t.target.dataset.delete):t.target.dataset.comment?h(t.target.dataset.comment):console.log("dataset not present")});function u(t){const e=l.filter(a=>a.uuid===t)[0];e.isLiked?e.likes--:e.likes++,e.isLiked=!e.isLiked,n()}function f(t){const e=l.filter(a=>a.uuid===t)[0];e.isRetweeted?e.retweets--:e.retweets++,e.isRetweeted=!e.isRetweeted,n()}function p(t){document.getElementById(`replies-${t}`).classList.toggle("hidden")}function g(){o.value&&(l.unshift({handle:"@Scrimba",profilePic:"images/scrimbalogo.png",likes:0,retweets:0,tweetText:o.value,replies:[],isLiked:!1,isRetweeted:!1,uuid:c()}),n(),o.value="")}function m(t){let e=l.findIndex(a=>t===a.uuid);console.log(e),l.splice(e,1),n()}function h(t){const e=document.getElementById(`reply-input-${t}`).value;l.forEach(a=>{a.uuid===t&&a.replies.push({handle:"@Scrimba",profilePic:"images/scrimbalogo.png",tweetText:e,uuid:c()})}),document.getElementById(`reply-input-${t}`).value="",n()}function w(){let t="";return l.forEach(function(e){let a="";e.replies.length>0?(e.replies.forEach(s=>{a+=`<div class="tweet-reply" data-comment="${s.uuid}">
                <div class="tweet-inner">
                    <img src="${s.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${s.handle}</p>
                            <p class="tweet-text">${s.tweetText}</p>
                        </div>
                    </div>
            </div>`}),a+=`<div class="tweet-reply">
                            <div class="tweet-inner">
                                <img src="images/scrimbalogo.png" class="profile-pic">
                                <textarea id="reply-input-${e.uuid}" placeholder="What's happening?"></textarea>
                                </div>
                                <button id="reply-btn" data-comment="${e.uuid}">Reply</button>
                            </div>`):a+=`<div class="tweet-reply">
            <div class="tweet-inner">
                <img src="images/scrimbalogo.png" class="profile-pic">
                <textarea id="reply-input-${e.uuid}" placeholder="What's happening?"></textarea>
                </div>
                <button id="reply-btn" data-comment="${e.uuid}">Reply</button>
            </div>`;let r=e.isLiked?"liked":"",i=e.isRetweeted?"retweeted":"";t+=`
<div class="tweet">
    <div class="tweet-inner">
        <img src="${e.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${e.handle}</p>
            <p class="tweet-text">${e.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${e.uuid}"
                    ></i>
                    ${e.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${r}"
                    data-like="${e.uuid}"
                    ></i>
                    ${e.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${i}"
                    data-retweet="${e.uuid}"
                    ></i>
                    ${e.retweets}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-trash"
                    data-delete="${e.uuid}"
                    ></i>
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${e.uuid}" data-reply="${e.uuid}">
        ${a}
    </div>  
</div>
`}),localStorage.setItem("localTweetsData",JSON.stringify(l)),t}function n(){document.getElementById("feed").innerHTML=w()}n();

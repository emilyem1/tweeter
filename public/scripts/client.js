/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Wrap code in document.ready so jQuery will work
$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "/images/newton.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "/images/descartes.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    const $tweetsContainer = $("#tweets-container"); // target div in html
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet); // Append the tweet to the container
    }
    console.log("Tweets rendered successfully!"); // Test code
  };

  const createTweetElement = function(tweet) {
    // Create a readable date
    const createdDate = new Date(tweet.created_at);
    // Convert date to local timezone
    const formattedDate = createdDate.toLocaleString(); 
    let $tweet =
   `<article>
      <header>
        <div class="profile">
          <img src="${tweet.user.avatars}" alt="profile image"> 
          <p>${tweet.user.name}</p>
        </div>
        <p class="username">${tweet.user.handle}</p>
      </header>
      <p class="tweet-contents">${tweet.content.text}</p>
      <footer>
        <p>${formattedDate}</p>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`;
    return $tweet;
  };

  renderTweets(data);
});
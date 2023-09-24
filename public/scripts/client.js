const loadTweets = function() {
  $.ajax({
    type: "GET",
    url: "/tweets",
    success: function(response) {
      renderTweets(response);
    },
  });
};
loadTweets();

const renderTweets = function(tweets) {
  // Target div in html
  const $tweetsContainer = $("#tweets-container"); 
  /* Sort the tweets by 'created_at' property in descending order. If 'a' is positive it's newer, if 'a' is negative it's older. */
  tweets.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.append($tweet); // Puts the tweet, now in html, into div
  }
};

// Prevent XSS with escaping
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  let $tweet =
   `<article>
      <header>
        <div class="profile">
          <img src="${tweet.user.avatars}" alt="profile image"> 
          <p>${escape(tweet.user.name)}</p>
        </div>
        <p class="username">${escape(tweet.user.handle)}</p>
      </header>
      <p class="tweet-contents">${escape(tweet.content.text)}</p>
      <footer>
        <p>${timeago.format(tweet.created_at)}</p>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`;
  return $tweet;
};

$(document).ready(function() {
  const $submitButton = $("#submit-button");
  $submitButton.on('click', function(event) {
    event.preventDefault();
    const formData = $("#tweet-text").serialize(); // The content of the form
    const tweetText = $("#tweet-text").val(); // The value of the form
    console.log(formData);
    if (!tweetText) {
      $("#max-limit").slideUp(); // Hide previous error messages 
      $("#no-text").slideDown();
    } else if (tweetText.length > 140) {
      $("#no-text").slideUp(); 
      $("#max-limit").slideDown();
    } else {
      $("#no-text, #max-limit").slideUp(); 
      console.log('Button clicked, performing ajax call...');
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData,
        success: function() {
          console.log('AJAX request successful!');
          location.reload();
        },
        error: function(error) {
          console.error('AJAX request failed:', error);
        }
      });
    }
  });
});
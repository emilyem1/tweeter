// Wrap code in document.ready so jQuery will work
$(document).ready(function() {

  const $submitButton = $("#submit-button");
  $submitButton.on('click', function(event) {
    event.preventDefault();
    const formData= $("#tweet-text").serialize(); // Input into textarea 
    console.log(formData);
    console.log('Button clicked, performing ajax call...');
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: formData,
      success: function() {
        console.log('AJAX request successful!');
      },
      error: function(error) {
        console.error('AJAX request failed:', error);
      }
    });
  });

  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: function(response) {
        renderTweets(response);
      },
    });
  }
  loadTweets();

  const renderTweets = function(tweets) {
    const $tweetsContainer = $("#tweets-container"); // Target div in html
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet); // Append the tweet to the container
    }
  };

  const createTweetElement = function(tweet) {
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
});
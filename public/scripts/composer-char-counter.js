// For the counter behaviour:

$(document).ready(function() {
  $(".new-tweet textarea").on('input', function() {
    // Wrap 'this' in a jQuery object
    const textareaValue = $(this).val();
    const length = textareaValue.length;
    let charactersLeft = 140 - length;
    // Find the counter element by traversing the DOM tree
    const counter = $(this).closest('form').find('.counter');
    // Update the counter text
    counter.text(charactersLeft);
    if (charactersLeft < 0) {
      counter.addClass('red-text');
    } else {
      counter.removeClass('red-text');
    }
  });
});


// For the counter behaviour: 

$(document).ready(function() {
  $(".new-tweet textarea").on('input', function() {
    // Wrap 'this' in a jQuery object
    var textareaValue = $(this).val();
    var length = textareaValue.length;
    var charactersLeft = 140 - length;
    // Find the counter element by traversing the DOM tree
    var counter = $(this).closest('form').find('.counter');
    // Update the counter text
    counter.text(charactersLeft);
        if (charactersLeft < 0) {
      counter.addClass('red-text');
    } else {
      counter.removeClass('red-text');
    }
  });
});


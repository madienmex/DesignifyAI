// Signup Form.
(function() {

  // Vars.
  var $form = document.querySelectorAll('#signup-form')[0],
      $submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
      $message;

  // Bail if addEventListener isn't supported.
  if (!('addEventListener' in $form))
    return;

  // Message.
  $message = document.createElement('span');
  $message.classList.add('message');
  $form.appendChild($message);

  $message._show = function(type, text) {

    $message.innerHTML = text;
    $message.classList.add(type);
    $message.classList.add('visible');

    window.setTimeout(function() {
      $message._hide();
    }, 3000);

  };

  $message._hide = function() {
    $message.classList.remove('visible');
  };

  // Events.
  $form.addEventListener('submit', function(event) {

    // Prevent the form from submitting normally
    event.preventDefault();
    event.stopPropagation();

    // Hide message.
    $message._hide();

    // Disable submit.
    $submit.disabled = true;

    // Capture the form data
    var email = document.getElementById('email').value;

    // Send the form data to the Flask server with Fetch
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'email=' + encodeURIComponent(email),
    })
    .then(response => response.text())
    .catch((error) => {
      console.error('Error:', error);

      // Enable submit.
      $submit.disabled = false;

      // Show message.
      $message._show('failure', 'Something went wrong. Please try again.');
    })
    .then(data => {
      console.log(data);
      
      // Reset form.
      $form.reset();

      // Enable submit.
      $submit.disabled = false;

      // Show message.
      $message._show('success', 'Thank you!');
    })
    .catch((error) => {
      console.error('Error:', error);

      // Enable submit.
      $submit.disabled = false;

      // Show message.
      $message._show('failure', 'Something went wrong. Please try again.');
    });
  });

})();

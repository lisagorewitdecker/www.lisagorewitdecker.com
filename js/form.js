$(function() {
  function after_form_submitted($form, data) {
    var $errorMessage = $("#error_message");
    var $errorDetails = $errorMessage.find(".error-details");

    if (!$errorDetails.length) {
      $errorDetails = $('<div class="error-details"></div>').appendTo(
        $errorMessage
      );
    }

    if (data.result === "success") {
      $("form#reused_form").hide();
      $("#success_message").show();
      $errorDetails.empty();
      $errorMessage.hide();
    } else {
      var errorFragment = document.createDocumentFragment();

      $.each(data.errors, function(key, val) {
        var errorItem = document.createElement("p");

        errorItem.appendChild(document.createTextNode(key + ": " + val));
        errorFragment.appendChild(errorItem);
      });

      $errorDetails.empty().append(errorFragment);
      $("#success_message").hide();
      $errorMessage.show();

      //reverse the response on the button
      $('button[type="button"]', $form).each(function() {
        var $btn = $(this);
        var label = $btn.prop("orig_label");

        if (label) {
          $btn.prop("type", "submit");
          $btn.text(label);
          $btn.prop("orig_label", "");
        }
      });
    } //else
  }

  $("#reused_form").submit(function(e) {
    e.preventDefault();

    var $form = $(this);

    //show some response on the button
    $('button[type="submit"]', $form).each(function() {
      var $btn = $(this);

      $btn.prop("type", "button");
      $btn.prop("orig_label", $btn.text());
      $btn.text("Sending ...");
    });

    $.ajax({
      type: "POST",
      url: "handler.php",
      data: $form.serialize(),
      success: function(data) {
        after_form_submitted($form, data);
      },
      dataType: "json"
    });
  });
});

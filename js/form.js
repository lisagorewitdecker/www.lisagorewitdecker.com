$(function() {
  function after_form_submitted(data) {
    if (data.result == "success") {
      $("form#reused_form").hide();
      $("#success_message").show();
      $("#error_message").hide();
    } else {
      var $errorList = $("#error_message ul");
      if (!$errorList.length) {
        $errorList = $("<ul></ul>").appendTo("#error_message");
      }
      $errorList.empty();

      jQuery.each(data.errors, function(key, val) {
        $("<li></li>")
          .text(key + ":" + val)
          .appendTo($errorList);
      });
      $("#success_message").hide();
      $("#error_message").show();

      //reverse the response on the button
      $('button[type="button"]', $form).each(function() {
        $btn = $(this);
        label = $btn.prop("orig_label");
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

    $form = $(this);
    //show some response on the button
    $('button[type="submit"]', $form).each(function() {
      $btn = $(this);
      $btn.prop("type", "button");
      $btn.prop("orig_label", $btn.text());
      $btn.text("Sending ...");
    });

    $.ajax({
      type: "POST",
      url: "handler.php",
      data: $form.serialize(),
      success: after_form_submitted,
      dataType: "json"
    });
  });
});

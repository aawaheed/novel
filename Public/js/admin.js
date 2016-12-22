$(function() {
  $(".editor-container").each(function() {
    var quill = new Quill(this, {
      modules: {
        toolbar: [
          ['bold', 'italic'],
          ['link', 'blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }]
        ]
      },
      placeholder: '',
      theme: 'snow'
    });
	});

  $("#form").submit(function(event) {
    $(this).find('.editor-container').each(function() {
      var id = 'field_' + this.id.replace('editor_', '');
      var value = $(this).find(".ql-editor").html();
      $('#' + id).val(value);
    });
  });
});

$(function() {
  $('body').on('keyup', '.auto-title', function(event) {
    var value =  $(this).val();
    $(this).parent().next(".form-group").find("input").val(value.toLowerCase());
  });
});

$(function() {
  checkRemoveButton();

  // Add a new field
  $('body').on('click', '#new-field-btn', function(event) {
		event.preventDefault();

    var field = $(this).prev(".field-group")

    if (!field.length) {
      return false;
    }

    var template = field.clone();

    template.find('input,select,textarea').each(function() {
      $(this).val('');
    }).end().insertAfter(field);

    checkRemoveButton();
	});

  // Remove a field
  $('body').on('click', 'button.remove-field-btn', function(event) {
    event.preventDefault();

    $(this).closest('.field-group').fadeOut(300, function() {
      $(this).remove();
      checkRemoveButton();
      return false;
    });
  });

  // Build fields json before submit
  $("#form").submit(function(event) {
    var fields = [];

    $(this).find('.field-group').each(function() {
      var field = {
        "name": $(this).find("input[name='field_names[]']").val(),
        "handle": $(this).find("input[name='field_handles[]']").val(),
        "kind": $(this).find("select option:selected").val()
      };

      var id = $(this).find("input[name='field_ids[]']");

      if (!id.length) {
        field["id"] = id.val()
      }

      fields.push(field)
    });

    $('#fields').val(JSON.stringify(fields));
  });
});

// Hide/show remove button
function checkRemoveButton() {
  var buttons = $("form .remove-field-btn")

  if (buttons.length == 1) {
    buttons.hide()
  } else {
    buttons.show();
  }
}

$(function () {
	// Toggle sidebar
	$('#sidebar-collapse-btn').on('click', function(event){
		event.preventDefault();

		$("#app").toggleClass("open");
		$("#sidebar").toggleClass("open");
	});

	// Set active navigation item
  $('#sidebar-menu > li > a[href="' + document.location.pathname + '"]').parent().addClass('active');

	// Set active submenu item
  $('#submenu a[href="' + document.location.pathname + '"]').parent().addClass('active');
});

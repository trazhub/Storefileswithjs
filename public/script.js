$('.menu .item').tab();
$('.ui.dropdown').dropdown();

$('.ui.apply.preset.button').click(function() {
  $('.ui.apply.preset.modal').modal('show');
});
$('#unchanged input:checkbox').change(function() {
    // $this will contain a reference to the checkbox   
    if (this.checked) {
        // the checkbox was checked 
      $('.unchanged.row').show();
    } else {
        // the checkbox was unchecked
      $('.unchanged.row').hide();
    }
});

$('.ui.download.firmware.button').click(function() {
  $('.ui.download.firmware.modal').modal('show');
});

$('.ui.install.firmware.button').click(function() {
  $('.ui.install.firmware.modal').modal('show');
});
$( document ).ready(function() {
  $('#table_abbreviations').dataTable( {
    processing: true,
    serverSide: true,
    ajax:  {url:"cappeli_min.json",dataSrc:""},
    columnDefs: [{
      "defaultContent": "-",
      "targets": "_all"
    }]
  } );

});
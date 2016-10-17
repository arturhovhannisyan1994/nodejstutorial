$(document).on('change','#categoriesId',function(){
    var categoryId = $('#categoriesId :selected').val();
    $.get( "/products/getSubCegories/"+ categoryId)
        .done(function( data ) {
            alert( "Data Loaded: " + data );
        });
});
$(document).on('ready',function(){
    var categoryId = $('#categoriesId :selected').val();
    $.get( "/products/getSubCegories/"+ categoryId)
        .done(function( data ) {
            var options = '';
            $.each(data, function(i,d) {
                console.log(d)
                $('#SubCategoryId')
                    .append($("<option></option>")
                        .attr("value",d.SubCategoryId)
                        .text(d.SubCategoryName));
                //options+='<option value="'+d.SubCategoryId+'">'+d.SubCategoryName+'</option>'

            });
           // $('#SubCategoryId').append(options);
        });
});


$('document').ready(function()
{ 
     /* validation */
	 $("#login-form").validate({
      rules:
	  {
			password: {
			required: true,
			},
			user_email: {
            required: true
            },
	   },
       messages:
	   {
            password:{
                      required: "Por favor ingrese su Clave"
                     },
            user_email: "por favor ingrese su Usuario",
       },
	   submitHandler: submitForm	
       });  
	   /* validation */
	   
	   /* login submit */
	   function submitForm()
	   {		
			var data = $("#login-form").serialize();
				
			$.ajax({
				
			type : 'POST',
			url  : 'login_process.php',
			data : data,
			beforeSend: function()
			{	
				$("#error").fadeOut();
				$("#btn-login").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; comprobando ...');
			},
			success :  function(response)
			   alert(response);{
               var n = response.indexOf("ok");
			   console.log(response);

					if(n > 0){
						$("#btn-login").html('<img src="includes/images/btn-ajax-loader.gif" /> &nbsp; Ingresando ...');
						//setTimeout(' window.location.href = "home.php"; ',4000);
					}
					else{
						$("#error").fadeIn(1000, function(){
				                            $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; ['+response+'] !</div>');
											$("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Ingresar');
									});
					}
			  }
			});
				return false;
		}
	   /* login submit */
});

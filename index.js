



$(document).ready(function(){
	$('#list').hide();
	$('button[name=submit]').on('click',function(e){
		var page = 1;
		var input = $('#title').val();
		// clear the list article
		$('#list').html("");
		$.ajax({
			type: "get",
			dataType:'json',
			url: 'http://www.omdbapi.com/?apikey=c22bc403&' +'s=' + input+'&page='+page,
			success: function(resp){
				$.each(resp.Search,function(index,movie){
					$('#list').append("<div class=page-header>"+"<h1>"+movie.Title+"</h1>"+"</div>");
					$('#list').append('<p>Released in: '+movie.Year+'</p>');
					$('#list').append('<img src=\''+movie.Poster+'\'>');
					$('#list').append('<br>');
				});
					$('#list').show();
					infiniteScroll();
			},
			error: function(req,status,error){
				console.log(req+status+error);
			},
			complete: function(){
				$('#butt').html("Submit");
			}
		});

		var infiniteScroll = function(){
			$(window).on('scroll',function(e){
				if($(window).scrollTop()==($(document).height()-$(window).height())){
					page += 1;
					console.log(page);
					$.ajax({
						type: "get",
					dataType:'json',
					url: 'http://www.omdbapi.com/?apikey=c22bc403&' +'s=' + input+'&page='+page,
					success: function(resp){
						console.log("scrolled");
						$.each(resp.Search,function(index,movie){
							$('#list').append("<div class=page-header>"+"<h1>"+movie.Title+"</h1>"+"</div>");
							$('#list').append('<p>Released in: '+movie.Year+'</p>');
							$('#list').append('<img src=\''+movie.Poster+'\'>');
							$('#list').append('<br>');
						});
							$('#list').show();
					},
					error: function(req,status,error){
						console.log(req+status+error);
					},
					complete: function(){
						$('#butt').html("Submit");
					}
					})
				}

			});
		};

		
		$('#butt').html("loading");
		return false;
	});
});
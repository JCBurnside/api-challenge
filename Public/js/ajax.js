const API_KEY="5e608d12772d3c6632c55c940c54292d",
	API_FORMAT_URL="https://api.vagalume.com.br/search.%s",
	API_FORMAT_SONGS="artmus?q=%s&limit=%d&apikey=%s",
	API_FORMAT_LYRIC="php?art=%s&mus=%s&apikey=%s",
	API_FORMAT_SONG_LYRIC="php?musid=%s&apikey=%s"
	OUTPUT_FORMAT_LYRIC="\
			<h3 id='songName'>%s</h3><br/>\
			<h5>lyrics</h5><p>%s</p>",
	OUTPUT_FORMAT_LIST_SONGS="<li class='song' id='%s'>%s</li>";
$(()=>{
	$(document).delegate('input','keyup',(e)=>{
		if(e.key=="Enter")$('#submit').click();
		console.log(e.key=="Enter")
	})
	if(!String.prototype.format)throw "EXTENSION REQUIRED";
	var $artist=$('#artist'),
		$song=$('#song'),
		$limit=$('#limit'),
		$output=$('#output');
	$output.delegate('.song','click',(e)=>{
		let id=$(e.target)[0].id;
		$.ajax({
			type:"GET",
			url:API_FORMAT_URL.format(API_FORMAT_SONG_LYRIC.format(id,API_KEY))
		})
		  .done((res)=>{
		  	console.log("GOT SONG");
		  	$output.empty();
		  	$output.append(OUTPUT_FORMAT_LYRIC.format(res.mus[0].name,res.mus[0].text))
		  })
	})
	$('#submit').click(()=>{
		let artist=$artist.val(),
			song=$song.val(),
			limit=$limit.val();
		$artist.val("");$song.val("");$limit.val("");
		$output.empty();
		limit=eval(limit);
		if(!song){
			$.ajax({
				type:"GET",
				url:API_FORMAT_URL.format(API_FORMAT_SONGS.format(artist,limit||5,API_KEY))
			})
			.done((res)=>{
				console.log(res.response);
				var titles=res.response.docs;
				if(titles[0]&&!titles[0].title)titles.shift()
				if (titles.length > 0) {
					$output.append("<ul>");
					titles.forEach(element=>{console.log(element);$output.find('ul').append(OUTPUT_FORMAT_LIST_SONGS.format(element.id||'',element.title||'ERROR'))});
					$output.append("</ul>");
				}else{
					$output.append("<h3 style='color:red;'>ARTIST NOT FOUND</h3>")
				}
			})
		}else{
			$.ajax({
				type:"GET",
				url:API_FORMAT_URL.format(API_FORMAT_LYRIC.format(artist,song,API_KEY))
			}).done(res=>{
				$output.append(OUTPUT_FORMAT_LYRIC.format(res.mus[0].name,res.mus[0].text.replace(/\r|\n|\r\n/g,"<br/>")))
			})
		}
	})
})
$(function(){
  //var url = (window.location.hostname == 'localhost') ? 'http://anyorigin.com/go?url=https%3A//www.medium.com/@zclassic/latest%3Fformat%3Djson' : 'https://medium.com/@btcprivate/latest?format=json';
  //var url = (window.location.hostname == 'localhost') ? 'http://anyorigin.com/go?url=https%3A//www.medium.com/@metaversial/latest%3Fformat%3Djson' : 'https://medium.com/@btcprivate/latest?format=json';
	var url = '/javascript/posts.json';
  $.getJSON(url).done(function(response){
    //var contents = decodeURIComponent(escape(response.contents));
		var contents = response;
    //var data = JSON.parse(contents.replace("])}while(1);</x>", '')).payload;
		var data = contents.payload;

    // User data
		var user = data.references.User;
		var userImageUrl = 'https://cdn-images-1.medium.com/fit/c/72/72/' + user.imageId;
		var userName = user.name;

    // Posts data
	  var posts = data.references.Post;

    // Posts HTML
	  var postsHtml = ''
	  Object.keys(posts).forEach(function(postId){
			// Post data
	    var post = posts[postId];
      var url = 'https://medium.com/@' + user.username + '/' + post.uniqueSlug;
			var currentYear = moment('YYYY').utc
			var publishDate = moment(post.latestPublishedAt).format('MMM Do');
			var readTime = ;
			var title = ;
			var paragraphs = ;

      // Post HTML
      var postHtml = '<div class="post-article">'
			             + '  <div class="post-header">'
			             + '    <div class="post-avatar">'
			             + '      <img src="' + userImageUrl + '">'
			             + '    </div>'
			             + '    <div class="post-meta">'
			             + '      <div class="post-author">' userName
			             + '      </div>'
			             + '      <div class="post-time">' 
			             + '        <div class="post-date">' publish date
			             + '        </div>'
			             + '        <div class="post-divider">'
			             + '          &#183;'
			             + '        </div>'
			             + '        <div class="post-read">' readTime
			             + '        </div>'
			             + '      </div>'
			             + '    </div>'
			             + '  </div>'
			             + '  <div class="post-body">' link to medium post
			             + '    <h3>' post title
			             + '    </h3>'
			             + '    <figure class="post-figure">' post image
			             + '    </figure>'
			             + '    <p></p>' post heading
			             + '    <p></p>' post subheading
			             + '  </div>'
			             + '  <div class="post-footer">'
			             + '    <a href="' + url + '">Read more...</a>'
			             + '  </div>'
			             + '</div>'
			postsHtml += postHtml;
		})
		$('#posts').html(postsHtml);
  });
});
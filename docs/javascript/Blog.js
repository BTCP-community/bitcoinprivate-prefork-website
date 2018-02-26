$(function(){
  //var url = (window.location.hostname == 'localhost') ? 'http://anyorigin.com/go?url=https%3A//www.medium.com/@zclassic/latest%3Fformat%3Djson' : 'https://medium.com/@btcprivate/latest?format=json';
  //var url = (window.location.hostname == 'localhost') ? 'http://anyorigin.com/go?url=https%3A//www.medium.com/@metaversial/latest%3Fformat%3Djson' : 'https://medium.com/@btcprivate/latest?format=json';
	var url = '/javascript/posts.json';
  $.getJSON(url).done(function(response){
    //var contents = decodeURIComponent(escape(response.contents));
    //var data = JSON.parse(contents.replace("])}while(1);</x>", '')).payload;
		var data = response;

    // Users data
		var users = data.references.User;

    // Posts data
	  var posts = data.references.Post;

    // Posts HTML
	  var postsHtml = ''
	  Object.keys(posts).forEach(function(postId){
			// Post data
	    var post = posts[postId];

      // User data
			var user = users[post.creatorId];
			var username = user.username;
			var userName = user.name;
			var userImageUrl = 'https://cdn-images-1.medium.com/fit/c/72/72/' + user.imageId;

      // Post metadata
      var url = 'https://medium.com/@' + username + '/' + post.uniqueSlug;
			var currentYear = moment().year();
			var publishYear = moment(post.latestPublishedAt).year();
			var publishDate = (currentYear == publishYear) ? moment(post.latestPublishedAt).format('MMM Do') : moment(post.latestPublishedAt).format('MMM Do, YYYY');
			var readTime = Math.round(post.virtuals.readingTime);
			var title = post.title;

      // Post body
			var paragraphs = post.previewContent.bodyModel.paragraphs;
			var postBody = '';
			paragraphs.forEach(function(paragraph){
				var text = paragraph.text.replace("\n", '<br/>');
				paragraphText = '<p>' + text + '</p>';
				postBody += paragraphText;
			});

      // Post HTML
      var postHtml = '<div class="post-article">'
			             + '  <div class="post-header">'
			             + '    <div class="post-avatar">'
			             + '      <img src="' + userImageUrl + '">'
			             + '    </div>'
			             + '    <div class="post-meta">'
			             + '      <div class="post-author">' + userName + '</div>'
			             + '      <div class="post-time">'
			             + '        <div class="post-date">' + publishDate + '</div>'
			             + '        <div class="post-divider">&#183;</div>'
			             + '        <div class="post-read">' + readTime + ' min read</div>'
			             + '      </div>'
			             + '    </div>'
			             + '  </div>'
			             + '  <a href="' + url + '"><div class="post-body">' + postBody + '</div></a>'
			             + '  <div class="post-footer">'
			             + '    <a href="' + url + '">Read more...</a>'
			             + '  </div>'
			             + '</div>';
			postsHtml += postHtml;
		});
		$('#posts').html(postsHtml);
  });
});
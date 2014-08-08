$(document).ready(function () {
    
    var i = 0,
        offset = 0, 
        total_results,
        rounded;
    $('#prev').addClass('disabled');
    
    // function to round the total results to the nearest 5
    function round5(x) {
        rounded = 5 * Math.round(x/5);
        return rounded;
    }
    
    // get the post data
    function get_posts(num_offset) {
        
        offset = num_offset, 
            url = 'http://www.bootstrap.local/wordpress/wp-json/posts?filter[posts_per_page]=5&filter[offset]=' + offset;
        
        $.ajax({
              type: 'GET',
              dataType: "json",
              url: url,
              success: function (data) {
                  for (i = 0; i <= data.length -1; i += 1){
                    $('.current-posts-template #posts').append('<li><a href="' + data[i].link + ' " target="_blank">' + data[i].title + '</a></li>');
                      
                  }
                  
                  console.log(url);
                }
        });
        
        // second ajax call to get the total number of posts
        $.ajax({
              type: 'GET',
              dataType: "json",
              url: 'http://www.bootstrap.local/wordpress/wp-json/posts?filter[posts_per_page]=-1',
              success: function (data) {
                  total_results = data.length;
                  round5(total_results);
                }
        });
        
    
    }
    
    
    
    
    
    // Set the offset based on next/previous button
    function set_offset (direction) {
        switch(direction){
            case 'prev':
                offset-=5;
                return offset;
            
            case 'next':
                offset+=5;
                return offset;
        }
    }
    

    
     // On previous link click event set the offset, clear list, and then get posts
    $('#prev').on('click', function (e) {
        // check was offset is set to, disabling/enabling the links
        if (offset == 0) {
            e.preventDefault();
            
        } else if (offset > 0) {
            set_offset($(this)[0].id);
            $('.current-posts-template #posts').empty();
            get_posts(offset);
            
            if ((offset) == 0) {
                $(this).addClass('disabled');
            }else {
                $('#next').removeClass('disabled');
            }
        }
    });
    
    // On next link click event set the offset, clear list, and then get posts
    $('#next').on('click', function (e) {
        // check was offset is set to, disabling/enabling the links
        if (offset >= 0 && offset != rounded) {
            set_offset($(this)[0].id);
            $('.current-posts-template #posts').empty();
            get_posts(offset);
            
            if ((offset) == rounded) {
                $(this).addClass('disabled');
            } else {
                $('#prev').removeClass('disabled');
            }
        } else if (offset == rounded) {
            e.preventDefault();
        }
    });
    
    
    //initalization 
    get_posts(offset);
    
    
});
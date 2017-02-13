//listen for form  submit
document.getElementById('myForm').addEventListener('submit', saveBookMarK);

//save bookmark
function saveBookMarK(e){
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    if(!validateForm(siteName, siteUrl)){
    	return false;
    }

    var bookmark = {
    	name: siteName,
    	url: siteUrl
    }
    
    console.log(bookmark)
    //local storage test
    // localStorage.setItem('test', 'HelloWord');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test';)
    // console.log(localStorage.getItem('test'));
    
    //test if Bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        //Init array    
        console.log('JESUSUSUSU')
        var bookmarks = [];
        //Add to array;
        bookmarks.push(bookmark);
        //Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    } else{
    	//Get bookmarks from LocalStorage
    	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    	//Add bookmark to array
    	bookmarks.push(bookmark);
    	// Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    //Re-fetch bookmarks
    fetchBookmarks();
    //prevent form from submiting
	e.preventDefault();
}

    //Delete bookmark
    function deleteBookmark(url){
    	//get bookmarks from localstorage
    	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Loop throught bookmarks

        for(var i = 0 ; i < bookmarks.length; i++){
            if(bookmarks[i].url === url){
            	//Remove from array
            	bookmarks.splice(i, 1);
            }	
        }

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 
        //Re-fetch bookmarks
        fetchBookmarks();


    }

//Fetch bookmarks
function fetchBookmarks(){
	//Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    console.log(bookmarks);
    //get output id
    var bookmarksResults = document.getElementById('bookmarksResults');
   bookmarksResults.innerHTML = '';
    //Build output
    
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarksResults.innerHTML += '<div class="well">'+
                                        '<h3>'+name+
                                        '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                        '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a>'    
                                        '</h3>'+             
                                       '<div/>';  
    }

}

function validateForm(siteName , siteUrl){
	if(!siteName || !siteUrl){
    	alert('Please fill in the form');
    	return false;
    }
    
;
    var regex = new RegExp(/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+?:(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/);
    
    if(!siteUrl.match(regex)){
    	alert('Please use a valid URL');
    	return false;
    }

    return true;
}
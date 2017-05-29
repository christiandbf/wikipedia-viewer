function ajaxSearhArticles(article) {
    if (article == "") {
        $("#search-results").empty().append('<p class="center-align">Please, insert a word</p>')
    } else {
        $.ajax({ 
        url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + article + "&prop=info&inprop=url&utf8=&format=json",
        dataType: "jsonp",
        beforeSend: function() {
            $("#search-results").empty();
            $("#search-results").append(`
                <div class="progress">
                    <div class="indeterminate"></div>
                </div>
            `);
        },
        success: function(response) {
            console.log(response);
            $("#search-results").empty();
            response.query.search.forEach(function(element) {
                $("#search-results").append(`
                    <div class="row">
                        <div class="col s12">
                            <div class="card teal lighten-2">
                                <div class="card-content white-text">
                                    <span class="card-title">${element.title}</span>
                                    <p>${element.snippet}</p>
                                </div>
                            </div>
                        </div>
                    </div>                    
                `);
            }, this);        
        },
        error: function () {
            alert("<p>Error retrieving search results, please refresh the page</p>");
        }
        });        
    }
}

$(document).ready(function () {        
    $("#search-button").click(function() {
        event.preventDefault();
        var article = $("#article-to-find").val();
        ajaxSearhArticles(article);            
    });
});
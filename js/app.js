/*==| Fetch Data From API Section Start |==*/
const loadAllCategories = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data.news_category;
}
/*==| Fetch Data From API Section End |==*/

/*==| Display All Categories Section Start |==*/
const displayAllCategories = async () => {
    const categories = await loadAllCategories();
    const categoriesContainer = document.getElementById('categories-menu');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <a href="#" onclick="loadNewsCatgoryInfo('${category.category_id}', '${category.category_name}')" class="text-decoration-none active text-secondary px-3 py-2">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(categoryDiv);
    });
}
displayAllCategories();
/*==| Display All Categories Section End |==*/

/*==| Load All News Categories Blog Section Start |==*/
const loadNewsCatgoryInfo = async (categoryId, categoryName) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCategoriesInfo(data.data, categoryName);
}
/*==| Load All News Categories Blog Section End |==*/

/*==| Display News Categories Blog Section Start |==*/
const displayNewsCategoriesInfo = (newsCategories, categoryName) => {
    console.log(newsCategories)
   

    const newsCategoriesContainer = document.getElementById('news-catgories-container');
    newsCategoriesContainer.innerHTML = '';
    newsCategories.forEach(category => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        const {name, published_date, img} = category.author; 
        const {number, badge} = category.rating;
        newsDiv.innerHTML = `
            <div onclick= "loadNewsDetails('${category._id}')" class="card rounded-4 shadow p-3">
            <div class="row">
                <div class="col-md-3">
                    <img src="${category.thumbnail_url}" class="card-img-top" alt="...">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <h4 class="card-title mb-3 fw-bold">${category.title}</h4>
                        <p class="card-text mb-4">${category.details.slice(0,450)}...</p>
                        <div class="card-footer-sec">
                            <div class="row d-flex align-items-center">
                                <div class="col-md-4 d-flex align-items-center  ">
                                    <div class="author-img w-25">
                                        <img src="${img}" class="img-fluid w-75 h-75 rounded-circle"  alt="">
                                    </div>
                                    <div class="author-details ">
                                            <h6 class="mb-0 fw-bold">${name}</h6>
                                            <div class="date pt-1">
                                                <p class="mb-0">${published_date}</p>
                                            </div>
                                    </div>
                                </div>
                                <!--Author Details End-->
                                <div class="col-md-2 view d-flex justify-content-center">
                                    <h5 class="fw-bolder mb-0"><span class="me-2"><i class="fa-solid fa-eye"></i></span><span>${category.total_view}</span></h5>
                                </div>
                                <!--Review Section-->
                                <div class="col-md-3 view d-flex justify-content-center">
                                    <p class="mb-0">${badge}<span class="ms-2 fw-bold">${number}<i class="fa-solid fa-star ms-1"></i></span></p>
                                </div>
                                <!--Blog detail button Section-->
                                <div class="col-md-3 view d-flex justify-content-end">
                                    <a href="#" class="mb-0 text-decoration-none">Read More <i class="fa-sharp fa-solid fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    newsCategoriesContainer.appendChild(newsDiv);
    });
   

}
/*==| Display News Categories Blog Section End |==*/


/*==| Load News Details Section Start|==*/
const loadNewsDetails = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}
/*==| Load News Details Section End|==*/

/*==| Display News Details Section Start|==*/
// display news details on modal
const displayNewsDetails = (news) => {
    console.log(news);
    const modalBody = document.getElementById('modal-body');
    const {image_url, title, author, details, total_view, rating} = news;
    modalBody.innerHTML = `
        <div class="card border-0">
        <div class="row p-3 d-flex align-items-center">
            <div class="col-md-12 text-center">
                <img src="${image_url}" class="card-img" alt="News Image">
            </div>
            <div class="col-md-12">
                <div class="card-body">
                    <h4 class="card-title">${title}</h4>
                    <div class="d-flex align-items-center flex-wrap gap-3 py-3">

                        <div class="d-flex align-items-center gap-2">
                            <img class="rounded-pill" src="${author.img}" style="margin-top: -10px; width:40px; height: 40px;" alt="author">
                            <p>${author.name === '' ? author.name = 'Name Not Found' : author.name}</p>
                        </div>
                        <div>
                            <p class=""><i class="fa-sharp fa-solid fa-calendar-days me-1"></i> ${author.published_date === null ? 'Date Not Found' : author.published_date}</p>
                        </div>
                    </div>
                    <p class="card-text text-secondary">${details}</p>
                    <div>
                        <ul class="d-flex justify-content-between flex-wrap list-unstyled pt-3">
                            <li><i class="fa-regular fa-eye me-1"></i>  ${total_view}</li>
                            <li ><span class="me-3">${rating.badge} </span>${rating.number} <i class="fa-solid fa-star ms-1"></i></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
        `;
}
/*==| Display News Details Section End|==*/
// displayNewsCategoriesInfo('01');

loadNewsCatgoryInfo('01');
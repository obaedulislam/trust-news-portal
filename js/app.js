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
    console.log(categories)
    const categoriesContainer = document.getElementById('categories-menu');
    categories.forEach(category => {
        console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <a class="text-decoration-none active text-secondary px-3 py-2" href="#">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(categoryDiv);
    });
}
displayAllCategories();
/*==| Display All Categories Section End |==*/
loadAllCategories();
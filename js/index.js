

const treeCatergoris = document.getElementById("tree-categories");
const allPlantsDiv = document.getElementById("all-plants");
const allCardDiv = document.getElementById("all-plants")

const addTocard = [];


const catagorisTree = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => {
            const treeDiv = data.categories;
            displayCategories(treeDiv);
        })
        .catch(err => console.log(err));
};


const displayCategories = (treeDiv) => {
    treeDiv.forEach(cat => {
        treeCatergoris.innerHTML += `
            <div id="${cat.id}" class="text-[16px] font-normal space-y-2">
                <ul>
                    <li id="${cat.id}" class="text-[16px] font-normal p-3 cursor-pointer">
                        ${cat.category_name}
                    </li>
                </ul>
            </div>
        `;
    });


    treeCatergoris.addEventListener('click', (e) => {
        const allli = document.querySelectorAll("li");
        allli.forEach(li => {
            li.classList.remove("bg-green-800", "text-white", "rounded-md");
        });


        const li = e.target.closest("li");
        if (li) {
            li.classList.add("bg-green-800", "text-white", "rounded-sm");
            allPlants(li.id);
        }
    });
};




const loadAllPlants = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => {
            data.categories.forEach(cat => {
                fetch(`https://openapi.programming-hero.com/api/category/${cat.id}`)
                    .then(res => res.json())
                    .then(plantsData => {
                        allPlantsShow(plantsData.plants);
                    });
            });
        });
};


const loadcardDiteails = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then(data => {
            displaycardDiteails(data.plants)
        })
}


const displaycardDiteails = (word) => {
    console.log(word)
    const detailseBox = document.getElementById("detielseContiner");
    detailseBox.innerHTML = `
                    <img class="rounded-lg w-full h-70 object-cover mx-auto rounded-2xl"
                            src="${word.image}" alt="">

                        <div>
                            <h1 class="text-[20px] font-semibold ">${word.name}</h1>
                            <p class="text-gray-500">${word.description}</p>
                        </div>
                        <div class="flex justify-between">
                            <h2 class=" font-semibold p-3 bg-green-100">${word.category}</h2>
                            <p class="text-xl font-semibold">${word.price}</p>
                        </div>`;
    document.getElementById("my_modal_5").showModal();


}
const allPlants = (plantsId) => {
    allPlantsDiv.innerHTML = "";
    fetch(`https://openapi.programming-hero.com/api/category/${plantsId}`)
        .then(res => res.json())
        .then(data => {
            allPlantsShow(data.plants);
        })
        .catch(err => console.log(err));
};




const allPlantsShow = (plants) => {
    plants.forEach(plants => {
        allPlantsDiv.innerHTML += `
        <div class="bg-white shadow-md flex items-center justify-center p-3 max-w-[330px] rounded-2xl">
            <div class="space-y-5">
                <figure>
                    <img class="rounded-lg w-full h-48 object-cover mx-auto rounded-2xl"
                        src="${plants.image}" alt="">
                </figure>
                <div>
                    <h1 id="${plants.id}" class="text-[16px] font-semibold "  onclick="loadcardDiteails(${plants.id})">${plants.name}</h1>
                    <p class="text-gray-500">${plants.description}</p>
                </div>
                <div class="flex justify-between items-center">
                    <button class="btn rounded-3xl bg-[#DCFCE7] hover:bg-green-700 hover:text-white">
                        ${plants.category}
                    </button>
                    <p class="text-[16px] font-semibold px-2">$<span>${plants.price}</span></p>
                </div>
                <button class="btn bg-green-800 text-white rounded-3xl w-full p-3 hover:bg-yellow-300 hover:text-black">
                    Add to Cart
                </button>
            </div>
        </div>
        `;
    });
};


allCardDiv.addEventListener('click', (e) =>{
   
    if(e.target.innerText === "Add to Cart" )
        
        showcards(e);
     
})

const showcards = (e) =>{
    const titelName = e.target.parentNode.children[1].children[0].innerText;
    const id = e.target.parentNode;
    addTocard.push({
        titelName:titelName,
        id:id
    })
    displaycard(addTocard)

}

const displaycard = (addTocard) =>{
    allCardDiv.forEach(addTocard =>{
        allCardDiv.innerHTML += ``
    })

}

catagorisTree();
loadAllPlants();

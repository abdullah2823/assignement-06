
// const catagorisTree = () =>{
//     const tree = "https://openapi.programming-hero.com/api/categories";
//     fetch(tree)
//     .then((res) => res.json())
//     .then((json) => displayCategories(json));
// }


// const displayCategories = (categories) =>{
//     const treeCatergoris = document.getElementById("tree-categories")
//     treeCatergoris.innerHTML = "";


//     for(let categori of categories.categories){
//         const treeDiv = document.createElement("div");
//         treeDiv.innerHTML =`
// <div>
//     <ul class=" text-[16px] font-normal space-y-2 ">
//         <li class="text-[16px] font-normal p-3  hover:bg-green-800 hover:text-white hover:rounded-sm"><a href="">${categori.category_name}</a>
//         </li>
//     </ul>
// </div>
//         `
//         treeCatergoris.append(treeDiv);
//     }
// }
// catagorisTree();






const treeCatergoris = document.getElementById("tree-categories");

const allPlantsDiv = document.getElementById("all-plants");

const catagorisTree = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.categories);
            const treeDiv = data.categories;


            displayCategories(treeDiv)


        });
}


const displayCategories = (treeDiv) => {
    treeDiv.forEach(cat => {
        treeCatergoris.innerHTML += `
            <div id="${cat.id}" class=" text-[16px] font-normal space-y-2">
           
               <ul>
                <li id="${cat.id}" class="text-[16px] font-normal p-3 ">${cat.category_name}</li>

                </li>
               </ul>
           
            </div>
            `
    });


    treeCatergoris.addEventListener('click', (e) => {
        // console.log(e)
        const allli = document.querySelectorAll("li")
        allli.forEach(li => {
            li.classList.remove("bg-green-800", "text-white", "rounded-md")
        })
        const li = e.target.closest("li");
        if (li) {
            // console.log(e.target.id);
            li.classList.add("bg-green-800", "text-white", "rounded-sm");
            allPlants(li.id);

        }
    });

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



    const allPlants = (plantsId) => {

        fetch(`https://openapi.programming-hero.com/api/category/${plantsId}`)
            .then(res => res.json())
            .then(data => {

                allPlantsShow(data.plants);
            })
            .catch(err => {
                console.log(err);
            })

    }
    const allPlantsShow = (plants) => {
        allPlantsDiv.innerHTML = "";
        plants.forEach(plants => {
            allPlantsDiv.innerHTML += `
            <div 
                        class=" bg-white shadow-md flex items-center justify-center p-3  max-w-[330px]  rounded-2xl">
                        <div  class="space-y-5">
                            <figure>
                                <img class=" rounded-lg  w-full h-48 object-cover  mx-auto rounded-2xl"
                                    src="${plants.image}"
                                    alt="">
                            </figure>
                            <div>
                                <h1 class="text-[16px]  font-semibold ">${plants.name} </h1>
                                <p class="text-gray-500">${plants.description}</p>
                            </div>
                            <div class="flex justify-between items-center">
                                <button class="btn rounded-3xl bg-[#DCFCE7] hover:bg-green-700 hover:text-white">${plants.category}
                                </button>
                                <p class="text-[16px] font-semibold px-2">$<span>${plants.price}</span></p>
                            </div>
                            <button
                                class="btn bg-green-800 text-white rounded-3xl w-full p-3 hover:bg-yellow-300 hover:text-black">Add
                                to Cart</button>
                        </div>
            `
        })

    }

}
catagorisTree();
loadAllPlants();
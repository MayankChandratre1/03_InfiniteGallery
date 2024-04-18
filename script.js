

const API_URL = "https://api.unsplash.com/photos/?client_id="
const KEY = "vnRliGCjahGTyoRo-Nizjdyd0g_vV--BC8pA8zCSU2s"

const container = document.querySelector(".container")


let addedImages = [];

// async function getPhotos(page){
//     let clutter = ""
//     let already = container.innerHTML;
//     console.log(already)
//     const finalUrl = url2+key+"&page="+page
//     let res = await fetch(finalUrl)
//     let data = await res.json();
//     console.log(data)
//     for(let image of data){
//         let child = {
//             id: image.id,
//             tag: `<img src=${image.urls.thumb} alt="random img>`
//         }
//         if(addedImages.indexOf(child.id) == -1){
//             addedImages.push(child.id)
//             clutter += `${child.tag}<br>`
//             console.log(addedImages.indexOf(child))
//         }
        
//     }
    
//     container.innerHTML += clutter
//     return
// }

// let count = 1
// async function greet(count){
//     console.log("hey im at page "+ count)
//     document.querySelector(".loader").classList.remove("hide");
//     console.log("removed hide")
//     await getPhotos(count)
//     return count+1
// }







// container.onscroll = async ()=>{
//     if(Math.ceil(container.scrollHeight - container.scrollTop) === container.clientHeight || count == 1){
//     greet(count).then(()=>{
//         console.log("added hide")
//         document.querySelector(".loader").classList.add("hide");
//     })
//     count++;
// }
// }
// count = greet(1)


function Image(id, url, name){
    this.id = id
    this.url = url
    this.name = name
}

async function getPhotos(page){
        const data = await fetch(`${API_URL}${KEY}&page=${page}&query=boy`).then(res => res.json())
        // console.log(data[0].urls.small)
        return data
}

let page = 1
async function main(page){
    setTimeout(()=>{
        getPhotos(page)
    .then(data =>{
        data.forEach(elem => {
            let image = new Image(elem.id, elem.urls.small, elem.user.username)
            // console.log(image)
            addedImages = [...new Set([...addedImages, image])]
        });

        let clutter = ""
        addedImages.forEach(elem =>{
            clutter +=`<div class="card">
            <p class="author">${elem.name}</p>
            <img src="${elem.url}" id="xt">
            <div class="btns">
                <button id="like">&hearts;</button>
                <a href="${elem.url}" download><button id="download">&DownArrowBar;</button></a>
            </div>
            </div>`
        })

        container.innerHTML = clutter
        //  console.log(clutter)
        return clutter
    })
    },500)
}


container.onscroll = async () =>{

    if(Math.abs(container.scrollHeight - container.scrollTop - container.clientHeight ) < 1){

    console.log("loading")
    document.querySelector(".loader").classList.remove("hide");
    main(page++)
    .then(
        () =>{
            setTimeout(() =>{
                console.log("done")
                document.querySelector(".loader").classList.add("hide");
            },600)
        }
    )

    }
}

console.log("loading")
document.querySelector(".loader").classList.remove("hide");
main(page++)
.then(
    () =>{
        setTimeout(() =>{
            console.log("done")
            document.querySelector(".loader").classList.add("hide");
        },600)
    }
)


console.log(getPhotos(1))



const add_scenes = document.querySelector('.add_scene');

const modal = document.querySelector('#modal');

const modal_content = document.querySelector('.modal_content');

const scene_colors = ["#3b7cd0","#8f87f6","#eea054","#9083ef","#f082cc","#297eed"];

add_scenes.addEventListener('click',evt=>{
    anime({
        targets:evt.currentTarget,
        keyframes:[
            {scale:0.9},
            {scale:1}
        ],
        duration:400,
        easing:'easeOutElastic(1, .8)',
    })

    console.log('inside add_scene');
    modal.style.display = "block";

    modal_content.style.display = "block";  
    
   

    console.log("outside form");
},false)

const modal_form = document.querySelector('.modal_form');

const tile_row = document.querySelector('.tile_row');

modal_form.addEventListener('submit',evt=>{
    evt.preventDefault();
    const formdata = new FormData(modal_form);
    const name = formdata.get('name');
    const id = formdata.get('id');

    const tile_color = scene_colors[Math.floor((Math.random()*6))];

    modal_form.reset();

    modal_content.style.display = "none";

    modal.style.display = "none";

//     tile_row.innerHTML += `
//     <div class=" border-[2px] border-[${tile_color}] rounded-[38.36px] w-[220px] h-[220px] text-center bg-[${tile_color}]">
//     <div class="inline-table md:mt-3 mx-auto">
//         <span>
//             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="stroke-white object-center mx-auto md:w-[120px] md:stroke-[0.7px] ">
//                 <path d="M6 12H18"   stroke-linecap="round" stroke-linejoin="round"/>
//                 <path d="M12 18V6"   stroke-linecap="round" stroke-linejoin="round"/>
//             </svg>
//         </span>
//         <span class="text-white">
//             ${name}
//         </span>
//     </div>
// </div>`;
addtile(tile_color,name,tile_row);
},false);

window.onclick = (evt)=>{
    if(evt.target == modal){
        console.log("inside modal")
        modal_content.style.display = "none";

        modal.style.display = "none";  
    }
}

function addtile(tile_color,name,tile_row){
    const div1 = document.createElement('div');
    div1.classList.add('border-[2px]',`border-[${tile_color}]`,'rounded-[38.36px]','w-[220px]','h-[220px]','text-center',`bg-[${tile_color}]`);
    const div2 = document.createElement('div');
    div2.classList.add('inline-table','md:mt-3','mx-auto');
    const span1 = document.createElement('span');
    span1.innerHTML=`
    <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="stroke-white object-center mx-auto md:w-[120px] md:stroke-[0.7px]">
        <path d="M6.70001 18H4.15002C2.72002 18 2 17.28 2 15.85V4.15002C2 2.72002 2.72002 2 4.15002 2H8.45001C9.88001 2 10.6 2.72002 10.6 4.15002V6"  stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17.3699 8.41998V19.58C17.3699 21.19 16.57 22 14.96 22H9.11993C7.50993 22 6.69995 21.19 6.69995 19.58V8.41998C6.69995 6.80998 7.50993 6 9.11993 6H14.96C16.57 6 17.3699 6.80998 17.3699 8.41998Z"   stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13.3999 6V4.15002C13.3999 2.72002 14.1199 2 15.5499 2H19.8499C21.2799 2 21.9999 2.72002 21.9999 4.15002V15.85C21.9999 17.28 21.2799 18 19.8499 18H17.3699"   stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 11H14"    stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 14H14"    stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 22V19"    stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
    `;
    const span2 = document.createElement('span');
    span2.classList.add('text-white');
    span2.textContent=name;
    div2.append(span1,span2);
    div1.append(div2);
    tile_row.prepend(div1);
}


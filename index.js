// API documentation
const loadPhone = async (searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phone = data.data;
    showMobile(phone, isShowAll);
    console.log(phone);
}
// Displaying information
const showMobile = (phone, isShowAll) =>{
    // mobile COntainer
    const mobileDiv = document.getElementById('mobile_container');
    // emptying mobile container after new search text
    mobileDiv.innerHTML = '';
    // showAll popup if card more than 12
    const showBtnContainer = document.getElementById('show_btn_container');
    if(phone.length > 12 && !isShowAll){
        showBtnContainer.classList.remove('hidden');
    }else{
        showBtnContainer.classList.add('hidden');
    }
    // how many products gonna be shown
    if(!isShowAll){
        phone = phone.slice(0,12);
    }
    

    // for each text
    phone.forEach(mobile =>{
        const div = document.createElement('div');
        div.classList = `card border bg-base-100 shadow-xl`;
        div.innerHTML = `
            <figure class="px-10 pt-10">
              <img src="${mobile.image}" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">${mobile.phone_name}</h2>
              <div class="card-actions">
                <button onclick="handleShowDetails('${mobile.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>
        `
        mobileDiv.appendChild(div)
    })
    // hide loading indicator
    loading(false);
    
}
//handle show details
const handleShowDetails = async (id) => {
    console.log('clicked', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone)
} 
// show phone details   
const showPhoneDetails = (phone) =>{
    console.log(phone);
    const showPhoneName = document.getElementById('show_phone_name');
    showPhoneName.innerHTML = phone.name;
    const detailsDiv= document.getElementById('all_details');
    
    detailsDiv.innerHTML =`
        
        <img src="${phone.image}" class="w-3/4 ml-12">
        <p><span class="font-semibold">Storage:</span> ${phone?.mainFeatures?.storage}</p>
        <p><span class="font-semibold">Display Size:</span> ${phone?.mainFeatures?.displaySize}</p>
        <p><span class="font-semibold">Chipset:</span> ${phone?.mainFeatures?.chipSet}</p>
        <p><span class="font-semibold">Memory:</span> ${phone?.mainFeatures?.memory}</p>
        <p><span class="font-semibold">Sulg:</span> ${phone.slug}</p>
        <p><span class="font-semibold">Release Date:</span> ${phone?.releaseDate}</p>
        <p><span class="font-semibold">Brand:</span> ${phone.brand}</p>
        <p><span class="font-semibold">GPS:</span> ${phone?.others?.GPS}</p>
    `;


    show_modal.showModal()
}


// search function
function showSearchMobile(isShowAll){
    loading(true)
    const searchField = document.getElementById('search_box');
    const searchText = searchField.value;
    loadPhone(searchText,isShowAll);
}

// loading FUNCTION
const loading = (isLoading) => {
    const loadingDiv = document.getElementById('loading_container');
    if(isLoading){
        loadingDiv.classList.remove('hidden');
    }else{
        loadingDiv.classList.add('hidden');
    }
}

// showALL function
function showAll(){
    showSearchMobile(true)
}

loadPhone();
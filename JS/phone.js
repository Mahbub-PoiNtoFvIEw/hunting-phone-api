const loadPhone = async (searchText=13,isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phone = data.data;
    const noDataFound = document.getElementById('no-data-found');
    // console.log(data);
    // check data found or not
    if(data.status === true){
        noDataFound.classList.add('hidden')
        // console.log('data found')
    }else{
        noDataFound.classList.remove('hidden')
        // console.log('no Data Found')
    }
    displayPones(phone, isShowAll, searchText);
}

const displayPones = (phones, isShowAll, searchText) =>{
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer= document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }

    // just show first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach( phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes"/></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onClick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    // hide Loading spinner
    toggleLoadingSpinner(false)
}

// 
const handleShowDetails = async (id) =>{
    // console.log('click show details',id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data;
    // console.log(phone);

    showPhoneDetails(phone);
    // console.log(data.data);
}

const showPhoneDetails = (phone) =>{
    // console.log(phone)
    const showDetailsContainer =document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <figure class="flex justify-center items-center my-2"><img class='text-center' src="${phone.image}" alt=""></figure>
    <h3 id="show-detail-phone-name" class="text-3xl font-bold my-2">${phone.name}</h3>
    <div class="flex flex-col gap-2 my-2">
        <p><span class="text-lg font-bold">Storage : </span>${phone?.mainFeatures?.storage}</p>
        <p><span class="text-lg font-bold">ChipSet : </span>${phone?.mainFeatures?.chipSet}</p>
        <p><span class="text-lg font-bold">DisplaySize : </span>${phone?.mainFeatures?.displaySize}</p>
        <p><span class="text-lg font-bold">Memory : </span>${phone?.mainFeatures?.memory}</p>
        <p><span class="text-lg font-bold">ReleaseDate : </span>${phone?.releaseDate}</p>
        <p><span class="text-lg font-bold">Slug : </span>${phone?.slug}</p>
        <p><span class="text-lg font-bold">GPS : </span>${phone?.others?.GPS || 'No GPS available'}</p>
    </div>
    `;

    show_details_modal.showModal()
}

// Handle search button

const handleSearch = (isShowAll) =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    toggleLoadingSpinner(true);
    loadPhone(searchText,isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner =document.getElementById('loading-spinner');
    if(isLoading){   
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all

const handleShowAll = () =>{
    handleSearch(true);
}

loadPhone();
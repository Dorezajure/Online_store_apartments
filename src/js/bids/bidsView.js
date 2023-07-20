function renderContainer () {
    const markup = `
            <div class="container p-0 mb-5">
                <div class="heading-1">Заявки</div>
            </div>
            <!-- panels-wrapper -->
            <div class="panels-wrapper">
                <div id="bidsHolder" class="container p-0">
                    <!-- Bids wil be here -->
                </div>
            </div>
            <!-- // panels-wrapper --> `;

    document.querySelector('#app').insertAdjacentHTML('afterbegin', markup);
}

function renderBid (bid) {
    const markup = `
            <div class="panel panel--no-hover">
                <div class="panel__bidid">${bid.id}</div>
                <div class="panel__bidname">${bid.name}</div>
                <div class="panel__bidphone">${bid.phone}</div>
            </div>`;

    document.querySelector('#bidsHolder').insertAdjacentHTML('beforeend', markup);
}

export function renderBids(bids) {
    renderContainer();

    bids.forEach((item)=>{
        renderBid(item);
    })
}

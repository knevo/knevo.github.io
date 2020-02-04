class LocationPreview {
    constructor(location) {
        this.address = location;
        this.id = getRandomId()
    }
    onUpdateLocation = () => {
        const { value } = Swal.fire({
            input: 'text',
            title:'Update address name',
            inputPlaceholder: 'Enter new name',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
        }).then(value => {
            if (value) {
                updateLocation(this.address,value.value)
                Swal.fire(
                    'Updated',
                    'Your new address name is '+value.value,
                    'success'
                )
                renderLocations()
            }
        })
    }

    onDeleteLocation = () => {
        deleteLocation(this.address)
        renderLocations()
    }

    render() {
        const elTr = document.createElement('tr')
        elTr.innerHTML = `
        <td>${this.id}</td>
        <td>${this.address}</td>
        <td>Sunny</td>
        <td>
        <button class="update-btn">Update</button>
        <button class="delete-btn">Delete</button>
        </td>`
        elTr.querySelector('.update-btn').onclick = this.onUpdateLocation
        elTr.querySelector('.delete-btn').onclick = this.onDeleteLocation
        return elTr
    }
}
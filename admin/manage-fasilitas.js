let facilities = [
    { id: 1, name: "Kolam Renang", description: "Kolam renang luar ruangan dengan pemandangan" },
    { id: 2, name: "Restoran", description: "Restoran dengan berbagai menu lokal dan internasional" }
];

function renderFacilities() {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    
    facilities.forEach((facility, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${facility.name}</td>
            <td>${facility.description}</td>
            <td>
                <button class="btn btn-warning btn-custom" onclick="editFacility(${facility.id})">Edit</button>
                <button class="btn btn-danger btn-custom" onclick="deleteFacility(${facility.id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openAddFacilityModal() {
    const modal = new bootstrap.Modal(document.getElementById('addFacilityModal'));
    modal.show();
}

function addFacility() {
    const name = document.getElementById("facilityName").value;
    const description = document.getElementById("facilityDescription").value;
    
    if (name && description) {
        const newFacility = {
            id: facilities.length + 1,
            name,
            description
        };
        
        facilities.push(newFacility);
        renderFacilities();
        document.getElementById("facilityName").value = "";
        document.getElementById("facilityDescription").value = "";
        const modal = bootstrap.Modal.getInstance(document.getElementById('addFacilityModal'));
        modal.hide();
    } else {
        alert("Nama dan Keterangan fasilitas harus diisi.");
    }
}

function editFacility(id) {
    const facility = facilities.find(fac => fac.id === id);
    if (facility) {
        document.getElementById("facilityName").value = facility.name;
        document.getElementById("facilityDescription").value = facility.description;
        const modal = new bootstrap.Modal(document.getElementById('addFacilityModal'));
        modal.show();
        document.querySelector(".btn-primary").textContent = "Update";
        document.querySelector(".btn-primary").onclick = function() {
            updateFacility(id);
        };
    }
}

function updateFacility(id) {
    const name = document.getElementById("facilityName").value;
    const description = document.getElementById("facilityDescription").value;
    
    if (name && description) {
        const facility = facilities.find(fac => fac.id === id);
        if (facility) {
            facility.name = name;
            facility.description = description;
            renderFacilities();
            const modal = bootstrap.Modal.getInstance(document.getElementById('addFacilityModal'));
            modal.hide();
            document.querySelector(".btn-primary").textContent = "Simpan";
            document.querySelector(".btn-primary").onclick = addFacility;
        }
    } else {
        alert("Nama dan Keterangan fasilitas harus diisi.");
    }
}

function deleteFacility(id) {
    const index = facilities.findIndex(fac => fac.id === id);
    if (index !== -1) {
        facilities.splice(index, 1);
        renderFacilities();
    }
}

document.querySelector(".btn-primary").addEventListener("click", addFacility);

renderFacilities();

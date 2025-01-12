document.addEventListener('DOMContentLoaded', function () {
    const addRoomModal = new bootstrap.Modal(document.getElementById('addRoomModal'));
    const saveButton = document.querySelector('.modal-footer .btn-primary');
    const roomNameInput = document.getElementById('roomName');
    const roomTypeInput = document.getElementById('roomType');
    const roomPriceInput = document.getElementById('roomPrice');
    const roomStatusInput = document.getElementById('roomStatus');
    const roomTableBody = document.querySelector('table tbody');

    let editingRow = null; // Menyimpan baris yang sedang diedit

    // Fungsi untuk menambahkan baris kamar ke dalam tabel
    function addRoomToTable(name, type, price, status) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${roomTableBody.children.length + 1}</td>
            <td>${name}</td>
            <td>${type}</td>
            <td>Rp ${price.toLocaleString()}</td>
            <td><span class="badge ${status === 'Tersedia' ? 'badge-success' : 'badge-secondary'}">${status}</span></td>
            <td>
                <button class="btn btn-warning btn-custom">Edit</button>
                <button class="btn btn-danger btn-custom">Hapus</button>
            </td>
        `;
        roomTableBody.appendChild(row);
    }

    // Fungsi untuk menyimpan data kamar baru
    saveButton.addEventListener('click', function () {
        const roomName = roomNameInput.value;
        const roomType = roomTypeInput.value;
        const roomPrice = parseInt(roomPriceInput.value);
        const roomStatus = roomStatusInput.value;

        // Menambahkan kamar ke tabel jika input valid
        if (roomName && roomType && roomPrice > 0) {
            if (editingRow) {
                // Mengupdate data kamar yang sedang diedit
                editingRow.cells[1].textContent = roomName;
                editingRow.cells[2].textContent = roomType;
                editingRow.cells[3].textContent = 'Rp ' + roomPrice.toLocaleString();
                editingRow.cells[4].innerHTML = `<span class="badge ${roomStatus === 'Tersedia' ? 'badge-success' : 'badge-secondary'}">${roomStatus}</span>`;
                editingRow = null; // Reset editingRow setelah update
            } else {
                addRoomToTable(roomName, roomType, roomPrice, roomStatus);
            }

            // Menutup modal setelah data disimpan
            addRoomModal.hide();

            // Membersihkan input untuk data kamar berikutnya
            roomNameInput.value = '';
            roomTypeInput.value = '';
            roomPriceInput.value = '';
            roomStatusInput.value = 'Tersedia';
        } else {
            alert('Harap lengkapi semua data kamar dengan benar.');
        }
    });

    // Menangani penghapusan kamar dari tabel
    roomTableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-danger')) {
            if (confirm('Apakah Anda yakin ingin menghapus kamar ini?')) {
                const row = event.target.closest('tr');
                roomTableBody.removeChild(row);

                // Menyesuaikan nomor urut setelah penghapusan
                Array.from(roomTableBody.rows).forEach((row, index) => {
                    row.cells[0].textContent = index + 1;
                });
            }
        }
    });

    // Menangani pengeditan kamar
    roomTableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-warning')) {
            const row = event.target.closest('tr');
            const cells = row.getElementsByTagName('td');
            const name = cells[1].textContent;
            const type = cells[2].textContent;
            const price = parseInt(cells[3].textContent.replace('Rp ', '').replace(',', ''));
            const status = cells[4].textContent;

            // Mengisi modal dengan data kamar yang dipilih untuk diedit
            roomNameInput.value = name;
            roomTypeInput.value = type;
            roomPriceInput.value = price;
            roomStatusInput.value = status;

            // Menyimpan baris yang sedang diedit
            editingRow = row;

            // Menampilkan modal
            addRoomModal.show();
        }
    });
});

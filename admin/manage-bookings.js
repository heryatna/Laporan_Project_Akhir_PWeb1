// Script untuk mengelola aksi di halaman Kelola Pemesanan

document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("table tbody");

    // Fungsi untuk mengubah status pemesanan
    const updateStatus = (row, status) => {
        const statusCell = row.querySelector("td:nth-child(5) span");
        const confirmButton = row.querySelector(".btn-success");
        const cancelButton = row.querySelector(".btn-danger");

        if (status === "confirmed") {
            statusCell.className = "badge status-confirmed";
            statusCell.textContent = "Terkonfirmasi";
        } else if (status === "canceled") {
            statusCell.className = "badge status-canceled";
            statusCell.textContent = "Dibatalkan";
        }

        // Disable tombol setelah status diperbarui
        confirmButton.disabled = true;
        cancelButton.disabled = true;
    };

    // Event listener untuk tombol Konfirmasi dan Batal
    tableBody.addEventListener("click", function (event) {
        const target = event.target;
        const button = target.closest("button");

        if (button) {
            const row = button.closest("tr");

            if (button.classList.contains("btn-success")) {
                // Aksi tombol Konfirmasi
                if (confirm("Apakah Anda yakin ingin mengonfirmasi pemesanan ini?")) {
                    updateStatus(row, "confirmed");
                    alert("Pemesanan berhasil dikonfirmasi.");
                }
            } else if (button.classList.contains("btn-danger")) {
                // Aksi tombol Batal
                if (confirm("Apakah Anda yakin ingin membatalkan pemesanan ini?")) {
                    updateStatus(row, "canceled");
                    alert("Pemesanan berhasil dibatalkan.");
                }
            }
        }
    });
});

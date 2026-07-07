document.addEventListener('DOMContentLoaded', () => {
    const guestName = document.getElementById('guest-name');
    const params = new URLSearchParams(window.location.search);
    const nama = params.get('to');
    const btnOpen = document.getElementById('open-invitation');
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('main-content');
    const audioControl = document.getElementById('audio-control');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = document.getElementById('music-icon');
    let isPlaying = false;

    console.log("window.location.href =", window.location.href);
    console.log("window.location.search =", window.location.search);
    console.log("nama =", nama);
    
    if (guestName) {
        guestName.innerText = nama
            ? decodeURIComponent(nama)
            : "Tamu Undangan";
    }
    
    // Buka Undangan
    btnOpen.addEventListener('click', () => {
        // Efek scroll lock dilepas
        document.body.style.overflowY = 'auto';
        
        // Animasi cover
        cover.classList.add('slide-up');
        
        // Putar musik segera setelah diklik agar tidak diblokir browser
        playAudio();
        
        // Tampilkan main content setelah animasi cover selesai
        setTimeout(() => {
            cover.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Trigger awal animasi reveal
            reveal();

            // Mulai animasi campuran keraton
            startKeratonAnimation();
        }, 1000);
    });

    // Kontrol Musik
    function playAudio() {
        bgMusic.play().then(() => {
            isPlaying = true;
            audioControl.classList.remove('hidden');
            audioControl.classList.remove('paused');
            musicIcon.className = 'fas fa-compact-disc';
        }).catch(err => {
            console.log("Audio autoplay prevented by browser", err);
            audioControl.classList.remove('hidden');
            audioControl.classList.add('paused');
            musicIcon.className = 'fas fa-play';
        });
    }

    audioControl.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            audioControl.classList.add('paused');
            musicIcon.className = 'fas fa-play';
        } else {
            bgMusic.play();
            audioControl.classList.remove('paused');
            musicIcon.className = 'fas fa-compact-disc';
        }
        isPlaying = !isPlaying;
    });

    // Countdown Timer (08 Agustus 2026, 08:00)
    const weddingDate = new Date("August 8, 2026 08:00:00").getTime();

    const updateCountdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

        if (distance < 0) {
            clearInterval(updateCountdown);
            document.querySelector(".countdown").innerHTML = "<h2>Acara Berlangsung Hari Ini</h2>";
        }
    }, 1000);

    // Scroll Reveal Animation
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    
    // Inisiasi body hide scroll
    document.body.style.overflowY = 'hidden';

    window.addEventListener("scroll", reveal);

    // RSVP Form Submit
    const rsvpForm = document.getElementById('rsvp-form');
    const commentsList = document.getElementById('comments-list');
    const commentCount = document.getElementById('comment-count');
    let currentCount = 1;

    if(rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('guest-name').value;
            const attendance = document.getElementById('guest-attendance').value;
            const message = document.getElementById('guest-message').value;

            if(!name || !attendance || !message) return;

            const badgeClass = attendance === 'Hadir' ? 'hadir' : 'tidak-hadir';
            const badgeIcon = attendance === 'Hadir' ? 'fa-check-circle' : 'fa-times-circle';

            const newComment = document.createElement('div');
            newComment.className = 'comment-item';
            newComment.innerHTML = `
                <div class="comment-header">
                    <span class="name">${name}</span>
                    <span class="badge ${badgeClass}"><i class="fas ${badgeIcon}"></i> ${attendance}</span>
                </div>
                <p class="message">${message}</p>
                <span class="comment-time">Baru saja</span>
            `;

            // Insert at top
            commentsList.insertBefore(newComment, commentsList.firstChild);
            
            // Update count
            currentCount++;
            commentCount.innerText = currentCount;

            // Reset form
            rsvpForm.reset();
            
            alert("Terima kasih! Ucapan Anda telah terkirim.");
        });
    }

    // Keraton Animation (Gold Sparkles Only)
    function startKeratonAnimation() {
        const container = document.getElementById('flower-container');
        if(!container) return;
        
        setInterval(() => {
            const particle = document.createElement('div');
            
            // Sparkle Emas
            particle.classList.add('particle', 'sparkle');
            const size = Math.random() * 6 + 2; // 2px - 8px
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random styling (Posisi & Waktu jatuh)
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's'; // 10s - 20s (lambat dan anggun)
            
            container.appendChild(particle);
            
            // Hapus elemen setelah animasi selesai (20s)
            setTimeout(() => {
                particle.remove();
            }, 20000);
            
        }, 600); // Muncul tiap 600ms
    }
});

// Copy Text Function (Amplop Digital)
function copyText(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Nomor rekening/akun disalin: " + text);
    }).catch(err => {
        console.error('Failed to copy!', err);
    });
}

const form = document.getElementById("rsvp-form");

// Ambil nama tamu dari URL
const namaTamu = new URLSearchParams(window.location.search).get("to") || "Tamu Undangan";

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {

        nama: namaTamu,

        kehadiran: document.getElementById("guest-attendance").value,

        jumlah: document.getElementById("guest-count").value,

        ucapan: document.getElementById("guest-message").value

    };

    try {

        const response = await fetch("https://script.google.com/macros/s/AKfycbzD_2DXoMNw2n7gI5BFz_PtErHHk_r-W-8Kx7VID6m9lg-dBKGF3b1bLATrWqocO4J_NA/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.status === "success") {

            alert("Terima kasih, konfirmasi kehadiran berhasil dikirim 😊");

            form.reset();

        } else {

            alert("Terjadi kesalahan, silakan coba lagi.");

        }

    } catch (error) {

        console.error(error);

        alert("Gagal mengirim data.");

    }

});

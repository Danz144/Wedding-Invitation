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

    // =========================================
            // COUNTDOWN WEDDING (WIB / Asia Jakarta)
            // =========================================

            // Target acara (WIB = UTC+7)
            const targetDate = new Date("2026-08-08T10:00:00+07:00").getTime();

            function updateCountdown() {
                const now = Date.now();
                const distance = targetDate - now;

                if (distance <= 0) {
                    clearInterval(countdownInterval);

                    document.getElementById("days").textContent = "00";
                    document.getElementById("hours").textContent = "00";
                    document.getElementById("minutes").textContent = "00";
                    document.getElementById("seconds").textContent = "00";

                    document.querySelector(".countdown").innerHTML = `
                        <h2 style="color:#d4af37;">
                            🎉 Acara Sedang Berlangsung
                        </h2>
                    `;
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));

                const hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) /
                    (1000 * 60 * 60)
                );

                const minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) /
                    (1000 * 60)
                );

                const seconds = Math.floor(
                    (distance % (1000 * 60)) /
                    1000
                );

                document.getElementById("days").textContent =
                    String(days).padStart(2, "0");

                document.getElementById("hours").textContent =
                    String(hours).padStart(2, "0");

                document.getElementById("minutes").textContent =
                    String(minutes).padStart(2, "0");

                document.getElementById("seconds").textContent =
                    String(seconds).padStart(2, "0");
            }

            // Jalankan sekali saat halaman dibuka
            updateCountdown();

            // Update setiap 1 detik
            const countdownInterval = setInterval(updateCountdown, 1000);
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

const namaTamu =
    new URLSearchParams(window.location.search).get("to") || "Tamu Undangan";

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();

    formData.append("nama", namaTamu);
    formData.append(
        "kehadiran",
        document.getElementById("guest-attendance").value
    );
    formData.append(
        "jumlah",
        document.getElementById("guest-count").value
    );
    formData.append(
        "ucapan",
        document.getElementById("guest-message").value
    );

    try {
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbwIhNxaDi0CK6Ia6Xu9apRk43G4oDvqCC0ShILJreDPppwxSaYC_wJIy39lrpmU4YGHWg/exec",
            {
                method: "POST",
                body: formData
            }
        );

        const result = await response.json();

        if(result.status==="success"){

                form.reset();
            
                await loadComments();
            
                alert("Terima kasih 😊");
            
            }

    } catch (err) {
        console.error(err);
        alert("Gagal mengirim data.");
    }
});

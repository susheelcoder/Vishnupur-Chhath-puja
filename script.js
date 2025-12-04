// <!-- Google tag (gtag.js) -->

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RSS1QYV7PK');

// ////////////////////////////

const menuBtn = document.getElementById('menu-btn');
const navbar = document.getElementById('navbar');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
});


// /////////////////////

const aboutRows = document.querySelectorAll('.about-row');
window.addEventListener('scroll', () => {
    aboutRows.forEach(row => {
        const rect = row.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            row.classList.add('visible');
        }
    });
});




// Optional: gentle reveal on load for better UX
document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.about-row');
    rows.forEach((r, i) => {
        r.style.opacity = 0;
        r.style.transform = 'translateY(10px)';
        setTimeout(() => {
            r.style.transition = 'opacity 400ms ease, transform 400ms ease';
            r.style.opacity = 1;
            r.style.transform = 'translateY(0)';
        }, 120 * i);
    });
});





// ///////////////////////////


// Form

// Get form and popup elements
const form = document.getElementById("chhathForm");
const popup = document.getElementById("thankYouPopup");

// Form submit event
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get input values
    const schoolName = document.getElementById("schoolName").value.trim();
    const teacherName = document.getElementById("teacherName").value.trim();
    const teacherPhone = document.getElementById("teacherPhone").value.trim();
    const totalStudents = document.getElementById("totalStudents").value.trim();
    const studentNames = document.getElementById("studentNames").value.trim();

    // Generate date + time (Indian timezone)
    const today = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' });

    // Generate random serial number (5-digit)
    const randomNo = Math.floor(Math.random() * 90000) + 10000;

    // Prepare data for SheetDB
    const data = {
        data: [{
            no: randomNo,
            date: today,
            "School / Institute Name:": schoolName,
            "Teacher Name:": teacherName,
            "Teacher Phone No.:": teacherPhone,
            "Total Number of Students:": totalStudents,
            "Students Name:": studentNames
        }]
    };

    try {
        // Send data to SheetDB
        const response = await fetch("https://sheetdb.io/api/v1/o9x6ygauy31ej", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // Success popup show karo
            popup.style.display = "flex";
            form.reset();
        } else {
            alert("❌ कुछ गलती हुई है, कृपया दोबारा कोशिश करें!");
        }
    } catch (error) {
        alert("⚠️ Network Error! कृपया बाद में पुनः प्रयास करें।");
        console.error(error);
    }
});

// Popup close function
function closePopup() {
    popup.style.display = "none";
}


  // //////////////////////////////




   const videos = [
    '/img-video/v2.mp4',
    '/img-video/v2.mp4',
    '/img-video/v1.mp4',
    '/img-video/v2.mp4',
    '/img-video/v2.mp4',
    '/img-video/v2.mp4',
    '/img-video/v1.mp4',
    '/img-video/v1.mp4',
    '/img-video/v2.mp4',
    '/img-video/v1.mp4',
    '/img-video/v2.mp4',
    '/img-video/v2.mp4',
    '/img-video/v1.mp4',
    '/img-video/v2.mp4',
    '/img-video/v2.mp4',
    '/img-video/v1.mp4',
    '/img-video/v2.mp4'
];

  const videoElement = document.getElementById('bgVideo');
  let current = 0;

  function playNextVideo() {
    videoElement.src = videos[current];
    videoElement.play();
  }

  // Play the first video
  playNextVideo();

  // When a video ends, play the next one
  videoElement.addEventListener('ended', () => {
    current = (current + 1) % videos.length; // loop back to first video after last
    playNextVideo();
  });








//   /////////////////

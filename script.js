// Get references to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-output');
var profileInput = document.querySelector('input[type="file"]');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    // Collect input values
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    var summary = document.getElementById("summary").value;
    var degree = document.getElementById("degree").value;
    var school = document.getElementById("school").value;
    var gradDate = document.getElementById("grad-date").value;
    var jobTitle = document.getElementById("job-title").value;
    var company = document.getElementById("company").value;
    var dates = document.getElementById("date").value;
    // Check if the profile picture is selected
    var file = profileInput.files ? profileInput.files[0] : null;
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var imageUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            // Save form data in localStorage with the username as the key
            var resumeData = {
                name: name,
                email: email,
                phone: phone,
                education: education,
                experience: experience,
                skills: skills,
                summary: summary,
                degree: degree,
                school: school,
                gradDate: gradDate,
                jobTitle: jobTitle,
                company: company,
                dates: dates,
            };
            localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
            // Generate the resume content dynamically
            var resumeHTML = "\n        <center><h2 contenteditable=\"true\">Resume</h2></center></br>\n        <left><img src=\"".concat(imageUrl, "\" alt=\"Profile Picture\" style=\"width: 150px; height: 150px;  border-radius:30%; display:block\";></left>\n        <h3 style=\"text-align:left;\" contenteditable=\"true\">Personal Information</h3>\n        <p style=\"text-align:left;\"><strong>Name:</strong> <span contenteditable=\"true\">").concat(name, "</span></p>\n        <p style=\"text-align:left;\"><strong>Email:</strong> <span contenteditable=\"true\">").concat(email, "</span></p>\n        <p style=\"text-align:left;\"><strong>Phone:</strong> <span contenteditable=\"true\">").concat(phone, "</span></p>\n        <h3 style=\"text-align:left;\" contenteditable=\"true\">Summary</h3>\n        <p  style=\"text-align:left;\"contenteditable=\"true\">").concat(summary, "</p>\n        <h3 style=\"text-align:left;\" contenteditable=\"true\">Education</h3>\n        <p style=\"text-align:left;\" ><strong>Degree:</strong> <span contenteditable=\"true\">").concat(degree, "</span></p>\n        <p style=\"text-align:left;\" ><strong>School:</strong> <span contenteditable=\"true\">").concat(school, "</span></p>\n        <p style=\"text-align:left;\"><strong>Graduation Date:</strong> <span contenteditable=\"true\">").concat(gradDate, "</span></p>\n        <p style=\"text-align:left;\" contenteditable=\"true\">").concat(education, "</p>\n        <h3 style=\"text-align:left;\" contenteditable=\"true\">Work Experience</h3>\n        <p style=\"text-align:left;\"><strong>Job Title:</strong> <span contenteditable=\"true\">").concat(jobTitle, "</span></p>\n        <p style=\"text-align:left;\"><strong>Company:</strong> <span contenteditable=\"true\">").concat(company, "</span></p>\n        <p style=\"text-align:left;\"><strong>Dates:</strong> <span contenteditable=\"true\">").concat(dates, "</span></p>\n        <p style=\"text-align:left;\" contenteditable=\"true\">").concat(experience, "</p>\n        <h3 style=\"text-align:left;\"contenteditable=\"true\">Skills</h3>\n        <p style=\"text-align:left;\" contenteditable=\"true\">").concat(skills, "</p>\n      ");
            // Display the generated resume
            resumeDisplayElement.innerHTML = resumeHTML;
            // Generate a shareable URL with the username only
            var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
            // Display the shareable link
            shareableLinkContainer.style.display = "block";
            shareableLinkElement.href = shareableURL;
            shareableLinkElement.textContent = shareableURL;
        };
        reader.readAsDataURL(file);
    }
});
// Handle PDF download
downloadPdfButton.addEventListener("click", function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById("username").value =
                username;
            document.getElementById("name").value =
                resumeData.name;
            document.getElementById("email").value =
                resumeData.email;
            document.getElementById("phone").value =
                resumeData.phone;
            document.getElementById("summary").value =
                resumeData.summary;
            document.getElementById("degree").value =
                resumeData.degree;
            document.getElementById("school").value =
                resumeData.school;
            document.getElementById("grad-Date").value =
                resumeData.gradDate;
            document.getElementById("education").value =
                resumeData.education;
            document.getElementById("job-title").value =
                resumeData.jobTitle;
            document.getElementById("company").value =
                resumeData.company;
            document.getElementById("date").value =
                resumeData.dates;
            document.getElementById("experience").value =
                resumeData.experience;
            document.getElementById("skills").value =
                resumeData.skills;
        }
    }
});

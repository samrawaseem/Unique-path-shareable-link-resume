// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-output') as HTMLDivElement;
const profileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

// Handle form submission
form.addEventListener("submit", (event: Event) => {
  event.preventDefault(); // Prevent default form submission

  // Collect input values
  const username = (document.getElementById("username") as HTMLInputElement).value;
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const education = (document.getElementById("education") as HTMLTextAreaElement).value;
  const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
  const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
  const summary = (document.getElementById("summary") as HTMLTextAreaElement).value;
  const degree = (document.getElementById("degree") as HTMLInputElement).value;
  const school = (document.getElementById("school") as HTMLInputElement).value;
  const gradDate = (document.getElementById("grad-date") as HTMLInputElement).value;
  const jobTitle = (document.getElementById("job-title") as HTMLInputElement).value;
  const company = (document.getElementById("company") as HTMLInputElement).value;
  const dates = (document.getElementById("date") as HTMLInputElement).value;

  // Check if the profile picture is selected
  const file = profileInput.files ? profileInput.files[0] : null;
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageUrl = e.target?.result as string;

      // Save form data in localStorage with the username as the key
      const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills,
        summary,
        degree,
        school,
        gradDate, 
        jobTitle, 
        company,
        dates,
      };
      localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally

      // Generate the resume content dynamically
      const resumeHTML = `
        <center><h2 contenteditable="true">Resume</h2></center></br>
        <center><img src="${imageUrl}" alt="Profile Picture" style="width: 150px; height: 150px;  border-radius:500%; display:block";></center>
        <h3 style="text-align:left;" contenteditable="true">Personal Information</h3>
        <p style="text-align:left;"><strong>Name:</strong> <span contenteditable="true">${name}</span></p>
        <p style="text-align:left;"><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
        <p style="text-align:left;"><strong>Phone:</strong> <span contenteditable="true">${phone}</span></p>
        <h3 style="text-align:left;" contenteditable="true">Summary</h3>
        <p  style="text-align:left;"contenteditable="true">${summary}</p>
        <h3 style="text-align:left;" contenteditable="true">Education</h3>
        <p style="text-align:left;" ><strong>Degree:</strong> <span contenteditable="true">${degree}</span></p>
        <p style="text-align:left;" ><strong>School:</strong> <span contenteditable="true">${school}</span></p>
        <p style="text-align:left;"><strong>Graduation Date:</strong> <span contenteditable="true">${gradDate}</span></p>
        <p style="text-align:left;" contenteditable="true">${education}</p>
        <h3 style="text-align:left;" contenteditable="true">Work Experience</h3>
        <p style="text-align:left;"><strong>Job Title:</strong> <span contenteditable="true">${jobTitle}</span></p>
        <p style="text-align:left;"><strong>Company:</strong> <span contenteditable="true">${company}</span></p>
        <p style="text-align:left;"><strong>Dates:</strong> <span contenteditable="true">${dates}</span></p>
        <p style="text-align:left;" contenteditable="true">${experience}</p>
        <h3 style="text-align:left;"contenteditable="true">Skills</h3>
        <p style="text-align:left;" contenteditable="true">${skills}</p>
      `;
      // Display the generated resume
      resumeDisplayElement.innerHTML = resumeHTML;

      // Generate a shareable URL with the username only
      const shareableURL = `${
        window.location.origin
      }?username=${encodeURIComponent(username)}`;

      // Display the shareable link
      shareableLinkContainer.style.display = "block";
      shareableLinkElement.href = shareableURL;
      shareableLinkElement.textContent = shareableURL;
    };
    reader.readAsDataURL(file);
  }
});

// Handle PDF download
downloadPdfButton.addEventListener("click", () => {
  window.print(); // This will open the print dialog and allow the user to save as PDF
});

// Prefill the form based on the username in the URL
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  if (username) {
    // Autofill form if data is found in localStorage
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);
      (document.getElementById("username") as HTMLInputElement).value =
        username;
      (document.getElementById("name") as HTMLInputElement).value =
        resumeData.name;
      (document.getElementById("email") as HTMLInputElement).value =
        resumeData.email;
      (document.getElementById("phone") as HTMLInputElement).value =
        resumeData.phone;
      (document.getElementById("summary") as HTMLTextAreaElement).value =
        resumeData.summary;
      (document.getElementById("degree") as HTMLInputElement).value =
        resumeData.degree;
      (document.getElementById("school") as HTMLInputElement).value =
        resumeData.school;
      (document.getElementById("grad-Date") as HTMLInputElement).value =
        resumeData.gradDate;
      (document.getElementById("education") as HTMLTextAreaElement).value =
        resumeData.education;
      (document.getElementById("job-title") as HTMLInputElement).value =
        resumeData.jobTitle;
      (document.getElementById("company") as HTMLInputElement).value =
        resumeData.company;
      (document.getElementById("date") as HTMLInputElement).value =
        resumeData.dates;
      (document.getElementById("experience") as HTMLTextAreaElement).value =
        resumeData.experience;
      (document.getElementById("skills") as HTMLTextAreaElement).value =
        resumeData.skills;
    }
  }
});

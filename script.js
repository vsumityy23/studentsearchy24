let jsonData

fetch('data.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });

        // Assume the first sheet is the one we want
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert the worksheet to JSON
        jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        displayuser(jsonData);
    })
    .catch(error => console.error('Error loading the Excel file:', error));
////////////##########################################################################################################################################################////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////##########################################################################################################################################################////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////search page////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////##########################################################################################################################################################////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////##########################################################################################################################################################////////////////////////////////////////////
function search() {

    const keyword = document.getElementById('searchInput').value.toLowerCase(); // Convert search input to lowercase

    // Collect selected course values
    const courseCheckboxes = document.querySelectorAll('.courseCheckbox');
    const selectedCourses = Array.from(courseCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value.toLowerCase()); // Convert to lowercase for comparison
    const course = selectedCourses.length > 0 ? selectedCourses : [];

    // Collect selected gender values
    const genderCheckboxes = document.querySelectorAll('.genderCheckbox');
    const selectedGenders = Array.from(genderCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value.toLowerCase()); // Convert to lowercase for comparison
    const gender = selectedGenders.length > 0 ? selectedGenders : [];



    const filteredData = jsonData.filter(row => {
        const rollColumn = row[0].toString().toLowerCase(); // Roll number column (converted to string)
        const nameColumn = row[1].toLowerCase(); // Name column
        const courseColumn = row[2].toLowerCase(); // Course column
        const genderColumn = row[4].toLowerCase(); // Gender column

        // Check if the row matches the filters
        const courseMatches = course.length === 0 || course.includes(courseColumn);
        const genderMatches = gender.length === 0 || gender.includes(genderColumn);
        const nameMatches = keyword === '' || nameColumn.includes(keyword) || rollColumn.includes(keyword);

        return courseMatches && genderMatches && nameMatches;
    });


    displayuser(filteredData);
}

function displayuser(jsonData) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    jsonData.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('profile-card');

        const userImage = document.createElement('img');
        userImage.src = user[3];
        userImage.alt = 'Profile Image';

        const userInfoDiv = document.createElement('div');
        userInfoDiv.classList.add('profile-info');

        const userName = document.createElement('h2');
        userName.textContent = user[1];

        const userCity = document.createElement('p');
        userCity.textContent = user[0];

        const userCollege = document.createElement('p');
        userCollege.textContent = user[2];

        // const userroll = document.createElement('p');
        // userroll.textContent = `Roll No: ${user[4]}`;

        const userHall = document.createElement('p');
        const hallInfo = user[5]; // Assuming hall info is in index 5
        const hallNumber = extractHallNumber(hallInfo);
        const hallType = extractHallType(hallInfo);
        userHall.textContent = ` ${user[4]} : ${hallType}/${hallNumber}`;

        // Append all elements to the userInfoDiv
        userInfoDiv.appendChild(userName);
        userInfoDiv.appendChild(userCity);
        userInfoDiv.appendChild(userCollege);
        // userInfoDiv.appendChild(userroll);
        userInfoDiv.appendChild(userHall);

        // Append the image and userInfoDiv to the userDiv
        userDiv.appendChild(userImage);
        userDiv.appendChild(userInfoDiv);

        // Append userDiv to the resultsDiv
        resultsDiv.appendChild(userDiv);
    });
}

function extractHallNumber(hallInfo) {
    const match = hallInfo.match(/HALL\d+,\s*([^)]*)/);
    return match ? match[1].replace(')', '') : 'Unknown'; // Remove closing parenthesis
}

function extractHallType(hallInfo) {
    const match = hallInfo.match(/(HALL\d+)/);
    return match ? match[1] : 'Unknown'; // Extract Hall type (e.g., HALL13)
}



function reset() {
    const collegeCheckboxes = document.querySelectorAll('.collegeCheckbox');

    // Iterate through each checkbox and uncheck it
    collegeCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    const cityCheckboxes = document.querySelectorAll('.cityCheckbox');

    // Iterate through each checkbox and uncheck it
    cityCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    const courseCheckboxes = document.querySelectorAll('.courseCheckbox');

    // Iterate through each checkbox and uncheck it
    courseCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    const batchCheckboxes = document.querySelectorAll('.batchCheckbox');

    // Iterate through each checkbox and uncheck it
    batchCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    const genderCheckboxes = document.querySelectorAll('.genderCheckbox');

    // Iterate through each checkbox and uncheck it
    genderCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    search();

}










document.getElementById('searchInput').addEventListener('input', search);

const cityCheckboxes = document.querySelectorAll('.cityCheckbox');
cityCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', search);
});

const collegeCheckboxes = document.querySelectorAll('.collegeCheckbox');
collegeCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', search);
});

const batchCheckboxes = document.querySelectorAll('.batchCheckbox');
batchCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', search);
});

const genderCheckboxes = document.querySelectorAll('.genderCheckbox');
genderCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', search);
});

const courseCheckboxes = document.querySelectorAll('.courseCheckbox');
courseCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', search);
});


////////////##########################################################################################################################################################////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////frontened/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////##########################################################################################################################################################////////////////////////////////////////////

document.querySelectorAll('.collapsible').forEach(button => {
    button.addEventListener('click', function () {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        const icon = this.querySelector('i.fas.fa-chevron-down');

        // Toggle display and icon rotation
        if (content.style.display === "block") {
            content.style.display = "none";
            if (icon) {
                icon.style.transform = "rotate(0deg)";
            }
        } else {
            content.style.display = "block";
            if (icon) {
                icon.style.transform = "rotate(180deg)";
            }
        }
    });
});

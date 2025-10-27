// get DOM child
const fileInput = document.getElementById("file-input");
const browseBtn = document.getElementById("browse-btn");
const uploadText = document.getElementById("upload-text");
const uploadBox = document.getElementById("upload-box");
const cloudIcon = document.getElementById("cloud-upload");
const buttons = document.getElementById("convert-group");
const cancelButton = document.getElementById("cancel");
const addButton = document.getElementById("add");
const fileContent = document.getElementById("file-content");
const convertButton = document.getElementById("convert");

// reset to first state
function resetUploadBox() {
  browseBtn.classList.remove("hidden");
  buttons.classList.add("hidden");
  fileInput.value = "";
  uploadText.classList.remove("hidden");
  cloudIcon.classList.remove("hidden");
  const fileContent = document.getElementById("file-content");
  if (fileContent) fileContent.remove();
  lucide.createIcons();
}

browseBtn.addEventListener("click", () => fileInput.click());

// # Add file event
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    // 1. add upload file box
    const newUploadBox = `
          
            <div
      class="bg-white flex flex-row justify-center items-center gap-30 px-6 py-5 rounded-lg border-2 border-yellow-900 
      transition-all duration-300"
      id="file-content"
    >
      <div class="flex flex-row justify-center items-center gap-3">
        <div class="relative inline-block">
          <i data-lucide="file" class="w-10 h-10 text-gray-700"></i>
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
           bg-red-400 text-white text-[10px] px-1 rounded"
          >
            ipynb
          </div>
        </div>

        <div id="file-text" class="flex flex-col justify-center">
          <h3 class="font-semibold">${file.name}</h3>
          <p id="file-upload-text" class="text-sm font-medium opacity-50">file uploaded</p>
        </div>
      </div>

      <i data-lucide="trash-2" id="trash-btn" class="text-yellow-900 hover:text-yellow-950 active:text-black"></i>
    </div>
          `;
    uploadBox.insertAdjacentHTML("beforeend", newUploadBox);

    // 2.1 hide unused components
    cloudIcon.classList.add("hidden");
    browseBtn.classList.add("hidden");
    uploadText.classList.add("hidden");

    // 2.2 call to action button
    buttons.classList.remove("hidden");
    convertButton.classList.remove("hidden");
    addButton.classList.add("hidden");

    lucide.createIcons();

    // [Cancel Event]
    const trashBtn = document.getElementById("trash-btn");
    trashBtn.addEventListener("click", () => {
      resetUploadBox();
    });
  }
});

// [Cancel Event]
cancelButton.addEventListener("click", () => {
  resetUploadBox();
});

// # Convert file event

convertButton.addEventListener("click", () => {
  convertButton.classList.add("hidden");

  // get file box element
  const text = document.getElementById("file-upload-text");
  const fileText = document.getElementById("file-text");
  if (text) text.remove();

  // 1. add progress bar
  const progressBarHTML = `
<div class="w-64 h-3 bg-slate-200 rounded relative" id="progress-container">
  <div id="progress-bar" class="h-full w-0 bg-green-400 rounded transition-all"></div>
  <span id="progress-text" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-white">0%</span>
</div>`;
  fileText.insertAdjacentHTML("beforeend", progressBarHTML);

  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  const progressContainer = document.getElementById("progress-container");

  // 2. progress bar animation 0% -> 100%
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);

      // 3. remove progress bar
      progressContainer.remove();
      fileText.insertAdjacentHTML(
        "beforeend",
        `<p id="file-upload-text" class="text-sm font-medium opacity-50">converting done</p>`
      );

      addButton.classList.remove("hidden");
    } else {
      width++;
      progressBar.style.width = width + "%";
      progressText.textContent = width + "%";
    }
  }, 50);
});

// [Cancel Event]
addButton.addEventListener("click", () => {
  resetUploadBox();
});

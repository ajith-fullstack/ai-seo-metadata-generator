const form = document.getElementById('uploadForm');
const imageInput = document.getElementById('imageInput');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('resultContainer');
const errorContainer = document.getElementById('errorContainer');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imagePreview = document.getElementById('imagePreview');
const tableBody = document.getElementById('tableBody');

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
];

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (!file) {
        imagePreviewContainer.classList.add('hidden');
        return;
    }
    if (file.size > MAX_FILE_SIZE) {
        errorContainer.textContent = 'Image size must be less than 5 MB';
        errorContainer.classList.remove('hidden');
        imageInput.value = '';
        tableBody.innerHTML = '';
        resultContainer.classList.add('hidden');
        imagePreviewContainer.classList.add('hidden');
        return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
        errorContainer.textContent = 'Only JPG, PNG and WEBP files are allowed';
        errorContainer.classList.remove('hidden');
        imageInput.value = '';
        imagePreviewContainer.classList.add('hidden');
        return;
    }
    errorContainer.classList.add('hidden');
    const objectUrl = URL.createObjectURL(file);
    imagePreview.src = objectUrl;
    imagePreviewContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = imageInput.files[0];
    if (!file) {
        errorContainer.textContent = 'Please select an image.';
        errorContainer.classList.remove('hidden');
        return;
    }
    if (file.size > 5 * 1024 * 1024) {
        errorContainer.textContent = 'Image size must be less than 5MB.';
        errorContainer.classList.remove('hidden');
        return;
    }
    submitBtn.disabled = true;
    loading.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');
    errorContainer.textContent = '';
    const formData = new FormData();
    formData.append('image', file);
    try {
        const response = await fetch('/api/generate-seo', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Server Error (${response.status})`);
        }
        const rawText = await response.text();
        let result  = JSON.parse(rawText);
        if (result.success) {
            tableBody.innerHTML = '';
            for (const [key, value] of Object.entries(result.data)) {
                const row = document.createElement('tr');
                const cellKey = document.createElement('td');
                cellKey.textContent = key.replace(/_/g, ' ');
                const cellValue = document.createElement('td');
                const textToCopy = Array.isArray(value)
                    ? value.join(', ')
                    : value;
                cellValue.textContent = textToCopy;
                const cellAction = document.createElement('td');
                const copyBtn = document.createElement('button');
                copyBtn.textContent = 'Copy';
                copyBtn.className = 'copy-btn';
                copyBtn.addEventListener('click', async () => {
                    try {
                        await navigator.clipboard.writeText(textToCopy);
                        copyBtn.textContent = 'Copied!';
                        copyBtn.classList.add('copied');
                        setTimeout(() => {
                            copyBtn.textContent = 'Copy';
                            copyBtn.classList.remove('copied');
                        }, 2000);
                    } catch (err) {
                        console.error('Failed to copy:', err);
                        copyBtn.textContent = 'Error';
                    }
                });
                cellAction.appendChild(copyBtn);
                row.appendChild(cellKey);
                row.appendChild(cellValue);
                row.appendChild(cellAction);
                tableBody.appendChild(row);
            }
            resultContainer.classList.remove('hidden');
        } else {
            throw new Error(result.error || 'SEO generation failed.');
        }
    } catch (error) {
        console.error('SEO Generation Error:', error);
        errorContainer.textContent = error.message || 'Something went wrong. Please try again.';
        errorContainer.classList.remove('hidden');
    } finally {
        submitBtn.disabled = false;
        loading.classList.add('hidden');
    }
});
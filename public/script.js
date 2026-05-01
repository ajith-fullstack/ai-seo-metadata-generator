const form = document.getElementById('uploadForm');
const imageInput = document.getElementById('imageInput');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('resultContainer');
const errorContainer = document.getElementById('errorContainer');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imagePreview = document.getElementById('imagePreview');

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        const objectUrl = URL.createObjectURL(file);
        imagePreview.src = objectUrl;
        imagePreviewContainer.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        errorContainer.classList.add('hidden');
    } else {
        imagePreviewContainer.classList.add('hidden');
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = imageInput.files[0];
    if (!file) return;
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
        const rawText = await response.text();
        let result;
        try {
            result = JSON.parse(rawText);
        } catch (parseError) {
            console.error("Raw server response:", rawText);
            throw new Error(`Server did not return valid JSON. Check console for details.`);
        }
        if (result.success) {
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = '';
            for (const [key, value] of Object.entries(result.data)) {
                const row = document.createElement('tr');
                const cellKey = document.createElement('td');
                cellKey.textContent = key.replace('_', ' ');
                const cellValue = document.createElement('td');
                const textToCopy = Array.isArray(value) ? value.join(', ') : value;
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
                        console.error('Failed to copy: ', err);
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
            errorContainer.textContent = `Error: ${result.error}`;
            errorContainer.classList.remove('hidden');
        }
    } catch (error) {
        console.error(error);
        errorContainer.textContent = `Error: ${error.message}`;
        errorContainer.classList.remove('hidden');
    } finally {
        submitBtn.disabled = false;
        loading.classList.add('hidden');
    }
});
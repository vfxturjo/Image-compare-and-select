<script lang="ts">
	import libheif from 'libheif-js/libheif-wasm/libheif';
	import { onMount } from 'svelte';
	const HeifDecoder = libheif();

	onMount(() => {
		const upload = document.querySelector<HTMLInputElement>('#upload');
		const download = document.querySelector<HTMLButtonElement>('#download');
		const canvas = document.querySelector<HTMLCanvasElement>('canvas');

		const readFile = (file: File) =>
			new Promise<Uint8Array>((resolve, reject) => {
				const reader = new FileReader();

				reader.onload = (e) => {
					if (e.target && e.target.result) {
						resolve(new Uint8Array(e.target.result as ArrayBuffer));
					} else {
						reject(new Error('File reading error'));
					}
				};
				reader.onerror = (error) => reject(error);
				reader.readAsArrayBuffer(file);
			});

		const displayFile = async (buffer: Uint8Array) => {
			const decoder = new HeifDecoder();
			const image = decoder.decode(buffer)[0];
			const width = image.get_width();
			const height = image.get_height();

			if (!canvas) throw new Error('Canvas not found');
			canvas.width = width;
			canvas.height = height;

			const context = canvas.getContext('2d');
			if (!context) throw new Error('Context not found');

			const imageData = context.createImageData(width, height);
			await new Promise<void>((resolve, reject) => {
				image.display(imageData, (displayData: any) => {
					if (displayData) {
						context.putImageData(imageData, 0, 0);
						resolve();
					} else {
						reject(new Error('HEIF processing error'));
					}
				});
			});
		};

		const getCanvasImageBlob = (): Promise<Blob> => {
			return new Promise((resolve, reject) => {
				if (!canvas) throw new Error('Canvas not found');
				canvas.toBlob((blob) => {
					if (blob) {
						resolve(blob);
					} else {
						reject(new Error('failed to convert the image'));
					}
				});
			});
		};

		if (!upload) throw new Error('Upload element not found');
		upload.addEventListener('change', async (event) => {
			const target = event.target as HTMLInputElement;
			const file = target.files ? target.files[0] : null;
			if (file) {
				const buffer = await readFile(file);
				await displayFile(buffer);
				if (!download) throw new Error('Download element not found');
				const blob = await getCanvasImageBlob();
				download.onclick = () => {
					const a = document.createElement('a');
					document.body.appendChild(a);
					a.style.display = 'none';
					const url = window.URL.createObjectURL(blob);
					a.href = url;
					a.download = 'result.jpg';
					a.click();
					window.URL.revokeObjectURL(url);
					a.remove();
				};
				download.disabled = false;
			}
		});
	});
</script>

<h1>libheif.js demo</h1>
<p>
	<input type="file" id="upload" accept="image/heic" />
	<button id="download" disabled>Download</button>
</p>
<canvas></canvas>

<style>
	html,
	body {
		font-family: sans-serif;
	}

	canvas {
		max-width: 400px;
		max-height: 400px;
		outline: 1px solid red;
	}
</style>

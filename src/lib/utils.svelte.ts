import { del, get, set } from 'idb-keyval';
import {
	AppSettings,
	AppState,
	appTempStates,
	saveFileSysHandle,
	topIndicatorStore,
	type foundFile,
	type foundPair
} from './appState.svelte';

export async function pickDirectory(version: string, skipPicker = false, forceRecheck = false) {
	try {
		let handle: FileSystemDirectoryHandle;
		if (!skipPicker) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			handle = await (window as any).showDirectoryPicker();
		} else {
			handle = await get(version).then((h) => h as FileSystemDirectoryHandle);
		}
		const pathName = handle.name;

		if (version === 'v1') {
			AppSettings.v.v1DirPath = pathName;
			AppState.v1DirFileSysHandle = handle;
			saveFileSysHandle('v1', handle);
		} else if (version === 'v2') {
			AppSettings.v.v2DirPath = pathName;
			AppState.v2DirFileSysHandle = handle;
			saveFileSysHandle('v2', handle);
		} else if (version === 'convOut') {
			AppSettings.v.otherDirs.convOut = pathName;
			AppState.converter.outputDirFileSysHandle = handle;
			saveFileSysHandle('convOut', handle);
		}
		scanImages(forceRecheck);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		console.log('Directory picker canceled');
	}
}

export async function scanImages(forceRecheck = false) {
	AppSettings.v.dirsOk = false;

	let v1Files: foundFile[] = [];
	let v2Files: foundFile[] = [];
	if (AppState.v1DirFileSysHandle) {
		v1Files = await getFiles(AppState.v1DirFileSysHandle!);
		AppState.v1Len = v1Files.length;
	}
	if (AppState.v2DirFileSysHandle) {
		v2Files = await getFiles(AppState.v2DirFileSysHandle!);
		AppState.v2Len = v2Files.length;
	}
	if (!AppState.v1DirFileSysHandle || !AppState.v2DirFileSysHandle) {
		if (!forceRecheck) {
			return;
		}
	}

	AppSettings.v.dirsOk = true;

	const v1Map = new Map(v1Files.map((f) => [f.name.split('.')[0], f]));
	const v2Map = new Map(v2Files.map((f) => [f.name.split('.')[0], f]));

	AppState.imagePairsAll = Array.from(new Set([...v1Map.keys(), ...v2Map.keys()])).map(
		(baseName) => ({
			baseName,
			v1: v1Map.get(baseName),
			v2: v2Map.get(baseName)
		})
	);

	AppState.overlaps = AppState.imagePairsAll.filter((p) => p.v1 && p.v2).length;

	// sort
	// todo: sort by time
	AppState.imagePairsAll.sort((a, b) => {
		return (a.baseName as unknown as string).localeCompare(b.baseName as unknown as string);
	});

	// todo: handle heic files
	// heic
	AppState.imagePairsHeic = AppState.imagePairsAll.filter(
		(p) => p.v1?.name.match(/\.heic$/i) || p.v2?.name.match(/\.heic$/i)
	);
	AppState.heicCount = AppState.imagePairsHeic.length;
	// non heic
	AppState.imagePairs = AppState.imagePairsAll.filter(
		(p) => !p.v1?.name.match(/\.heic$/i) && !p.v2?.name.match(/\.heic$/i)
	);

	// set whichFolderHeic using imagePairsHeic array. The folder with extension of heic will be outputted and set
	if (AppState.imagePairsHeic.length > 0) {
		const heicPair = AppState.imagePairsHeic[0];
		AppState.whichFolderHeic = heicPair.v1?.name.match(/\.heic$/i) ? 'v1' : 'v2';
	}

	doSelectionByDefault(AppSettings.v.defaultSelection);
}

export async function getFiles(dirHandle: FileSystemDirectoryHandle) {
	const files = [];
	for await (const entry of dirHandle.values()) {
		if (entry.kind === 'file' && entry.name.match(/\.(png|jpg|jpeg|gif|webp|heic)$/i)) {
			files.push({
				handle: entry,
				name: entry.name,
				url: URL.createObjectURL(await entry.getFile())
			} as foundFile);
		}
	}
	return files;
}

export function doSelectionByDefault(which: string) {
	if (which === '') {
		AppState.selections.clear();
	}

	AppState.imagePairs.forEach((pair) => {
		if (which === 'v1' && pair.v1) {
			AppState.selections.set(pair.baseName, 'v1');
		} else if (which === 'v2' && pair.v2) {
			AppState.selections.set(pair.baseName, 'v2');
		}
	});

	updateSelectionCount();
}

export function updateSelectionCount() {
	let v1 = 0,
		v2 = 0;
	(AppState.selections as Map<string, string>).forEach((value: string) => {
		if (value === 'v1') v1++;
		else if (value === 'v2') v2++;
	});
	AppState.status = { v1: v1, v2: v2 };
}

// INTERACTIONS

export function setSelectionState(
	baseName: string | undefined,
	version: 'v1' | 'v2' | 'none' | 'both' | 'mix',
	skipUpdate = false
) {
	if (baseName == null || baseName == undefined) {
		return;
	}

	AppState.selections.set(baseName, version);

	if (AppState.showTopIndicator) {
		topIndicatorStore.show({
			innerHTML: "<h1 class='h1'>✔</h1>",
			anchorElement: document.querySelector(`#mainImg-${version}`) as HTMLElement,
			timeout: 1
		});
	}

	if (!skipUpdate) {
		updateSelectionCount();
	}
}

export function getPaginatedPairs() {
	const currentPairID = AppState.imagePairs.findIndex(
		(pair) => pair.baseName === AppState.currentPair?.baseName
	);

	if (currentPairID === -1) {
		return AppState.imagePairs.slice(0, AppSettings.v.itemsPerPage);
	}

	const itemsPerPage = AppSettings.v.itemsPerPage;
	const totalPairs = AppState.imagePairs.length;
	const threshold = Math.floor((2 / 3) * itemsPerPage);

	let start = Math.max(0, currentPairID - Math.floor(itemsPerPage / 2));
	let end = start + itemsPerPage;

	if (currentPairID > threshold) {
		start = Math.min(totalPairs - itemsPerPage, currentPairID - Math.floor(itemsPerPage / 2));
		end = start + itemsPerPage;
	}

	return AppState.imagePairs.slice(start, end);
}

////////////////////////////////////////////////////
////////////////////////////////////////////////////

// FUNCTION THROTTLING
const throttleRecords: {
	[key: string]: number;
} = {};
export function throttle(
	fn: (...args: unknown[]) => void,
	delay: number
): (...args: unknown[]) => void {
	const retrievedData = throttleRecords[fn.name] ?? null;
	const now = Date.now();
	if (!retrievedData) {
		throttleRecords[fn.name] = now;
	} else {
		if (now - throttleRecords[fn.name] < delay) {
			return () => {};
		}
	}

	throttleRecords[fn.name] = now;
	// return function (...args) {
	// 	fn.apply(this, args);
	// };
	return fn;
}

// -------------------------------------------------
// EXPORTERS
// -------------------------------------------------

class ProgressTracker {
	currentItemId: number;
	skippedCount: number;
	totalCount: number;
	progress: number;
	startTime: number;
	estimatedTime: number;
	estimatedTimeMins: number;
	estimatedTimeSecs: number;
	speed: number;
	remainingItems: number;
	updateFunction: () => void;

	constructor(totalCount: number, updateFunction?: () => void) {
		this.currentItemId = 0;
		this.skippedCount = 0;
		this.progress = 0;
		this.startTime = Date.now();
		this.estimatedTime = 0;
		this.estimatedTimeMins = 0;
		this.estimatedTimeSecs = 0;
		this.speed = 0;
		this.remainingItems = 0;
		this.totalCount = totalCount;
		this.updateFunction = updateFunction ?? function () {};
	}

	updateCurrentItemId(itemId: number, { update = false } = {}) {
		this.currentItemId = itemId;
		if (update) this.updateProgress();
	}

	incrementCurrentItemId({ update = false } = {}) {
		this.currentItemId++;
		if (update) this.updateProgress();
	}

	incrementSkippedCount({ update = false } = {}) {
		this.skippedCount++;
		if (update) this.updateProgress();
	}

	updateProgress() {
		this.progress = Math.round((this.currentItemId / this.totalCount) * 100);

		// calculate estimated time
		this.remainingItems = this.totalCount - this.currentItemId;
		const elapsedTime = Date.now() - this.startTime;
		this.speed = this.currentItemId / (elapsedTime / 1000);

		this.estimatedTime = (this.remainingItems / this.speed) * 1000;
		this.estimatedTimeMins = Math.floor(this.estimatedTime / 60000);
		this.estimatedTimeSecs = Math.floor((this.estimatedTime % 60000) / 1000);

		this.updateFunction();
	}

	// updateBottomBar() {
	// 	this.bottomBarElement.innerText = `Current Item ID: ${this.currentItemId}, Skipped: ${this.skippedCount}, Total: ${this.totalCount}`;
	// }
}

export async function Export_JPEG() {
	const version = $state(AppState.whichFolderHeic ?? 'v1');
	if (typeof window == undefined) {
		return;
	}
	const heic2any = (await import('heic2any')).default;

	AppState.converter.startTime = Date.now();
	const progressT = new ProgressTracker(AppState.imagePairsHeic.length, () => {
		if (progressT.currentItemId === progressT.totalCount) {
			AppState.bottomBar.statusText = 'Conversion completed!';
			return;
		}

		AppState.bottomBar.statusText = `Progress: ${progressT.progress}%... Converting ${progressT.currentItemId} of ${progressT.totalCount} images... Skipped: ${progressT.skippedCount}; (Speed: ${progressT.speed.toFixed(2)} images/sec, Estimated time: ${progressT.estimatedTimeMins}min ${progressT.estimatedTimeSecs}sec)`;
	});

	for (const item of AppState.imagePairsHeic) {
		await fetch(item[version]?.url)
			.then((res) => res.blob())
			.then((blob) =>
				heic2any({
					blob,
					toType: 'image/jpeg',
					quality: AppState.converter.jpegQuality
				})
			)
			.then(async (conversionResult) => {
				// const url = URL.createObjectURL(
				// 	Array.isArray(conversionResult) ? conversionResult[0] : conversionResult
				// );
				const url = URL.createObjectURL(conversionResult);

				// save the image to the output folder
				const fileName = (item as foundPair)[version]?.name.replace(/\.[^/.]+$/, '.jpg');

				await fetch(url)
					.then((res) => res.blob())
					.then(async (blob) => {
						const file = new File([blob], fileName, { type: 'image/jpeg' });

						// Use the File System Access API to save the file directly to the output folder
						if (!AppState.converter.outputDirFileSysHandle) {
							AppState.converter.outputDirFileSysHandle = await window.showDirectoryPicker();
						}
						const fileHandle = await AppState.converter.outputDirFileSysHandle?.getFileHandle(
							fileName,
							{ create: true }
						);
						const writable = await fileHandle?.createWritable();
						await writable?.write(file);
						await writable?.close();

						URL.revokeObjectURL(url);

						progressT.incrementCurrentItemId();
					})
					.catch((e) => {
						handleErrorHere(e);
					});
			})
			.catch((e) => {
				handleErrorHere(e);
			});

		progressT.updateProgress();

		// // update the status text
		// AppState.bottomBar.statusText = `Progress: ${progressT.progress}%... Converting ${progressT.currentItemId} of ${progressT.totalCount} images... Skipped: ${progressT.skippedCount}; (Speed: ${progressT.speed.toFixed(2)} images/sec, Estimated time: ${progressT.estimatedTimeMins}min ${progressT.estimatedTimeSecs}sec)`;

		// if (progressT.currentItemId === progressT.totalCount) {
		// 	AppState.bottomBar.statusText = 'Conversion completed!';
		// }
	}
	function handleErrorHere(e: Error) {
		console.log(e);
		progressT.incrementSkippedCount();
	}

	AppState.converter.progress = 100;
	AppState.bottomBar.statusText = 'Conversion completed!';
}

export async function handleFileOperation(isMove: boolean) {
	if (!AppState.selections.size) return;

	const progressT = new ProgressTracker(AppState.selections.size, () => {
		if (progressT.currentItemId === progressT.totalCount) {
			AppState.bottomBar.statusText = 'Operation completed successfully!';
			return;
		}

		AppState.bottomBar.statusText = `Progress: ${progressT.progress}%... ${isMove ? 'Moving' : 'Copying'} ${progressT.currentItemId} of ${progressT.totalCount} images...(Speed: ${progressT.speed.toFixed(2)} images/sec, Estimated time: ${progressT.estimatedTimeMins}min ${progressT.estimatedTimeSecs}sec)`;
	});

	try {
		const outputDir = await (window as any).showDirectoryPicker({ mode: 'readwrite' });
		for (const [baseName, version] of AppState.selections) {
			const pair = AppState.imagePairs.find((p: any) => p.baseName === baseName);
			const fileHandle = pair[version]?.handle;
			if (fileHandle) {
				const outputFile = await outputDir.getFileHandle(fileHandle.name, { create: true });
				const writable = await outputFile.createWritable();
				const file = await fileHandle.getFile();
				await writable.write(file);
				await writable.close();
				if (isMove) await fileHandle.remove();

				progressT.incrementCurrentItemId({ update: true });
			}
		}
		alert('Operation completed successfully!');
	} catch (error) {
		console.error('File operation failed:', error);
	}
}

// another generic fileCopyMove function for moving non heic files
export async function fileCopyMove(
	array: foundPair[],
	folderhandle: FileSystemDirectoryHandle,
	isMove: boolean
) {
	for (let i = 0; i < array.length; i++) {
		let nowfile = array[i];
		const fileHandle = nowfile.handle;
		const outputFile = await folderhandle.getFileHandle(nowfile.name, { create: true });
		const writable = await outputFile.createWritable();
		nowfile = await fileHandle.getFile();
		await writable.write(nowfile);
		await writable.close();
		if (isMove) await fileHandle.remove();
	}
}

// -----------------------------------------
// Saved Selections Save, load, reset
// -----------------------------------------

export async function loadSavedSelections() {
	const SelectionData = (await get('SelectionData')) as Map<string, 'v1' | 'v2'>;

	if (SelectionData) {
		SelectionData.forEach((value, key) => {
			setSelectionState(key, value as 'v1' | 'v2' | 'none' | 'both' | 'mix', true);
		});
		updateSelectionCount();
	}
}

export function toggleStateForTime(
	stateKey: keyof typeof appTempStates,
	duration = AppSettings.v.defaultNotificationDuration,
	states?: {
		start: (typeof appTempStates)[typeof stateKey];
		end: (typeof appTempStates)[typeof stateKey];
	}
) {
	(appTempStates[stateKey] as boolean | (typeof appTempStates)[typeof stateKey]) =
		states?.start ?? true;
	console.log(stateKey, appTempStates[stateKey]);

	setTimeout(() => {
		(appTempStates[stateKey] as boolean | (typeof appTempStates)[typeof stateKey]) =
			states?.end ?? false;
		console.log(stateKey, appTempStates[stateKey]);
	}, duration);
}

export async function saveCurrentSelections() {
	await set('SelectionData', AppState.selections);

	toggleStateForTime('Selections_saved', AppSettings.v.defaultNotificationDuration);
}

export async function resetSavedSelections() {
	del('SelectionData');
	AppState.selections.clear();
	doSelectionByDefault(AppSettings.v.defaultSelection);

	toggleStateForTime('Selections_reset_done', AppSettings.v.defaultNotificationDuration);
}

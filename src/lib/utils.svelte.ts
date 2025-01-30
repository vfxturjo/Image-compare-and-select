import { get } from 'idb-keyval';
import {
	AppSettings,
	AppState,
	saveFileSysHandle,
	type foundFile,
	type foundPair
} from './appState.svelte';

export async function pickDirectory(version: string, skipPicker = false, forceRecheck = false) {
	try {
		let handle: FileSystemDirectoryHandle;
		if (!skipPicker) {
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
		return a.baseName.localeCompare(b.baseName);
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
	AppState.selections.forEach((value: any) => {
		if (value === 'v1') v1++;
		else if (value === 'v2') v2++;
	});
	AppState.status = { v1: v1, v2: v2 };
}

export async function handleFileOperation(isMove: boolean) {
	if (!AppState.selections.size) return;

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

// INTERACTIONS

export function setSelectionState(
	baseName: string | undefined,
	version: 'v1' | 'v2' | 'none' | 'both' | 'mix'
) {
	if (baseName == null || baseName == undefined) {
		return;
	}

	// console.log('Toggling selection:', baseName, version);
	// console.log('Selections:', AppState.selections.get(baseName));
	AppState.selections.set(baseName, version);

	// console.log('Selections:', AppState.selections.get(baseName));

	updateSelectionCount();
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
export function throttle(fn: Function, delay) {
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

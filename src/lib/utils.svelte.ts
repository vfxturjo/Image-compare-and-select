import { AppSettings, AppState, type foundFile } from './appState.svelte';

export async function scanImages() {
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
		return;
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

// INTERACTIONS

export function toggleSelection(baseName: string, version: string) {
	// console.log('Toggling selection:', baseName, version);

	AppState.selections.set(baseName, AppState.selections.get(baseName) === version ? 'v1' : version);

	// console.log('Selections:', AppState.selections.get(baseName));

	updateSelectionCount();
}

export const pg = $state({
	page: 0,
	limit: 20,
	size: AppState.imagePairs.length,
	amounts: [20, 50, 100],
	total: Math.ceil(AppState.imagePairs.length / AppSettings.v.itemsPerPage),
	noRight: false,
	noLeft: false
});

export function getPaginatedPairs() {
	// const start = (AppState.currentPage - 1) * AppSettings.v.itemsPerPage;
	// const end = start + AppSettings.v.itemsPerPage;
	return AppState.imagePairs.slice(pg.page * pg.limit, pg.page * pg.limit + pg.limit);
}

import { SvelteMap } from 'svelte/reactivity';
import { PersistedStateObjectAdvanced } from './persistedStoreAdvanced.svelte';
import { set, clear, get } from 'idb-keyval';

export interface foundFile {
	handle: FileSystemFileHandle;
	name: string;
	url: string;
}

export interface foundPair {
	baseName: string;
	v1?: foundFile;
	v2?: foundFile;
}

const defaultAppSettings = {
	v1DirPath: '',
	v2DirPath: '',
	v1DirName: 'Dir1',
	v2DirName: 'Dir2',
	defaultSelection: 'v1',
	itemsPerPage: 20,
	pairsPerRow: 1,
	thumbnailSize: 200,
	spacing: 10,
	dirsOk: false,
	imageHeight: 200,
	imageFullscreenView: true
};

export const AppSettings = new PersistedStateObjectAdvanced('app-settings', defaultAppSettings, {
	syncTabs: false
});

// App state
export const AppState = $state({
	v1DirFileSysHandle: null as FileSystemDirectoryHandle | null,
	v2DirFileSysHandle: null as FileSystemDirectoryHandle | null,
	imagePairsAll: [] as foundPair[],
	imagePairsHeic: [] as foundPair[],
	imagePairs: [] as foundPair[],
	v1Len: 0,
	v2Len: 0,
	overlaps: 0,
	selections: new SvelteMap(),
	currentPage: 1,
	status: { v1: 0, v2: 0 },
	heicCount: 0
});

export function saveFileSysHandle(key: string, handle: FileSystemDirectoryHandle | null) {
	if (!handle) {
		console.log('no handle to save');
		return;
	}

	// console.log('saving handle', handle);
	set(key, handle);
}

export async function getFileSysHandles() {
	return {
		v1: (await get('v1')) as FileSystemDirectoryHandle,
		v2: (await get('v2')) as FileSystemDirectoryHandle
	};
}

export function resetAllSettings() {
	localStorage.clear();
	clear();
	location.reload();
}
